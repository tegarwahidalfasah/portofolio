import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { webcrypto } from "node:crypto";
import { TextEncoder, TextDecoder } from "node:util";
import { createServer } from "node:http";
import { ok, section, result, reset } from "./assert.mjs";

/**
 * tests/hash-page.test.mjs membuktikan KRIPTONYA benar. Suite ini membuktikan
 * HALAMANNYA bekerja: elemennya ada, tombolnya terpasang, klik menghasilkan
 * nilai di layar.
 *
 * Tanpa ini, salah satu id elemen atau satu addEventListener yang meleset akan
 * membuat halaman diam saja saat diklik — dan pemilik situs buntu lagi,
 * persis masalah yang halaman ini dibuat untuk menyelesaikannya.
 */

const PAGE = "public/hash-password.html";
const PASSWORD = "UjiCobaAdmin2026";
const tick = (ms = 40) => new Promise((r) => setTimeout(r, ms));

function loadPage() {
  return new JSDOM(readFileSync(PAGE, "utf8"), {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    url: "https://example.com/hash-password.html",
    beforeParse(window) {
      // jsdom tidak menyediakan Web Crypto. Pakai implementasi Node —
      // spesifikasi yang sama dengan browser.
      Object.defineProperty(window, "crypto", {
        value: webcrypto,
        configurable: true,
        writable: true,
      });
      // jsdom 25 juga tidak menyediakan TextEncoder/TextDecoder, padahal
      // keduanya API standar di semua browser. Tanpa ini halaman gagal
      // karena harness, bukan karena bug.
      window.TextEncoder = TextEncoder;
      window.TextDecoder = TextDecoder;
      try {
        Object.defineProperty(window.navigator, "clipboard", {
          value: { writeText: async () => {} },
          configurable: true,
        });
      } catch {
        /* tidak dipakai tes ini */
      }
    },
  });
}

export async function run() {
  reset();
  section("public/hash-password.html — DOM & tombol");

  const dom = loadPage();
  const w = dom.window;
  const d = w.document;
  await tick(60);
  const $ = (id) => d.getElementById(id);

  // ── elemen & kondisi awal ──
  ok("halaman ter-render (input + tombol ada)", !!$("pw") && !!$("pw2") && !!$("go"));
  ok("label tombol 'Buat hash'", $("go").textContent.trim() === "Buat hash");
  ok("tombol aktif (Web Crypto terbaca)", $("go").disabled === false);
  ok("peringatan Web Crypto tidak muncul", !$("noweb").classList.contains("show"));
  ok("panel hasil tersembunyi di awal", !$("out").classList.contains("show"));
  ok("nama key ADMIN_PASSWORD_HASH tercantum", $("k1").textContent === "ADMIN_PASSWORD_HASH");

  // ── validasi: terlalu pendek ──
  $("pw").value = "pendek";
  $("pw2").value = "pendek";
  $("go").click();
  await tick();
  ok("password < 10 karakter ditolak", $("err").textContent.includes("minimal 10 karakter"));
  ok("hasil TIDAK ditampilkan untuk password lemah", !$("out").classList.contains("show"));

  // ── validasi: tidak cocok ──
  $("pw").value = PASSWORD;
  $("pw2").value = PASSWORD + "x";
  $("go").click();
  await tick();
  ok("password tidak sama ditolak", $("err").textContent.includes("tidak sama"));
  ok("hasil TIDAK ditampilkan saat tidak cocok", !$("out").classList.contains("show"));

  // ── jalur sukses ──
  $("pw").value = PASSWORD;
  $("pw2").value = PASSWORD;
  $("go").click();
  await tick(1200); // PBKDF2 210.000 iterasi

  const v1 = $("v1").textContent;
  ok("panel hasil MUNCUL setelah klik", $("out").classList.contains("show"));
  ok("pesan error dikosongkan", $("err").textContent === "");
  ok("nilai hash terisi di layar", /^pbkdf2\$210000\$[0-9a-f]{32}\$[0-9a-f]{64}$/.test(v1));
  ok("tombol aktif kembali setelah selesai", $("go").disabled === false);
  ok("label tombol pulih", $("go").textContent.trim() === "Buat hash");

  const v2 = $("v2").textContent;
  ok("ADMIN_SESSION_SECRET terisi", v2.length >= 40);
  ok("session secret base64url (tanpa +/=)", !/[+/=]/.test(v2));

  // ── salt acak tiap klik ──
  $("go").click();
  await tick(1200);
  ok("klik kedua -> salt berbeda (bukan hash tetap)", $("v1").textContent !== v1);

  // ── tombol salin terpasang ──
  ok("tombol salin hash ada", !!$("c1") && $("c1").textContent.includes("Salin"));
  ok("tombol salin secret ada", !!$("c2"));
  $("c1").click();
  await tick(60);
  ok("klik salin tidak melempar error", true);

  // ── hash yang MUNCUL DI LAYAR diterima gerbang ──
  const shown = $("v1").textContent;
  const shownPw = $("pw").value;
  process.env.ADMIN_PASSWORD_HASH = shown;
  process.env.ADMIN_SESSION_SECRET = "w".repeat(32);
  const { default: handler } = await import(process.env.TEST_GATE_BUNDLE);
  const server = createServer((req, res) =>
    handler(req, res).catch(() => { res.statusCode = 500; res.end("err"); })
  );
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  try {
    const r = await fetch(`http://127.0.0.1:${server.address().port}/admin`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: `password=${encodeURIComponent(shownPw)}`,
      redirect: "manual",
    });
    ok("hash dari layar DITERIMA gerbang (303)", r.status === 303);
    ok("dan memberi cookie sesi", /cms_admin=/.test(r.headers.get("set-cookie") || ""));
  } finally {
    server.close();
  }

  dom.window.close();
  return result();
}
