/* ───────────────────────────────────────────────
   CMS Store — sumber data tunggal untuk seluruh situs.
   Urutan prioritas: default (kode) ← published
   (public/cms-content.json) ← draft (localStorage browser ini).
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
  mergeContent,
  type CmsContent,
} from "./defaults";

export type { CmsContent };
export { defaultContent };

const DRAFT_KEY = "portfolio-cms-draft-v1";

function extractContent(json: unknown): Partial<CmsContent> | null {
  if (!json || typeof json !== "object" || Array.isArray(json)) return null;
  const obj = json as Record<string, unknown>;
  const inner =
    obj.content && typeof obj.content === "object" && !Array.isArray(obj.content)
      ? (obj.content as Partial<CmsContent>)
      : (obj as Partial<CmsContent>);
  if (!inner || typeof inner !== "object") return null;
  return inner;
}

function readDraft(): Partial<CmsContent> | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return extractContent(JSON.parse(raw));
  } catch {
    return null;
  }
}

type CmsState = {
  /** Konten final yang dipakai situs (default + published + draft). */
  content: CmsContent;
  /** Konten tanpa draft (default + published). */
  baseContent: CmsContent;
  loading: boolean;
  hasDraft: boolean;
  hasPublished: boolean;
  publishedAt: string | null;
  saveDraft: (c: CmsContent) => void;
  clearDraft: () => void;
};

const CmsContext = createContext<CmsState | null>(null);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Partial<CmsContent> | null>(() =>
    typeof window === "undefined" ? null : readDraft()
  );
  const [published, setPublished] = useState<Partial<CmsContent> | null>(null);
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
        const content = extractContent(json);
        // Abaikan file kosong/contoh yang belum berisi konten apapun
        if (content && Object.keys(content).length > 0) {
          setPublished(content);
          const meta = json as { updatedAt?: unknown };
          setPublishedAt(
            typeof meta.updatedAt === "string" ? meta.updatedAt : null
          );
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

  const saveDraft = useCallback((c: CmsContent) => {
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), content: c })
      );
      setDraft(c);
    } catch {
      /* storage penuh / mode privat — abaikan */
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
    const baseContent = mergeContent(published);
    return {
      content: mergeContent(published, draft),
      baseContent,
      loading,
      hasDraft: draft !== null && Object.keys(draft).length > 0,
      hasPublished: published !== null && Object.keys(published).length > 0,
      publishedAt,
      saveDraft,
      clearDraft,
    };
  }, [published, publishedAt, draft, loading, saveDraft, clearDraft]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms(): CmsState {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms harus dipakai di dalam <CmsProvider>");
  return ctx;
}
