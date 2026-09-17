/* ───────────────────────────────────────────────
   CMS — Tipe data & nilai default (2 bahasa: Indonesia & Inggris).
   defaultContent    = Bahasa Indonesia
   defaultContentEn  = English
   Nilai default diambil dari src/data.ts + teks yang sebelumnya
   ditulis langsung (hardcoded) di dalam komponen.
   ─────────────────────────────────────────────── */
import {
  profile,
  education,
  experience,
  organizations,
  tools,
  programmingSkills,
  disciplines,
  languages,
  interests,
  works,
  mediaShowcase,
  platforms,
  contactPurposes,
  type Education,
  type Experience,
  type Organization,
  type Tool,
  type Work,
  type MediaItem,
  type PlatformLink,
  type ContactOption,
} from "../data";
import type { Lang } from "./i18n";

export type {
  Education,
  Experience,
  Organization,
  Tool,
  Work,
  MediaItem,
  PlatformLink,
  ContactOption,
};

/* ── Profil (profile + kolom tambahan milik CMS) ── */
export type CmsProfile = typeof profile & {
  /** URL foto pengganti portrait. Kosongkan = pakai foto bawaan. */
  photoUrl: string;
  /** URL file CV (tombol "Download CV"). */
  cvUrl: string;
};

/* ── Hero ── */
export type HeroContent = {
  line1: string;
  line2: string;
  role: string;
  intro: string;
};

/* ── Tentang ── */
export type AboutContent = {
  titleA: string;
  titleB: string;
  quote: string;
};

/* ── Skill bar kreatif ── */
export type CreativeSkill = {
  name: string;
  percent: number;
};

/* ── Statistik ── */
export type StatItem = {
  value: string;
  /** Mendukung baris baru dengan \n */
  label: string;
};

/* ── Layanan ── */
export type ServiceItem = {
  /** Kunci ikon: video | palette | camera | monitor */
  icon: string;
  title: string;
  description: string;
  features: string[];
  /** Kelas gradient tailwind, mis. "from-rose-500 to-pink-500" */
  color: string;
  price: string;
};

/* ── Alur kerja ── */
export type WorkflowStep = {
  /** Kunci ikon: message-square | file-text | clapperboard | eye | check-circle */
  icon: string;
  step: string;
  title: string;
  description: string;
};

/* ── FAQ ── */
export type FaqItem = {
  question: string;
  answer: string;
};

/* ── Section media ── */
export type MediaSection = {
  titleA: string;
  titleB: string;
  titleC: string;
  description: string;
  youtubeUrl: string;
  youtubeLabel: string;
  twitchUrl: string;
  twitchLabel: string;
};

/* ── Section kontak ── */
export type ContactSection = {
  titleA: string;
  titleB: string;
  description: string;
  mapUrl: string;
};

/* ── Footer ── */
export type FooterContent = {
  tagline: string;
};

/* ── Seluruh konten CMS (satu bahasa) ── */
export type CmsContent = {
  profile: CmsProfile;
  hero: HeroContent;
  about: AboutContent;
  education: Education[];
  experience: Experience[];
  organizations: Organization[];
  creativeSkills: CreativeSkill[];
  programmingSkills: typeof programmingSkills;
  disciplines: string[];
  languages: typeof languages;
  interests: string[];
  tools: Tool[];
  works: Work[];
  mediaShowcase: MediaItem[];
  mediaSection: MediaSection;
  platforms: PlatformLink[];
  contactPurposes: ContactOption[];
  contactSection: ContactSection;
  stats: StatItem[];
  statsQuote: string;
  services: ServiceItem[];
  workflowSteps: WorkflowStep[];
  faqs: FaqItem[];
  footer: FooterContent;
};

/* ── Data yang sama di kedua bahasa ── */
const creativeSkills: CreativeSkill[] = [
  { name: "Video Editing", percent: 95 },
  { name: "Broadcast Management", percent: 90 },
  { name: "Photography", percent: 88 },
  { name: "Videography", percent: 90 },
  { name: "Graphic Design", percent: 88 },
  { name: "Live Streaming", percent: 85 },
  { name: "IT Support", percent: 90 },
  { name: "Content Creation", percent: 92 },
];

