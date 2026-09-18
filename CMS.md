# CMS Admin — Panduan Penggunaan

Website ini punya halaman admin sederhana untuk mengubah seluruh isi
website **tanpa coding**.

## 1. Cara membuka CMS

Buka di browser:

```
https://portofolio-rosy-psi-76.vercel.app/admin
```

Masukkan password admin kamu. Halaman ini **tertutup untuk orang lain**:
password diperiksa di **server** (`api/admin.ts`), bukan di browser, jadi
tidak bisa dilewati lewat DevTools.

- Bisa dibuka dari HP maupun laptop — tidak perlu install apa pun.
- Setelah masuk, sesi berlaku **12 jam** (cookie httpOnly bertanda tangan).
- Salah password **8x** dalam 15 menit → dikunci sementara.
- Link admin **sengaja tidak dipasang di footer**, jadi URL-nya tidak
  diiklankan ke pengunjung.
- Salah password? Halaman login yang muncul, bukan isi admin.

> **Wajib sekali di awal:** set environment variable `ADMIN_PASSWORD_HASH`
> di Vercel. Tanpa itu `/admin` menampilkan *"Admin belum dikonfigurasi"*
> (status 503) — memang sengaja tertutup, bukan terbuka.
> Lihat bagian **7. Setup keamanan di Vercel**.

### Alternatif: edit dari komputer (tanpa internet)

```bash
npm install     # cukup sekali di awal
npm run cms     # membuka http://localhost:5174/admin.html
```

Jalur lokal ini tidak pakai password (hanya bisa diakses dari komputer
itu sendiri), berguna kalau sedang offline.

## 2. Cara mengedit konten

1. Pilih **bahasa yang mau diedit** (tombol 🇮🇩 ID / 🇬🇧 EN di bar atas).
   Kedua bahasa disimpan terpisah — ubah di dua-duanya agar konsisten.
2. Pilih tab sesuai bagian yang mau diubah (Profil, Hero, Riwayat,
   Skill, Karya, Layanan, FAQ, Kontak).
2. Ubah teks / tambah / hapus / susun ulang item.
3. Klik **Simpan** (menyimpan draft di browser ini).
4. Klik **Pratinjau** untuk melihat hasilnya.

Selama ada draft, muncul badge kecil *"Pratinjau draft CMS"*
di kiri bawah website — badge itu **hanya terlihat di browser kamu**,
tidak terlihat oleh pengunjung lain.

## 3. Cara menerbitkan agar dilihat pengunjung

Tombol **Simpan hanya menyimpan di browser kamu**. Agar pengunjung
website melihat perubahan:

1. Di halaman admin, klik **Unduh JSON** → dapat file `cms-content.json`.
2. Buka repo GitHub → folder `public/` → upload & replace file
   `cms-content.json` tersebut.
   - Alternatif via git:
     ```
     cp ~/Downloads/cms-content.json public/cms-content.json
     git add public/cms-content.json
     git commit -m "Update konten via CMS"
     git push
     ```
3. Tunggu Vercel selesai deploy (±1 menit). Selesai!

## 4. Gambar, Video & Media Sosial (TikTok, YouTube, Instagram)

- **Link karya dari media sosial (menu Karya)**:
  Pada tab **Karya & Media**, setiap item karya memiliki kolom **Link Karya / Sosial Media**. Anda bisa langsung menempelkan (paste) link langsung:
  - **TikTok (tt)**: mis. `https://www.tiktok.com/@username/video/1234567890` atau link foto TikTok.
  - **YouTube (yt)**: mis. `https://youtu.be/VIDEO_ID`, `https://www.youtube.com/watch?v=VIDEO_ID`, atau YouTube Shorts `https://www.youtube.com/shorts/VIDEO_ID`.
  - **Instagram (ig)**: mis. `https://www.instagram.com/reel/CODE/` atau `https://www.instagram.com/p/CODE/`.
  - **Video file langsung**: file `.mp4` atau `.webm`.
  Sistem akan otomatis mendeteksi platform sosmed, menampilkan badge, dan ketika diklik di website akan membuka pemutar/lightbox interaktif beserta tombol langsung ke media sosial tersebut.
