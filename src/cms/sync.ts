/* ───────────────────────────────────────────────
   Sinkron antar bahasa untuk CMS.

   - applyToDocs(docs, lang, fn): jalankan mutasi `fn` pada dokumen bahasa
     `lang`, lalu "mainkan ulang" perubahan yang sama ke bahasa lainnya.
     Yang disinkron adalah PERUBAHAN, bukan nilai akhir — sehingga mengisi
     satu bahasa otomatis ikut mengubah bahasa lain di kolom yang sama,
     termasuk menambah / menghapus / mengurutkan item. Isi bahasa lain
     yang tidak kamu sentuh tetap dipertahankan.
   - copyDocs(docs, from, to): salin SELURUH isi satu bahasa ke bahasa
     lain (dipakai tombol "Salin semua" di tab Pengaturan).

   Keduanya murni (pure) — tidak mengubah objek `docs` asli.
   ─────────────────────────────────────────────── */
import type { CmsContent } from "./defaults";

export type Lang = "id" | "en";
export type Docs = Record<Lang, CmsContent>;

function clone<T>(v: T): T {
  // Konten CMS murni JSON — JSON.stringify juga menormalkan `undefined`.
  if (v === undefined) return undefined as T;
  return JSON.parse(JSON.stringify(v)) as T;
}

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (isObj(a) && isObj(b)) {
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) {
      if (!(k in b) || !deepEqual(a[k], b[k])) return false;
    }
    return true;
  }
  return false;
}

/** Salin seluruh dokumen dari `from` ke `to`. */
export function copyDocs(docs: Docs, from: Lang, to: Lang): Docs {
  const next = clone(docs);
  next[to] = clone(next[from]);
  return next;
}

/**
 * Inti sinkron: cari nilai baru untuk `target` berdasarkan perubahan
 * yang terjadi dari `before` → `after` di bahasa sumber.
 * - Tidak ada perubahan → kembalikan `target` apa adanya.
 * - Array       → susun ulang / sisipkan / hapus dengan melacak item.
 * - Object      → terapkan per-kunci (tambah / ubah / hapus kunci).
 * - Primitif    → ganti dengan nilai baru.
 */
function syncValues(target: unknown, before: unknown, after: unknown): unknown {
  if (deepEqual(before, after)) return target;

  if (Array.isArray(before) && Array.isArray(after)) {
    return reconstructArray(
      Array.isArray(target) ? target : [],
      before,
      after
    );
  }

  if (isObj(before) && isObj(after)) {
    const out: Record<string, unknown> = isObj(target) ? { ...target } : {};
    for (const k of Object.keys(before)) {
      if (!(k in after)) {
        delete out[k];
      } else {
        out[k] = syncValues(out[k], before[k], after[k]);
      }
    }
    for (const k of Object.keys(after)) {
      if (!(k in before)) {
        out[k] = clone(after[k] as unknown);
      }
    }
    return out;
  }

  return clone(after as unknown);
}

/**
 * Susun ulang array `target` mengikuti perubahan `before` → `after`.
 * Dua fase:
 *  1. cocokkan item yang sama persis (pindah / tetap / menetap).
 *  2. sisanya: diedit di tempat (posisi sama, sebelum belum terpakai)
 *     atau item baru (disalin dari bahasa sumber).
 */
function reconstructArray(
  target: unknown[],
  before: unknown[],
  after: unknown[]
): unknown[] {
  const used = new Array<boolean>(before.length).fill(false);
  // kind[j] = {i} item ke-i dari before yang dipakai untuk posisi j
  //           atau new (belum ada padanannya di before).
  const kinds: Array<{ i: number } | null> = new Array(after.length).fill(null);

  // Fase 1 — cocokkan item yang sama persis, dulu di posisi yang sama.
  for (let j = 0; j < after.length; j++) {
    if (j < before.length && !used[j] && deepEqual(before[j], after[j])) {
      used[j] = true;
      kinds[j] = { i: j };
      continue;
    }
    for (let i = 0; i < before.length; i++) {
      if (!used[i] && deepEqual(before[i], after[j])) {
        used[i] = true;
        kinds[j] = { i };
        break;
      }
    }
  }

  // Fase 2 — sisa posisi: perbaikan di tempat atau item baru.
  for (let j = 0; j < after.length; j++) {
    if (kinds[j]) continue;
    if (j < before.length && !used[j]) {
      used[j] = true;
      kinds[j] = { i: j };
    }
  }

  const result: unknown[] = new Array(after.length);
  for (let j = 0; j < after.length; j++) {
    const k = kinds[j];
    result[j] = k
      ? syncValues(target[k.i], before[k.i], after[j])
      : clone(after[j] as unknown);
  }
  return result;
}

/**
 * Terapkan mutasi `fn` pada dokumen bahasa `lang`, lalu cerminkan
 * perubahannya ke bahasa lainnya. Mengembalikan dokumen baru.
 */
export function applyToDocs(
  docs: Docs,
  lang: Lang,
  fn: (d: CmsContent) => void
): Docs {
  const next = clone(docs);
  const other: Lang = lang === "id" ? "en" : "id";
  const before = clone(next[lang]);
  fn(next[lang]);
  next[other] = syncValues(next[other], before, next[lang]) as CmsContent;
  return next;
}
