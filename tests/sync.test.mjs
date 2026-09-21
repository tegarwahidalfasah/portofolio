import { ok, section, result, reset } from "./assert.mjs";

/**
 * Menguji util sinkron bahasa (src/cms/sync.ts):
 * - applyToDocs: mutasi satu bahasa dicerminkan ke bahasa lain (edit bidang,
 *   ubah item array, tambah/hapus/urut item).
 * - copyDocs: menyalin seluruh dokumen, tanpa mengubah dokumen asli.
 */
export async function run() {
  reset();
  section("sync.ts — sinkron bahasa ID ↔ EN");

  const { applyToDocs, copyDocs } = await import(process.env.TEST_SYNC_BUNDLE);

  const makeDocs = () => ({
    id: {
      profile: { name: "Tegar", tagline: "ID tagline" },
      hero: { line1: "TEGAR", line2: "ALFASAH", role: "Role ID", intro: "Intro ID" },
      services: [{ icon: "video", title: "Judul ID", price: "Rp 100", features: ["a", "b"] }],
      works: [
        { title: "Karya A ID", client: "Klien A ID" },
        { title: "Karya B ID", client: "Klien B ID" },
        { title: "Karya C ID", client: "Klien C ID" },
      ],
      stats: [
        { value: "40+", label: "Proyek\nKreatif" },
        { value: "02", label: "Edu" },
      ],
      faqs: [{ question: "Q ID", answer: "A ID" }],
    },
    en: {
      profile: { name: "Tegar", tagline: "EN tagline" },
      hero: { line1: "TEGAR", line2: "ALFASAH", role: "Role EN", intro: "Intro EN" },
      services: [{ icon: "video", title: "Title EN", price: "Rp 100", features: ["a", "b"] }],
      works: [
        { title: "Work A EN", client: "Client A EN" },
        { title: "Work B EN", client: "Client B EN" },
        { title: "Work C EN", client: "Client C EN" },
      ],
      stats: [
        { value: "40+", label: "Creative\nProjects" },
        { value: "02", label: "Edu" },
      ],
      faqs: [{ question: "Q EN", answer: "A EN" }],
    },
  });

  // 1. Edit satu bidang — ikut tersalin, bidang lain di bahasa tujuan tetap.
  {
    const d = makeDocs();
    const out = applyToDocs(d, "id", (id) => { id.hero.role = "Role BARU"; });
    ok("edit field -> tersalin ke en", out.en.hero.role === "Role BARU");
    ok("edit field -> id berubah", out.id.hero.role === "Role BARU");
    ok("bidang lain en tidak berubah", out.en.hero.intro === "Intro EN");
  }

  // 2. Edit item di dalam array.
  {
    const d = makeDocs();
    const out = applyToDocs(d, "id", (id) => { id.works[0].title = "Karya BARU"; });
    ok("edit works[0].title -> tersalin", out.en.works[0].title === "Karya BARU");
    ok("kunci lain item en tidak ikut", out.en.works[0].client === "Client A EN");
  }

  // 3. Tambah item (push) — item baru disalin utuh.
  {
    const d = makeDocs();
    const out = applyToDocs(d, "id", (id) => {
      id.faqs.push({ question: "Q baru", answer: "A baru" });
    });
    ok("push -> jumlah item en bertambah", out.en.faqs.length === d.en.faqs.length + 1);
    ok("push -> isi item baru tersalin", out.en.faqs[out.en.faqs.length - 1].question === "Q baru");
    ok("item lama en tidak berubah", out.en.faqs[0].question === "Q EN");
  }

  // 4. Hapus item (splice) di tengah.
  {
    const d = makeDocs();
    const out = applyToDocs(d, "id", (id) => { id.works.splice(1, 1); });
    ok("splice tengah -> jumlah en berkurang", out.en.works.length === 2);
    ok(
      "splice tengah -> sisa benar",
      out.en.works[0].title === "Work A EN" && out.en.works[1].title === "Work C EN"
    );
  }

  // 5. Urutkan / balik array (isi bahasa lain ikut pindah, bukan tercampur).
  {
    const d = makeDocs();
    d.id.stats = [
      { value: "a", label: "A" },
      { value: "b", label: "B" },
      { value: "c", label: "C" },
    ];
    d.en.stats = [
      { value: "a", label: "A" },
      { value: "b", label: "B" },
      { value: "c", label: "C" },
    ];
    const out = applyToDocs(d, "id", (id) => { id.stats.reverse(); });
    ok(
      "reverse -> urutan en mengikuti",
      JSON.stringify(out.en.stats.map((s) => s.value)) === JSON.stringify(["c", "b", "a"])
    );
  }

  // 6. Sisip item baru di tengah — sekitar yang tidak diubah tetap bahasa EN.
  {
    const d = makeDocs();
    const out = applyToDocs(d, "id", (id) => {
      id.works.splice(1, 0, { title: "Karya Baru", client: "Klien Baru" });
    });
    ok("sisip tengah -> jumlah en bertambah", out.en.works.length === 4);
    ok("sisip tengah -> item baru ikut tersalin", out.en.works[1].title === "Karya Baru");
    ok(
      "sisip tengah -> item sekitar tetap bahasa EN",
      out.en.works[0].title === "Work A EN" &&
        out.en.works[2].title === "Work B EN" &&
        out.en.works[3].title === "Work C EN"
    );
  }

  // 7. Ganti seluruh array string (StrList / fitur layanan).
  {
    const d = makeDocs();
    const out = applyToDocs(d, "id", (id) => { id.services[0].features = ["x", "y", "z"]; });
    ok(
      "ganti array string -> en mengikuti",
      JSON.stringify(out.en.services[0].features) === JSON.stringify(["x", "y", "z"])
    );
  }

  // 8. copyDocs — salin seluruh dokumen, tanpa mengubah aslinya.
  {
    const d = makeDocs();
    const out = copyDocs(d, "id", "en");
    ok("copyDocs -> en tertimpa id", out.en.hero.role === "Role ID");
    ok("copyDocs -> id tetap", out.id.hero.role === "Role ID");
    ok("copyDocs -> salinan dalam (array)", out.en.works[0].title === "Karya A ID");
    ok("copyDocs -> dokumen asli tidak berubah", d.en.hero.role === "Role EN");
  }

  return result();
}
