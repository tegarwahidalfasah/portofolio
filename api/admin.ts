/* ───────────────────────────────────────────────
   Gerbang server untuk halaman /admin.

   vercel.json me-rewrite `/admin` ke fungsi ini. Alurnya:
     GET  /admin          → cookie sesi sah? kirim admin.html : kirim form login
     POST /admin          → cocokkan password, pasang cookie httpOnly
     GET  /admin?keluar=1 → hapus cookie

   Keamanan:
   - Password TIDAK ada di kode. Dibaca dari environment variable
     Vercel: ADMIN_PASSWORD_HASH (disarankan) atau ADMIN_PASSWORD.
     Kalau keduanya kosong → 503 (fail-closed, bukan terbuka).
   - Verifikasi PBKDF2-SHA256 dengan pembanding waktu-konstan.
   - Sesi = cookie httpOnly + Secure + SameSite=Lax, ditandatangani
     HMAC-SHA256 dan punya masa berlaku. Tidak bisa dipalsukan atau
     dinyalakan lewat DevTools.
   - Admin HTML hanya dikirim setelah cookie sah, jadi kode CMS tidak
     pernah bisa diunduh orang lain.
   - Batas 8 percobaan / 15 menit per IP (lihat catatan RATE LIMIT).
   ─────────────────────────────────────────────── */
import {
  createHmac,
  pbkdf2Sync,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/* ── Tipe minimal req/res Vercel Node runtime ── */
type Req = {
  method?: string;
  url?: string;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
  body?: unknown;
};
type Res = {
  statusCode?: number;
  setHeader(name: string, value: string | string[]): void;
  end(body?: string): void;
};

const COOKIE_NAME = "cms_admin";
const SESSION_SECONDS = 12 * 60 * 60; // 12 jam
const ADMIN_PATH = "/admin";

/* ═══════════ Konfigurasi password ═══════════ */

type PassConfig = { kind: "pbkdf2"; iterations: number; salt: string; hash: string };

/**
 * ADMIN_PASSWORD_HASH berbentuk `pbkdf2$<iterasi>$<saltHex>$<hashHex>`.
 *
 * Hanya hash yang diterima. Fallback `ADMIN_PASSWORD` (teks polos) yang
 * dulu ada sudah dihapus: menyimpan password polos di env var berarti
 * sekali env itu bocor, passwordnya langsung terbaca.
 */
function passConfig(): PassConfig | null {
  const raw = process.env.ADMIN_PASSWORD_HASH;
  if (raw) {
    const p = raw.trim().split("$");
    if (p.length === 4 && p[0] === "pbkdf2" && /^[0-9a-f]+$/i.test(p[2])) {
      const iterations = Number(p[1]);
      if (Number.isFinite(iterations) && iterations > 0) {
        return { kind: "pbkdf2", iterations, salt: p[2], hash: p[3] };
      }
    }
    console.error("ADMIN_PASSWORD_HASH tidak valid — jalankan: npm run hash-pass");
    return null;
  }
  if (process.env.ADMIN_PASSWORD) {
    console.error(
      "ADMIN_PASSWORD (teks polos) sudah tidak didukung. Jalankan " +
        "`npm run hash-pass` lalu simpan hasilnya ke ADMIN_PASSWORD_HASH."
    );
  }
  return null;
}

function constantTimeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

function verifyPassword(input: string): boolean {
  const cfg = passConfig();
  if (!cfg) return false;
  const derived = pbkdf2Sync(
    input,
    Buffer.from(cfg.salt, "hex"),
    cfg.iterations,
    32,
    "sha256"
  );
  return constantTimeEqual(derived.toString("hex"), cfg.hash.toLowerCase());
}

/* ═══════════ Sesi (cookie bertanda tangan) ═══════════ */

let secretCache: Buffer | null = null;

function sessionSecret(): Buffer {
  if (secretCache) return secretCache;
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 16) {
    secretCache = Buffer.from(s);
    return secretCache;
  }
  // Turunan deterministik dari material password supaya tetap jalan
  // dengan satu env var. Ganti ADMIN_SESSION_SECRET bila ingin
  // membatalkan semua sesi sekaligus.
  const cfg = passConfig();
  const base = cfg ? cfg.hash : "unset";
  secretCache = createHmac("sha256", "cms-admin-session").update(base).digest();
  return secretCache;
}

function sign(exp: number): string {
  return createHmac("sha256", sessionSecret()).update(String(exp)).digest("base64url");
}

function makeToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  return `${exp}.${sign(exp)}`;
}

function tokenIsValid(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const exp = Number(token.slice(0, dot));
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  return constantTimeEqual(sign(exp), token.slice(dot + 1));
}

