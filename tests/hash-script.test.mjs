import { execFile } from "node:child_process";
import { createServer } from "node:http";
import { ok, section, result, reset } from "./assert.mjs";

/**
 * scripts/hash-password.mjs adalah satu-satunya bagian alur yang dijalankan
 * sendiri oleh pemilik situs. Suite ini menutup lingkarannya: jalankan script
 * itu persis seperti pemakaiannya, ambil baris pbkdf2 yang dicetak, pasang
 * sebagai ADMIN_PASSWORD_HASH, lalu pastikan gerbang menerima passwordnya.
 *
 * Tanpa ini, hash yang ditempel ke Vercel bisa saja tidak dikenali dan
 * halaman admin macet di 503 tanpa penjelasan.
 */

const PASSWORD = "UjiCobaAdmin2026";

function runScript(args) {
  return new Promise((resolve) => {
    execFile(
      process.execPath,
      ["scripts/hash-password.mjs", ...args],
      { cwd: process.cwd(), timeout: 60_000 },
      (err, stdout, stderr) => resolve({ err, stdout, stderr, code: err?.code ?? 0 })
    );
  });
}

export async function run() {
  reset();
  section("scripts/hash-password.mjs -> gerbang admin");

  const out = await runScript([PASSWORD]);
  ok("script berjalan tanpa error", !out.err);

  const hashLine = (out.stdout.match(/^pbkdf2\$\d+\$[0-9a-f]+\$[0-9a-f]+$/m) || [])[0];
  ok("mencetak baris pbkdf2$… yang bisa disalin", !!hashLine);

  const parts = hashLine ? hashLine.split("$") : [];
  ok("format 4 bagian: pbkdf2$iterasi$salt$hash", parts.length === 4 && parts[0] === "pbkdf2");
  ok("iterasi 210000", parts[1] === "210000");
  ok("salt 32 hex (16 byte)", /^[0-9a-f]{32}$/.test(parts[2] ?? ""));
  ok("hash 64 hex (32 byte)", /^[0-9a-f]{64}$/.test(parts[3] ?? ""));
  ok("menyebut nama env var ADMIN_PASSWORD_HASH", out.stdout.includes("ADMIN_PASSWORD_HASH"));

  // ── hash itu benar-benar diterima gerbang ──
  process.env.ADMIN_PASSWORD_HASH = hashLine;
  process.env.ADMIN_SESSION_SECRET = "y".repeat(32);
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
    ok("password yang di-hash script DITERIMA gerbang", good.status === 303);
    ok("dan memberi cookie sesi", /cms_admin=/.test(good.headers.get("set-cookie") || ""));

    const bad = await post(PASSWORD + "x");
    ok("password mirip tapi salah -> 401", bad.status === 401);
  } finally {
    server.close();
  }

  // ── penolakan password lemah ──
  const weak = await runScript(["pendek"]);
  ok("password < 10 karakter ditolak", weak.code === 1 && /minimal 10 karakter/.test(weak.stderr));
  ok("tidak mencetak hash untuk password lemah", !/pbkdf2\$/.test(weak.stdout));

  return result();
}
