# CMS Admin — Panduan Penggunaan

Website ini punya halaman admin sederhana untuk mengubah seluruh isi
website **tanpa coding**.

## 1. Cara membuka CMS

Buka di browser:

```
https://portofolio-rosy-psi-76.vercel.app/admin
```

Atau klik link kecil **Admin** di bagian paling bawah website (footer).

- Password bawaan: `admin123`
- Setelah masuk, segera ganti password di tab **Pengaturan**.

> Catatan: password ini pengaman dasar di browser, bukan keamanan
> level server. Jangan simpan data sensitif di website.

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
- **Thumbnail YouTube otomatis**: Jika Anda mengisi link karya dari YouTube dan mengosongkan kolom *URL gambar*, sistem akan otomatis mengambil dan menampilkan thumbnail dari YouTube! Ada juga tombol cepat *⚡ Gunakan thumbnail YouTube* di CMS.
- **Gambar karya manual / file lokal**: isi dengan URL gambar (`https://…`), mis. dari Pexels/Unsplash, atau file di repo (mis. `/foto-saya.jpg` jika ditaruh di folder `public/`).
- **Showcase video**: kolom URL video mendukung format link biasa dari YouTube, TikTok, Instagram, atau Twitch — otomatis dikonversi ke format embed.
- **Foto profil**: kosongkan kolom *URL foto profil* untuk memakai foto bawaan (`src/assets/portrait.jpg`), atau isi URL gambar pengganti.
- **File CV**: upload PDF ke folder `public/` di repo, lalu isi kolom *URL file CV* dengan mis. `/CV_Tegar_Wahid_Alfasah.pdf`.

## 5. Reset / darurat

- **Hapus draft** (kembali ke versi tayang): tab Pengaturan →
  *Hapus draft*.
- **Import**: kalau punya file `cms-content.json` lama, bisa dimuat
  kembali lewat tombol *Import dari file*.
- **Lupa password**: buka DevTools browser → Application →
  Local Storage → hapus key `portfolio-cms-pass-v1`, lalu login lagi
  dengan `admin123`.

## 6. Cara kerja (untuk developer)

- `src/data.ts` = nilai default (bawaan kode).
- `public/cms-content.json` = konten published (di-commit ke repo).
- `localStorage[portfolio-cms-draft-v1]` = draft per-browser.
- `src/cms/store.tsx` menggabungkan ketiganya
  (default ← published ← draft) dan menyediakan hook `useCms()`.
- Seluruh komponen membaca dari `useCms().content`, bukan lagi
  import langsung dari `src/data.ts`.
- `vercel.json` me-rewrite `/admin` ke `index.html` agar routing
  sisi klien berfungsi di Vercel.

## 7. Bahasa, tema & font

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
