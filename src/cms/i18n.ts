/* ───────────────────────────────────────────────
   i18n — kamus teks UI (chrome) Indonesia & Inggris.
   Isi konten (profil, pengalaman, dsb.) bilingual lewat CMS
   (src/cms/defaults.ts → defaultContent & defaultContentEn).
   ─────────────────────────────────────────────── */

export type Lang = "id" | "en";

const en = {
  // Navbar & footer nav
  navAbout: "About",
  navEducation: "Education",
  navExperience: "Experience",
  navSkills: "Skills",
  navServices: "Services",
  navFaq: "FAQ",
  navContact: "Contact",
  hireMe: "Hire Me",
  downloadCv: "Download CV",
  downloadFullCv: "Download Full CV",
  toggleMenu: "Toggle menu",
  // Hero
  available: "Available for freelance & collaboration",
  viewWork: "View Work",
  gpa: "GPA",
  classOf: "Class of",
  chipAvailable: "Available",
  chipFreelance: "for freelance",
  // About
  aboutLabel: "About Me",
  cardProfile: "Profile",
  rowName: "Name",
  rowLocation: "Location",
  rowPhone: "Phone",
  // Education
  eduLabel: "Education",
  eduH1: "Academic",
  eduH2: "Background",
  gpaBadge: "GPA",
  // Experience
  expLabel: "Experience",
  expH1: "Professional",
  expH2: "Experience",
  // Case studies
  csLabel: "Featured Case Studies",
  catDesign: "Design",
  catPhoto: "Photo",
  catVideo: "Video",
  catSocial: "Social Media",
  // Skills
  skillLabel: "Skills & Expertise",
  skillH1: "Skills &",
  skillH2: "Expertise",
  skillCreative: "Creative & Technical Skills",
  skillProgramming: "Programming",
  skillLanguages: "Languages",
  skillInterests: "Interests",
  skillAll: "All Competencies",
  // Tech stack
  techLabel: "Tech Stack",
  techH1: "Tools &",
  techH2: "Software",
  techDesc:
    "Professional tools I use for creative media production, video editing, graphic design, and IT support.",
  // Services
  svcLabel: "Services",
  svcH1: "Services &",
  svcH2: "Pricing",
  svcDesc:
    "Professional services I offer. All services can be customized to your project needs.",
  // Workflow
  wfLabel: "How I Work",
  wfH1: "My",
  wfH2: "Workflow",
  wfDesc:
    "A structured, transparent work process to ensure satisfying results.",
  wfStep: "Step",
  // Leadership
  leadLabel: "Leadership & Activities",
  leadH1: "Leadership &",
  leadH2: "Activities",
  // Media
  mediaLabel: "Media & Highlights",
  play: "Play",
  close: "Close",
  // FAQ
  faqLabel: "FAQ",
  faqH1: "Frequently Asked",
  faqH2: "Questions",
  faqDesc: "Common questions from prospective clients.",
  // Contact
  ctLabel: "Contact",
  ctFormTitle: "Business Contact Form",
  ctFormDesc:
    "For video editing services, collaboration, sponsorship, or other inquiries.",
  ctName: "Full Name",
  ctNamePh: "Enter your name",
  ctPurpose: "Inquiry Type",
  ctPurposePh: "Select inquiry type...",
  ctMessage: "Message",
  ctMessagePh: "Tell me about your needs...",
  ctSend: "Send Message",
  ctOkTitle: "Message Ready to Send!",
  ctOkDesc: "Your email app will open to complete sending.",
  ctCardPhone: "Phone / WhatsApp",
  ctCardLocation: "Location",
  ctDefaultPurpose: "General Inquiry",
  // Footer & lain-lain
  ftRights: "All rights reserved.",
  ftBuilt: "Designed & built with creativity",
  ftTop: "Back to top",
  bannerPreview: "CMS draft preview — Open Admin →",
};

export type Strings = typeof en;

