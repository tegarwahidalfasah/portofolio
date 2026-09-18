/* ───────────────────────────────────────────────
   Profil Utama — Tegar Wahid Alfasah
   ─────────────────────────────────────────────── */
export const profile = {
  name: "Tegar Wahid Alfasah",
  shortName: "Tegar Wahid",
  lastName: "Alfasah",
  initials: "TWA",
  roles: [
    "Computer & Network Engineering Student",
    "Video Editor",
    "Content Creator",
    "IT Support",
  ],
  tagline: "Visual Editor & Creative Media Producer",
  intro:
    "A highly adaptable Computer and Network Engineering student with proven experience in creative media production and IT support.",
  summary:
    "A highly adaptable Computer and Network Engineering student with proven experience in creative media production and IT support. Proficient in video editing, broadcast management, and technical troubleshooting. Seeking to leverage a unique blend of technical expertise and creative skills in a dynamic working environment.",
  location: "Subang, 41213, West Java, Indonesia",
  locationShort: "Subang, West Java",
  phone: "+6285174353873",
  phoneHref: "https://wa.me/6285174353873?text=Halo%20Tegar%21%20Saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20bekerja%20sama.",
  email: "tegarwahidalfasah@gmail.com",
  instagram: "@tegarwahidalfasah",
  instagramHref: "https://instagram.com/tegarwahidalfasah",
  youtube: "",
  youtubeHref: "",
  twitch: "",
  twitchHref: "",
  tiktok: "",
  tiktokHref: "",
  donation: "",
  donationLabel: "",
  gpa: "3.60",
  graduationYear: "2026",
};

/* ───────────────────────────────────────────────
   Education
   ─────────────────────────────────────────────── */
export type Education = {
  school: string;
  period: string;
  program: string;
  location: string;
  description: string;
  gpa?: string;
};

export const education: Education[] = [
  {
    school: "Mandiri University",
    period: "2022 — 2026",
    program: "Bachelor of Engineering, Computer and Network Engineering",
    location: "Subang, West Java",
    description:
      "Concentration in Computer and Network Engineering with a GPA of 3.60.",
    gpa: "3.60",
  },
  {
    school: "Bina Wisata Lembang Vocational High School",
    period: "2019 — 2022",
    program: "Vocational High School Diploma, Software Engineering",
    location: "Lembang, West Java",
    description:
      "Alumni angkatan 2019–2022 program studi Software Engineering (RPL).",
  },
];

/* ───────────────────────────────────────────────
   Experience
   ─────────────────────────────────────────────── */
export type Experience = {
  company: string;
  period: string;
  role: string;
  location: string;
  description: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "JEV (Jasa Edit Video)",
    period: "2026",
    role: "Video Editor",
    location: "West Java, Indonesia",
    description: [
      "Edit multimedia content for various clients utilizing CapCut, Streamlabs, OBS, and FL Studio to ensure high-quality production.",
      "Manage technical broadcast configurations and audio separation techniques.",
    ],
    tags: ["Video Editing", "CapCut", "OBS", "Streamlabs", "FL Studio"],
  },
  {
    company: "Regional Secretariat of Subang Regency (Setda Subang)",
    period: "2025",
    role: "IT Support Intern (PKL), Natural Resources Division",
    location: "West Java, Indonesia",
    description: [
      "Provided comprehensive IT support and troubleshooting for staff within the Natural Resources Division.",
      "Assisted in maintaining technical infrastructure and ensuring smooth operational systems.",
    ],
    tags: ["IT Support", "Troubleshooting", "Infrastructure"],
  },
  {
    company: "HG Adventure",
    period: "2022",
    role: "Content Creator",
    location: "West Java, Indonesia",
    description: [
      "Managed social media platforms and developed creative content strategies.",
      "Produced digital assets utilizing photography, videography, and video editing skills.",
      "Executed graphic design tasks to support marketing and digital presence.",
    ],
    tags: ["Content Creation", "Photography", "Videography", "Social Media"],
  },
  {
    company: "The Lodge Maribaya",
    period: "2021",
    role: "IT Department Intern",
    location: "Bandung, West Java",
    description: [
      "Completed a 3-month field internship providing operational IT support.",
      "Assisted with technical documentation and digital design initiatives.",
    ],
    tags: ["IT Support", "Documentation", "Digital Design"],
  },
  {
    company: "SMK Bina Wisata Lembang",
    period: "2020 — 2022",
    role: "Technical Support, IT Team",
    location: "West Java, Indonesia",
    description: [
      "Provided technical troubleshooting and system support for school infrastructure.",
      "Maintained technical documentation and contributed to multimedia design projects.",
    ],
    tags: ["Technical Support", "Documentation", "Multimedia"],
  },
];

/* ───────────────────────────────────────────────
   Leadership & Activities
   ─────────────────────────────────────────────── */
export type Organization = {
  name: string;
  period: string;
  role: string;
  location: string;
  description: string;
};

