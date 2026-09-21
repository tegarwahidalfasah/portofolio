import { ok, section, result, reset } from "./assert.mjs";
import { makeDom } from "./dom.mjs";

/**
 * Merender Panel admin sungguhan, lalu menguji indikator ukuran draft
 * dan perilaku "Hapus draft".
 *
 * Tes ini ada karena indikator ukuran pernah tetap menampilkan angka
 * draft yang sudah dihapus (handleReset tidak mereset draftBytes).
 */
export async function run() {
  reset();
  section("Admin.tsx — indikator ukuran draft & hapus draft");

  const { w } = makeDom("http://localhost:5174/admin.html");

  // Tanam draft SEBELUM mount agar hasDraft=true saat halaman dibuka.
  const draft = {
    version: 2,
    updatedAt: new Date().toISOString(),
    content: {
      id: { profile: { name: "Nama Dari Draft", tagline: "T".repeat(2000) } },
      en: {},
    },
  };
  w.localStorage.setItem("portfolio-cms-draft-v1", JSON.stringify(draft));

  const { React, act, createRoot, CmsProvider, ThemeProvider, Admin } = await import(
    process.env.TEST_UI_BUNDLE
  );
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;

  const root = createRoot(w.document.getElementById("root"));
  act(() => {
    root.render(
      React.createElement(
        CmsProvider,
        null,
        React.createElement(ThemeProvider, null, React.createElement(Admin))
      )
    );
  });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 60));
  });

  const indicator = () =>
    w.document.querySelector('[title^="Ukuran draft yang tersimpan"]');
  const byText = (t) =>
    [...w.document.querySelectorAll("button")].find((b) => b.textContent.includes(t));

  ok("panel admin ter-render", w.document.body.textContent.includes("CMS Admin"));
  ok("tidak ada gerbang password di browser", !w.document.body.textContent.includes("Masukkan password"));
  ok("indikator ukuran draft MUNCUL saat ada draft", !!indicator());
  ok("indikator menampilkan ukuran", /\d+(\.\d+)?\s*(B|KB|MB)/.test(indicator()?.textContent ?? ""));

  // Tombol sinkron bahasa (bar atas) & kartu sinkron di Pengaturan.
  const syncBtn = byText("Sinkron");
  ok("tombol Sinkron ada di bar atas", !!syncBtn);
  ok("awal: sinkron AKTIF (default)", syncBtn?.textContent.includes("AKTIF") ?? false);

  const tabBtn = byText("Pengaturan");
  ok("tab Pengaturan ada", !!tabBtn);
  await act(async () => {
    tabBtn.click();
  });

  const copyAllBtn = byText("Salin semua ID");
  ok("tombol Salin semua ID → EN ada", !!copyAllBtn);
  await act(async () => {
    syncBtn?.click(); // matikan sinkron
  });
  ok("klik -> sinkron jadi NONAKTIF", syncBtn?.textContent.includes("NONAKTIF") ?? false);

  const resetBtn = byText("Hapus draft");
  ok("tombol Hapus draft ada", !!resetBtn);

  w.confirm = () => true; // setujui dialog konfirmasi
  await act(async () => {
    resetBtn.click();
  });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 30));
  });

  ok("draft terhapus dari localStorage", w.localStorage.getItem("portfolio-cms-draft-v1") === null);
  ok("indikator ukuran HILANG setelah draft dihapus", !indicator());
  ok("toast konfirmasi hapus muncul", w.document.body.textContent.includes("Draft dihapus"));

  act(() => root.unmount());
  return result();
}
