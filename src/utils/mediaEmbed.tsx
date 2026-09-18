import { ExternalLink, Film, Image as ImageIcon, Video } from "lucide-react";
import {
  YouTubeIcon,
  TikTokIcon,
  InstagramIcon,
  TwitchIcon,
} from "../components/PlatformIcons";

export type PlatformType =
  | "youtube"
  | "tiktok"
  | "instagram"
  | "twitch"
  | "video"
  | "image"
  | "link"
  | "none";

export interface ParsedYouTube {
  platform: "youtube";
  videoId: string;
  isShort: boolean;
  embedUrl: string;
  thumbnailUrl: string;
  maxresThumbnailUrl: string;
  directUrl: string;
}

export interface ParsedTikTok {
  platform: "tiktok";
  videoId?: string;
  embedUrl?: string;
  directUrl: string;
  isVertical: boolean;
}

export interface ParsedInstagram {
  platform: "instagram";
  shortcode?: string;
  isReel: boolean;
  embedUrl?: string;
  directUrl: string;
  isVertical: boolean;
}

export interface ParsedTwitch {
  platform: "twitch";
  videoId?: string;
  directUrl: string;
}

/**
 * Ekstraksi ID video YouTube dari berbagai format link:
 * - youtube.com/watch?v=ID
 * - youtu.be/ID
 * - youtube.com/shorts/ID
 * - youtube.com/embed/ID
 * - m.youtube.com/watch?v=ID
 */
export function parseYouTube(url?: string | null): ParsedYouTube | null {
  if (!url) return null;
  const clean = url.trim();
  const match = clean.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/i
  );
  if (!match) return null;
  const videoId = match[1];
  const isShort = /\/shorts\//i.test(clean);
  return {
    platform: "youtube",
    videoId,
    isShort,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    maxresThumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    directUrl: isShort
      ? `https://www.youtube.com/shorts/${videoId}`
      : `https://www.youtube.com/watch?v=${videoId}`,
  };
}

/**
 * Ekstraksi link TikTok:
 * - tiktok.com/@username/video/123456789
 * - tiktok.com/@username/photo/123456789
 * - tiktok.com/v/123456789
 * - vm.tiktok.com/CODE/
 * - vt.tiktok.com/CODE/
 */
export function parseTikTok(url?: string | null): ParsedTikTok | null {
  if (!url) return null;
  const clean = url.trim();
  if (!/tiktok\.com/i.test(clean)) return null;

  const idMatch = clean.match(/\/(?:video|photo|v|embed\/v2)\/(\d+)/i);
  const videoId = idMatch ? idMatch[1] : undefined;

  return {
    platform: "tiktok",
    videoId,
    embedUrl: videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : undefined,
    directUrl: clean,
    isVertical: true,
  };
}

/**
 * Ekstraksi link Instagram:
 * - instagram.com/p/SHORTCODE/
 * - instagram.com/reel/SHORTCODE/
 * - instagram.com/tv/SHORTCODE/
 * - instagr.am/p/SHORTCODE/
 */
export function parseInstagram(url?: string | null): ParsedInstagram | null {
  if (!url) return null;
  const clean = url.trim();
  if (!/(?:instagram\.com|instagr\.am)/i.test(clean)) return null;

  const match = clean.match(/\/(?:p|reel|reels|tv)\/([a-zA-Z0-9_-]+)/i);
  const shortcode = match ? match[1] : undefined;
  const isReel = /\/reel/i.test(clean);

  return {
    platform: "instagram",
    shortcode,
    isReel,
    embedUrl: shortcode ? `https://www.instagram.com/p/${shortcode}/embed` : undefined,
    directUrl: shortcode ? `https://www.instagram.com/p/${shortcode}/` : clean,
    isVertical: isReel,
  };
}

export function parseTwitch(url?: string | null): ParsedTwitch | null {
  if (!url) return null;
  const clean = url.trim();
  if (!/twitch\.tv/i.test(clean)) return null;
  const videoMatch = clean.match(/\/videos\/(\d+)/i);
  return {
    platform: "twitch",
    videoId: videoMatch ? videoMatch[1] : undefined,
    directUrl: clean,
  };
}

