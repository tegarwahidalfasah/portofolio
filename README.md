# Portofolio — Tegar Wahid Alfasah

Website portofolio pribadi: **Video Editor & Creative Media Producer**.
Dibangun dengan React 19 + Vite 7 + Tailwind CSS 4, dua bahasa (ID/EN),
mode terang/gelap, dan CMS bawaan untuk mengubah seluruh isi situs tanpa
menyentuh kode.

- Situs publik: `https://portofolio-rosy-psi-76.vercel.app/`
- Admin (dijaga password, tidak diindeks mesin pencari): `/admin`

## Fitur

- **Satu halaman, banyak bagian** — Hero, Statistik, Tentang, Pendidikan,
  Pengalaman, Studi Kasus/Karya, Keahlian, Tech Stack, Layanan, Alur Kerja,
  Organisasi, Showcase Media (TikTok/YouTube/Instagram/Twitch), FAQ, Kontak.
- **Dua bahasa** — tombol ID/EN di navbar; isi konten dan teks antarmuka
  sama-sama diterjemahkan. Pilihan bahasa tersimpan di browser.
- **Mode gelap/terang** — mengikuti preferensi sistem pada kunjungan pertama.
- **CMS tanpa backend** — halaman `/admin` untuk mengedit semua teks,
  gambar, karya, dan tautan; hasil edit diunduh sebagai `cms-content.json`
  lalu di-commit ke repo (`public/`). Lihat [`CMS.md`](./CMS.md).
- **Admin di balik gerbang server** — password tidak pernah ada di kode
  (env var `ADMIN_PASSWORD_HASH`), sesi berupa cookie `HttpOnly` bertanda
  tangan HMAC.
- **Media sosial & embed otomatis** — link TikTok/YouTube/Instagram/Twitch
  dikenali dan diputar dalam lightbox; thumbnail YouTube diambil otomatis.

## Menjalankan di komputer

Butuh **Node.js 22+**.

```bash
npm ci          # pasang dependensi
npm run dev     # situs publik  → http://localhost:5173
```

Perintah lain:

| Perintah              | Kegunaan                                                        |
| --------------------- | --------------------------------------------------------------- |
| `npm run dev`         | Server pengembangan situs publik (port 5173)                     |
| `npm run cms`         | Server pengembangan halaman admin (port 5174, buka `/admin.html`)|
| `npm run build`       | Build produksi: `dist/` (situs) + `dist-admin/` (admin)          |
| `npm run build:site`  | Build situs publik saja                                          |
| `npm run build:admin` | Build halaman admin saja                                         |
| `npm run preview`     | Pratinjau hasil build situs                                      |
| `npm run hash-pass`   | Buat hash password admin (`pbkdf2$…`)                            |
| `npm run admin:check` | Jalankan gerbang `/admin` yang sama seperti di Vercel, lokal     |
| `npm run cv`          | Buat ulang berkas CV PDF (versi EN & ID) di `public/`            |
| `npm test`            | Build + seluruh suite tes (wajib lulus sebelum merge)            |
| `npm run test:only`   | Jalankan tes tanpa build ulang                                   |

## Struktur proyek

```
src/
  App.tsx            susunan seluruh bagian situs publik
  main.tsx           entry situs publik
  admin-main.tsx     entry halaman admin (build terpisah)
  data.ts            nilai default konten (dipakai CMS)
  index.css          tema, token warna, animasi, utilitas
  components/        satu berkas per bagian halaman
  cms/               store, i18n, defaults, sinkron ID↔EN, UI Admin
  utils/             helper (embed media, cn)
api/admin.ts         serverless function: gerbang login + kirim admin.html
public/              aset statis (favicon, og-image, cms-content.json, robots.txt, CV)
scripts/             hash-pass, serve-admin (gerbang lokal), cv.mjs + font CV
tests/               suite tes (dijalankan `npm test`)
src/assets/fonts/    Inter Variable (woff2) — di-host sendiri, bukan Google Fonts
```

## Alur konten

1. Semua komponen membaca `useCms().content`, **bukan** impor langsung
   `src/data.ts`.
2. Urutan sumber data: `default (data.ts)` ← `public/cms-content.json`
   (hasil terbit) ← draft `localStorage` (hanya di browser sendiri).
3. Untuk menerbitkan perubahan: admin → **Unduh JSON** → ganti
   `public/cms-content.json` di repo → commit & push → Vercel deploy ulang.
   Panduan lengkap: [`CMS.md`](./CMS.md).

## CV (PDF)

Dua berkas, keduanya ikut ter-deploy dari `public/`:

| Berkas                              | Bahasa     |
| ----------------------------------- | ---------- |
| `CV_Tegar_Wahid_Alfasah.pdf`        | Inggris    |
| `CV_Tegar_Wahid_Alfasah_ID.pdf`     | Indonesia  |

Tombol **CV / Download CV** memakai berkas yang ditunjuk `cvUrl`
(`src/cms/defaults.ts`, default versi Inggris). Ingin versi Indonesia?
Ganti `cvUrl` menjadi `/CV_Tegar_Wahid_Alfasah_ID.pdf` lewat CMS →
tab **Profil** → *URL file CV*.

Isi CV disalin dari `src/data.ts`; kalau data situs berubah, sesuaikan
objek `data` di `scripts/cv.mjs` lalu jalankan `npm run cv`.

## Variabel lingkungan (Vercel)

| Nama                   | Wajib | Keterangan                                              |
| ---------------------- | :---: | ------------------------------------------------------- |
| `ADMIN_PASSWORD_HASH`  |  ya   | Hash `pbkdf2$<iterasi>$<salt>$<hash>` dari `npm run hash-pass` |
| `ADMIN_SESSION_SECRET` | tidak | Kunci HMAC sesi; menggantinya membatalkan semua sesi     |

Tanpa `ADMIN_PASSWORD_HASH`, `/admin` menjawab **503** (fail-closed) —
bukan terbuka. Langkah setup: [`CMS.md` §7](./CMS.md).

## Deploy

Repo ini disiapkan untuk **Vercel**:

- Situs statis dari `dist/` (`npm run build`).
- `/admin` di-rewrite ke `api/admin.ts`; `dist-admin/admin.html` dibawa
  sebagai `includeFiles` sehingga tidak bisa diunduh langsung dari URL.
- Header keamanan (`nosniff`, `X-Frame-Options: DENY`, HSTS, dst.) diatur
  di `vercel.json`.

## Kontribusi & kualitas

- Build situs tidak lagi digabung jadi satu berkas: JS vendor (React,
  Framer Motion) dipisah ke chunk sendiri (`manualChunks`), jadi rilis
  berikutnya cukup mengunduh ulang chunk aplikasi ±28 KB (gzip) dan
  chunk vendor tetap dari cache. Halaman admin tetap single-file karena
  dikirim `api/admin.ts` sebagai satu respons.
- CI (`.github/workflows/ci.yml`) berjalan untuk push ke `main` dan
  `arena/**` serta semua pull request, dan menjalankan typecheck (`tsc --noEmit`),
  build, seluruh tes, plus dua pemeriksaan tambahan: bundle publik harus
  bebas kode CMS, dan `dist-admin/admin.html` wajib ber-`noindex`.
- Jalankan `npx tsc --noEmit && npm test` sebelum membuka pull request.

## Lisensi

Belum ada berkas lisensi. Semua hak cipta konten dan foto tetap milik
Tegar Wahid Alfasah.