export const organizations: Organization[] = [
  {
    name: "BEM FT UM (Student Executive Board, Faculty of Engineering)",
    period: "2023 — 2025",
    role: "Department of Arts, Culture, and Sports",
    location: "Subang, West Java",
    description:
      "Organize and coordinate faculty-wide events promoting cultural engagement and physical fitness.",
  },
  {
    name: "HIMA TKJ (Computer and Network Engineering Student Association)",
    period: "2022 — 2023",
    role: "President",
    location: "Subang, West Java",
    description:
      "Led student organizational initiatives and managed executive committee operations.",
  },
  {
    name: "BW Jurnal",
    period: "2019 — 2022",
    role: "Vice Chairman & Secretary",
    location: "Lembang, West Java",
    description:
      "Directed publication activities and managed administrative records for the organization.",
  },
  {
    name: "OSIS SMK Bina Wisata Lembang",
    period: "2020 — 2022",
    role: "Technology Research Division",
    location: "Lembang, West Java",
    description:
      "Spearheaded technology-focused programs and research initiatives for the student council.",
  },
];

/* ───────────────────────────────────────────────
   Skills & Interests
   ─────────────────────────────────────────────── */
export type Tool = {
  name: string;
  description: string;
  icon: string;
  tags: string[];
};

export const tools: Tool[] = [
  {
    name: "Adobe Premiere Pro",
    description:
      "Professional video editing for multimedia content and broadcast production.",
    icon: "film",
    tags: ["Video Edit", "Broadcast", "Production"],
  },
  {
    name: "After Effects",
    description:
      "Motion graphics, visual effects, and compositing for professional video projects.",
    icon: "sparkles",
    tags: ["VFX", "Motion", "Compositing"],
  },
  {
    name: "Illustrator & Photoshop",
    description:
      "Vector illustration and photo manipulation for graphic design and marketing assets.",
    icon: "palette",
    tags: ["Graphic Design", "Illustration", "Photo"],
  },
  {
    name: "Lightroom",
    description:
      "Professional photo editing and color grading for photography workflows.",
    icon: "camera",
    tags: ["Photo Edit", "Color", "Batch"],
  },
  {
    name: "CapCut",
    description:
      "Dynamic short-form video editing for TikTok, Reels, and social media content.",
    icon: "clapperboard",
    tags: ["Short Video", "Reels", "Social"],
  },
  {
    name: "OBS Studio & Streamlabs",
    description:
      "Live streaming and broadcast management for content production.",
    icon: "radio",
    tags: ["Streaming", "Broadcast", "Live"],
  },
  {
    name: "TikTok Live Studio",
    description:
      "Mobile-first live streaming platform for real-time audience engagement.",
    icon: "smartphone",
    tags: ["Live", "Mobile", "Engagement"],
  },
  {
    name: "FL Studio",
    description:
      "Digital audio workstation for music production and audio editing.",
    icon: "music",
    tags: ["Audio", "Music", "Production"],
  },
  {
    name: "Canva",
    description:
      "Rapid graphic design for social media feeds, stories, and marketing materials.",
    icon: "shapes",
    tags: ["Social Media", "Design", "Quick"],
  },
  {
    name: "Microsoft Office Suite",
    description:
      "Word, Excel, PowerPoint for documentation, reports, and presentations.",
    icon: "file-text",
    tags: ["Word", "Excel", "PowerPoint"],
  },
];

export const programmingSkills = [
  { name: "HTML", level: "Intermediate" },
  { name: "CSS", level: "Intermediate" },
  { name: "JavaScript", level: "Intermediate" },
  { name: "TypeScript", level: "Intermediate" },
  { name: "React", level: "Intermediate" },
  { name: "Next.js", level: "Intermediate" },
  { name: "Node.js", level: "Intermediate" },
  { name: "C++", level: "Intermediate" },
];

export const disciplines = [
  "Video Editing",
  "Photography",
  "Videography",
  "Graphic Design",
  "Broadcast Management",
  "Live Streaming",
  "IT Support",
  "Content Creation",
  "Social Media Management",
  "Technical Troubleshooting",
  "Project Management",
  "Programming",
];

export const languages = [
  { name: "Indonesian", level: "Native" },
  { name: "English", level: "Basic" },
];

export const interests = [
  "Programming",
  "Live Streaming",
  "Creative Media Production",
  "Project Management",
];

/* ───────────────────────────────────────────────
   Works / Portfolio (placeholder - update with real works)
   ────────────────────────────────────────────── */
export type Work = {
  title: string;
  client: string;
  category: string;
  image: string;
  type: "image" | "video";
  link?: string;
  description?: string;
};

