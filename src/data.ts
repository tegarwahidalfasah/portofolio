/* ───────────────────────────────────────────────
   Profil Utama — Sora Wirya (VTuber Persona)
   ─────────────────────────────────────────────── */
export const profile = {
  name: "Sora Wirya",
  realName: "Tegar Wahid Alfasah",
  shortName: "Sora Wirya",
  lastName: "Wirya",
  initials: "SW",
  roles: ["VTuber", "Content Creator", "Desainer", "Fotografer", "Videografer"],
  tagline: "VTuber & visual storyteller dari Indonesia",
  intro:
    "Mengubah ide menjadi konten visual yang menarik — mulai dari desain, fotografi, videografi, hingga manajemen media sosial. Aktif sebagai VTuber dengan persona Sora Wirya.",
  about:
    "Saya adalah Sora Wirya — seorang VTuber, content creator, dan visual storyteller. Di balik layar, saya adalah Tegar Wahid Alfasah, mahasiswa tingkat 3 di Universitas Mandiri. Saya memiliki ketertarikan di bidang kreatif sejak duduk di bangku SMP dan terus berkembang hingga sekarang. Sebagai VTuber, saya melakukan streaming game, ngobrol, dan kreasi konten kreatif. Di luar streaming, saya juga menerima jasa desain grafis, editing video, dan dokumentasi.",
  location: "Walahar, Dangdeur, Subang — Jawa Barat",
  locationShort: "Subang, Jawa Barat",
  phone: "0851-7435-3873",
  phoneHref: "tel:+6285174353873",
  email: "tegarwahidalfasah@gmail.com",
  instagram: "@tegarwahidalfasah",
  instagramHref: "https://instagram.com/tegarwahidalfasah",
  youtube: "@sorawirya",
  youtubeHref: "https://youtube.com/@sorawirya",
  twitch: "sorawirya",
  twitchHref: "https://twitch.tv/sorawirya",
  tiktok: "@sorawirya",
  tiktokHref: "https://tiktok.com/@sorawirya",
  donation: "https://trakteer.id/sorawirya",
  donationLabel: "Trakteer",
};

/* ───────────────────────────────────────────────
   Lore / Kisah Karakter — Sora Wirya
   ─────────────────────────────────────────────── */
export type LoreEntry = {
  chapter: string;
  title: string;
  content: string;
  icon: string;
};

export const lore: LoreEntry[] = [
  {
    chapter: "Asal-Usul",
    title: "Lahir dari Langit Subang",
    content:
      "Sora Wirya konon lahir dari perpaduan angin selatan dan cahaya bintang di langit Subang. Ia tumbuh sebagai penjelajah digital yang selalu penasaran dengan keindahan visual di setiap sudut dunia maya.",
    icon: "compass",
  },
  {
    chapter: "Perjalanan",
    title: "Menempa Diri di Dunia Kreatif",
    content:
      "Sejak SMP, Sora mulai mengenal dunia desain dan fotografi. Melalui berbagai proyek kreatif — dari dokumentasi acara hingga konten media sosial — ia mengasah kemampuan bercerita melalui gambar dan video.",
    icon: "route",
  },
  {
    chapter: "Transformasi",
    title: "Menjadi VTuber",
    content:
      "Dengan semangat untuk menjangkau lebih banyak orang, Sora bertransformasi menjadi VTuber. Kini ia aktif melakukan streaming game, berkreasi, dan berinteraksi dengan komunitasnya di YouTube dan Twitch.",
    icon: "sparkles",
  },
  {
    chapter: "Misi",
    title: "Menginspirasi Lewat Karya",
    content:
      "Misi Sora sederhana: menginspirasi orang lain untuk berani berkarya dan mengekspresikan kreativitas mereka. Setiap stream, setiap desain, dan setiap foto adalah langkah kecil menuju dampak yang lebih besar.",
    icon: "target",
  },
];

export const referenceSheet = {
  title: "Reference Sheet",
  subtitle: "Tampak Depan, Samping & Belakang",
  description:
    "Desain karakter Sora Wirya — referensi visual resmi untuk seniman dan kreator yang ingin menggambar karakter ini.",
  tags: ["Karakter Original", "VTuber Model", "Desain by Tegar Wahid"],
};

