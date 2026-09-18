import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { ok, section, result, reset } from "./assert.mjs";

/**
 * public/hash-password.html adalah jalan bagi pemilik situs yang tidak punya
 * Node.js untuk membuat ADMIN_PASSWORD_HASH dari browser.
 *
 * Tes ini TIDAK menulis ulang logikanya. Ia membaca file HTML yang benar-benar
 * dikirim, mengekstrak blok di antara penanda LOGIKA-INTI, menjalankannya, lalu
 * memastikan hash hasilnya diterima api/admin.ts. Kalau formatnya melenceng
 * sedikit saja, gerbang menolak dan tes ini gagal.
 */

const PAGE = "public/hash-password.html";
const PASSWORD = "UjiCobaAdmin2026";
const SALT_HEX = "00112233445566778899aabbccddeeff";

function extractCore() {
  const html = readFileSync(PAGE, "utf8");
  const m = html.match(/\/\/ LOGIKA-INTI-MULAI([\s\S]*?)\/\/ LOGIKA-INTI-SELESAI/);
  return m ? m[1] : null;
}

export async function run() {
  reset();
  section("public/hash-password.html -> gerbang admin");

  const html = readFileSync(PAGE, "utf8");
  const core = extractCore();
  ok("blok LOGIKA-INTI ditemukan di HTML", !!core);
  if (!core) return result();

  // Jalankan blok itu apa adanya, dengan Web Crypto global Node (spesifikasi
  // yang sama dengan browser).
  const factory = new Function(
    `${core}; return { buatHash, keHex, keBase64url, ITERASI };`
  );
  const api = factory();
  ok("fungsi inti terevaluasi tanpa error", typeof api.buatHash === "function");
  ok("iterasi 210000 (sama dengan scripts/hash-password.mjs)", api.ITERASI === 210_000);

  // ── format keluaran ──
  const hash = await api.buatHash(PASSWORD, SALT_HEX);
  ok("menghasilkan string pbkdf2$…", /^pbkdf2\$210000\$[0-9a-f]{32}\$[0-9a-f]{64}$/.test(hash));
  ok("salt diteruskan apa adanya", hash.split("$")[2] === SALT_HEX);

  // ── identik dengan pbkdf2Sync milik Node ──
  const { pbkdf2Sync } = await import("node:crypto");
  const nodeHash =
    "pbkdf2$210000$" + SALT_HEX + "$" +
    pbkdf2Sync(PASSWORD, Buffer.from(SALT_HEX, "hex"), 210_000, 32, "sha256").toString("hex");
  ok("identik bit-per-bit dengan pbkdf2Sync Node", hash === nodeHash);

  // ── deterministik: password sama + salt sama = hash sama ──
  ok("deterministik", (await api.buatHash(PASSWORD, SALT_HEX)) === hash);
  ok("password beda -> hash beda", (await api.buatHash(PASSWORD + "x", SALT_HEX)) !== hash);

  // ── helper encoding ──
  ok("keHex benar", api.keHex(new Uint8Array([0, 15, 255])) === "000fff");
  const b64 = api.keBase64url(new Uint8Array([251, 255, 191]));
  ok("keBase64url tanpa +/= (aman untuk env var)", !/[+/=]/.test(b64) && b64.length > 0);

  // ── hash dari halaman ini DITERIMA gerbang ──
  process.env.ADMIN_PASSWORD_HASH = hash;
  process.env.ADMIN_SESSION_SECRET = "z".repeat(32);
  const { default: handler } = await import(process.env.TEST_GATE_BUNDLE);

  const server = createServer((req, res) =>
    handler(req, res).catch(() => { res.statusCode = 500; res.end("err"); })
  );
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  try {
    const post = (pw) =>
      fetch(`http://127.0.0.1:${port}/admin`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: `password=${encodeURIComponent(pw)}`,
        redirect: "manual",
      });
    const good = await post(PASSWORD);
    ok("hash dari browser DITERIMA gerbang (303)", good.status === 303);
    ok("dan memberi cookie sesi", /cms_admin=/.test(good.headers.get("set-cookie") || ""));
    ok("password salah tetap ditolak", (await post("salah")).status === 401);
  } finally {
    server.close();
  }

  // ── halaman tidak boleh memuat/memuat sumber eksternal ──
  ok("tidak memuat skrip dari situs lain", !/<script[^>]+src=["']https?:/i.test(html));
  ok("tidak memuat CSS dari situs lain", !/<link[^>]+href=["']https?:/i.test(html));
  ok("tidak ada fetch/XHR (password tak keluar perangkat)", !/\bfetch\(|XMLHttpRequest/.test(html));
  ok("ada noindex", /name="robots" content="noindex, nofollow"/.test(html));

  return result();
}