function readCookie(header: string | string[] | undefined, name: string): string | undefined {
  const raw = Array.isArray(header) ? header[0] : header;
  if (!raw) return undefined;
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    if (part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return undefined;
}

function cookieHeader(value: string, maxAge: number): string {
  return [
    `${COOKIE_NAME}=${value}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ].join("; ");
}

/* ═══════════ Pembatas laju ═══════════
   RATE LIMIT: disimpan di memori instance fungsi, jadi ikut ter-reset
   saat instance dingin/di-recycle. Ini perlambatan, bukan jaminan.
   Perlindungan utamanya adalah password yang kuat + biaya PBKDF2
   (~0,1–0,2 detik per tebakan). */
const hits = new Map<string, { n: number; reset: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

function clientIp(req: Req): string {
  const fwd = req.headers["x-forwarded-for"];
  const first = Array.isArray(fwd) ? fwd[0] : fwd;
  return (first?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown").slice(0, 64);
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || e.reset < now) return false;
  return e.n >= MAX_ATTEMPTS;
}

function recordFailure(ip: string): number {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || e.reset < now) {
    hits.set(ip, { n: 1, reset: now + WINDOW_MS });
    return MAX_ATTEMPTS - 1;
  }
  e.n += 1;
  return Math.max(0, MAX_ATTEMPTS - e.n);
}

function clearFailures(ip: string): void {
  hits.delete(ip);
}

/* ═══════════ HTML ═══════════ */

const PAGE_STYLE = `
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       padding:20px;background:#020617;color:#e2e8f0;
       font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
  .card{width:100%;max-width:380px;border:1px solid rgb(255 255 255 / .1);
        background:rgb(255 255 255 / .04);border-radius:16px;padding:32px}
  .lock{width:48px;height:48px;margin:0 auto;border-radius:16px;display:flex;
        align-items:center;justify-content:center;font-size:22px;color:#fff;
        background:linear-gradient(135deg,#6366f1,#38bdf8);
        box-shadow:0 10px 25px -5px rgb(99 102 241 / .4)}
  h1{margin:20px 0 4px;text-align:center;font-size:20px;font-weight:700;color:#fff}
  p{margin:0;text-align:center;font-size:14px;line-height:1.5;color:#94a3b8}
  input{width:100%;margin-top:24px;padding:12px 16px;font-size:14px;color:#f1f5f9;
        background:rgb(255 255 255 / .05);border:1px solid rgb(255 255 255 / .1);
        border-radius:12px;outline:none}
  input:focus{border-color:rgb(129 140 248 / .6);box-shadow:0 0 0 3px rgb(99 102 241 / .2)}
  button{width:100%;margin-top:16px;padding:12px 16px;font-size:14px;font-weight:600;
         color:#fff;background:linear-gradient(90deg,#6366f1,#4f46e5);border:0;
         border-radius:12px;cursor:pointer;box-shadow:0 10px 20px -8px rgb(99 102 241 / .5)}
  button:hover{filter:brightness(1.08)}
  .err{margin-top:12px;font-size:12px;color:#fda4af;text-align:center}
  .hint{margin-top:16px;font-size:11px;color:#64748b;text-align:center;line-height:1.6}
  a{color:#94a3b8;font-size:12px;display:block;margin-top:14px;text-align:center}
  a:hover{color:#fff}
  code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:#cbd5e1;
       background:rgb(255 255 255 / .08);padding:1px 5px;border-radius:4px}
`;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function loginPage(error: string): string {
  return `<!doctype html>
<html lang="id"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Masuk — CMS Admin</title>
<style>${PAGE_STYLE}</style>
</head><body>
<form class="card" method="POST" action="${ADMIN_PATH}" autocomplete="off">
  <div class="lock">&#128274;</div>
  <h1>CMS Admin</h1>
  <p>Halaman ini tertutup. Masukkan password untuk mengelola isi website.</p>
  <input type="password" name="password" placeholder="Password" autofocus required>
  ${error ? `<p class="err">${esc(error)}</p>` : ""}
  <button type="submit">Masuk</button>
  <p class="hint">Lupa password? Ganti nilai <code>ADMIN_PASSWORD_HASH</code><br>di dashboard Vercel, lalu deploy ulang.</p>
  <a href="/">&larr; Kembali ke website</a>
</form>
</body></html>`;
}

function errorPage(title: string, body: string): string {
  return `<!doctype html>
<html lang="id"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
<style>${PAGE_STYLE}</style>
</head><body>
<div class="card">
  <h1>${esc(title)}</h1>
  <p>${body}</p>
  <a href="/">&larr; Kembali ke website</a>
</div>
</body></html>`;
}

/* Halaman login & error dibuat seluruhnya oleh fungsi ini: tanpa script,
   tanpa gambar, hanya inline <style> dan satu form. Bisa dikunci rapat,
   sekaligus mencegah halaman login dibingkai (clickjacking). */
const CSP_GATE = [
  "default-src 'none'",
  "style-src 'unsafe-inline'",
  "form-action 'self'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
].join("; ");

/* HTML admin dihasilkan vite-plugin-singlefile (semua JS/CSS inline) dan bisa
   memuat gambar dari URL apa pun yang ditempel pengguna, jadi CSP-nya sengaja
   longgar. Halaman ini sudah berada di belakang password. */
const CSP_ADMIN = "base-uri 'self'; frame-ancestors 'none'";

function send(
  res: Res,
  status: number,
  html: string,
  csp: string = CSP_GATE
): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Wajib: HTML admin tidak boleh disalin CDN lalu disajikan ke orang lain.
  res.setHeader("Cache-Control", "no-store, private");
  res.setHeader("Vary", "Cookie");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Content-Security-Policy", csp);
  res.end(html);
}

function redirect(res: Res, to: string, setCookie?: string): void {
  res.statusCode = 303;
  res.setHeader("Cache-Control", "no-store, private");
  if (setCookie) res.setHeader("Set-Cookie", setCookie);
  res.setHeader("Location", to);
  res.end("");
}

/** Baca HTML admin hasil build. ADMIN_HTML override dipakai untuk tes lokal. */
let htmlCache: string | null = null;

function adminHtml(): string | null {
  // Dibaca sekali lalu disimpan: di Lambda filesystem tidak berubah,
  // jadi membaca ulang 380 KB tiap request hanya memperlambat.
  // Kegagalan TIDAK di-cache, supaya build yang menyusul tetap terbaca.
  if (htmlCache) return htmlCache;
  const file = process.env.ADMIN_HTML || join(process.cwd(), "dist-admin", "admin.html");
  try {
    htmlCache = readFileSync(file, "utf8");
    return htmlCache;
  } catch {
    return null;
  }
}

async function readForm(req: Req): Promise<string> {
  const body = req.body;
  if (body && typeof body === "object") {
    const v = (body as Record<string, unknown>).password;
    if (typeof v === "string") return v;
  }
  if (typeof body === "string") {
    try {
      return new URLSearchParams(body).get("password") ?? "";
    } catch {
      return "";
    }
  }
  // Fallback: baca stream sendiri (mis. saat dijalankan di luar Vercel).
  const chunks: Buffer[] = [];
  for await (const chunk of req as unknown as AsyncIterable<Buffer>) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    if (chunks.reduce((n, c) => n + c.length, 0) > 4096) break;
  }
  try {
    return new URLSearchParams(Buffer.concat(chunks).toString("utf8")).get("password") ?? "";
  } catch {
    return "";
  }
}

/* ═══════════ Handler ═══════════ */

export default async function handler(req: Req, res: Res): Promise<void> {
  const method = (req.method ?? "GET").toUpperCase();
  const url = new URL(req.url ?? ADMIN_PATH, "http://localhost");

  if (!passConfig()) {
    return send(
      res,
      503,
      errorPage(
        "Admin belum dikonfigurasi",
        "Password admin belum dipasang. Set environment variable " +
          "<code>ADMIN_PASSWORD_HASH</code> di dashboard Vercel " +
          "(Settings &rarr; Environment Variables), lalu deploy ulang."
      )
    );
  }

  // ── Keluar ──
  if (url.searchParams.has("keluar")) {
    return redirect(res, ADMIN_PATH, cookieHeader("", 0));
  }

  // ── Login ──
  if (method === "POST") {
    const ip = clientIp(req);
    if (rateLimited(ip)) {
      return send(
        res,
        429,
        loginPage("Terlalu banyak percobaan. Tunggu 15 menit lalu coba lagi.")
      );
    }
    const password = await readForm(req);
    if (password && verifyPassword(password)) {
      clearFailures(ip);
      return redirect(res, ADMIN_PATH, cookieHeader(makeToken(), SESSION_SECONDS));
    }
    const left = recordFailure(ip);
    return send(
      res,
      401,
      loginPage(
        left > 0
          ? `Password salah. Sisa ${left} percobaan sebelum dikunci 15 menit.`
          : "Terlalu banyak percobaan. Tunggu 15 menit lalu coba lagi."
      )
    );
  }

  if (method !== "GET" && method !== "HEAD") {
    return send(res, 405, errorPage("405", "Metode tidak diizinkan."));
  }

  // ── Halaman admin ──
  if (!tokenIsValid(readCookie(req.headers.cookie, COOKIE_NAME))) {
    return send(res, 200, loginPage(""));
  }
  const html = adminHtml();
  if (!html) {
    return send(
      res,
      500,
      errorPage(
        "File admin tidak ditemukan",
        "Build admin belum ada. Pastikan perintah build menjalankan " +
          "<code>npm run build</code> (situs + admin) dan " +
          "<code>dist-admin/admin.html</code> terdaftar di " +
          "<code>functions.includeFiles</code> pada vercel.json."
      )
    );
  }
  // Penanda bahwa HTML ini sudah melewati gerbang server.
  const nonce = randomBytes(8).toString("hex");
  const stamped = html.replace(
    "</head>",
    `<meta name="cms-auth" content="${nonce}"></head>`
  );
  return send(res, 200, stamped, CSP_ADMIN);
}

/* Diekspor untuk pengujian lokal (scripts/serve-admin.mjs). */
export const __test = {
  COOKIE_NAME,
  SESSION_SECONDS,
  makeToken,
  tokenIsValid,
  verifyPassword,
  passConfig,
  rateLimited,
  recordFailure,
  clearFailures,
  readCookie,
};