export const hashtags = [
  "#SoraWirya",
  "#SoraArt",
  "#WiryaStream",
  "#SoraFanart",
  "#TimSora",
  "#SoraLive",
];

/* ───────────────────────────────────────────────
   Guideline / Pedoman Komunitas
   ─────────────────────────────────────────────── */
export type GuidelineSection = {
  title: string;
  icon: string;
  rules: string[];
  tone: "info" | "warning" | "success";
};

export const guidelines: GuidelineSection[] = [
  {
    title: "Aturan Chat di Stream",
    icon: "message-circle",
    tone: "info",
    rules: [
      "Selalu hormati semua penonton dan moderator — tidak ada bully, rasisme, atau SARA.",
      "Dilarang spam, capslock berlebihan, atau mengirim pesan berulang.",
      "Jangan spoiler tanpa peringatan — gunakan tag [SPOILER] di awal pesan.",
      "Ikuti topik obrolan dan jangan mengganggu streamer saat momen penting.",
      "Dilarang mempromosikan channel/produk lain tanpa izin.",
      "Pertanyaan tentang kolaborasi? Kirim melalui form kontak bisnis.",
    ],
  },
  {
    title: "Izin Karya Turunan (Derivative Work)",
    icon: "palette",
    tone: "success",
    rules: [
      "Fanart & fanfiction DIizinkan dengan senang hati!",
      "Wajib mencantumkan kredit: 'Sora Wirya by @tegarwahidalfasah'.",
      "Boleh digunakan untuk portofolio pribadi & media sosial (non-komersial).",
      "Boleh membuat cover, remix, atau aransemen ulang musik original.",
      "Dilarang menggunakan desain karakter untuk proyek komersial tanpa izin tertulis.",
      "Dilarang membuat konten NSFW atau yang bertentangan dengan persona karakter.",
    ],
  },
  {
    title: "Aturan Monetisasi Fanart",
    icon: "coins",
    tone: "warning",
    rules: [
      "Penjualan cetak fanart (poster, stiker, pin) dalam jumlah kecil DIperbolehkan.",
      "Wajib mencantumkan kredit dan tautan ke channel resmi Sora Wirya.",
      "Tidak boleh memproduksi massal merchandise tanpa lisensi resmi.",
      "Jika keuntungan melebihi Rp 2.000.000, silakan hubungi untuk bagi hasil.",
      "Fanart yang dijual harus jelas merupakan karya orisinal Anda, bukan trace/repost.",
      "Dukung sesama kreator — jangan meniru gaya secara berlebihan untuk keuntungan.",
    ],
  },
  {
    title: "Privasi & Batasan",
    icon: "shield",
    tone: "warning",
    rules: [
      "Dilarang menyebarkan informasi pribadi (doxxing) tentang VTuber di balik layar.",
      "Identitas asli hanya boleh dibagikan oleh VTuber itu sendiri.",
      "Screenshot percakapan pribadi dilarang dipublikasikan tanpa izin.",
      "Hormati batasan antara persona karakter dan kehidupan pribadi.",
    ],
  },
];

/* ───────────────────────────────────────────────
   Tools / Keahlian
   ─────────────────────────────────────────────── */
export type Tool = {
  name: string;
  description: string;
  icon: string;
  tags: string[];
};

export const tools: Tool[] = [
  {
    name: "Adobe Family",
    description:
      "Photoshop, Illustrator, Premiere Pro dan keluarga Adobe untuk kebutuhan desain serta editing profesional.",
    icon: "palette",
    tags: ["Photoshop", "Illustrator", "Premiere"],
  },
  {
    name: "Canva",
    description:
      "Desain grafis cepat untuk feed, story, poster dan berbagai kebutuhan konten media sosial.",
    icon: "shapes",
    tags: ["Feed", "Story", "Poster"],
  },
  {
    name: "CapCut",
    description:
      "Editing video pendek yang dinamis untuk konten TikTok, Reels dan media sosial lainnya.",
    icon: "clapperboard",
    tags: ["Reels", "Short Video", "Color"],
  },
  {
    name: "DaVinci Resolve",
    description:
      "Color grading profesional dan editing video tingkat lanjut untuk produksi berkualitas tinggi.",
    icon: "film",
    tags: ["Color Grade", "Edit", "VFX"],
  },
  {
    name: "OBS Studio",
    description:
      "Software streaming dan recording untuk live broadcast di YouTube dan Twitch.",
    icon: "radio",
    tags: ["Streaming", "Recording", "Scene"],
  },
  {
    name: "Live2D / VTuber",
    description:
      "Model rigged untuk ekspresi real-time saat streaming sebagai VTuber.",
    icon: "smile",
    tags: ["VTuber", "Rigging", "Motion"],
  },
];

