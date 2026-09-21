#!/usr/bin/env node
/* Menjalankan seluruh tes.  Dipakai CI:  npm test
   Membundel src/ dan api/ lebih dulu dengan esbuild, lalu menjalankan
   tiap suite terhadap bundle itu — jadi yang diuji kode yang benar-benar
   dikirim, bukan salinan logikanya. */
import { build } from "esbuild";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const outDir = mkdtempSync(join(tmpdir(), "cms-tests-"));

const defines = {
  "import.meta.env.BASE_URL": '"/"',
  "import.meta.env.DEV": "true",
  "import.meta.env.PROD": "false",
  "import.meta.env.SSR": "false",
};

let exitCode = 0;

try {
  await build({
    entryPoints: ["tests/entry-ui.tsx"],
    bundle: true,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    outfile: join(outDir, "ui.mjs"),
    logLevel: "error",
    define: defines,
  });
  await build({
    entryPoints: ["api/admin.ts"],
    bundle: true,
    format: "esm",
    platform: "node",
    packages: "external",
    outfile: join(outDir, "gate.mjs"),
    logLevel: "error",
  });
  await build({
    entryPoints: ["src/cms/sync.ts"],
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: join(outDir, "sync.mjs"),
    logLevel: "error",
  });

  process.env.TEST_UI_BUNDLE = join(outDir, "ui.mjs");
  process.env.TEST_GATE_BUNDLE = join(outDir, "gate.mjs");
  process.env.TEST_SYNC_BUNDLE = join(outDir, "sync.mjs");
  process.env.ADMIN_HTML = join(process.cwd(), "dist-admin", "admin.html");

  let failed = 0;
  const suites = [
    "./gate.test.mjs",
    "./admin-html-path.test.mjs",
    "./hash-script.test.mjs",
    "./hash-page.test.mjs",
    "./hash-page-dom.test.mjs",
    "./store.test.mjs",
    "./admin-ui.test.mjs",
    "./sync.test.mjs",
  ];
  for (const suite of suites) {
    const { run } = await import(suite);
    const r = await run();
    failed += r.fail;
    console.log(`   → ${r.pass} lulus, ${r.fail} gagal`);
  }

  console.log(failed === 0 ? "\nSEMUA TES LULUS" : `\n${failed} TES GAGAL`);
  exitCode = failed ? 1 : 0;
} catch (err) {
  console.error("\nRunner error:", err);
  exitCode = 1;
} finally {
  rmSync(outDir, { recursive: true, force: true });
}

/* jsdom + scheduler React meninggalkan timer/handle terbuka, jadi
   process.exitCode saja tidak menghentikan proses. Keluar eksplisit. */
process.exit(exitCode);
