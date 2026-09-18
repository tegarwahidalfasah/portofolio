#!/usr/bin/env node
/* Buat nilai ADMIN_PASSWORD_HASH untuk Vercel.
   Pakai:  npm run hash-pass
   Lalu salin keluarannya ke Vercel → Settings → Environment Variables. */
import { pbkdf2Sync, randomBytes } from "node:crypto";
import { createInterface } from "node:readline";

const ITERATIONS = 210_000;

function makeHash(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, Buffer.from(salt, "hex"), ITERATIONS, 32, "sha256").toString("hex");
  return `pbkdf2$${ITERATIONS}$${salt}$${hash}`;
}

function ask(question, { silent = false } = {}) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    if (silent) {
      const stdin = process.stdin;
      const onData = (ch) => {
        ch = ch.toString();
        if (ch === "\n" || ch === "\r" || ch === "\u0004") {
          stdin.removeListener("data", onData);
        } else {
          process.stdout.write("*");
        }
      };
      stdin.on("data", onData);
    }
    rl.question(question, (answer) => {
      if (silent) process.stdout.write("\n");
      rl.close();
      resolve(answer);
    });
  });
}

const fromArg = process.argv.slice(2).join(" ");
let password = fromArg;
if (!password) {
  password = await ask("Password admin baru: ", { silent: true });
  const again = await ask("Ulangi password    : ", { silent: true });
  if (password !== again) {
    console.error("\n✗ Password tidak sama. Tidak ada yang dibuat.");
    process.exit(1);
  }
}

if (password.length < 10) {
  console.error("\n✗ Password minimal 10 karakter. Ini satu-satunya pengaman halaman admin.");
  process.exit(1);
}

const out = makeHash(password);
console.log("\nSalin baris di bawah ini ke Vercel → Settings → Environment Variables");
console.log("Nama : ADMIN_PASSWORD_HASH");
console.log("Nilai:\n");
console.log(out);
console.log("\nSimpan juga (opsional, untuk membatalkan semua sesi sekaligus):");
console.log("Nama : ADMIN_SESSION_SECRET");
console.log(`Nilai: ${randomBytes(32).toString("base64url")}`);
console.log("\nSetelah disimpan, redeploy agar berlaku.");