- **Deskripsi karya**: Anda bisa menuliskan deskripsi singkat mengenai peran, alat editing yang digunakan (CapCut, Premiere, FL Studio, dll.), dan hasil karya tersebut. Deskripsi ini akan tampil rapi di popup lightbox saat kartu diklik oleh calon klien.
- **Thumbnail YouTube otomatis**: Jika Anda mengisi link karya dari YouTube dan mengosongkan kolom *URL gambar*, sistem akan otomatis mengambil dan menampilkan thumbnail dari YouTube! Ada juga tombol cepat *⚡ Gunakan thumbnail YouTube* di CMS.
- **Unggah foto langsung dari perangkat (laptop/HP)**: Kolom gambar karya, thumbnail video, dan foto profil kini memiliki tombol **Pilih File** yang otomatis mengompresi dan memasukkan gambar tanpa perlu mengunggah ke hosting pihak ketiga.
- **Link Google Drive & Dropbox**: Jika Anda memasukkan link foto dari Google Drive (`drive.google.com/file/d/...`) atau Dropbox, sistem akan otomatis mengonversinya menjadi URL gambar langsung.
- **Showcase video**: kolom URL video mendukung format link biasa dari YouTube, TikTok, Instagram, atau Twitch — otomatis dikonversi ke format embed.
- **Foto profil**: kosongkan kolom *URL foto profil* untuk memakai foto bawaan (`src/assets/portrait.jpg`), isi URL gambar pengganti, atau gunakan tombol *Pilih File*.
- **File CV**: upload PDF ke folder `public/` di repo, lalu isi kolom *URL file CV* dengan mis. `/CV_Tegar_Wahid_Alfasah.pdf`.

## 5. Reset / darurat

- **Hapus draft** (kembali ke versi tayang): tab Pengaturan →
  *Hapus draft*.
- **Import**: kalau punya file `cms-content.json` lama, bisa dimuat
  kembali lewat tombol *Import dari file*.
- **Lupa password**: buat hash baru dengan `npm run hash-pass`, tempel
  ke `ADMIN_PASSWORD_HASH` di Vercel, lalu Redeploy. Draft tidak hilang
  karena tersimpan di key localStorage yang berbeda.
- **Ingin semua sesi langsung keluar**: ganti nilai
  `ADMIN_SESSION_SECRET` di Vercel → Redeploy. Cookie lama jadi tidak sah.

### Penyimpanan browser penuh

Draft disimpan di `localStorage` browser, yang kuotanya ±5 MB per
alamat web. Gambar yang diunggah lewat *Pilih File* disimpan sebagai
base64 di dalam draft, jadi banyak foto besar bisa memenuhi kuota.

- Di bar atas admin ada penanda **ukuran draft**. Abu-abu = aman,
  kuning = lewat 3,5 MB (batas aman), merah = lewat 4,8 MB.
- Kalau penyimpanan penuh, **Simpan gagal dan diberitahu** lewat pesan
  merah: *"GAGAL menyimpan: penyimpanan browser penuh…"*. Status tetap
  **● Belum disimpan** dan isianmu tidak dihapus — **jangan reload**.
  Segera klik **Unduh JSON** sebagai cadangan, lalu hapus beberapa
  gambar besar atau *Hapus draft* dan coba lagi.
- Cara paling hemat kuota: pakai **URL gambar** (Pexels/Unsplash/Drive)
  alih-alih mengunggah file, dan biarkan thumbnail YouTube kosong agar
  diambil otomatis.

## 6. Cara kerja (untuk developer)

- `src/data.ts` = nilai default (bawaan kode).
- `public/cms-content.json` = konten published (di-commit ke repo).
- `localStorage[portfolio-cms-draft-v1]` = draft per-browser.
- `src/cms/store.tsx` menggabungkan ketiganya
  (default ← published ← draft) dan menyediakan hook `useCms()`.
- Seluruh komponen membaca dari `useCms().content`, bukan lagi
  import langsung dari `src/data.ts`.

### Kenapa admin tidak bisa diakses publik

Dua lapis, dan keduanya di sisi server/build — bukan di browser:

1. **Admin dibuild terpisah.** `npm run build` menjalankan dua build:
   `vite.config.ts` → `dist/index.html` (situs publik) dan
   `vite.config.admin.ts` → `dist-admin/admin.html` (admin).
   Bundle publik **tidak memuat satu baris pun kode CMS**, jadi
   tidak ada yang bisa diintip dari View Source.
2. **`/admin` dijaga serverless function.** `vercel.json` me-rewrite
   `/admin` → `/api/admin`. `api/admin.ts` memeriksa cookie sesi;
   hanya kalau sah ia membaca `dist-admin/admin.html` (dibawa lewat
   `functions.includeFiles`) dan mengirimnya. Kalau tidak, yang
   dikirim cuma form login.

Detail pengaman di `api/admin.ts`:

- Password dibaca dari env var `ADMIN_PASSWORD_HASH`
  (format `pbkdf2$<iterasi>$<saltHex>$<hashHex>`, PBKDF2-SHA256
  210.000 iterasi) dengan pembanding waktu-konstan. **Hanya hash yang
  diterima** — env var `ADMIN_PASSWORD` (teks polos) sudah tidak
  didukung lagi, supaya password tidak pernah tersimpan polos.
- **Fail-closed**: kalau tidak ada env var password → 503, bukan terbuka.
- Sesi = cookie `cms_admin`, `HttpOnly; Secure; SameSite=Lax`, isinya
  `<exp>.<HMAC-SHA256>` dengan masa berlaku 12 jam. Tidak bisa
  dipalsukan maupun dinyalakan lewat DevTools.