export const disciplines = [
  "VTuber Streaming",
  "Desain Grafis",
  "Photography",
  "Videography",
  "Video Editor",
  "Social Media Management",
  "Dokumentasi",
  "Live2D / Motion",
  "Technical Support",
];

/* ───────────────────────────────────────────────
   Pendidikan
   ─────────────────────────────────────────────── */
export type Education = {
  school: string;
  period: string;
  program: string;
  description: string;
};

export const education: Education[] = [
  {
    school: "Universitas Mandiri",
    period: "2022 — Sekarang",
    program: "Teknik Komputer Jaringan (TKJ)",
    description:
      "Mahasiswa program studi TKJ (Teknik Komputer Jaringan) di Universitas Mandiri, saat ini duduk di tingkat 3.",
  },
  {
    school: "SMK Bina Wisata Lembang",
    period: "2019 — 2022",
    program: "Rekayasa Perangkat Lunak (RPL)",
    description:
      "Alumni angkatan 2019–2022 program studi RPL (Rekayasa Perangkat Lunak) di SMK Bina Wisata Lembang.",
  },
];

/* ───────────────────────────────────────────────
   Pengalaman Kerja
   ─────────────────────────────────────────────── */
export type Experience = {
  company: string;
  period: string;
  role: string;
  description: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "HG Adventure",
    period: "2022",
    role: "Content Creator",
    description:
      "Content creator media sosial di HG Adventure. Bertanggung jawab atas seluruh proses produksi konten, mulai dari ide hingga publikasi.",
    tags: ["Desain", "Photography", "Videography", "Editor", "Social Media"],
  },
  {
    company: "The Lodge Maribaya Bandung",
    period: "2021",
    role: "Departemen IT — PKL",
    description:
      "Praktek Kerja Lapangan (PKL) di The Lodge Maribaya Bandung selama 3 bulan di departemen IT, dengan fokus pada desain dan dokumentasi.",
    tags: ["Desain", "Dokumentasi"],
  },
  {
    company: "Tim IT SMK Bina Wisata Lembang",
    period: "2020 — 2021",
    role: "Technical Support",
    description:
      "Bagian dari Tim IT SMK Bina Wisata Lembang, menangani kebutuhan teknis, desain dan dokumentasi sekolah.",
    tags: ["Desain", "Dokumentasi", "Technical Support"],
  },
];

/* ───────────────────────────────────────────────
   Organisasi
   ─────────────────────────────────────────────── */
export type Organization = {
  name: string;
  period: string;
  role: string;
};

export const organizations: Organization[] = [
  {
    name: "BEM FT UM",
    period: "2023 — Sekarang",
    role: "Departemen Seni Budaya dan Olahraga",
  },
  {
    name: "HIMA TKJ",
    period: "2022 — 2023",
    role: "Ketua HIMA",
  },
  {
    name: "BW Jurnal",
    period: "2019 — 2022",
    role: "Sekretaris / Wakil Ketua",
  },
  {
    name: "OSIS SMK Bina Wisata Lembang",
    period: "2020 — 2021",
    role: "Riset Teknologi",
  },
  {
    name: "OSIS SMP Negeri 2 Lembang",
    period: "2017 — 2018",
    role: "Bendahara 3",
  },
];

/* ───────────────────────────────────────────────
   Karya / Portofolio
   ─────────────────────────────────────────────── */
export type Work = {
  title: string;
  client: string;
  category: string;
  image: string;
  type: "image" | "video";
};