const id: Strings = {
  navAbout: "Tentang",
  navEducation: "Pendidikan",
  navExperience: "Pengalaman",
  navSkills: "Skill",
  navServices: "Layanan",
  navFaq: "FAQ",
  navContact: "Kontak",
  hireMe: "Hubungi Saya",
  downloadCv: "Unduh CV",
  downloadFullCv: "Unduh CV Lengkap",
  toggleMenu: "Buka/tutup menu",
  available: "Tersedia untuk freelance & kolaborasi",
  viewWork: "Lihat Karya",
  gpa: "IPK",
  classOf: "Angkatan",
  chipAvailable: "Tersedia",
  chipFreelance: "untuk freelance",
  aboutLabel: "Tentang Saya",
  cardProfile: "Profil",
  rowName: "Nama",
  rowLocation: "Lokasi",
  rowPhone: "Telepon",
  eduLabel: "Pendidikan",
  eduH1: "Latar",
  eduH2: "Pendidikan",
  gpaBadge: "IPK",
  expLabel: "Pengalaman",
  expH1: "Pengalaman",
  expH2: "Profesional",
  csLabel: "Studi Kasus Unggulan",
  catDesign: "Desain",
  catPhoto: "Foto",
  catVideo: "Video",
  catSocial: "Sosial Media",
  skillLabel: "Skill & Keahlian",
  skillH1: "Skill &",
  skillH2: "Keahlian",
  skillCreative: "Skill Kreatif & Teknis",
  skillProgramming: "Pemrograman",
  skillLanguages: "Bahasa",
  skillInterests: "Minat",
  skillAll: "Semua Kompetensi",
  techLabel: "Perangkat & Tools",
  techH1: "Alat &",
  techH2: "Perangkat Lunak",
  techDesc:
    "Peralatan profesional yang saya gunakan untuk produksi media kreatif, video editing, desain grafis, dan IT support.",
  svcLabel: "Layanan",
  svcH1: "Layanan &",
  svcH2: "Harga",
  svcDesc:
    "Jasa profesional yang saya tawarkan. Semua layanan bisa dikustomisasi sesuai kebutuhan proyek Anda.",
  wfLabel: "Cara Kerja",
  wfH1: "Alur",
  wfH2: "Kerja",
  wfDesc:
    "Proses kerja yang terstruktur dan transparan untuk memastikan hasil yang memuaskan.",
  wfStep: "Langkah",
  leadLabel: "Kepemimpinan & Kegiatan",
  leadH1: "Kepemimpinan &",
  leadH2: "Kegiatan",
  mediaLabel: "Media & Sorotan",
  play: "Putar",
  close: "Tutup",
  faqLabel: "FAQ",
  faqH1: "Pertanyaan yang Sering",
  faqH2: "Diajukan",
  faqDesc: "Pertanyaan umum yang sering ditanyakan oleh calon klien.",
  ctLabel: "Kontak",
  ctFormTitle: "Formulir Kontak Bisnis",
  ctFormDesc:
    "Untuk jasa edit video, kolaborasi, sponsorship, atau pertanyaan lainnya.",
  ctName: "Nama Lengkap",
  ctNamePh: "Masukkan nama Anda",
  ctPurpose: "Jenis Keperluan",
  ctPurposePh: "Pilih jenis keperluan...",
  ctMessage: "Pesan",
  ctMessagePh: "Ceritakan detail kebutuhan Anda...",
  ctSend: "Kirim Pesan",
  ctOkTitle: "Pesan Siap Dikirim!",
  ctOkDesc: "Aplikasi email akan terbuka untuk menyelesaikan pengiriman.",
  ctCardPhone: "Telepon / WhatsApp",
  ctCardLocation: "Lokasi",
  ctDefaultPurpose: "Pertanyaan",
  ftRights: "Seluruh hak cipta dilindungi.",
  ftBuilt: "Dirancang & dibangun dengan kreativitas",
  ftTop: "Kembali ke atas",
  bannerPreview: "Pratinjau draft CMS — Buka Admin →",
};

export const strings: Record<Lang, Strings> = { id, en };

export const siteTitle: Record<Lang, string> = {
  id: "Tegar Wahid Alfasah — Video Editor & Produser Media Kreatif",
  en: "Tegar Wahid Alfasah — Video Editor & Creative Media Producer",
};
