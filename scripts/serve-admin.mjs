#!/usr/bin/env node
/* Jalankan gerbang admin yang SAMA seperti di Vercel, tapi di laptop.
   Pakai:  npm run admin:check
   Berguna untuk memastikan password & cookie benar sebelum deploy. */
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "esbuild";

const PORT = Number(process.env.PORT || 5199);

if (!process.env.ADMIN_PASSWORD_HASH && !process.env.ADMIN_PASSWORD) {
  console.error(
    "Set dulu password-nya, contoh:\n" +
      '  ADMIN_PASSWORD="coba-dulu-123" npm run admin:check\n' +
      "atau pakai hasil `npm run hash-pass` ke ADMIN_PASSWORD_HASH."
  );
  process.exit(1);
}

const adminFile = join(process.cwd(), "dist-admin", "admin.html");
if (!existsSync(adminFile)) {
  console.log("dist-admin/admin.html belum ada — membangun admin dulu…");
  const { build: viteBuild } = await import("vite");
  await viteBuild({ configFile: "vite.config.admin.ts", logLevel: "warn" });
}
process.env.ADMIN_HTML = adminFile;

// Transpile api/admin.ts (kode yang sama persis dengan yang di-deploy Vercel).
const out = join(tmpdir(), `cms-admin-gate-${Date.now()}.mjs`);
await build({
  entryPoints: ["api/admin.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  packages: "external",
  outfile: out,
  logLevel: "error",
});
const { default: handler } = await import(out);

createServer((req, res) => {
  handler(req, res).catch((err) => {
    console.error(err);
    res.statusCode = 500;
    res.end("error");
  });
}).listen(PORT, "0.0.0.0", () => {
  console.log(`\nGerbang admin lokal: http://localhost:${PORT}/admin`);
  console.log("Ctrl+C untuk berhenti.\n");
});
