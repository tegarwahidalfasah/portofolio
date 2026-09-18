/* ───────────────────────────────────────────────
   CMS — Komponen field form untuk halaman admin.
   ─────────────────────────────────────────────── */
import { useRef, useState, type ReactNode, type ChangeEvent } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, Upload, X } from "lucide-react";

export const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-400/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-indigo-500/20";

/** Kompresi gambar lokal (HTML5 Canvas) agar ukuran file ringan (< 150KB) sebelum disimpan */
export function compressImage(file: File, maxWidth = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Field input URL gambar + tombol upload dari perangkat lokal (laptop/HP) */
export function ImageInput({
  value,
  onChange,
  placeholder = "https://… atau pilih file gambar",
  hint,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const dataUrl = await compressImage(file);
      onChange(dataUrl);
    } catch {
      alert("Gagal memproses gambar.");
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          className={inputCls}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={loading}
          title="Pilih gambar dari perangkat lokal"
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
        >
          <Upload size={14} />
          <span className="hidden sm:inline">{loading ? "Memproses…" : "Pilih File"}</span>
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title="Hapus gambar"
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-rose-400/50 hover:text-rose-300"
          >
            <X size={15} />
          </button>
        )}
      </div>
      {hint && <span className="block text-[11px] leading-relaxed text-slate-500">{hint}</span>}
      {value && (
        <div className="relative mt-2 inline-block overflow-hidden rounded-xl border border-white/10 bg-slate-950">
          <img
            src={value}
            alt=""
            className="h-24 w-auto max-w-xs object-cover"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

export function Card({
  title,
  desc,
  children,
  action,
}: {
  title: string;
  desc?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-bold text-white">{title}</h3>
          {desc && <p className="mt-1 text-xs leading-relaxed text-slate-400">{desc}</p>}
        </div>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-widest text-slate-400">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[11px] leading-relaxed text-slate-500">{hint}</span>}
    </label>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

export function Text({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      className={inputCls}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Area({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      className={`${inputCls} resize-y leading-relaxed`}
      value={value ?? ""}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Num({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type="number"
      className={inputCls}
      value={Number.isFinite(value) ? value : 0}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
}

export function Sel({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      className={`${inputCls} cursor-pointer appearance-none [&>option]:bg-slate-900`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/* ── Editor daftar string (tag, fitur, dsb.) ── */
export function StrList({
  label,
  items,
  onChange,
  placeholder,
  multiline,
  addLabel = "Tambah",
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
  addLabel?: string;
}) {
  const safe = Array.isArray(items) ? items : [];
  return (
    <div>
      <span className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-widest text-slate-400">
        {label} ({safe.length})
      </span>
      <div className="space-y-2">
        {safe.map((s, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              {multiline ? (
                <Area
                  value={s}
                  rows={2}
                  placeholder={placeholder}
                  onChange={(v) => {
                    const next = [...safe];
                    next[i] = v;
                    onChange(next);
                  }}
                />
              ) : (
                <Text
                  value={s}
                  placeholder={placeholder}
                  onChange={(v) => {
                    const next = [...safe];
                    next[i] = v;
                    onChange(next);
                  }}
                />
              )}
            </div>
            <button
              type="button"
              title="Hapus"
              onClick={() => onChange(safe.filter((_, j) => j !== i))}
              className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-rose-400/50 hover:text-rose-300"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...safe, ""])}
          className="flex items-center gap-1.5 rounded-xl border border-dashed border-white/15 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-indigo-400/50 hover:text-white"
        >
          <Plus size={14} /> {addLabel}
        </button>
      </div>
    </div>
  );
}

/* ── Editor daftar object generik (tambah / hapus / urutkan) ── */
export function ListEditor<T>({
  title,
  desc,
  items,
  onChange,
  renderItem,
  createItem,
  addLabel = "Tambah item",
  itemTitle,
}: {
  title: string;
  desc?: string;
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  createItem: () => T;
  addLabel?: string;
  itemTitle?: (item: T, index: number) => string;
}) {
  const safe = Array.isArray(items) ? items : [];

  const move = (from: number, to: number) => {
    if (to < 0 || to >= safe.length) return;
    const next = [...safe];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <Card
      title={`${title} (${safe.length})`}
      desc={desc}
      action={
        <button
          type="button"
          onClick={() => onChange([...safe, createItem()])}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-500/20 px-3.5 py-2 text-xs font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/30 hover:text-white"
        >
          <Plus size={14} /> {addLabel}
        </button>
      }
    >
      {safe.length === 0 && (
        <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-slate-500">
          Belum ada item. Klik “{addLabel}” untuk menambah.
        </p>
      )}
      <div className="space-y-4">
        {safe.map((item, i) => {
          const update = (patch: Partial<T>) => {
            const next = [...safe];
            next[i] = { ...item, ...patch };
            onChange(next);
          };
          return (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-slate-950/60 p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                <span className="truncate font-display text-sm font-bold text-white">
                  <span className="mr-2 font-mono text-[11px] font-medium text-indigo-300">
                    #{String(i + 1).padStart(2, "0")}
                  </span>
                  {itemTitle ? itemTitle(item, i) : `Item ${i + 1}`}
                </span>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    title="Naik"
                    onClick={() => move(i, i - 1)}
                    disabled={i === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:text-white disabled:opacity-30"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    title="Turun"
                    onClick={() => move(i, i + 1)}
                    disabled={i === safe.length - 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:text-white disabled:opacity-30"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    type="button"
                    title="Hapus"
                    onClick={() => {
                      if (window.confirm("Hapus item ini?")) {
                        onChange(safe.filter((_, j) => j !== i));
                      }
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-rose-400/50 hover:text-rose-300"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-4">{renderItem(item, update, i)}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
