/* ───────────────────────────────────────────────
   CMS Store — sumber data tunggal untuk seluruh situs.
   - Konten 2 bahasa: id & en (default ← published ← draft)
   - Bahasa aktif tersimpan di localStorage
   ─────────────────────────────────────────────── */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultContent,
  defaultDocs,
  mergeContent,
  type CmsContent,
} from "./defaults";
import { strings, siteTitle, type Lang, type Strings } from "./i18n";

export type { CmsContent, Lang, Strings };
export { defaultContent, defaultDocs };

const DRAFT_KEY = "portfolio-cms-draft-v1";
const LANG_KEY = "portfolio-lang-v1";

export type Docs = Record<Lang, CmsContent>;
export type PartialDocs = { id?: Partial<CmsContent>; en?: Partial<CmsContent> };

/** Hasil simpan draft. `bytes` = ukuran JSON yang dicoba ditulis. */
export type SaveResult =
  | { ok: true; bytes: number }
  | { ok: false; reason: "quota" | "unavailable"; bytes: number };

/**
 * Batas aman localStorage. Kuota browser umumnya ~5 MB per origin dan
 * dipakai bersama key lain, jadi kita peringatkan lebih awal.
 */
export const DRAFT_SOFT_LIMIT = 3_500_000;
export const DRAFT_HARD_LIMIT = 4_800_000;

/** Ukuran byte UTF-8 sebenarnya (bukan jumlah karakter). */
export function byteSize(text: string): number {
  if (typeof Blob !== "undefined") {
    try {
      return new Blob([text]).size;
    } catch {
      /* lingkungan tanpa Blob — pakai pendekatan di bawah */
    }
  }
  try {
    return new TextEncoder().encode(text).length;
  } catch {
    return text.length;
  }
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

/** Baca payload published/draft (format baru {id,en} atau lama 1 bahasa). */
export function extractDocsPayload(
  json: unknown
): { docs: PartialDocs; updatedAt: string | null } | null {
  if (!json || typeof json !== "object" || Array.isArray(json)) return null;
  const obj = json as Record<string, unknown>;
  const inner =
    obj.content && typeof obj.content === "object" && !Array.isArray(obj.content)
      ? (obj.content as Record<string, unknown>)
      : (obj as Record<string, unknown>);
  if (!inner || typeof inner !== "object" || Array.isArray(inner)) return null;
  // Format lama (satu pohon konten) dianggap Bahasa Indonesia
  const docs: PartialDocs =
    "profile" in inner
      ? { id: inner as unknown as Partial<CmsContent> }
      : (inner as unknown as PartialDocs);
  const meta = json as { updatedAt?: unknown };
  return {
    docs,
    updatedAt: typeof meta.updatedAt === "string" ? meta.updatedAt : null,
  };
}

function readDraft(): PartialDocs | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return extractDocsPayload(JSON.parse(raw))?.docs ?? null;
  } catch {
    return null;
  }
}

function initialLang(): Lang {
  try {
    const s = localStorage.getItem(LANG_KEY);
    if (s === "id" || s === "en") return s;
  } catch {
    /* abaikan */
  }
  return "id";
}

type CmsState = {
  /** Bahasa aktif situs. */
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Kamus teks UI untuk bahasa aktif. */
  t: Strings;
  /** Konten final bahasa aktif (default + published + draft). */
  content: CmsContent;
  /** Konten bahasa aktif tanpa draft (default + published). */
  baseContent: CmsContent;
  /** Seluruh dokumen 2 bahasa (final). */
  docs: Docs;
  /** Seluruh dokumen 2 bahasa tanpa draft. */
  baseDocs: Docs;
  loading: boolean;
  hasDraft: boolean;
  hasPublished: boolean;
  publishedAt: string | null;
  /**
   * Simpan draft. Mengembalikan hasil — PENTING: kegagalan (mis. kuota
   * localStorage penuh) TIDAK lagi ditelan diam-diam, karena dulu
   * pengguna melihat toast "tersimpan" padahal datanya hilang.
   */
  saveDraft: (d: Docs) => SaveResult;
  clearDraft: () => void;
};

const CmsContext = createContext<CmsState | null>(null);

function isAdminPath(): boolean {
  if (typeof window === "undefined") return false;
  return (window.location.pathname.replace(/\/+$/, "") || "/") === "/admin";
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window === "undefined" ? "id" : initialLang()
  );
  const [draft, setDraft] = useState<PartialDocs | null>(() =>
    typeof window === "undefined" ? null : readDraft()
  );
  const [published, setPublished] = useState<PartialDocs | null>(null);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Muat konten published (hasil commit file public/cms-content.json)
  useEffect(() => {
    let alive = true;
    const url = `${import.meta.env.BASE_URL}cms-content.json`;
    fetch(url, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("no published file");
        return res.json();
      })
      .then((json: unknown) => {
        if (!alive) return;
        const parsed = extractDocsPayload(json);
        const docs = parsed?.docs;
        if (docs && Object.keys(docs).length > 0) {
          setPublished(docs);
          setPublishedAt(parsed?.updatedAt ?? null);
        }
      })
      .catch(() => {
        /* tidak ada file published — pakai default, normal */
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Terapkan bahasa ke <html> + judul tab (di luar /admin)
  useEffect(() => {
    document.documentElement.lang = lang;
    if (!isAdminPath()) document.title = siteTitle[lang];
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* abaikan */
    }
  }, []);

  const saveDraft = useCallback((d: Docs): SaveResult => {
    const payload = JSON.stringify({
      version: 2,
      updatedAt: new Date().toISOString(),
      content: d,
    });
    const bytes = byteSize(payload);
    try {
      localStorage.setItem(DRAFT_KEY, payload);
      setDraft(d);
      return { ok: true, bytes };
    } catch (err) {
      // Dulu error ini ditelan, sehingga UI tetap bilang "tersimpan"
      // padahal draft tidak pernah masuk localStorage.
      const name = err instanceof Error ? err.name : "";
      return {
        ok: false,
        reason: /quota/i.test(name) ? "quota" : "unavailable",
        bytes,
      };
    }
  }, []);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* abaikan */
    }
    setDraft(null);
  }, []);

  const value = useMemo<CmsState>(() => {
    const baseDocs: Docs = {
      id: mergeContent(defaultDocs.id, published?.id),
      en: mergeContent(defaultDocs.en, published?.en),
    };
    const docs: Docs = {
      id: mergeContent(defaultDocs.id, published?.id, draft?.id),
      en: mergeContent(defaultDocs.en, published?.en, draft?.en),
    };
    return {
      lang,
      setLang,
      t: strings[lang],
      content: docs[lang],
      baseContent: baseDocs[lang],
      docs,
      baseDocs,
      loading,
      hasDraft: draft !== null && Object.keys(draft).length > 0,
      hasPublished: published !== null && Object.keys(published).length > 0,
      publishedAt,
      saveDraft,
      clearDraft,
    };
  }, [lang, setLang, published, publishedAt, draft, loading, saveDraft, clearDraft]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms(): CmsState {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms harus dipakai di dalam <CmsProvider>");
  return ctx;
}
