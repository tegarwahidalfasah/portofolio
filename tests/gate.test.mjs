import { createServer } from "node:http";
import { pbkdf2Sync, randomBytes } from "node:crypto";
import { ok, section, result, reset } from "./assert.mjs";

const PASSWORD = "UjiCobaAdmin2026";
const PORT = 5399;

function makeHash(pw) {
  const iterations = 210_000;
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(pw, Buffer.from(salt, "hex"), iterations, 32, "sha256").toString("hex");
  return `pbkdf2$${iterations}$${salt}$${hash}`;
}

async function listen(handler) {
  const server = createServer((req, res) =>
    handler(req, res).catch(() => {
      res.statusCode = 500;
      res.end("err");
    })
  );
  await new Promise((r) => server.listen(PORT, "127.0.0.1", r));
  return server;
}

const get = (path, headers = {}) =>
  fetch(`http://127.0.0.1:${PORT}${path}`, { headers, redirect: "manual" });
const post = (body, headers = {}) =>
  fetch(`http://127.0.0.1:${PORT}/admin`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", ...headers },
    body,
    redirect: "manual",
  });

export async function run() {
  reset();
  section("api/admin.ts — gerbang server");

  const { default: handler } = await import(process.env.TEST_GATE_BUNDLE);

  process.env.ADMIN_PASSWORD_HASH = makeHash(PASSWORD);
  process.env.ADMIN_SESSION_SECRET = "x".repeat(32);

  const server = await listen(handler);
  try {
    // ── tanpa cookie ──
    let r = await get("/admin");
    let body = await r.text();
    ok("tanpa cookie -> 200 form login", r.status === 200 && body.includes('name="password"'));
    ok("tanpa cookie -> nol kode CMS", !body.includes("Unduh JSON"));
    ok("CSP gerbang ketat", (r.headers.get("content-security-policy") || "").includes("default-src 'none'"));
    ok("frame-ancestors 'none'", (r.headers.get("content-security-policy") || "").includes("frame-ancestors 'none'"));
    ok("no-store", (r.headers.get("cache-control") || "").includes("no-store"));

    // ── cookie palsu / kedaluwarsa ──
    r = await get("/admin", { cookie: "cms_admin=9999999999.palsu" });
    ok("cookie palsu ditolak", !(await r.text()).includes("Unduh JSON"));

    // ── password salah ──
    r = await post("password=salah-total");
    ok("password salah -> 401", r.status === 401);
    ok("password salah -> tanpa Set-Cookie", !r.headers.get("set-cookie"));

    // ── password benar ──
    r = await post(`password=${encodeURIComponent(PASSWORD)}`);
    const sc = r.headers.get("set-cookie") || "";
    ok("password benar -> 303", r.status === 303);
    ok("cookie HttpOnly+Secure+SameSite", /HttpOnly/.test(sc) && /Secure/.test(sc) && /SameSite=Lax/.test(sc));
    const cookie = sc.split(";")[0];

    // ── sesi sah ──
    r = await get("/admin", { cookie });
    body = await r.text();
    ok("sesi sah -> kode CMS terkirim", body.includes("Unduh JSON"));
    ok("penanda cms-auth disisipkan", /name="cms-auth" content="[a-f0-9]+"/.test(body));
    ok("CSP admin longgar tapi anti-framing", (r.headers.get("content-security-policy") || "").includes("frame-ancestors 'none'"));

    // ── logout ──
    r = await get("/admin?keluar=1", { cookie });
    const cleared = r.headers.get("set-cookie") || "";
    ok("logout -> Max-Age=0", /Max-Age=0/.test(cleared));
    r = await get("/admin");
    ok("setelah logout -> form login", !(await r.text()).includes("Unduh JSON"));

    // ── rate limit ──
    const ip = { "x-forwarded-for": "198.51.100.77" };
    let last = 0;
    for (let i = 0; i < 8; i++) last = (await post("password=x", ip)).status;
    ok("8x salah -> masih 401", last === 401);
    ok("percobaan ke-9 -> 429", (await post("password=x", ip)).status === 429);

    // ── fail-closed: hanya ADMIN_PASSWORD (teks polos) ──
    const savedHash = process.env.ADMIN_PASSWORD_HASH;
    delete process.env.ADMIN_PASSWORD_HASH;
    process.env.ADMIN_PASSWORD = PASSWORD;
    r = await get("/admin");
    ok("hanya ADMIN_PASSWORD -> 503 (fail-closed)", r.status === 503);
    ok("503 -> nol kode CMS", !(await r.text()).includes("Unduh JSON"));
    ok("POST pun ditolak saat belum dikonfigurasi", (await post(`password=${PASSWORD}`)).status === 503);
    process.env.ADMIN_PASSWORD_HASH = savedHash;
    delete process.env.ADMIN_PASSWORD;
  } finally {
    server.close();
  }

  return result();
}
