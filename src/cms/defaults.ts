/* ───────────────────────────────────────────────
   CMS — Tipe data & nilai default
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

/* ── Karya & media + URL video hasil upload ── */
export type CmsWork = Work & {
  /** URL file video (mp4/webm). Kosong = hanya tampil sebagai gambar. */
  videoUrl?: string;
};

export type CmsMediaItem = MediaItem & {
  /** URL file video (mp4/webm) sebagai alternatif URL embed YouTube. */
  videoUrl?: string;
};

/* ── Seluruh konten CMS ── */
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
  works: CmsWork[];
  mediaShowcase: CmsMediaItem[];
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

/* ── Nilai default (tampilan situs saat ini) ── */
export const defaultContent: CmsContent = {
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

  education: [...education],
  experience: [...experience],
  organizations: [...organizations],

  creativeSkills: [
    { name: "Video Editing", percent: 95 },
    { name: "Broadcast Management", percent: 90 },
    { name: "Photography", percent: 88 },
    { name: "Videography", percent: 90 },
    { name: "Graphic Design", percent: 88 },
    { name: "Live Streaming", percent: 85 },
    { name: "IT Support", percent: 90 },
    { name: "Content Creation", percent: 92 },
  ],

  programmingSkills: [...programmingSkills],
  disciplines: [...disciplines],
  languages: [...languages],
  interests: [...interests],
  tools: [...tools],
  works: [...works],
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

  platforms: [...platforms],
  contactPurposes: [...contactPurposes],

  contactSection: {
    titleA: "Let's Build Something",
    titleB: "Extraordinary",
    description:
      "Have a project in mind or want to collaborate? I'm always open to new opportunities. Jangan ragu untuk menghubungi saya.",
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
      "Video Editor, Content Creator & Computer Network Engineering Student from Subang, West Java.",
  },
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
  ...layers: Array<Partial<CmsContent> | undefined | null>
): CmsContent {
  const base = deepClone(defaultContent);
  for (const layer of layers) {
    if (!layer || typeof layer !== "object") continue;
    for (const key of Object.keys(layer) as (keyof CmsContent)[]) {
      const val: unknown = layer[key];
      if (val === undefined) continue;
      const cur: unknown = base[key];
      if (isPlainObject(cur) && isPlainObject(val)) {
        Object.assign(cur, deepClone(val));
      } else {
        (base as Record<string, unknown>)[key as string] = deepClone(val);
      }
    }
  }
  return base;
}
