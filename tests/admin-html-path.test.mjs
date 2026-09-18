import { execFile } from "node:child_process";
import { randomBytes, pbkdf2Sync } from "node:crypto";
import { ok, section, result, reset } from "./assert.mjs";

/**
 * adminHtml() menjajal beberapa lokasi karena letak cwd di runtime Vercel
 * tidak bisa diuji dari sini. Suite ini memeriksa rantai fallback itu
 * di proses terpisah (htmlCache tidak boleh ikut terbawa).
 */

const SCRIPT = `
import { createServer } from "node:http";
const { default: handler, __test } = await import(process.env.TEST_GATE_BUNDLE);
const server = createServer((req, res) =>
  handler(req, res).catch(() => { res.statusCode = 500; res.end("err"); })
);
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const cookie = __test.COOKIE_NAME + "=" + __test.makeToken();
const r = await fetch("http://127.0.0.1:" + port + "/admin", { headers: { cookie } });
const body = await r.text();
console.log(JSON.stringify({
  status: r.status,
  hasCms: body.includes("Unduh JSON"),
  hasTried: body.includes("Lokasi yang sudah dicoba"),
}));
server.close();
process.exit(0);
`;

function makeHash(pw) {
  const iterations = 210_000;
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(pw, Buffer.from(salt, "hex"), iterations, 32, "sha256").toString("hex");
  return `pbkdf2$${iterations}$${salt}$${hash}`;
}

function probe(cwd) {
  return new Promise((resolve, reject) => {
    execFile(
      process.execPath,
      ["--input-type=module", "-e", SCRIPT],
      {
        cwd,
        timeout: 120_000,
        maxBuffer: 10 * 1024 * 1024,
        env: {
          ...process.env,
          ADMIN_PASSWORD_HASH: makeHash("UjiCobaAdmin2026"),
          // Sengaja salah: memaksa fallback ke lokasi berikutnya.
          ADMIN_HTML: "/tidak/ada/dist-admin/admin.html",
        },
      },
      (err, stdout, stderr) => {
        if (err) return reject(new Error(`${err.message}\n${stderr}`));
        try {
          resolve(JSON.parse(stdout.trim().split("\n").pop()));
        } catch (e) {
          reject(new Error(`keluaran tak terurai: ${stdout}\n${stderr}`));
        }
      }
    );
  });
}

export async function run() {
  reset();
  section("api/admin.ts — fallback lokasi admin.html");

  const repoRoot = process.cwd();

  // 1) ADMIN_HTML salah, tapi cwd = akar repo -> fallback cwd menyelamatkan.
  const a = await probe(repoRoot);
  ok("ADMIN_HTML salah -> fallback cwd tetap menyajikan admin", a.status === 200 && a.hasCms);

  // 2) ADMIN_HTML salah DAN cwd tidak punya dist-admin -> 500 yang menjelaskan diri.
  const b = await probe("/tmp");
  ok("tidak ada admin.html di mana pun -> 500", b.status === 500);
  ok("500 -> kode CMS tidak terkirim", !b.hasCms);
  ok("500 -> mencantumkan lokasi yang dicoba", b.hasTried);

  return result();
}
