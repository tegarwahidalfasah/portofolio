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

1. Pilih tab sesuai bagian yang mau diubah (Profil, Hero, Riwayat,
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

## 4. Gambar & file

- **Gambar karya / thumbnail video**: isi dengan URL gambar
  (`https://…`), mis. dari Pexels/Unsplash, atau path file di repo
  (mis. `/foto-saya.jpg` jika file ditaruh di `public/`).
- **Foto profil**: kosongkan kolom *URL foto profil* untuk memakai foto
  bawaan (`src/assets/portrait.jpg`), atau isi URL gambar pengganti.
- **File CV**: upload PDF ke folder `public/` di repo, lalu isi kolom
  *URL file CV* dengan mis. `/CV_Tegar_Wahid_Alfasah.pdf`.
- **Video showcase**: pakai URL embed YouTube,
  mis. `https://www.youtube.com/embed/VIDEO_ID`.

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