const toolDescriptionsId = [
  "Video editing profesional untuk konten multimedia dan produksi broadcast.",
  "Motion graphics, efek visual, dan compositing untuk proyek video profesional.",
  "Ilustrasi vektor dan manipulasi foto untuk desain grafis dan aset pemasaran.",
  "Editing foto dan color grading profesional untuk alur kerja fotografi.",
  "Editing video pendek yang dinamis untuk TikTok, Reels, dan konten media sosial.",
  "Manajemen live streaming dan broadcast untuk produksi konten.",
  "Platform live streaming berbasis mobile untuk interaksi real-time dengan penonton.",
  "Digital audio workstation untuk produksi musik dan editing audio.",
  "Desain grafis cepat untuk feed, story media sosial, dan materi pemasaran.",
  "Word, Excel, PowerPoint untuk dokumentasi, laporan, dan presentasi.",
];

/* ═══════════════════════════════════════════════════
   DEFAULT — BAHASA INDONESIA
   ═══════════════════════════════════════════════════ */
export const defaultContent: CmsContent = {
  profile: {
    ...profile,
    roles: [
      "Mahasiswa Teknik Komputer & Jaringan",
      "Video Editor",
      "Content Creator",
      "IT Support",
    ],
    tagline: "Visual Editor & Produser Media Kreatif",
    intro:
      "Mahasiswa Teknik Komputer dan Jaringan yang sangat adaptif dengan pengalaman terbukti di produksi media kreatif dan IT support.",
    summary:
      "Mahasiswa Teknik Komputer dan Jaringan yang sangat adaptif dengan pengalaman terbukti di produksi media kreatif dan IT support. Mahir dalam video editing, manajemen broadcast, dan troubleshooting teknis. Berusaha memanfaatkan perpaduan unik keahlian teknis dan kreativitas di lingkungan kerja yang dinamis.",
    photoUrl: "",
    cvUrl: "/CV_Tegar_Wahid_Alfasah.pdf",
  },

  hero: {
    line1: "TEGAR WAHID",
    line2: "ALFASAH",
    role: "Video Editor & Produser Media Kreatif",
    intro:
      "Mahasiswa Teknik Komputer dan Jaringan yang sangat adaptif dengan pengalaman terbukti di produksi media kreatif dan IT support.",
  },

  about: {
    titleA: "Video Editor &",
    titleB: "Produser Media Kreatif",
    quote:
      "Mahasiswa Teknik Komputer dan Jaringan yang sangat adaptif dengan pengalaman terbukti di produksi media kreatif dan IT support.",
  },

  education: [
    {
      school: "Universitas Mandiri",
      period: "2022 — 2026",
      program: "Sarjana Teknik, Teknik Komputer dan Jaringan",
      location: "Subang, Jawa Barat",
      description:
        "Konsentrasi di bidang Teknik Komputer dan Jaringan dengan IPK 3,60.",
      gpa: "3.60",
    },
    {
      school: "SMK Bina Wisata Lembang",
      period: "2019 — 2022",
      program: "Diploma SMK, Rekayasa Perangkat Lunak",
      location: "Lembang, Jawa Barat",
      description:
        "Alumni angkatan 2019–2022 program studi Rekayasa Perangkat Lunak (RPL).",
    },
  ],

  experience: [
    {
      company: "JEV (Jasa Edit Video)",
      period: "2026",
      role: "Video Editor",
      location: "Jawa Barat, Indonesia",
      description: [
        "Mengedit konten multimedia untuk berbagai klien menggunakan CapCut, Streamlabs, OBS, dan FL Studio demi memastikan produksi berkualitas tinggi.",
        "Mengelola konfigurasi teknis broadcast dan teknik pemisahan audio.",
      ],
      tags: ["Video Editing", "CapCut", "OBS", "Streamlabs", "FL Studio"],
    },
    {
      company: "Sekretariat Daerah Kabupaten Subang (Setda Subang)",
      period: "2025",
      role: "IT Support Magang (PKL), Bagian Sumber Daya Alam",
      location: "Jawa Barat, Indonesia",
      description: [
        "Memberikan dukungan IT dan troubleshooting menyeluruh untuk staf di Bagian Sumber Daya Alam.",
        "Membantu memelihara infrastruktur teknis dan memastikan kelancaran sistem operasional.",
      ],
      tags: ["IT Support", "Troubleshooting", "Infrastruktur"],
    },
    {
      company: "HG Adventure",
      period: "2022",
      role: "Content Creator",
      location: "Jawa Barat, Indonesia",
      description: [
        "Mengelola platform media sosial dan mengembangkan strategi konten kreatif.",
        "Memproduksi aset digital menggunakan skill fotografi, videografi, dan video editing.",
        "Mengerjakan tugas desain grafis untuk mendukung pemasaran dan kehadiran digital.",
      ],
      tags: ["Content Creation", "Fotografi", "Videografi", "Media Sosial"],
    },
    {
      company: "The Lodge Maribaya",
      period: "2021",
      role: "Magang Departemen IT",
      location: "Bandung, Jawa Barat",
      description: [
        "Menyelesaikan magang lapangan 3 bulan dengan memberikan dukungan IT operasional.",
        "Membantu dokumentasi teknis dan inisiatif desain digital.",
      ],
      tags: ["IT Support", "Dokumentasi", "Desain Digital"],
    },
    {
      company: "SMK Bina Wisata Lembang",
      period: "2020 — 2022",
      role: "Dukungan Teknis, Tim IT",
      location: "Jawa Barat, Indonesia",
      description: [
        "Memberikan troubleshooting teknis dan dukungan sistem untuk infrastruktur sekolah.",
        "Memelihara dokumentasi teknis dan berkontribusi pada proyek desain multimedia.",
      ],
      tags: ["Technical Support", "Dokumentasi", "Multimedia"],
    },
  ],

  organizations: [
    {
      name: "BEM FT UM (Badan Eksekutif Mahasiswa Fakultas Teknik)",
      period: "2023 — 2025",
      role: "Departemen Seni, Budaya, dan Olahraga",
      location: "Subang, Jawa Barat",
      description:
        "Mengorganisasi dan mengoordinasikan acara se-fakultas untuk mempromosikan keterlibatan budaya dan kebugaran jasmani.",
    },
    {
      name: "HIMA TKJ (Himpunan Mahasiswa Teknik Komputer dan Jaringan)",
      period: "2022 — 2023",
      role: "Ketua",
      location: "Subang, Jawa Barat",
      description:
        "Memimpin inisiatif organisasi mahasiswa dan mengelola operasional pengurus.",
    },
    {
      name: "BW Jurnal",
      period: "2019 — 2022",
      role: "Wakil Ketua & Sekretaris",
      location: "Lembang, Jawa Barat",
      description:
        "Mengarahkan kegiatan publikasi dan mengelola arsip administrasi organisasi.",
    },
    {
      name: "OSIS SMK Bina Wisata Lembang",
      period: "2020 — 2022",
      role: "Divisi Riset Teknologi",
      location: "Lembang, Jawa Barat",
      description:
        "Memelopori program dan riset berfokus teknologi untuk OSIS.",
    },
  ],

  creativeSkills: [...creativeSkills],

  programmingSkills: programmingSkills.map((s) => ({ ...s, level: "Menengah" })),

  disciplines: [
    "Video Editing",
    "Fotografi",
    "Videografi",
    "Desain Grafis",
    "Manajemen Broadcast",
    "Live Streaming",
    "IT Support",
    "Pembuatan Konten",
    "Manajemen Media Sosial",
    "Troubleshooting Teknis",
    "Manajemen Proyek",
    "Pemrograman",
  ],

  languages: [
    { name: "Bahasa Indonesia", level: "Penutur Asli" },
    { name: "Bahasa Inggris", level: "Dasar" },
  ],

  interests: [
    "Pemrograman",
    "Live Streaming",
    "Produksi Media Kreatif",
    "Manajemen Proyek",
  ],

  tools: tools.map((t, i) => ({ ...t, description: toolDescriptionsId[i] ?? t.description })),

  works: [
    {
      title: "Produksi Konten Multimedia",
      client: "JEV (Jasa Edit Video)",
      category: "Video Editing · Broadcast",
      image:
        "https://images.pexels.com/photos/12757209/pexels-photo-12757209.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
      type: "video",
    },
    {
      title: "Konfigurasi Broadcast & Audio",
      client: "Produksi Live",
      category: "Streaming · Audio",
      image:
        "https://images.pexels.com/photos/36920917/pexels-photo-36920917.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
      type: "video",
    },
    {
      title: "Strategi Konten Kreatif",
      client: "HG Adventure",
      category: "Media Sosial · Fotografi",
      image:
        "https://images.pexels.com/photos/31681666/pexels-photo-31681666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
      type: "image",
    },
    {
      title: "Aset Desain Digital & Pemasaran",
      client: "HG Adventure",
      category: "Desain Grafis · Pemasaran",
      image:
        "https://images.pexels.com/photos/29546725/pexels-photo-29546725.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
      type: "image",
    },
    {
      title: "Dokumentasi Teknis",
      client: "The Lodge Maribaya",
      category: "IT Support · Dokumentasi",
      image:
        "https://images.pexels.com/photos/34037222/pexels-photo-34037222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
      type: "image",
    },
    {
      title: "Proyek Desain Multimedia",
      client: "SMK Bina Wisata Lembang",
      category: "Desain · Multimedia",
      image:
        "https://images.pexels.com/photos/3850210/pexels-photo-3850210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
      type: "image",
    },
  ],

  mediaShowcase: [...mediaShowcase],

  mediaSection: {
    titleA: "Cuplikan",
    titleB: "stream",
    titleC: "& showcase",
    description:
      "Tonton highlight stream Sora Wirya, sampel editing video, dan momen seru bersama komunitas. Klik untuk memutar!",
    youtubeUrl: "https://youtube.com/@sorawirya",
    youtubeLabel: "Lihat Semua di YouTube",
    twitchUrl: "https://twitch.tv/sorawirya",
    twitchLabel: "Live di Twitch",
  },

  platforms: [
    { ...platforms[0], description: "Portofolio & balik layar" },
    { ...platforms[1], description: "Pertanyaan bisnis" },
  ],

  contactPurposes: [...contactPurposes],

  contactSection: {
    titleA: "Mari Bangun Sesuatu yang",
    titleB: "Luar Biasa",
    description:
      "Punya proyek atau ingin berkolaborasi? Saya selalu terbuka untuk peluang baru. Jangan ragu untuk menghubungi saya.",
    mapUrl: "https://maps.google.com/?q=Subang+West+Java",
  },

  stats: [
    { value: "03", label: "Pengalaman\nKerja" },
    { value: "40+", label: "Proyek\nKreatif" },
    { value: "05", label: "Organisasi\nAktif" },
    { value: "02", label: "Institusi\nPendidikan" },
  ],
  statsQuote: "Kreativitas adalah perjalanan yang saya bangun sejak SMP.",

  services: [
    {
      icon: "video",
      title: "Video Editing",
      description:
        "Professional editing untuk YouTube, reels, TikTok, dan broadcast. Termasuk color grading, audio mixing, dan motion graphics.",
      features: ["Premiere Pro", "After Effects", "CapCut", "DaVinci Resolve"],
      color: "from-rose-500 to-pink-500",
      price: "Mulai Rp 150.000",
    },
    {
      icon: "palette",
      title: "Graphic Design",
      description:
        "Desain visual untuk social media, poster, banner, dan branding. Cepat dan sesuai kebutuhan klien.",
      features: ["Photoshop", "Illustrator", "Canva", "Lightroom"],
      color: "from-amber-500 to-orange-500",
      price: "Mulai Rp 75.000",
    },
    {
      icon: "camera",
      title: "Photography",
      description:
        "Dokumentasi acara, foto produk, portrait, dan konten visual untuk media sosial dan marketing.",
      features: ["Portrait", "Event", "Product", "Street"],
      color: "from-cyan-500 to-sky-500",
      price: "Mulai Rp 500.000",
    },
    {
      icon: "monitor",
      title: "IT Support",
      description:
        "Konsultasi dan troubleshooting IT, setup jaringan, maintenance sistem, dan dukungan teknis lainnya.",
      features: ["Networking", "Troubleshoot", "Setup", "Maintenance"],
      color: "from-accent-500 to-accent-600",
      price: "Mulai Rp 100.000/jam",
    },
  ],

  workflowSteps: [
    {
      icon: "message-square",
      step: "01",
      title: "Konsultasi",
      description:
        "Diskusi kebutuhan, tujuan, dan ekspektasi proyek Anda secara detail.",
    },
    {
      icon: "file-text",
      step: "02",
      title: "Brief & Deal",
      description:
        "Penyepakatan brief kerja, timeline, harga, dan metode pembayaran.",
    },
    {
      icon: "clapperboard",
      step: "03",
      title: "Produksi",
      description: "Proses editing/desain dengan update progress secara berkala.",
    },
    {
      icon: "eye",
      step: "04",
      title: "Review",
      description: "Anda review hasil kerja. 2x revisi gratis sesuai brief.",
    },
    {
      icon: "check-circle",
      step: "05",
      title: "Finalisasi",
      description:
        "Delivery file final dalam format yang dibutuhkan. Selesai!",
    },
  ],

  faqs: [
    {
      question: "Berapa lama proses editing video?",
      answer:
        "Tergantung kompleksitas dan durasi video. Untuk video pendek (1-3 menit), biasanya 2-3 hari kerja. Video panjang (10+ menit) bisa memakan waktu 5-7 hari kerja. Revisi minor biasanya selesai dalam 1 hari.",
    },
    {
      question: "Apakah bisa revisi hasil editing?",
      answer:
        "Tentu! Saya menyediakan 2x revisi gratis untuk setiap proyek. Revisi tambahan dikenakan biaya sesuai kesepakatan. Saya selalu berkomunikasi dengan klien di setiap tahap untuk memastikan hasil sesuai ekspektasi.",
    },
    {
      question: "Bagaimana cara memesan jasa?",
      answer:
        "Anda bisa menghubungi saya melalui formulir kontak di website ini, email ke tegarwahidalfasah@gmail.com, atau DM Instagram @tegarwahidalfasah. Saya akan merespon dalam waktu 24 jam.",
    },
    {
      question: "Apa yang perlu disiapkan sebelum memesan?",
      answer:
        "Untuk video editing: footage mentah, referensi style yang diinginkan, durasi target, dan brief singkat. Untuk desain: teks/konten, ukuran yang dibutuhkan, referensi visual, dan brand guidelines jika ada.",
    },
    {
      question: "Apakah ada garansi?",
      answer:
        "Saya menjamin kualitas kerja profesional. Jika hasil tidak sesuai brief yang disepakati, saya akan melakukan revisi tanpa biaya tambahan. Kepuasan klien adalah prioritas utama saya.",
    },
    {
      question: "Metode pembayaran apa yang diterima?",
      answer:
        "Saya menerima pembayaran via transfer bank (BCA, BRI, Mandiri), e-wallet (GoPay, OVO, DANA), dan pembayaran di muka 50% sebelum proyek dimulai, 50% setelah selesai.",
    },
  ],

  footer: {
    tagline:
      "Video Editor, Content Creator & Mahasiswa Teknik Komputer dan Jaringan dari Subang, Jawa Barat.",
  },
};