export function isDirectVideo(url?: string | null): boolean {
  if (!url) return false;
  const clean = url.trim().toLowerCase();
  return (
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(clean) ||
    clean.endsWith(".mp4") ||
    clean.endsWith(".webm")
  );
}

export function isDirectImage(url?: string | null): boolean {
  if (!url) return false;
  const clean = url.trim();
  return (
    /\.(jpg|jpeg|png|webp|gif|svg|avif|bmp)(\?.*)?$/i.test(clean) ||
    clean.includes("images.pexels.com") ||
    clean.includes("images.unsplash.com") ||
    clean.startsWith("/") ||
    clean.startsWith("data:image/")
  );
}

export function detectPlatform(url?: string | null): PlatformType {
  if (!url) return "none";
  if (parseYouTube(url)) return "youtube";
  if (parseTikTok(url)) return "tiktok";
  if (parseInstagram(url)) return "instagram";
  if (parseTwitch(url)) return "twitch";
  if (isDirectVideo(url)) return "video";
  if (isDirectImage(url)) return "image";
  if (/^https?:\/\//i.test(url.trim())) return "link";
  return "none";
}

export type ResolvedMedia = {
  platform: PlatformType;
  platformName: string;
  thumbnailUrl: string;
  embedUrl?: string;
  directUrl?: string;
  isVertical?: boolean;
  isVideo: boolean;
};

/**
 * Resolusi menyeluruh untuk media karya (Work):
 * Memeriksa link dan gambar, mendeteksi platform sosial media (TikTok, YouTube, Instagram),
 * serta menyediakan thumbnail otomatis jika memakai YouTube dan foto kosong.
 */
export function resolveWorkMedia(work: {
  image?: string;
  link?: string;
  type?: "image" | "video";
}): ResolvedMedia {
  const link = (work.link || "").trim();
  const rawImage = (work.image || "").trim();

  // 1. Cek dari link karya terlebih dahulu
  const ytFromLink = parseYouTube(link);
  const ttFromLink = parseTikTok(link);
  const igFromLink = parseInstagram(link);

  // 2. Antisipasi jika user memasukkan link sosmed langsung di kolom URL gambar
  const ytFromImg = !ytFromLink ? parseYouTube(rawImage) : null;
  const ttFromImg = !ttFromLink ? parseTikTok(rawImage) : null;
  const igFromImg = !igFromLink ? parseInstagram(rawImage) : null;

  // Prioritas: YouTube
  if (ytFromLink || ytFromImg) {
    const yt = (ytFromLink || ytFromImg)!;
    // Jika gambar bukan link sosmed dan valid gambar, pakai gambar itu. Jika kosong/link YT, pakai thumbnail YT
    const thumbnail = isDirectImage(rawImage) && !ytFromImg ? rawImage : yt.thumbnailUrl;
    return {
      platform: "youtube",
      platformName: "YouTube",
      thumbnailUrl: thumbnail,
      embedUrl: yt.embedUrl,
      directUrl: yt.directUrl,
      isVertical: yt.isShort,
      isVideo: true,
    };
  }

  // Prioritas: TikTok
  if (ttFromLink || ttFromImg) {
    const tt = (ttFromLink || ttFromImg)!;
    const thumbnail = isDirectImage(rawImage) && !ttFromImg ? rawImage : "";
    return {
      platform: "tiktok",
      platformName: "TikTok",
      thumbnailUrl: thumbnail,
      embedUrl: tt.embedUrl,
      directUrl: tt.directUrl,
      isVertical: true,
      isVideo: true,
    };
  }

  // Prioritas: Instagram
  if (igFromLink || igFromImg) {
    const ig = (igFromLink || igFromImg)!;
    const thumbnail = isDirectImage(rawImage) && !igFromImg ? rawImage : "";
    return {
      platform: "instagram",
      platformName: "Instagram",
      thumbnailUrl: thumbnail,
      embedUrl: ig.embedUrl,
      directUrl: ig.directUrl,
      isVertical: ig.isReel,
      isVideo: ig.isReel || work.type === "video",
    };
  }

  // Prioritas: Video file langsung (.mp4, .webm)
  if (isDirectVideo(link) || isDirectVideo(rawImage)) {
    const videoUrl = isDirectVideo(link) ? link : rawImage;
    return {
      platform: "video",
      platformName: "Video",
      thumbnailUrl: isDirectImage(rawImage) && !isDirectVideo(rawImage) ? rawImage : "",
      embedUrl: videoUrl,
      directUrl: videoUrl,
      isVertical: false,
      isVideo: true,
    };
  }

  // Standar: Gambar atau link website biasa
  return {
    platform: link ? "link" : "image",
    platformName: link ? "Tautan Karya" : "Foto",
    thumbnailUrl: rawImage,
    embedUrl: undefined,
    directUrl: link || rawImage,
    isVertical: false,
    isVideo: work.type === "video",
  };
}

/**
 * Konversi otomatis link input biasa ke format embed (mis. untuk Showcase video)
 */
export function convertToEmbedUrl(url: string): { embedUrl: string; type: "youtube" | "tiktok" | "instagram" | "video" } | null {
  if (!url) return null;
  const clean = url.trim();
  const yt = parseYouTube(clean);
  if (yt) {
    return { embedUrl: yt.embedUrl, type: "youtube" };
  }
  const tt = parseTikTok(clean);
  if (tt && tt.embedUrl) {
    return { embedUrl: tt.embedUrl, type: "tiktok" };
  }
  const ig = parseInstagram(clean);
  if (ig && ig.embedUrl) {
    return { embedUrl: ig.embedUrl, type: "instagram" };
  }
  if (isDirectVideo(clean)) {
    return { embedUrl: clean, type: "video" };
  }
  return null;
}

/**
 * Ikon platform sesuai jenisnya
 */
export function PlatformMediaIcon({
  platform,
  size = 14,
  className = "",
}: {
  platform: PlatformType;
  size?: number;
  className?: string;
}) {
  switch (platform) {
    case "youtube":
      return <YouTubeIcon size={size} className={className} />;
    case "tiktok":
      return <TikTokIcon size={size} className={className} />;
    case "instagram":
      return <InstagramIcon size={size} className={className} />;
    case "twitch":
      return <TwitchIcon size={size} className={className} />;
    case "video":
      return <Video size={size} className={className} />;
    case "image":
      return <ImageIcon size={size} className={className} />;
    default:
      return <ExternalLink size={size} className={className} />;
  }
}

/**
 * Badge penanda platform sosial media
 */
export function PlatformPill({
  platform,
  className = "",
}: {
  platform: PlatformType;
  className?: string;
}) {
  switch (platform) {
    case "youtube":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/15 px-2.5 py-1 font-mono text-[11px] font-semibold text-red-400 ${className}`}
        >
          <YouTubeIcon size={13} />
          YouTube
        </span>
      );
    case "tiktok":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-slate-900/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan-300 shadow-sm ${className}`}
        >
          <TikTokIcon size={13} />
          TikTok
        </span>
      );
    case "instagram":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-amber-500/20 px-2.5 py-1 font-mono text-[11px] font-semibold text-pink-300 ${className}`}
        >
          <InstagramIcon size={13} />
          Instagram
        </span>
      );
    case "twitch":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/15 px-2.5 py-1 font-mono text-[11px] font-semibold text-purple-300 ${className}`}
        >
          <TwitchIcon size={13} />
          Twitch
        </span>
      );
    case "video":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/15 px-2.5 py-1 font-mono text-[11px] font-semibold text-sky-300 ${className}`}
        >
          <Film size={13} />
          Video
        </span>
      );
    case "image":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-300 ${className}`}
        >
          <ImageIcon size={13} />
          Foto
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-2.5 py-1 font-mono text-[11px] font-semibold text-indigo-300 ${className}`}
        >
          <ExternalLink size={13} />
          Link
        </span>
      );
  }
}