- Respons admin ber-`Cache-Control: no-store, private` + `Vary: Cookie`
  supaya tidak disalin CDN lalu disajikan ke orang lain, dan
  `X-Robots-Tag: noindex`.
- Batas 8 percobaan / 15 menit per IP (disimpan di memori instance
  fungsi, jadi ikut ter-reset saat instance dingin — perlambatan,
  bukan jaminan; perlindungan utamanya password kuat + biaya PBKDF2).
- **Header keamanan** di setiap respons (`vercel.json`): `nosniff`,
  `Referrer-Policy`, `X-Frame-Options: DENY`, `frame-ancestors 'none'`,
  HSTS, `Permissions-Policy`. Artinya situs dan halaman login tidak bisa
  dibingkai di dalam situs orang lain (clickjacking).
- Halaman login & error memakai **CSP ketat** (`default-src 'none'`),
  karena halaman itu seluruhnya dibuat `api/admin.ts` tanpa script maupun
  gambar. Halaman admin sendiri memakai CSP longgar (bundle singlefile +
  gambar dari URL apa pun yang kamu tempel), tapi tetap `frame-ancestors
  'none'`.
- Link **Admin** di footer dihapus supaya URL-nya tidak diiklankan.

Uji lokal gerbang yang sama persis (`ADMIN_PASSWORD` di sini cuma
kemudahan: script menurunkannya jadi hash dulu, jadi yang teruji tetap
jalur produksi):

```bash
ADMIN_PASSWORD="coba-dulu-123" npm run admin:check
# buka http://localhost:5199/admin
```

## 7. Setup keamanan di Vercel (wajib sekali)

1. Di komputer: `npm run hash-pass`, masukkan password baru
   (minimal 10 karakter). Salin baris `pbkdf2$…` yang dihasilkan.
2. Vercel → project → **Settings → Environment Variables** →
   **Add**:
   - Key `ADMIN_PASSWORD_HASH`, Value = baris `pbkdf2$…` tadi.
   - (Opsional) Key `ADMIN_SESSION_SECRET`, Value = nilai acak yang
     juga dicetak script. Menggantinya membatalkan semua sesi.
   - Environment: centang **Production** (dan Preview kalau mau).
3. **Deployments → titik tiga → Redeploy** agar env var terbaca.
4. Buka `/admin` — harus muncul form login. Setelah masuk, kamu langsung
   melihat CMS.

Kalau `/admin` menampilkan *"Admin belum dikonfigurasi"*, artinya langkah
1–3 belum selesai.

### Jangan pakai `admin123`

Versi lama CMS memakai password default `admin123`. Kode itu **sudah
dibuang** dan gerbang sekarang menolak `admin123` (ada tesnya di
`tests/gate.test.mjs`), tapi stringnya **masih terbaca di riwayat git**
repo ini — 11 commit pada `CMS.md` dan `src/cms/Admin.tsx` lama, dan
reponya publik.

Konsekuensinya:

- `admin123` **tidak lagi berfungsi** sebagai password. Tidak ada risiko
  orang masuk memakainya.
- Tapi jangan pernah memakai `admin123` sebagai password baru, dan jangan
  memakainya di akun lain. Anggap string itu sudah diketahui publik.
- Menghapusnya dari riwayat butuh penulisan ulang riwayat git
  (semua SHA berubah + force-push), dan itu pun tidak sepenuhnya bersih
  karena GitHub masih menyimpan commit lama serta fork orang lain.
  Selama password aslinya kuat, ini tidak memberi manfaat keamanan —
  hanya kerapian.

## 8. Bahasa, tema & font

- **Translate ID/EN**: pengunjung mengganti bahasa lewat tombol
  ID/EN di navbar (tersimpan otomatis di browser). Konten kedua
  bahasa diedit terpisah di CMS (tombol 🇮🇩/🇬🇧 di bar atas admin);
  teks UI (menu, tombol, judul section) dari kamus `src/cms/i18n.ts`.
- **Mode gelap/terang**: tombol matahari/bulan di navbar.
  Default mengikuti sistem HP/laptop pengunjung. Halaman `/admin`
  selalu gelap.
- **Font**: hanya 1 (Inter) di seluruh website — tanpa serif,
  tanpa miring (italic), tanpa monospace.
- **Favicon & gambar sosmed**: `public/favicon.svg` (logo TWA) dan
  `public/og-image.jpg` (foto untuk preview link WhatsApp/Google).
- **Statistik pengunjung**: otomatis via Vercel Analytics, lihat di
  dashboard Vercel → project → Analytics (aktif setelah deploy).
- **Kartu kontak Telepon/WA** membuka WhatsApp + pesan otomatis.
  Nomor & pesan bisa diganti di CMS → Profil → Link telepon.
- **Video showcase kosong** otomatis tampil "Segera Hadir" dan tidak
  bisa diklik sampai URL embed diisi di CMS.