/* ═══════════════════════════════════════════════════
   DEFAULT — ENGLISH
   ═══════════════════════════════════════════════════ */
export const defaultContentEn: CmsContent = {
  profile: {
    ...profile,
    photoUrl: "",
    cvUrl: "/CV_Tegar_Wahid_Alfasah.pdf",
  },

  hero: {
    line1: "TEGAR WAHID",
    line2: "ALFASAH",
    role: "Video Editor & Creative Media Producer",
    intro:
      "A highly adaptable Computer and Network Engineering student with proven experience in creative media production and IT support.",
  },

  about: {
    titleA: "Video Editor &",
    titleB: "Creative Media Producer",
    quote:
      "A highly adaptable Computer and Network Engineering student with proven experience in creative media production and IT support.",
  },

  education: [
    { ...education[0] },
    {
      ...education[1],
      description:
        "Class of 2019–2022, Software Engineering (RPL) program.",
    },
  ],

  experience: [...experience],
  organizations: [...organizations],

  creativeSkills: [...creativeSkills],
  programmingSkills: [...programmingSkills],
  disciplines: [...disciplines],
  languages: [...languages],
  interests: [...interests],
  tools: [...tools],
  works: [...works],

  mediaShowcase: [
    {
      title: "Video Editing Showcase",
      description:
        "Sample multimedia video editing results for JEV clients. Using CapCut, OBS, and FL Studio.",
      type: "video",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail:
        "https://images.pexels.com/photos/2098989/pexels-photo-2098989.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
      duration: "03:22",
      tags: ["Video Editing", "CapCut", "OBS"],
    },
    {
      title: "Broadcast & Streaming Setup",
      description:
        "Live streaming broadcast configuration with OBS Studio and Streamlabs for high-quality content production.",
      type: "video",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail:
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
      duration: "05:15",
      tags: ["Broadcast", "Streaming", "OBS"],
    },
    {
      title: "Creative Content Production",
      description:
        "Creative content production process for HG Adventure — from concept to social media publication.",
      type: "video",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail:
        "https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
      duration: "04:30",
      tags: ["Content", "Photography", "Videography"],
    },
  ],

  mediaSection: {
    titleA: "Stream",
    titleB: "clips",
    titleC: "& showcase",
    description:
      "Watch Sora Wirya's stream highlights, video editing samples, and fun moments with the community. Click to play!",
    youtubeUrl: "https://youtube.com/@sorawirya",
    youtubeLabel: "View All on YouTube",
    twitchUrl: "https://twitch.tv/sorawirya",
    twitchLabel: "Live on Twitch",
  },

  platforms: [...platforms],

  contactPurposes: [
    { value: "commission", label: "Video Editing Service" },
    { value: "collab", label: "Content Collaboration" },
    { value: "sponsor", label: "Sponsorship / Partnership" },
    { value: "it", label: "IT Support / Consultation" },
    { value: "design", label: "Graphic Design Service" },
    { value: "other", label: "Other" },
  ],

  contactSection: {
    titleA: "Let's Build Something",
    titleB: "Extraordinary",
    description:
      "Have a project in mind or want to collaborate? I'm always open to new opportunities. Don't hesitate to reach out.",
    mapUrl: "https://maps.google.com/?q=Subang+West+Java",
  },

  stats: [
    { value: "03", label: "Work\nExperience" },
    { value: "40+", label: "Creative\nProjects" },
    { value: "05", label: "Active\nOrganizations" },
    { value: "02", label: "Educational\nInstitutions" },
  ],
  statsQuote: "Creativity is a journey I've been building since middle school.",

  services: [
    {
      icon: "video",
      title: "Video Editing",
      description:
        "Professional editing for YouTube, reels, TikTok, and broadcast. Including color grading, audio mixing, and motion graphics.",
      features: ["Premiere Pro", "After Effects", "CapCut", "DaVinci Resolve"],
      color: "from-rose-500 to-pink-500",
      price: "From Rp 150,000",
    },
    {
      icon: "palette",
      title: "Graphic Design",
      description:
        "Visual design for social media, posters, banners, and branding. Fast and tailored to client needs.",
      features: ["Photoshop", "Illustrator", "Canva", "Lightroom"],
      color: "from-amber-500 to-orange-500",
      price: "From Rp 75,000",
    },
    {
      icon: "camera",
      title: "Photography",
      description:
        "Event documentation, product photos, portraits, and visual content for social media and marketing.",
      features: ["Portrait", "Event", "Product", "Street"],
      color: "from-cyan-500 to-sky-500",
      price: "From Rp 500,000",
    },
    {
      icon: "monitor",
      title: "IT Support",
      description:
        "IT consultation and troubleshooting, network setup, system maintenance, and other technical support.",
      features: ["Networking", "Troubleshoot", "Setup", "Maintenance"],
      color: "from-accent-500 to-accent-600",
      price: "From Rp 100,000/hour",
    },
  ],

  workflowSteps: [
    {
      icon: "message-square",
      step: "01",
      title: "Consultation",
      description:
        "Discuss your project's needs, goals, and expectations in detail.",
    },
    {
      icon: "file-text",
      step: "02",
      title: "Brief & Deal",
      description:
        "Agreement on work brief, timeline, pricing, and payment method.",
    },
    {
      icon: "clapperboard",
      step: "03",
      title: "Production",
      description: "Editing/design process with regular progress updates.",
    },
    {
      icon: "eye",
      step: "04",
      title: "Review",
      description: "You review the work. 2 free revisions per brief.",
    },
    {
      icon: "check-circle",
      step: "05",
      title: "Finalization",
      description: "Final file delivery in the formats you need. Done!",
    },
  ],

  faqs: [
    {
      question: "How long does video editing take?",
      answer:
        "Depends on complexity and duration. For short videos (1-3 minutes), usually 2-3 working days. Long videos (10+ minutes) can take 5-7 working days. Minor revisions are usually done within 1 day.",
    },
    {
      question: "Can I request revisions?",
      answer:
        "Of course! I provide 2 free revisions for every project. Additional revisions are charged as agreed. I always communicate with clients at every stage to make sure the result matches expectations.",
    },
    {
      question: "How do I order a service?",
      answer:
        "You can reach me through the contact form on this website, email tegarwahidalfasah@gmail.com, or Instagram DM @tegarwahidalfasah. I respond within 24 hours.",
    },
    {
      question: "What should I prepare before ordering?",
      answer:
        "For video editing: raw footage, style references, target duration, and a short brief. For design: text/content, required sizes, visual references, and brand guidelines if any.",
    },
    {
      question: "Is there a warranty?",
      answer:
        "I guarantee professional-quality work. If the result doesn't match the agreed brief, I'll revise it at no extra cost. Client satisfaction is my top priority.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "I accept bank transfers (BCA, BRI, Mandiri) and e-wallets (GoPay, OVO, DANA), with 50% upfront before the project starts and 50% upon completion.",
    },
  ],

  footer: {
    tagline:
      "Video Editor, Content Creator & Computer Network Engineering Student from Subang, West Java.",
  },
};

/* ── Default per bahasa ── */
export const defaultDocs: Record<Lang, CmsContent> = {
  id: defaultContent,
  en: defaultContentEn,
};

/* ── Gabung beberapa lapis konten (default ← published ← draft).
   Array diganti utuh, object digabung per properti. ── */
function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

export function mergeContent(
  base: CmsContent,
  ...layers: Array<Partial<CmsContent> | undefined | null>
): CmsContent {
  const out = deepClone(base);
  for (const layer of layers) {
    if (!layer || typeof layer !== "object") continue;
    for (const key of Object.keys(layer) as (keyof CmsContent)[]) {
      const val: unknown = layer[key];
      if (val === undefined) continue;
      const cur: unknown = out[key];
      if (isPlainObject(cur) && isPlainObject(val)) {
        Object.assign(cur, deepClone(val));
      } else {
        (out as Record<string, unknown>)[key as string] = deepClone(val);
      }
    }
  }
  return out;
}
