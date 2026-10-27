#!/usr/bin/env node
/* ───────────────────────────────────────────────
   Generator CV — satu halaman A4, dua bahasa.

   Jalankan:  npm run cv
   Hasil:     public/CV_Tegar_Wahid_Alfasah.pdf      (English)
              public/CV_Tegar_Wahid_Alfasah_ID.pdf   (Indonesia)

   Tombol "Download CV" di situs memakai berkas versi Inggris
   (lihat cvUrl di src/cms/defaults.ts — bisa diganti ke versi _ID).

   Isi CV ada di objek `data` di bawah, disalin dari src/data.ts.
   Kalau data di situs berubah, sesuaikan juga di sini lalu jalankan
   `npm run cv` lagi.

   Font: scripts/cv-fonts/Inter-*.ttf — subset Latin dari Inter Variable
   (SIL Open Font License 1.1, lihat LICENSE.txt di folder itu).
   ─────────────────────────────────────────────── */
import PDFDocument from "pdfkit";
import { createWriteStream, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const F = (n) => join(HERE, "cv-fonts", `Inter-${n}.ttf`);
const ACCENT = "#4f46e5";
const SKY = "#0ea5e9";
const INK = "#0f172a";
const BODY = "#334155";
const MUTED = "#64748b";
const RULE = "#e2e8f0";

const A4 = { w: 595.28, h: 841.89 };
const M = { top: 42, left: 44, right: 44, bottom: 38 };
const COL_GAP = 26;
const LEFT_W = 322;
const RIGHT_X = M.left + LEFT_W + COL_GAP;
const RIGHT_W = A4.w - M.right - RIGHT_X;

const data = {
  name: "Tegar Wahid Alfasah",
  title: {
    en: "Video Editor & Creative Media Producer",
    id: "Video Editor & Produser Media Kreatif",
  },
  roles: {
    en: "Video Editor · Content Creator · Graphic Designer · IT Support",
    id: "Video Editor · Content Creator · Desainer Grafis · IT Support",
  },
  contact: {
    phone: "+62 851-7435-3873",
    email: "tegarwahidalfasah@gmail.com",
    location: "Subang, West Java, Indonesia",
    instagram: "@tegarwahidalfasah",
    site: "portofolio-rosy-psi-76.vercel.app",
  },
  summary: {
    en: "Adaptable Computer & Network Engineering student with proven experience in creative media production and IT support. Proficient in video editing, broadcast management, and technical troubleshooting — combining a technical foundation with a creative eye in dynamic working environments.",
    id: "Mahasiswa Teknik Komputer dan Jaringan yang adaptif dengan pengalaman terbukti di produksi media kreatif dan IT support. Mahir dalam editing video, manajemen broadcast, dan troubleshooting teknis — memadukan dasar teknis dengan kepekaan kreatif di lingkungan kerja yang dinamis.",
  },
  experience: [
    {
      company: "JEV (Jasa Edit Video)",
      period: "2026",
      role: { en: "Video Editor", id: "Video Editor" },
      location: "West Java, Indonesia",
      bullets: {
        en: [
          "Edit multimedia content for clients using CapCut, Streamlabs, OBS, and FL Studio to keep production quality consistent.",
          "Manage technical broadcast configurations and audio separation techniques.",
        ],
        id: [
          "Mengedit konten multimedia untuk klien dengan CapCut, Streamlabs, OBS, dan FL Studio agar kualitas produksi tetap konsisten.",
          "Mengelola konfigurasi teknis broadcast dan teknik pemisahan audio.",
        ],
      },
    },
    {
      company: "Setda Subang (Regional Secretariat)",
      period: "2025",
      role: {
        en: "IT Support Intern (PKL) — Natural Resources Division",
        id: "IT Support Magang (PKL) — Bagian Sumber Daya Alam",
      },
      location: "West Java, Indonesia",
      bullets: {
        en: [
          "Delivered IT support and troubleshooting for staff across the division.",
          "Helped maintain technical infrastructure and keep operational systems running.",
        ],
        id: [
          "Memberikan dukungan IT dan troubleshooting untuk staf di lingkungan bagian.",
          "Membantu memelihara infrastruktur teknis dan menjaga sistem operasional tetap berjalan.",
        ],
      },
    },
    {
      company: "HG Adventure",
      period: "2022",
      role: { en: "Content Creator", id: "Content Creator" },
      location: "West Java, Indonesia",
      bullets: {
        en: [
          "Ran social media accounts and developed creative content strategies.",
          "Produced digital assets through photography, videography, and video editing.",
          "Executed graphic design work for marketing and digital presence.",
        ],
        id: [
          "Mengelola akun media sosial dan menyusun strategi konten kreatif.",
          "Memproduksi aset digital lewat fotografi, videografi, dan editing video.",
          "Mengerjakan desain grafis untuk pemasaran dan kehadiran digital.",
        ],
      },
    },
    {
      company: "The Lodge Maribaya",
      period: "2021",
      role: { en: "IT Department Intern", id: "Magang Departemen IT" },
      location: "Bandung, West Java",
      bullets: {
        en: [
          "Completed a 3-month field internship in operational IT support.",
          "Assisted with technical documentation and digital design initiatives.",
        ],
        id: [
          "Menjalani magang lapangan 3 bulan di dukungan IT operasional.",
          "Membantu dokumentasi teknis dan inisiatif desain digital.",
        ],
      },
    },
    {
      company: "SMK Bina Wisata Lembang",
      period: "2020 — 2022",
      role: { en: "Technical Support — IT Team", id: "Technical Support — Tim IT" },
      location: "West Java, Indonesia",
      bullets: {
        en: [
          "Provided troubleshooting and system support for school infrastructure.",
          "Maintained technical documentation and worked on multimedia design projects.",
        ],
        id: [
          "Memberikan troubleshooting dan dukungan sistem untuk infrastruktur sekolah.",
          "Merawat dokumentasi teknis dan mengerjakan proyek desain multimedia.",
        ],
      },
    },
  ],
  education: [
    {
      school: { en: "Mandiri University", id: "Universitas Mandiri" },
      period: "2022 — 2026",
      program: {
        en: "Bachelor of Engineering — Computer & Network Engineering",
        id: "Sarjana Teknik — Teknik Komputer dan Jaringan",
      },
      note: { en: "GPA 3.60", id: "IPK 3,60" },
    },
    {
      school: { en: "SMK Bina Wisata Lembang", id: "SMK Bina Wisata Lembang" },
      period: "2019 — 2022",
      program: {
        en: "Vocational Diploma — Software Engineering (RPL)",
        id: "Diploma SMK — Rekayasa Perangkat Lunak (RPL)",
      },
      note: null,
    },
  ],
  organizations: [
    {
      name: "BEM FT UM",
      role: { en: "Arts, Culture & Sports Dept.", id: "Dept. Seni, Budaya & Olahraga" },
      period: "2023 — 2025",
    },
    {
      name: "HIMA TKJ",
      role: { en: "President", id: "Ketua" },
      period: "2022 — 2023",
    },
    {
      name: "BW Jurnal",
      role: { en: "Vice Chairman & Secretary", id: "Wakil Ketua & Sekretaris" },
      period: "2019 — 2022",
    },
    {
      name: "OSIS SMK Bina Wisata",
      role: { en: "Technology Research Div.", id: "Div. Riset Teknologi" },
      period: "2020 — 2022",
    },
  ],
  skills: {
    en: "Video Editing · Videography · Photography · Graphic Design · Broadcast Management · Live Streaming · IT Support · Technical Troubleshooting · Social Media Management · Project Management",
    id: "Editing Video · Videografi · Fotografi · Desain Grafis · Manajemen Broadcast · Live Streaming · IT Support · Troubleshooting Teknis · Manajemen Media Sosial · Manajemen Proyek",
  },
  tools:
    "Premiere Pro · After Effects · Illustrator · Photoshop · Lightroom · CapCut · OBS Studio · Streamlabs · FL Studio · Canva · Microsoft Office",
  code: "HTML · CSS · JavaScript · TypeScript · React · Next.js · Node.js · C++",
  languages: {
    en: "Indonesian (native) · English (basic)",
    id: "Indonesia (native) · Inggris (dasar)",
  },
  interests: {
    en: "Programming · Live Streaming · Creative Media Production",
    id: "Pemrograman · Live Streaming · Produksi Media Kreatif",
  },
  label: {
    en: {
      profile: "Profile",
      experience: "Experience",
      education: "Education",
      skills: "Core Skills",
      tools: "Tools & Software",
      code: "Programming",
      org: "Leadership & Organizations",
      languages: "Languages",
      interests: "Interests",
    },
    id: {
      profile: "Profil",
      experience: "Pengalaman Kerja",
      education: "Pendidikan",
      skills: "Keahlian Utama",
      tools: "Perangkat & Software",
      code: "Pemrograman",
      org: "Organisasi & Kepemimpinan",
      languages: "Bahasa",
      interests: "Minat",
    },
  },
};

function build(lang, out) {
  const t = data.label[lang];
  const doc = new PDFDocument({ size: "A4", margins: { ...M, left: M.left, right: M.right } });
  doc.registerFont("r", F("Regular"));
  doc.registerFont("s", F("SemiBold"));
  doc.registerFont("b", F("Bold"));
  doc.pipe(createWriteStream(out));

  let y = M.top;

  /* ── Header ── */
  doc.save();
  const bandW = LEFT_W + COL_GAP + RIGHT_W;
  const grd = doc.linearGradient(M.left, 0, M.left + bandW, 0);
  grd.stop(0, "#6366f1").stop(1, "#38bdf8");
  doc.rect(M.left, y, 54, 5).fill(grd);
  doc.restore();

  y += 18;
  doc.font("b").fontSize(27).fillColor(INK).text(data.name.toUpperCase(), M.left, y, {
    characterSpacing: -0.4,
  });
  y = doc.y + 4;
  doc.font("s").fontSize(10.5).fillColor(ACCENT).text(data.title[lang].toUpperCase(), M.left, y, {
    characterSpacing: 0.9,
  });
  y = doc.y + 3;
  doc.font("r").fontSize(8.6).fillColor(MUTED).text(data.roles[lang], M.left, y);
  y = doc.y + 7;

  // Baris kontak — dibungkus otomatis agar tidak melewati margin kanan
  const contactRows = [
    [data.contact.phone, data.contact.email],
    [data.contact.location, data.contact.instagram, data.contact.site],
  ];
  const availW = A4.w - M.left - M.right;
  doc.font("r").fontSize(8.2);
  for (const row of contactRows) {
    let cx = M.left;
    row.forEach((c, i) => {
      const isEmail = c === data.contact.email;
      doc.fillColor(isEmail ? ACCENT : BODY).text(c, cx, y, { lineBreak: false });
      cx += doc.widthOfString(c) + 5;
      if (i < row.length - 1) {
        doc.fillColor("#cbd5e1").text("|", cx, y, { lineBreak: false });
        cx += doc.widthOfString("|") + 5;
      }
    });
    if (cx > M.left + availW) {
      throw new Error(`Baris kontak melebihi margin: ${Math.round(cx - M.left - availW)}pt`);
    }
    y += 12;
  }
  y += 3;
  doc.moveTo(M.left, y).lineTo(A4.w - M.right, y).lineWidth(1).strokeColor(RULE).stroke();
  y += 12;

  /* ── Helper ── */
  const heading = (label, x, width, yy) => {
    doc.font("b").fontSize(8).fillColor(ACCENT).text(label.toUpperCase(), x, yy, {
      characterSpacing: 1.1,
      width,
    });
    const ly = doc.y + 3;
    doc.moveTo(x, ly).lineTo(x + width, ly).lineWidth(1).strokeColor("#e0e7ff").stroke();
    return ly + 6;
  };

  const para = (text, x, width, yy, opts = {}) => {
    doc.font(opts.font ?? "r").fontSize(opts.size ?? 9).fillColor(opts.color ?? BODY);
    doc.text(text, x, yy, { width, lineGap: opts.lineGap ?? 1.6, align: "left" });
    return doc.y;
  };

  const bulletList = (items, x, width, yy) => {
    let ly = yy;
    for (const item of items) {
      doc.circle(x + 2.4, ly + 4.6, 1.3).fill(ACCENT);
      doc.font("r").fontSize(9).fillColor(BODY);
      doc.text(item, x + 9, ly, { width: width - 9, lineGap: 1.6 });
      ly = doc.y + 2.4;
    }
    return ly;
  };

  /* ── Kolom kiri ── */
  let ly = y;
  ly = heading(t.profile, M.left, LEFT_W, ly);
  ly = para(data.summary[lang], M.left, LEFT_W, ly) + 15;

  ly = heading(t.experience, M.left, LEFT_W, ly);
  for (const job of data.experience) {
    const top = ly;
    doc.font("s").fontSize(9.6).fillColor(INK).text(job.role[lang], M.left, top, { width: LEFT_W - 64 });
    const roleBottom = doc.y;
    doc.font("r").fontSize(8.2).fillColor(MUTED).text(job.period, M.left + LEFT_W - 64, top + 0.6, {
      width: 64,
      align: "right",
    });
    ly = Math.max(roleBottom, doc.y);
    doc.font("r").fontSize(8.8).fillColor(ACCENT).text(`${job.company} — ${job.location}`, M.left, ly, {
      width: LEFT_W,
    });
    ly = doc.y + 2.6;
    ly = bulletList(job.bullets[lang], M.left, LEFT_W, ly) + 11;
  }

  ly = heading(t.education, M.left, LEFT_W, ly + 1);
  for (const ed of data.education) {
    const top = ly;
    doc.font("s").fontSize(9.2).fillColor(INK).text(ed.school[lang], M.left, top, { width: LEFT_W - 60 });
    const schoolBottom = doc.y;
    doc.font("r").fontSize(7.8).fillColor(MUTED).text(ed.period, M.left + LEFT_W - 60, top + 0.5, {
      width: 60,
      align: "right",
    });
    ly = Math.max(schoolBottom, doc.y);
    doc.font("r").fontSize(8.8).fillColor(BODY).text(ed.program[lang], M.left, ly, { width: LEFT_W });
    ly = doc.y;
    if (ed.note) {
      doc.font("s").fontSize(8).fillColor(ACCENT).text(ed.note[lang], M.left, ly, { width: LEFT_W });
      ly = doc.y;
    }
    ly += 7;
  }

  /* ── Kolom kanan ── */
  let ry = y;
  ry = heading(t.skills, RIGHT_X, RIGHT_W, ry);
  ry = para(data.skills[lang], RIGHT_X, RIGHT_W, ry) + 13;

  ry = heading(t.tools, RIGHT_X, RIGHT_W, ry);
  ry = para(data.tools, RIGHT_X, RIGHT_W, ry) + 13;

  ry = heading(t.code, RIGHT_X, RIGHT_W, ry);
  ry = para(data.code, RIGHT_X, RIGHT_W, ry) + 13;

  ry = heading(t.org, RIGHT_X, RIGHT_W, ry);
  for (const org of data.organizations) {
    doc.font("s").fontSize(8.8).fillColor(INK).text(org.name, RIGHT_X, ry, { width: RIGHT_W, lineBreak: false });
    doc.font("r").fontSize(7.4).fillColor(MUTED).text(org.period, RIGHT_X, ry + 9, { width: RIGHT_W });
    ry = doc.y;
    doc.font("r").fontSize(8.4).fillColor(BODY).text(org.role[lang], RIGHT_X, ry, { width: RIGHT_W });
    ry = doc.y + 7;
  }

  ry = heading(t.languages, RIGHT_X, RIGHT_W, ry + 2);
  ry = para(data.languages[lang], RIGHT_X, RIGHT_W, ry) + 12;

  ry = heading(t.interests, RIGHT_X, RIGHT_W, ry);
  /* eslint-disable-next-line no-unused-vars */
  const _end = para(data.interests[lang], RIGHT_X, RIGHT_W, ry);

  /* ── Footer ── */
  const fy = A4.h - M.bottom;
  // Margin bawah dinolkan sementara: tanpa ini pdfkit mengira teks footer
  // melewati batas halaman lalu membuat halaman kedua yang hanya berisi footer.
  doc.page.margins.bottom = 0;
  doc.moveTo(M.left, fy - 8).lineTo(A4.w - M.right, fy - 8).lineWidth(0.8).strokeColor(RULE).stroke();
  doc.font("r").fontSize(7).fillColor("#94a3b8").text(
    `${data.name}  ·  ${data.contact.email}  ·  ${data.contact.site}`,
    M.left,
    fy - 3,
    { width: A4.w - M.left - M.right, align: "center" }
  );

  doc.end();
  return out;
}

const outs = [
  build("en", join(ROOT, "public", "CV_Tegar_Wahid_Alfasah.pdf")),
  build("id", join(ROOT, "public", "CV_Tegar_Wahid_Alfasah_ID.pdf")),
];
await new Promise((r) => setTimeout(r, 700));
for (const o of outs) {
  console.log(`${o} — ${(statSync(o).size / 1024).toFixed(0)} kB`);
}
