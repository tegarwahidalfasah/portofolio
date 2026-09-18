/* ───────────────────────────────────────────────
   CMS Admin — halaman /admin untuk mengelola seluruh isi web.
   - Edit tanpa coding, simpan sebagai draft (localStorage)
   - Unduh cms-content.json lalu commit agar tampil ke publik
   ─────────────────────────────────────────────── */
import { useEffect, useRef, useState } from "react";
import {
  User,
  Home,
  Briefcase,
  Sparkles,
  Image as ImageIcon,
  Layers,
  FileText,
  Mail,
  Settings,
  Save,
  Eye,
  Download,
  Upload,
  RotateCcw,
  Lock,
  LogOut,
  Check,
  Menu,
  X,
  ExternalLink,
  Info,
  Play,
} from "lucide-react";
import { useCms, extractDocsPayload, type Docs, type Lang } from "./store";
import { mergeContent, type CmsContent, type Work, type MediaItem } from "./defaults";
import {
  resolveWorkMedia,
  parseYouTube,
  parseTikTok,
  parseInstagram,
  convertToEmbedUrl,
  PlatformMediaIcon,
  PlatformPill,
} from "../utils/mediaEmbed";
import {
  Area,
  Card,
  Field,
  Grid,
  ListEditor,
  Num,
  Sel,
  StrList,
  Text,
} from "./fields";

/* ═══════════ Auth (sederhana, sisi browser) ═══════════ */
const PASS_KEY = "portfolio-cms-pass-v1";
const AUTH_KEY = "portfolio-cms-auth-v1";
const DEFAULT_PASS = "admin123";

function getPassword(): string {
  try {
    return localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
  } catch {
    return DEFAULT_PASS;
  }
}