export const works: Work[] = [
  {
    title: "Adventure Social Media Content",
    client: "HG Adventure",
    category: "Photography · Videography",
    image:
      "https://images.pexels.com/photos/12757209/pexels-photo-12757209.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    type: "image",
  },
  {
    title: "Golden Hour Frames",
    client: "Color & Editing",
    category: "Videography · Editor",
    image:
      "https://images.pexels.com/photos/36920917/pexels-photo-36920917.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    type: "image",
  },
  {
    title: "Potret & Visual Storytelling",
    client: "Photography",
    category: "Foto Dokumentasi",
    image:
      "https://images.pexels.com/photos/31681666/pexels-photo-31681666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    type: "image",
  },
  {
    title: "Dokumentasi Wisata Alam",
    client: "The Lodge Maribaya",
    category: "Dokumentasi",
    image:
      "https://images.pexels.com/photos/29546725/pexels-photo-29546725.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    type: "image",
  },
  {
    title: "Behind the Scenes Produksi",
    client: "Videography",
    category: "Video Production",
    image:
      "https://images.pexels.com/photos/34037222/pexels-photo-34037222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    type: "video",
  },
  {
    title: "Desain Konten & Visual Identity",
    client: "Graphic Design",
    category: "Desain · Sosial Media",
    image:
      "https://images.pexels.com/photos/3850210/pexels-photo-3850210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    type: "image",
  },
];

/* ───────────────────────────────────────────────
   Highlight Stream / Showcase Media
   ─────────────────────────────────────────────── */
export type MediaItem = {
  title: string;
  description: string;
  type: "youtube" | "twitch" | "video";
  embedUrl: string;
  thumbnail: string;
  duration?: string;
  tags: string[];
};

export const mediaShowcase: MediaItem[] = [
  {
    title: "Stream Highlights — Horror Game Night",
    description:
      "Momen-momen seru saat Sora Wirya bermain game horror bersama komunitas di live stream.",
    type: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    duration: "12:34",
    tags: ["Gaming", "Horror", "Highlight"],
  },
  {
    title: "Jasa Edit Video — Cinematic Montage",
    description:
      "Contoh hasil editing video cinematic untuk klien. Tersedia untuk komisi editing video profesional.",
    type: "video",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.pexels.com/photos/2098989/pexels-photo-2098989.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    duration: "03:22",
    tags: ["Editing", "Commission", "Cinematic"],
  },
  {
    title: "Just Chatting — Q&A Session",
    description:
      "Sesi ngobrol santai bersama komunitas Sora Wirya. Tanya jawab, cerita seru, dan interaksi dengan penonton.",
    type: "twitch",
    embedUrl: "https://player.twitch.tv/?channel=sorawirya&parent=localhost",
    thumbnail:
      "https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    duration: "45:10",
    tags: ["Chatting", "Q&A", "Community"],
  },
];

/* ───────────────────────────────────────────────
   Platform Links
   ─────────────────────────────────────────────── */
export type PlatformLink = {
  name: string;
  url: string;
  icon: string;
  description: string;
};

export const platforms: PlatformLink[] = [
  {
    name: "YouTube",
    url: profile.youtubeHref,
    icon: "youtube",
    description: "Video, stream replay & highlight",
  },
  {
    name: "Twitch",
    url: profile.twitchHref,
    icon: "twitch",
    description: "Live streaming gaming & chatting",
  },
  {
    name: "Instagram",
    url: profile.instagramHref,
    icon: "instagram",
    description: "Behind the scenes & daily life",
  },
  {
    name: "TikTok",
    url: profile.tiktokHref,
    icon: "tiktok",
    description: "Short-form content & clips",
  },
  {
    name: "Trakteer",
    url: profile.donation,
    icon: "heart",
    description: "Dukung & apresiasi karya Sora",
  },
];

/* ───────────────────────────────────────────────
   Formulir Kontak — Opsi Dropdown
   ─────────────────────────────────────────────── */
export type ContactOption = {
  value: string;
  label: string;
};

export const contactPurposes: ContactOption[] = [
  { value: "commission", label: "Komisi Desain / Editing" },
  { value: "collab", label: "Kolaborasi Konten" },
  { value: "sponsor", label: "Sponsorship / Partnership" },
  { value: "vtuber", label: "Jasa VTuber / Streaming" },
  { value: "fanart", label: "Pertanyaan Fanart / Lisensi" },
  { value: "other", label: "Lainnya" },
];

/* ───────────────────────────────────────────────
   Statistik
   ─────────────────────────────────────────────── */
export const stats = [
  { value: "03", label: "Pengalaman Kerja" },
  { value: "40+", label: "Proyek Kreatif" },
  { value: "05", label: "Organisasi Aktif" },
  { value: "02", label: "Institusi Pendidikan" },
];