export const works: Work[] = [
  {
    title: "Multimedia Content Production",
    client: "JEV (Jasa Edit Video)",
    category: "Video Editing · Broadcast",
    image:
      "https://images.pexels.com/photos/12757209/pexels-photo-12757209.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    type: "video",
    link: "",
    description:
      "Professional multimedia video editing for JEV clients. Includes cinematic color grading, audio balancing, and dynamic motion graphics tailored for YouTube and social media.",
  },
  {
    title: "Broadcast Configuration & Audio",
    client: "Live Production",
    category: "Streaming · Audio",
    image:
      "https://images.pexels.com/photos/36920917/pexels-photo-36920917.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    type: "video",
    link: "",
    description:
      "Multi-camera live streaming configuration using OBS Studio and FL Studio for zero-latency, high-definition broadcast audio and video output.",
  },
  {
    title: "Creative Content Strategy",
    client: "HG Adventure",
    category: "Social Media · Photography",
    image:
      "https://images.pexels.com/photos/31681666/pexels-photo-31681666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    type: "image",
    link: "",
    description:
      "Visual content strategy, outdoor adventure photography, and short-form reels editing to boost brand engagement for outdoor exploration campaigns.",
  },
  {
    title: "Digital Design & Marketing Assets",
    client: "HG Adventure",
    category: "Graphic Design · Marketing",
    image:
      "https://images.pexels.com/photos/29546725/pexels-photo-29546725.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    type: "image",
    link: "",
    description:
      "Digital promotional materials, Instagram feed carousels, marketing posters, and social media banners created using Figma, Photoshop, and Canva.",
  },
  {
    title: "Technical Documentation",
    client: "The Lodge Maribaya",
    category: "IT Support · Documentation",
    image:
      "https://images.pexels.com/photos/34037222/pexels-photo-34037222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    type: "image",
    link: "",
    description:
      "Comprehensive IT system documentation, network operational guidelines, and video tutorials for hospitality infrastructure.",
  },
  {
    title: "Multimedia Design Projects",
    client: "SMK Bina Wisata Lembang",
    category: "Design · Multimedia",
    image:
      "https://images.pexels.com/photos/3850210/pexels-photo-3850210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    type: "image",
    link: "",
    description:
      "Visual branding design, interactive presentation materials, and documentary video covering vocational school educational activities.",
  },
];

/* ───────────────────────────────────────────────
   Media Showcase (placeholder)
   ─────────────────────────────────────────────── */
export type MediaItem = {
  title: string;
  description: string;
  type: "youtube" | "twitch" | "tiktok" | "instagram" | "video";
  embedUrl: string;
  thumbnail: string;
  duration?: string;
  tags: string[];
};

export const mediaShowcase: MediaItem[] = [
  {
    title: "Video Editing Showcase",
    description:
      "Contoh hasil editing video multimedia untuk klien JEV. Menggunakan CapCut, OBS, dan FL Studio.",
    type: "video",
    embedUrl: "",
    thumbnail:
      "https://images.pexels.com/photos/2098989/pexels-photo-2098989.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    duration: "03:22",
    tags: ["Video Editing", "CapCut", "OBS"],
  },
  {
    title: "Broadcast & Streaming Setup",
    description:
      "Konfigurasi broadcast live streaming dengan OBS Studio dan Streamlabs untuk produksi konten berkualitas tinggi.",
    type: "video",
    embedUrl: "",
    thumbnail:
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    duration: "05:15",
    tags: ["Broadcast", "Streaming", "OBS"],
  },
  {
    title: "Creative Content Production",
    description:
      "Proses produksi konten kreatif untuk HG Adventure — dari konsep hingga publikasi di media sosial.",
    type: "video",
    embedUrl: "",
    thumbnail:
      "https://images.pexels.com/photos/382297/pexels-photo-382297.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    duration: "04:30",
    tags: ["Content", "Photography", "Videography"],
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
    name: "Instagram",
    url: profile.instagramHref,
    icon: "instagram",
    description: "Portfolio & behind the scenes",
  },
  {
    name: "Email",
    url: `mailto:${profile.email}`,
    icon: "mail",
    description: "Business inquiries",
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
  { value: "commission", label: "Jasa Edit Video" },
  { value: "collab", label: "Kolaborasi Konten" },
  { value: "sponsor", label: "Sponsorship / Partnership" },
  { value: "it", label: "IT Support / Konsultasi" },
  { value: "design", label: "Jasa Desain Grafis" },
  { value: "other", label: "Lainnya" },
];

/* ───────────────────────────────────────────────
   Statistik
   ─────────────────────────────────────────────── */
export const stats = [
  { value: "05", label: "Pengalaman\nKerja" },
  { value: "40+", label: "Proyek\nKreatif" },
  { value: "04", label: "Organisasi\nAktif" },
  { value: "02", label: "Institusi\nPendidikan" },
];

/* ───────────────────────────────────────────────
   Stub untuk komponen arsip (Guidelines, Lore)
   Kedua komponen ini tidak dipakai di App saat ini.
   ─────────────────────────────────────────────── */
export type GuidelineSection = {
  icon: string;
  tone: string;
  title: string;
  rules: string[];
};

export const guidelines: GuidelineSection[] = [];

export type LoreEntry = {
  icon: string;
  chapter: string;
  title: string;
  content: string;
};

export const lore: LoreEntry[] = [];

export const hashtags: string[] = [];