function isAuthed(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

/* ═══════════ Pilihan dropdown ═══════════ */
const workTypeOpts = [
  { value: "video", label: "Video" },
  { value: "image", label: "Gambar / Foto" },
];
const mediaTypeOpts = [
  { value: "youtube", label: "YouTube (yt)" },
  { value: "tiktok", label: "TikTok (tt)" },
  { value: "instagram", label: "Instagram (ig)" },
  { value: "twitch", label: "Twitch" },
  { value: "video", label: "Video Langsung / File" },
];
const toolIconOpts = [
  "film",
  "sparkles",
  "palette",
  "camera",
  "clapperboard",
  "radio",
  "smartphone",
  "music",
  "shapes",
  "file-text",
].map((v) => ({ value: v, label: v }));
const serviceIconOpts = [
  { value: "video", label: "Video" },
  { value: "palette", label: "Palet (desain)" },
  { value: "camera", label: "Kamera" },
  { value: "monitor", label: "Monitor (IT)" },
];
const serviceColorOpts = [
  { value: "from-rose-500 to-pink-500", label: "Rose / Pink" },
  { value: "from-amber-500 to-orange-500", label: "Amber / Orange" },
  { value: "from-cyan-500 to-sky-500", label: "Cyan / Sky" },
  { value: "from-accent-500 to-accent-600", label: "Indigo (bawaan)" },
  { value: "from-green-500 to-emerald-500", label: "Hijau" },
  { value: "from-purple-500 to-violet-500", label: "Ungu" },
  { value: "from-slate-500 to-slate-600", label: "Abu-abu" },
];
const workflowIconOpts = [
  { value: "message-square", label: "Chat" },
  { value: "file-text", label: "Dokumen" },
  { value: "clapperboard", label: "Klapper" },
  { value: "eye", label: "Mata (review)" },
  { value: "check-circle", label: "Centang" },
];
const platformIconOpts = [
  { value: "instagram", label: "Instagram" },
  { value: "mail", label: "Email" },
];

const TABS = [
  { id: "profil", label: "Profil & Kontak", icon: User },
  { id: "hero", label: "Hero & Tentang", icon: Home },
  { id: "riwayat", label: "Riwayat", icon: Briefcase },
  { id: "skill", label: "Skill & Tools", icon: Sparkles },
  { id: "karya", label: "Karya & Media", icon: ImageIcon },
  { id: "layanan", label: "Layanan & Alur", icon: Layers },
  { id: "faq", label: "FAQ", icon: FileText },
  { id: "kontak", label: "Kontak & Footer", icon: Mail },
  { id: "pengaturan", label: "Pengaturan", icon: Settings },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ═══════════ Halaman utama admin ═══════════ */
export function Admin() {
  const [authed, setAuthed] = useState(isAuthed);

  useEffect(() => {
    document.title = "CMS Admin — Portofolio";
  }, []);

  if (!authed) return <Gate onOk={() => setAuthed(true)} />;
  return (
    <Panel
      onLogout={() => {
        try {
          localStorage.removeItem(AUTH_KEY);
        } catch {
          /* abaikan */
        }
        setAuthed(false);
      }}
    />
  );
}

/* ── Gerbang password ── */
function Gate({ onOk }: { onOk: () => void }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === getPassword()) {
      try {
        localStorage.setItem(AUTH_KEY, "1");
      } catch {
        /* abaikan */
      }
      onOk();
    } else {
      setError("Password salah. Coba lagi.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-8"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-400 text-white shadow-lg shadow-indigo-500/30">
          <Lock size={22} />
        </div>
        <h1 className="mt-5 text-center font-display text-xl font-bold text-white">
          CMS Admin
        </h1>
        <p className="mt-1 text-center text-sm text-slate-400">
          Masukkan password untuk mengelola isi website.
        </p>
        <input
          type="password"
          autoFocus
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            setError("");
          }}
          placeholder="Password"
          className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20"
        />
        {error && <p className="mt-2 text-center text-xs text-rose-300">{error}</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-3 font-display text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl"
        >
          Masuk
        </button>
        <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500">
          Password bawaan: <span className="font-mono text-slate-300">admin123</span>
          <br />
          (ganti di tab Pengaturan setelah masuk)
        </p>
        <a
          href="/"
          className="mt-3 block text-center text-xs text-slate-400 underline-offset-4 hover:text-white hover:underline"
        >
          ← Kembali ke website
        </a>
      </form>
    </div>
  );
}

/* ── Panel admin ── */
function Panel({ onLogout }: { onLogout: () => void }) {
  const cms = useCms();
  const [docs, setDocs] = useState<Docs | null>(null);
  const [cmsLang, setCmsLang] = useState<Lang>("id");
  const doc = docs ? docs[cmsLang] : null;
  const [tab, setTab] = useState<TabId>("profil");
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inisialisasi dokumen sekali saat konten siap
  useEffect(() => {
    if (!cms.loading && docs === null) {
      setDocs(cms.docs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cms.loading]);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };

  const update = (fn: (d: CmsContent) => void) => {
    setDocs((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      fn(next[cmsLang]);
      return next;
    });
    setDirty(true);
  };

  const handleSave = () => {
    if (!docs) return;
    cms.saveDraft(docs);
    setDirty(false);
    showToast("Draft tersimpan di browser ini. Klik Pratinjau untuk melihat.");
  };

  const handlePreview = () => {
    window.open(`${import.meta.env.BASE_URL}`, "_blank");
  };

  const handleDownload = () => {
    if (!docs) return;
    const payload = {
      version: 2,
      updatedAt: new Date().toISOString(),
      content: docs,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cms-content.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    showToast("File cms-content.json diunduh. Commit file ini agar tampil ke publik.");
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const json = JSON.parse(await file.text()) as unknown;
      const parsed = extractDocsPayload(json);
      if (!parsed || Object.keys(parsed.docs).length === 0) {
        throw new Error("invalid");
      }
      setDocs({
        id: mergeContent(cms.baseDocs.id, parsed.docs.id),
        en: mergeContent(cms.baseDocs.en, parsed.docs.en),
      });
      setDirty(true);
      showToast("File berhasil dimuat ke editor. Jangan lupa Simpan.");
    } catch {
      showToast("Gagal membaca file. Pastikan file cms-content.json valid.");
    }
  };

  const handleReset = () => {
    if (!window.confirm("Hapus draft dan kembalikan ke konten terakhir yang tayang?")) return;
    cms.clearDraft();
    setDocs(cms.baseDocs);
    setDirty(false);
    showToast("Draft dihapus.");
  };

  if (cms.loading || !docs || !doc) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="font-mono text-sm text-slate-400">Memuat CMS…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── Topbar ── */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="mr-auto">
            <h1 className="font-display text-base font-bold text-white sm:text-lg">
              CMS Admin
            </h1>
            <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
              {dirty ? (
                <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 font-mono text-[10px] font-medium text-amber-300">
                  ● Belum disimpan
                </span>
              ) : (
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] font-medium text-emerald-300">
                  ● Tersimpan
                </span>
              )}
              {cms.hasDraft && (
                <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 font-mono text-[10px] font-medium text-indigo-300">
                  Draft aktif
                </span>
              )}
              {cms.hasPublished && (
                <span className="rounded-full bg-sky-500/15 px-2.5 py-0.5 font-mono text-[10px] font-medium text-sky-300">
                  Published
                  {cms.publishedAt ? ` • ${new Date(cms.publishedAt).toLocaleDateString("id-ID")}` : ""}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-0.5 rounded-xl border border-white/15 bg-white/5 p-1">
            {(["id", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setCmsLang(l)}
                title={l === "id" ? "Edit Bahasa Indonesia" : "Edit English"}
                className={`rounded-lg px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider transition-all ${
                  cmsLang === l
                    ? "bg-indigo-500 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {l === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSave}
              disabled={!dirty}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2.5 font-display text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Save size={14} /> Simpan
            </button>
            <button
              onClick={handlePreview}
              className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-display text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
            >
              <Eye size={14} /> Pratinjau
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-display text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
            >
              <Download size={14} /> Unduh JSON
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        {/* ── Sidebar ── */}
        <aside
          className={`${
            menuOpen ? "fixed inset-y-0 left-0 z-30 block w-64 bg-slate-950 p-4 pt-20" : "hidden"
          } lg:sticky lg:top-[76px] lg:block lg:w-60 lg:shrink-0 lg:self-start lg:bg-transparent lg:p-0 lg:pt-0`}
        >
          <nav className="space-y-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTab(t.id);
                    setMenuOpen(false);
                    window.scrollTo({ top: 0 });
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left font-display text-sm font-medium transition-colors ${
                    active
                      ? "bg-indigo-500/20 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={17} className={active ? "text-indigo-300" : ""} />
                  {t.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-6 space-y-1 border-t border-white/10 pt-4">
            <a
              href="/"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-display text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ExternalLink size={17} /> Lihat Website
            </a>
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-display text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-rose-300"
            >
              <LogOut size={17} /> Keluar
            </button>
          </div>
        </aside>

        {/* ── Konten ── */}
        <main className="min-w-0 flex-1 space-y-5 pb-20">
          {tab === "profil" && <TabProfil doc={doc} update={update} />}
          {tab === "hero" && <TabHero doc={doc} update={update} />}
          {tab === "riwayat" && <TabRiwayat doc={doc} update={update} />}
          {tab === "skill" && <TabSkill doc={doc} update={update} />}
          {tab === "karya" && <TabKarya doc={doc} update={update} />}
          {tab === "layanan" && <TabLayanan doc={doc} update={update} />}
          {tab === "faq" && <TabFaq doc={doc} update={update} />}
          {tab === "kontak" && <TabKontak doc={doc} update={update} />}
          {tab === "pengaturan" && (
            <TabPengaturan
              onImport={() => fileRef.current?.click()}
              onReset={handleReset}
              onDownload={handleDownload}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={handleImportFile}
      />

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex max-w-[90vw] -translate-x-1/2 items-center gap-2.5 rounded-2xl border border-white/15 bg-slate-900/95 px-5 py-3 shadow-2xl backdrop-blur-xl">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
            <Check size={14} />
          </span>
          <p className="text-sm text-slate-200">{toast}</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════ Tab: Profil ═══════════ */
function TabProfil({
  doc,
  update,
}: {
  doc: CmsContent;
  update: (fn: (d: CmsContent) => void) => void;
}) {
  const p = doc.profile;
  const set = (patch: Partial<CmsContent["profile"]>) =>
    update((d) => Object.assign(d.profile, patch));
  return (
    <>
      <Card title="Identitas" desc="Nama dan identitas dasar yang tampil di navbar, hero, dan footer.">
        <Grid>
          <Field label="Nama lengkap"><Text value={p.name} onChange={(v) => set({ name: v })} /></Field>
          <Field label="Nama pendek (navbar)"><Text value={p.shortName} onChange={(v) => set({ shortName: v })} /></Field>
          <Field label="Nama belakang"><Text value={p.lastName} onChange={(v) => set({ lastName: v })} /></Field>
          <Field label="Inisial (logo)"><Text value={p.initials} onChange={(v) => set({ initials: v })} /></Field>
        </Grid>
        <Field label="Tagline"><Text value={p.tagline} onChange={(v) => set({ tagline: v })} /></Field>
        <StrList label="Peran / Roles" items={p.roles} onChange={(v) => set({ roles: v })} placeholder="cth. Video Editor" />
        <Field label="Intro singkat"><Area value={p.intro} onChange={(v) => set({ intro: v })} rows={2} /></Field>
        <Field label="Ringkasan (section Tentang)"><Area value={p.summary} onChange={(v) => set({ summary: v })} rows={4} /></Field>
      </Card>

      <Card title="Kontak & Lokasi">
        <Grid>
          <Field label="Lokasi lengkap"><Text value={p.location} onChange={(v) => set({ location: v })} /></Field>
          <Field label="Lokasi singkat"><Text value={p.locationShort} onChange={(v) => set({ locationShort: v })} /></Field>
          <Field label="Telepon / WA"><Text value={p.phone} onChange={(v) => set({ phone: v })} /></Field>
          <Field label="Link telepon"><Text value={p.phoneHref} onChange={(v) => set({ phoneHref: v })} placeholder="tel:+62..." /></Field>
          <Field label="Email"><Text value={p.email} onChange={(v) => set({ email: v })} /></Field>
          <Field label="Instagram (tampilan)"><Text value={p.instagram} onChange={(v) => set({ instagram: v })} /></Field>
          <Field label="Link Instagram"><Text value={p.instagramHref} onChange={(v) => set({ instagramHref: v })} /></Field>
          <Field label="IPK"><Text value={p.gpa} onChange={(v) => set({ gpa: v })} /></Field>
          <Field label="Tahun lulus"><Text value={p.graduationYear} onChange={(v) => set({ graduationYear: v })} /></Field>
        </Grid>
      </Card>

      <Card title="Sosial media lain" desc="Disediakan untuk pengembangan. Kosongkan bila tidak dipakai.">
        <Grid>
          <Field label="YouTube"><Text value={p.youtube} onChange={(v) => set({ youtube: v })} /></Field>
          <Field label="Link YouTube"><Text value={p.youtubeHref} onChange={(v) => set({ youtubeHref: v })} /></Field>
          <Field label="Twitch"><Text value={p.twitch} onChange={(v) => set({ twitch: v })} /></Field>
          <Field label="Link Twitch"><Text value={p.twitchHref} onChange={(v) => set({ twitchHref: v })} /></Field>
          <Field label="TikTok"><Text value={p.tiktok} onChange={(v) => set({ tiktok: v })} /></Field>
          <Field label="Link TikTok"><Text value={p.tiktokHref} onChange={(v) => set({ tiktokHref: v })} /></Field>
          <Field label="Donasi (label)"><Text value={p.donationLabel} onChange={(v) => set({ donationLabel: v })} /></Field>
          <Field label="Link donasi"><Text value={p.donation} onChange={(v) => set({ donation: v })} /></Field>
        </Grid>
      </Card>

      <Card title="Foto & CV" desc="Foto profil dan file CV yang bisa diunduh pengunjung.">
        <Field label="URL foto profil (opsional)" hint="Kosongkan untuk memakai foto bawaan. Isi dengan URL gambar (https://…) untuk mengganti.">
          <Text value={p.photoUrl} onChange={(v) => set({ photoUrl: v })} placeholder="https://…" />
        </Field>
        <Field label="URL file CV" hint="Tautan tombol 'Download CV'. Upload PDF ke repo (folder public/) lalu isi mis. /CV_Tegar_Wahid_Alfasah.pdf">
          <Text value={p.cvUrl} onChange={(v) => set({ cvUrl: v })} />
        </Field>
      </Card>
    </>
  );
}

/* ═══════════ Tab: Hero & Tentang ═══════════ */
function TabHero({
  doc,
  update,
}: {
  doc: CmsContent;
  update: (fn: (d: CmsContent) => void) => void;
}) {
  return (
    <>
      <Card title="Hero (bagian atas)" desc="Judul besar dan teks pembuka di layar pertama.">
        <Grid>
          <Field label="Judul baris 1"><Text value={doc.hero.line1} onChange={(v) => update((d) => { d.hero.line1 = v; })} /></Field>
          <Field label="Judul baris 2 (gradient)"><Text value={doc.hero.line2} onChange={(v) => update((d) => { d.hero.line2 = v; })} /></Field>
        </Grid>
        <Field label="Jabatan / peran"><Text value={doc.hero.role} onChange={(v) => update((d) => { d.hero.role = v; })} /></Field>
        <Field label="Paragraf pembuka"><Area value={doc.hero.intro} onChange={(v) => update((d) => { d.hero.intro = v; })} rows={3} /></Field>
      </Card>

      <Card title="Tentang (About)" desc="Judul dan kutipan di section Tentang. Paragraf utama diambil dari Ringkasan profil.">
        <Grid>
          <Field label="Judul bagian 1"><Text value={doc.about.titleA} onChange={(v) => update((d) => { d.about.titleA = v; })} /></Field>
          <Field label="Judul bagian 2 (gradient)"><Text value={doc.about.titleB} onChange={(v) => update((d) => { d.about.titleB = v; })} /></Field>
        </Grid>
        <Field label="Kutipan"><Area value={doc.about.quote} onChange={(v) => update((d) => { d.about.quote = v; })} rows={3} /></Field>
      </Card>

      <ListEditor
        title="Statistik"
        desc="Kartu angka di bawah hero. Gunakan baris baru pada label untuk 2 baris teks."
        items={doc.stats}
        onChange={(v) => update((d) => { d.stats = v; })}
        createItem={() => ({ value: "", label: "" })}
        addLabel="Tambah statistik"
        itemTitle={(s) => s.value ? `${s.value} — ${s.label.split("\n")[0]}` : "(baru)"}
        renderItem={(s, set) => (
          <>
            <Grid>
              <Field label="Angka"><Text value={s.value} onChange={(v) => set({ value: v })} placeholder="cth. 40+" /></Field>
              <Field label="Label"><Text value={s.label} onChange={(v) => set({ label: v })} placeholder="cth. Proyek Kreatif" /></Field>
            </Grid>
          </>
        )}
      />

      <Card title="Kutipan statistik">
        <Field label="Kutipan di samping angka statistik"><Text value={doc.statsQuote} onChange={(v) => update((d) => { d.statsQuote = v; })} /></Field>
      </Card>
    </>
  );
}

/* ═══════════ Tab: Riwayat ═══════════ */
function TabRiwayat({
  doc,
  update,
}: {
  doc: CmsContent;
  update: (fn: (d: CmsContent) => void) => void;
}) {
  return (
    <>
      <ListEditor
        title="Pendidikan"
        items={doc.education}
        onChange={(v) => update((d) => { d.education = v; })}
        createItem={() => ({ school: "", period: "", program: "", location: "", description: "", gpa: "" })}
        addLabel="Tambah pendidikan"
        itemTitle={(e) => e.school || "(baru)"}
        renderItem={(e, set) => (
          <>
            <Grid>
              <Field label="Sekolah / kampus"><Text value={e.school} onChange={(v) => set({ school: v })} /></Field>
              <Field label="Periode"><Text value={e.period} onChange={(v) => set({ period: v })} placeholder="2022 — 2026" /></Field>
              <Field label="Program / jurusan"><Text value={e.program} onChange={(v) => set({ program: v })} /></Field>
              <Field label="Lokasi"><Text value={e.location} onChange={(v) => set({ location: v })} /></Field>
              <Field label="IPK (opsional)"><Text value={e.gpa ?? ""} onChange={(v) => set({ gpa: v })} /></Field>
            </Grid>
            <Field label="Deskripsi"><Area value={e.description} onChange={(v) => set({ description: v })} /></Field>
          </>
        )}
      />

      <ListEditor
        title="Pengalaman kerja"
        items={doc.experience}
        onChange={(v) => update((d) => { d.experience = v; })}
        createItem={() => ({ company: "", period: "", role: "", location: "", description: [""], tags: [] })}
        addLabel="Tambah pengalaman"
        itemTitle={(e) => e.role ? `${e.role} @ ${e.company}` : "(baru)"}
        renderItem={(e, set) => (
          <>
            <Grid>
              <Field label="Perusahaan"><Text value={e.company} onChange={(v) => set({ company: v })} /></Field>
              <Field label="Periode"><Text value={e.period} onChange={(v) => set({ period: v })} /></Field>
              <Field label="Posisi"><Text value={e.role} onChange={(v) => set({ role: v })} /></Field>
              <Field label="Lokasi"><Text value={e.location} onChange={(v) => set({ location: v })} /></Field>
            </Grid>
            <StrList label="Poin deskripsi" items={e.description} onChange={(v) => set({ description: v })} multiline placeholder="Satu pencapaian / tanggung jawab…" />
            <StrList label="Tag keahlian" items={e.tags} onChange={(v) => set({ tags: v })} placeholder="cth. Video Editing" />
          </>
        )}
      />

      <ListEditor
        title="Organisasi"
        desc="Tampil di section Leadership & Activities."
        items={doc.organizations}
        onChange={(v) => update((d) => { d.organizations = v; })}
        createItem={() => ({ name: "", period: "", role: "", location: "", description: "" })}
        addLabel="Tambah organisasi"
        itemTitle={(o) => o.name || "(baru)"}
        renderItem={(o, set) => (
          <>
            <Grid>
              <Field label="Nama organisasi"><Text value={o.name} onChange={(v) => set({ name: v })} /></Field>
              <Field label="Periode"><Text value={o.period} onChange={(v) => set({ period: v })} /></Field>
              <Field label="Jabatan / peran"><Text value={o.role} onChange={(v) => set({ role: v })} /></Field>
              <Field label="Lokasi"><Text value={o.location} onChange={(v) => set({ location: v })} /></Field>
            </Grid>
            <Field label="Deskripsi"><Area value={o.description} onChange={(v) => set({ description: v })} /></Field>
          </>
        )}
      />
    </>
  );
}

/* ═══════════ Tab: Skill ═══════════ */
function TabSkill({
  doc,
  update,
}: {
  doc: CmsContent;
  update: (fn: (d: CmsContent) => void) => void;
}) {
  return (
    <>
      <ListEditor
        title="Skill bar kreatif"
        desc="Skill dengan persentase di kolom kiri section Skills."
        items={doc.creativeSkills}
        onChange={(v) => update((d) => { d.creativeSkills = v; })}
        createItem={() => ({ name: "", percent: 80 })}
        addLabel="Tambah skill"
        itemTitle={(s) => (s.name ? `${s.name} — ${s.percent}%` : "(baru)")}
        renderItem={(s, set) => (
          <Grid>
            <Field label="Nama skill"><Text value={s.name} onChange={(v) => set({ name: v })} /></Field>
            <Field label="Persen (0–100)"><Num value={s.percent} min={0} max={100} onChange={(v) => set({ percent: v })} /></Field>
          </Grid>
        )}
      />

      <ListEditor
        title="Programming"
        items={doc.programmingSkills}
        onChange={(v) => update((d) => { d.programmingSkills = v; })}
        createItem={() => ({ name: "", level: "Intermediate" })}
        addLabel="Tambah bahasa"
        itemTitle={(s) => (s.name ? `${s.name} (${s.level})` : "(baru)")}
        renderItem={(s, set) => (
          <Grid>
            <Field label="Nama"><Text value={s.name} onChange={(v) => set({ name: v })} placeholder="cth. JavaScript" /></Field>
            <Field label="Level"><Text value={s.level} onChange={(v) => set({ level: v })} placeholder="cth. Intermediate" /></Field>
          </Grid>
        )}
      />

      <ListEditor
        title="Bahasa"
        items={doc.languages}
        onChange={(v) => update((d) => { d.languages = v; })}
        createItem={() => ({ name: "", level: "" })}
        addLabel="Tambah bahasa"
        itemTitle={(s) => (s.name ? `${s.name} (${s.level})` : "(baru)")}
        renderItem={(s, set) => (
          <Grid>
            <Field label="Bahasa"><Text value={s.name} onChange={(v) => set({ name: v })} /></Field>
            <Field label="Level"><Text value={s.level} onChange={(v) => set({ level: v })} placeholder="cth. Native" /></Field>
          </Grid>
        )}
      />

      <Card title="Minat & Kompetensi">
        <StrList label="Minat (interests)" items={doc.interests} onChange={(v) => update((d) => { d.interests = v; })} />
        <StrList label="Semua kompetensi (disciplines)" items={doc.disciplines} onChange={(v) => update((d) => { d.disciplines = v; })} />
      </Card>

      <ListEditor
        title="Tools & Software"
        desc="Kartu tools di section Tech Stack."
        items={doc.tools}
        onChange={(v) => update((d) => { d.tools = v; })}
        createItem={() => ({ name: "", description: "", icon: "shapes", tags: [] })}
        addLabel="Tambah tool"
        itemTitle={(t) => t.name || "(baru)"}
        renderItem={(t, set) => (
          <>
            <Grid>
              <Field label="Nama tool"><Text value={t.name} onChange={(v) => set({ name: v })} /></Field>
              <Field label="Ikon / warna"><Sel value={t.icon} onChange={(v) => set({ icon: v })} options={toolIconOpts} /></Field>
            </Grid>
            <Field label="Deskripsi"><Area value={t.description} onChange={(v) => set({ description: v })} rows={2} /></Field>
            <StrList label="Tag" items={t.tags} onChange={(v) => set({ tags: v })} />
          </>
        )}
      />
    </>
  );
}

/* ═══════════ Tab: Karya & Media ═══════════ */
/* ═══════════ Tab: Karya & Media ═══════════ */
function TabKarya({
  doc,
  update,
}: {
  doc: CmsContent;
  update: (fn: (d: CmsContent) => void) => void;
}) {
  return (
    <>
      <ListEditor
        title="Karya (Case Studies / Portofolio)"
        desc="Kelola kartu karya di section Featured Case Studies. Anda bisa langsung memasukkan foto atau video dari sosial media seperti TikTok (tt), YouTube (yt), Instagram (ig), file video (.mp4), atau foto gambar."
        items={doc.works}
        onChange={(v) => update((d) => { d.works = v; })}
        createItem={() => ({
          title: "",
          client: "",
          category: "Video Editing",
          image: "",
          type: "video" as const,
          link: "",
        })}
        addLabel="Tambah karya baru"
        itemTitle={(w) => w.title || "(karya baru)"}
        renderItem={(w, set) => {
          const media = resolveWorkMedia(w);
          const ytLink = parseYouTube(w.link);

          return (
            <>
              <Grid>
                <Field label="Judul karya">
                  <Text
                    value={w.title}
                    onChange={(v) => set({ title: v })}
                    placeholder="cth. Multimedia Content Production"
                  />
                </Field>
                <Field label="Klien / Brand">
                  <Text
                    value={w.client}
                    onChange={(v) => set({ client: v })}
                    placeholder="cth. JEV / Klien Pribadi"
                  />
                </Field>
                <Field label="Kategori">
                  <Text
                    value={w.category}
                    onChange={(v) => set({ category: v })}
                    placeholder="cth. Video Editing · Broadcast"
                  />
                </Field>
                <Field label="Tipe media">
                  <Sel
                    value={w.type}
                    onChange={(v) => set({ type: v as "image" | "video" })}
                    options={workTypeOpts}
                  />
                </Field>
              </Grid>

              {/* Input Link Karya dari Sosial Media */}
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 space-y-3">
                <Field
                  label="Link Karya / Sosial Media (TikTok, YouTube, Instagram, dll.)"
                  hint="Masukkan link video/postingan langsung dari TikTok (tt), YouTube (yt), Instagram (ig), atau URL karya lainnya."
                >
                  <Text
                    value={w.link ?? ""}
                    onChange={(v) => {
                      const trimmed = v.trim();
                      const yt = parseYouTube(trimmed);
                      const tt = parseTikTok(trimmed);
                      const ig = parseInstagram(trimmed);

                      const next: Partial<Work> = { link: v };

                      // Jika user paste YouTube dan gambar kosong, otomatis pasang thumbnail YouTube
                      if (yt && !w.image) {
                        next.image = yt.thumbnailUrl;
                        next.type = "video";
                      } else if (tt && w.type === "image") {
                        next.type = "video";
                      } else if (ig && ig.isReel && w.type === "image") {
                        next.type = "video";
                      }

                      set(next);
                    }}
                    placeholder="cth. https://www.tiktok.com/@user/video/... atau https://youtu.be/... atau https://instagram.com/reel/..."
                  />
                </Field>

                {/* Status deteksi platform otomatis */}
                {w.link && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Platform:</span>
                      <PlatformPill platform={media.platform} />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Tombol ambil thumbnail YouTube */}
                      {ytLink && w.image !== ytLink.thumbnailUrl && (
                        <button
                          type="button"
                          onClick={() => set({ image: ytLink.thumbnailUrl })}
                          className="rounded-lg bg-red-500/20 px-2.5 py-1 font-mono text-[11px] font-semibold text-red-300 hover:bg-red-500/30 transition-colors"
                        >
                          ⚡ Gunakan thumbnail YouTube
                        </button>
                      )}

                      {/* Tombol switch tipe ke Video jika terdeteksi video */}
                      {media.isVideo && w.type === "image" && (
                        <button
                          type="button"
                          onClick={() => set({ type: "video" })}
                          className="rounded-lg bg-indigo-500/20 px-2.5 py-1 font-mono text-[11px] font-semibold text-indigo-300 hover:bg-indigo-500/30 transition-colors"
                        >
                          ⚡ Ubah tipe ke Video
                        </button>
                      )}

                      {/* Tombol tes link */}
                      {media.directUrl && (
                        <a
                          href={media.directUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-300 hover:bg-white/10 transition-colors"
                        >
                          <ExternalLink size={11} /> Tes buka link ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* URL Gambar / Thumbnail */}
              <Field
                label="URL Gambar / Thumbnail Karya"
                hint="Bisa URL gambar dari Pexels/Unsplash atau file di repo (/foto.jpg). Jika link karya dari YouTube dan kolom ini kosong, thumbnail akan otomatis diambil dari YouTube."
              >
                <Text
                  value={w.image}
                  onChange={(v) => set({ image: v })}
                  placeholder="https://… (atau kosongkan untuk thumbnail YouTube otomatis)"
                />
              </Field>

              {/* Pratinjau Visual Kartu */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px]">Pratinjau Kartu di Website:</span>
                  <PlatformPill platform={media.platform} />
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-950 border border-white/10">
                    {media.thumbnailUrl ? (
                      <img
                        src={media.thumbnailUrl}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-500">
                        <PlatformMediaIcon platform={media.platform} size={22} />
                      </div>
                    )}
                    {media.isVideo && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-slate-950">
                          <Play size={10} fill="currentColor" />
                        </span>
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-display text-sm font-bold text-white">
                      {w.title || "(Belum ada judul)"}
                    </h4>
                    <p className="truncate text-xs text-slate-400">
                      {w.client || "-"} · {w.category || "-"}
                    </p>
                    <p className="mt-1 truncate font-mono text-[10px] text-indigo-300">
                      {w.link ? w.link : "(Link karya belum diisi)"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      />

      <Card title="Section media" desc="Judul dan tombol di section showcase video.">
        <Grid>
          <Field label="Judul 1"><Text value={doc.mediaSection.titleA} onChange={(v) => update((d) => { d.mediaSection.titleA = v; })} /></Field>
          <Field label="Judul 2 (gradient)"><Text value={doc.mediaSection.titleB} onChange={(v) => update((d) => { d.mediaSection.titleB = v; })} /></Field>
          <Field label="Judul 3"><Text value={doc.mediaSection.titleC} onChange={(v) => update((d) => { d.mediaSection.titleC = v; })} /></Field>
        </Grid>
        <Field label="Deskripsi"><Area value={doc.mediaSection.description} onChange={(v) => update((d) => { d.mediaSection.description = v; })} /></Field>
        <Grid>
          <Field label="URL YouTube"><Text value={doc.mediaSection.youtubeUrl} onChange={(v) => update((d) => { d.mediaSection.youtubeUrl = v; })} /></Field>
          <Field label="Label tombol YouTube"><Text value={doc.mediaSection.youtubeLabel} onChange={(v) => update((d) => { d.mediaSection.youtubeLabel = v; })} /></Field>
          <Field label="URL Twitch"><Text value={doc.mediaSection.twitchUrl} onChange={(v) => update((d) => { d.mediaSection.twitchUrl = v; })} /></Field>
          <Field label="Label tombol Twitch"><Text value={doc.mediaSection.twitchLabel} onChange={(v) => update((d) => { d.mediaSection.twitchLabel = v; })} /></Field>
        </Grid>
      </Card>

      <ListEditor
        title="Showcase Video & Media"
        desc="embedUrl mendukung link dari YouTube, TikTok, Instagram, Twitch, atau file video langsung. Link biasa otomatis dikonversi ke format embed."
        items={doc.mediaShowcase}
        onChange={(v) => update((d) => { d.mediaShowcase = v; })}
        createItem={() => ({
          title: "",
          description: "",
          type: "youtube" as const,
          embedUrl: "",
          thumbnail: "",
          duration: "",
          tags: [],
        })}
        addLabel="Tambah video showcase"
        itemTitle={(m) => m.title || "(video baru)"}
        renderItem={(m, set) => {
          const yt = parseYouTube(m.embedUrl);

          return (
            <>
              <Grid>
                <Field label="Judul"><Text value={m.title} onChange={(v) => set({ title: v })} /></Field>
                <Field label="Tipe platform"><Sel value={m.type} onChange={(v) => set({ type: v as any })} options={mediaTypeOpts} /></Field>
                <Field label="Durasi (opsional)"><Text value={m.duration ?? ""} onChange={(v) => set({ duration: v })} placeholder="cth. 03:22" /></Field>
              </Grid>

              <Field
                label="URL Video / Link Sosmed (YouTube, TikTok, Instagram)"
                hint="Bisa link langsung biasa (cth. https://youtu.be/..., https://tiktok.com/@.../video/..., https://instagram.com/reel/...) — otomatis diubah ke format embed!"
              >
                <Text
                  value={m.embedUrl}
                  onChange={(v) => {
                    const converted = convertToEmbedUrl(v);
                    if (converted) {
                      const updates: Partial<MediaItem> = {
                        embedUrl: converted.embedUrl,
                        type: converted.type,
                      };
                      if (converted.type === "youtube" && !m.thumbnail) {
                        const ytInfo = parseYouTube(v);
                        if (ytInfo) updates.thumbnail = ytInfo.thumbnailUrl;
                      }
                      set(updates);
                    } else {
                      set({ embedUrl: v });
                    }
                  }}
                  placeholder="https://www.youtube.com/watch?v=… atau https://tiktok.com/@… atau https://instagram.com/reel/…"
                />
              </Field>

              {/* Status & helper thumbnail YouTube */}
              {m.embedUrl && (
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Platform:</span>
                    <PlatformPill platform={m.type as any} />
                  </div>
                  {yt && !m.thumbnail && (
                    <button
                      type="button"
                      onClick={() => set({ thumbnail: yt.thumbnailUrl })}
                      className="rounded-lg bg-red-500/20 px-2.5 py-1 font-mono text-[11px] font-semibold text-red-300 hover:bg-red-500/30 transition-colors"
                    >
                      ⚡ Gunakan thumbnail YouTube
                    </button>
                  )}
                </div>
              )}

              <Field
                label="URL Thumbnail"
                hint="Bisa kosong jika video dari YouTube (thumbnail akan otomatis dimuat)."
              >
                <Text value={m.thumbnail} onChange={(v) => set({ thumbnail: v })} placeholder="https://…" />
              </Field>

              <Field label="Deskripsi"><Area value={m.description} onChange={(v) => set({ description: v })} rows={2} /></Field>
              <StrList label="Tag" items={m.tags} onChange={(v) => set({ tags: v })} />
            </>
          );
        }}
      />
    </>
  );
}

/* ═══════════ Tab: Layanan ═══════════ */
function TabLayanan({
  doc,
  update,
}: {
  doc: CmsContent;
  update: (fn: (d: CmsContent) => void) => void;
}) {
  return (
    <>
      <ListEditor
        title="Layanan & Harga"
        items={doc.services}
        onChange={(v) => update((d) => { d.services = v; })}
        createItem={() => ({ icon: "video", title: "", description: "", features: [], color: "from-accent-500 to-accent-600", price: "" })}
        addLabel="Tambah layanan"
        itemTitle={(s) => s.title || "(baru)"}
        renderItem={(s, set) => (
          <>
            <Grid>
              <Field label="Judul layanan"><Text value={s.title} onChange={(v) => set({ title: v })} /></Field>
              <Field label="Harga"><Text value={s.price} onChange={(v) => set({ price: v })} placeholder="cth. Mulai Rp 150.000" /></Field>
              <Field label="Ikon"><Sel value={s.icon} onChange={(v) => set({ icon: v })} options={serviceIconOpts} /></Field>
              <Field label="Warna"><Sel value={s.color} onChange={(v) => set({ color: v })} options={serviceColorOpts} /></Field>
            </Grid>
            <Field label="Deskripsi"><Area value={s.description} onChange={(v) => set({ description: v })} rows={2} /></Field>
            <StrList label="Fitur / tools" items={s.features} onChange={(v) => set({ features: v })} />
          </>
        )}
      />

      <ListEditor
        title="Alur kerja"
        items={doc.workflowSteps}
        onChange={(v) => update((d) => { d.workflowSteps = v; })}
        createItem={() => ({ icon: "message-square", step: "", title: "", description: "" })}
        addLabel="Tambah langkah"
        itemTitle={(s) => (s.step ? `${s.step} — ${s.title}` : s.title || "(baru)")}
        renderItem={(s, set) => (
          <>
            <Grid>
              <Field label="Nomor"><Text value={s.step} onChange={(v) => set({ step: v })} placeholder="cth. 01" /></Field>
              <Field label="Ikon"><Sel value={s.icon} onChange={(v) => set({ icon: v })} options={workflowIconOpts} /></Field>
              <Field label="Judul"><Text value={s.title} onChange={(v) => set({ title: v })} /></Field>
            </Grid>
            <Field label="Deskripsi"><Area value={s.description} onChange={(v) => set({ description: v })} rows={2} /></Field>
          </>
        )}
      />
    </>
  );
}

/* ═══════════ Tab: FAQ ═══════════ */
function TabFaq({
  doc,
  update,
}: {
  doc: CmsContent;
  update: (fn: (d: CmsContent) => void) => void;
}) {
  return (
    <ListEditor
      title="FAQ"
      desc="Pertanyaan & jawaban di section FAQ."
      items={doc.faqs}
      onChange={(v) => update((d) => { d.faqs = v; })}
      createItem={() => ({ question: "", answer: "" })}
      addLabel="Tambah FAQ"
      itemTitle={(f) => f.question || "(baru)"}
      renderItem={(f, set) => (
        <>
          <Field label="Pertanyaan"><Text value={f.question} onChange={(v) => set({ question: v })} /></Field>
          <Field label="Jawaban"><Area value={f.answer} onChange={(v) => set({ answer: v })} rows={3} /></Field>
        </>
      )}
    />
  );
}

/* ═══════════ Tab: Kontak & Footer ═══════════ */
function TabKontak({
  doc,
  update,
}: {
  doc: CmsContent;
  update: (fn: (d: CmsContent) => void) => void;
}) {
  return (
    <>
      <Card title="Section kontak" desc="Judul besar dan teks di section kontak.">
        <Grid>
          <Field label="Judul 1"><Text value={doc.contactSection.titleA} onChange={(v) => update((d) => { d.contactSection.titleA = v; })} /></Field>
          <Field label="Judul 2 (gradient)"><Text value={doc.contactSection.titleB} onChange={(v) => update((d) => { d.contactSection.titleB = v; })} /></Field>
        </Grid>
        <Field label="Deskripsi"><Area value={doc.contactSection.description} onChange={(v) => update((d) => { d.contactSection.description = v; })} rows={3} /></Field>
        <Field label="URL Google Maps (kartu lokasi)"><Text value={doc.contactSection.mapUrl} onChange={(v) => update((d) => { d.contactSection.mapUrl = v; })} /></Field>
      </Card>

      <ListEditor
        title="Tautan platform"
        desc="Tombol platform di atas formulir kontak."
        items={doc.platforms}
        onChange={(v) => update((d) => { d.platforms = v; })}
        createItem={() => ({ name: "", url: "", icon: "instagram", description: "" })}
        addLabel="Tambah platform"
        itemTitle={(p) => p.name || "(baru)"}
        renderItem={(p, set) => (
          <>
            <Grid>
              <Field label="Nama"><Text value={p.name} onChange={(v) => set({ name: v })} placeholder="cth. Instagram" /></Field>
              <Field label="Ikon"><Sel value={p.icon} onChange={(v) => set({ icon: v })} options={platformIconOpts} /></Field>
            </Grid>
            <Field label="URL"><Text value={p.url} onChange={(v) => set({ url: v })} placeholder="https://… atau mailto:…" /></Field>
            <Field label="Deskripsi singkat"><Text value={p.description} onChange={(v) => set({ description: v })} /></Field>
          </>
        )}
      />

      <ListEditor
        title="Pilihan keperluan"
        desc="Opsi dropdown 'Jenis Keperluan' di formulir kontak."
        items={doc.contactPurposes}
        onChange={(v) => update((d) => { d.contactPurposes = v; })}
        createItem={() => ({ value: "", label: "" })}
        addLabel="Tambah pilihan"
        itemTitle={(o) => o.label || "(baru)"}
        renderItem={(o, set) => (
          <Grid>
            <Field label="Label (tampil)"><Text value={o.label} onChange={(v) => set({ label: v })} placeholder="cth. Jasa Edit Video" /></Field>
            <Field label="Value (kode)"><Text value={o.value} onChange={(v) => set({ value: v })} placeholder="cth. commission" /></Field>
          </Grid>
        )}
      />

      <Card title="Footer">
        <Field label="Tagline footer"><Area value={doc.footer.tagline} onChange={(v) => update((d) => { d.footer.tagline = v; })} rows={2} /></Field>
      </Card>
    </>
  );
}

/* ═══════════ Tab: Pengaturan ═══════════ */
function TabPengaturan({
  onImport,
  onReset,
  onDownload,
  showToast,
}: {
  onImport: () => void;
  onReset: () => void;
  onDownload: () => void;
  showToast: (msg: string) => void;
}) {
  const cms = useCms();
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const changePassword = () => {
    if (pass1.length < 6) {
      showToast("Password minimal 6 karakter.");
      return;
    }
    if (pass1 !== pass2) {
      showToast("Konfirmasi password tidak sama.");
      return;
    }
    try {
      localStorage.setItem(PASS_KEY, pass1);
    } catch {
      /* abaikan */
    }
    setPass1("");
    setPass2("");
    showToast("Password berhasil diganti.");
  };

  return (
    <>
      <Card
        title="Cara menerbitkan ke publik"
        desc="Penting: tombol Simpan hanya menyimpan draft di browser ini. Agar pengunjung website melihat perubahan, ikuti langkah berikut."
      >
        <ol className="space-y-3 text-sm leading-relaxed text-slate-300">
          {[
            "Klik Simpan, lalu cek hasilnya lewat tombol Pratinjau.",
            "Klik Unduh JSON untuk mengunduh file cms-content.json.",
            "Buka repo GitHub → folder public/ → upload & replace file cms-content.json (atau via git: copy file ke public/ lalu commit + push).",
            "Tunggu Vercel selesai deploy (±1 menit). Selesai — pengunjung kini melihat konten baru.",
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 font-mono text-[11px] font-bold text-indigo-200">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-500/20 px-4 py-2.5 font-display text-xs font-semibold text-indigo-100 transition-colors hover:bg-indigo-500/30"
          >
            <Download size={14} /> Unduh cms-content.json
          </button>
          <button
            onClick={onImport}
            className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-display text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
          >
            <Upload size={14} /> Import dari file
          </button>
        </div>
      </Card>

      <Card title="Status konten">
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Draft browser</p>
            <p className="mt-1 font-display font-bold text-white">{cms.hasDraft ? "Aktif" : "Tidak ada"}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Published</p>
            <p className="mt-1 font-display font-bold text-white">{cms.hasPublished ? "Ada" : "Belum ada"}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Update terakhir</p>
            <p className="mt-1 font-display font-bold text-white">
              {cms.publishedAt ? new Date(cms.publishedAt).toLocaleString("id-ID") : "—"}
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 font-display text-xs font-semibold text-rose-200 transition-colors hover:bg-rose-500/20"
        >
          <RotateCcw size={14} /> Hapus draft (kembali ke versi tayang)
        </button>
      </Card>

      <Card title="Ganti password admin">
        <Grid>
          <Field label="Password baru (min. 6 karakter)">
            <input
              type="password"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-400/60"
              placeholder="••••••"
            />
          </Field>
          <Field label="Konfirmasi password baru">
            <input
              type="password"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-400/60"
              placeholder="••••••"
            />
          </Field>
        </Grid>
        <div>
          <button
            onClick={changePassword}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-500/20 px-4 py-2.5 font-display text-xs font-semibold text-indigo-100 transition-colors hover:bg-indigo-500/30"
          >
            <Lock size={14} /> Simpan password baru
          </button>
        </div>
        <p className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-500">
          <Info size={13} className="mt-0.5 shrink-0" />
          Password ini hanya pengaman dasar di browser (bukan keamanan server).
          Untuk keamanan serius, jangan simpan data sensitif di website dan gunakan
          password unik.
        </p>
      </Card>
    </>
  );
}

