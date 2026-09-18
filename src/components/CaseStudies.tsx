import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Play, X, ExternalLink, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { useCms } from "../cms/store";
import type { Work } from "../cms/defaults";
import {
  resolveWorkMedia,
  PlatformMediaIcon,
  PlatformPill,
} from "../utils/mediaEmbed";
import {
  YouTubeIcon,
  TikTokIcon,
  InstagramIcon,
} from "./PlatformIcons";

export function CaseStudies() {
  const { works } = useCms().content;
  const { t } = useCms();
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [activeWork, setActiveWork] = useState<Work | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: t.allWorks },
    { id: "video", label: t.catVideo },
    { id: "design", label: t.catDesign },
    { id: "photo", label: t.catPhoto },
    { id: "social", label: t.catSocial },
  ];

  // Hitung jumlah karya per kategori untuk badge filter
  const counts: Record<string, number> = {
    all: works.length,
    video: works.filter(
      (w) =>
        w.type === "video" ||
        w.category.toLowerCase().includes("video") ||
        w.category.toLowerCase().includes("broadcast") ||
        w.category.toLowerCase().includes("stream")
    ).length,
    design: works.filter(
      (w) =>
        w.category.toLowerCase().includes("design") ||
        w.category.toLowerCase().includes("desain") ||
        w.category.toLowerCase().includes("grafis")
    ).length,
    photo: works.filter(
      (w) =>
        w.category.toLowerCase().includes("photo") ||
        w.category.toLowerCase().includes("foto")
    ).length,
    social: works.filter(
      (w) =>
        w.category.toLowerCase().includes("social") ||
        w.category.toLowerCase().includes("sosial") ||
        w.category.toLowerCase().includes("media")
    ).length,
  };

  // Filter cards berdasarkan kategori aktif
  const filteredWorks = works.filter((w) => {
    if (selectedCat === "all") return true;
    const cat = w.category.toLowerCase();
    const type = w.type.toLowerCase();
    if (selectedCat === "video")
      return (
        type === "video" ||
        cat.includes("video") ||
        cat.includes("broadcast") ||
        cat.includes("stream")
      );
    if (selectedCat === "design")
      return cat.includes("design") || cat.includes("desain") || cat.includes("grafis");
    if (selectedCat === "photo")
      return cat.includes("photo") || cat.includes("foto");
    if (selectedCat === "social")
      return cat.includes("social") || cat.includes("sosial") || cat.includes("media");
    return true;
  });

  const handleScrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 20) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  // Keyboard escape to close modal
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveWork(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (activeWork) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeWork]);

  const activeMedia = activeWork ? resolveWorkMedia(activeWork) : null;

  return (
    <section id="karya" className="relative scroll-mt-20 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center justify-between">
            <SectionLabel index="// 02" title={t.csLabel} />
            <div className="flex items-center gap-2">
              <button
                onClick={handleScrollLeft}
                aria-label="Geser ke kiri"
                title="Geser daftar karya ke kiri"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-300 bg-white/60 dark:bg-slate-950/60 text-text-secondary backdrop-blur-xl transition-all hover:border-accent-400 hover:text-accent-600 hover:scale-105"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={handleScrollRight}
                aria-label="Geser ke kanan"
                title="Geser daftar karya ke kanan"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-300 bg-white/60 dark:bg-slate-950/60 text-text-secondary backdrop-blur-xl transition-all hover:border-accent-400 hover:text-accent-600 hover:scale-105"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Category filter */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedCat === cat.id;
              const count = counts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`rounded-full px-4 py-2 font-display text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    active
                      ? "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25 scale-[1.02]"
                      : "border border-glass-300 bg-white/60 dark:bg-slate-950/60 text-text-secondary backdrop-blur-xl hover:border-accent-400 hover:text-accent-600"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                      active ? "bg-white/20 text-white" : "bg-glass-200 text-text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Horizontal scroll cards */}
        {filteredWorks.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-glass-300 p-12 text-center">
            <p className="font-display text-base text-text-muted">
              Tidak ada karya dalam kategori ini.
            </p>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="scroll-hide mt-8 flex gap-6 overflow-x-auto pb-6 pt-2"
          >
            {filteredWorks.map((work, i) => {
              const media = resolveWorkMedia(work);
              const hasLink = Boolean(work.link || media.directUrl);

              return (
                <Reveal key={work.title + i} delay={0.06 * Math.min(i, 6)}>
                  <article
                    onClick={() => setActiveWork(work)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveWork(work);
                      }
                    }}
                    className="glass-card glass-hover group relative w-[320px] shrink-0 cursor-pointer overflow-hidden rounded-3xl text-left transition-all duration-300 hover:-translate-y-1 sm:w-[380px]"
                  >
                    {/* Media Thumbnail Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      {media.thumbnailUrl ? (
                        <img
                          src={media.thumbnailUrl}
                          alt={work.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        /* Branded Fallback if no image provided (mis. TikTok / Instagram URL) */
                        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                          {media.platform === "tiktok" && (
                            <div className="flex flex-col items-center gap-2">
                              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 shadow-inner">
                                <TikTokIcon size={30} />
                              </span>
                              <span className="font-mono text-xs text-cyan-200">
                                TikTok Video
                              </span>
                            </div>
                          )}
                          {media.platform === "instagram" && (
                            <div className="flex flex-col items-center gap-2">
                              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/30 via-pink-500/30 to-purple-500/30 text-pink-300 shadow-inner">
                                <InstagramIcon size={30} />
                              </span>
                              <span className="font-mono text-xs text-pink-200">
                                Instagram Post / Reel
                              </span>
                            </div>
                          )}
                          {media.platform === "youtube" && (
                            <div className="flex flex-col items-center gap-2">
                              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-red-400 shadow-inner">
                                <YouTubeIcon size={30} />
                              </span>
                              <span className="font-mono text-xs text-red-200">
                                YouTube Video
                              </span>
                            </div>
                          )}
                          {media.platform !== "tiktok" &&
                            media.platform !== "instagram" &&
                            media.platform !== "youtube" && (
                              <div className="flex flex-col items-center gap-2">
                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
                                  <Play size={24} />
                                </span>
                                <span className="font-mono text-xs text-indigo-200">
                                  {work.title}
                                </span>
                              </div>
                            )}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                      {/* Number badge */}
                      <span className="absolute left-4 top-4 rounded-full bg-slate-950/60 px-2.5 py-0.5 font-mono text-xs font-bold text-white/90 backdrop-blur-md">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Platform Badge on top right */}
                      <div className="absolute right-4 top-4 flex items-center gap-1.5">
                        {media.platform === "youtube" && (
                          <span className="flex items-center gap-1 rounded-full bg-red-600/90 px-2.5 py-1 font-mono text-[10px] font-bold text-white shadow-lg backdrop-blur-md">
                            <YouTubeIcon size={12} />
                            YouTube
                          </span>
                        )}
                        {media.platform === "tiktok" && (
                          <span className="flex items-center gap-1 rounded-full bg-slate-950/85 px-2.5 py-1 font-mono text-[10px] font-bold text-cyan-300 shadow-lg backdrop-blur-md ring-1 ring-cyan-400/40">
                            <TikTokIcon size={12} />
                            TikTok
                          </span>
                        )}
                        {media.platform === "instagram" && (
                          <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-amber-600/90 px-2.5 py-1 font-mono text-[10px] font-bold text-white shadow-lg backdrop-blur-md">
                            <InstagramIcon size={12} />
                            Instagram
                          </span>
                        )}
                        {media.platform === "video" && (
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xl">
                            <Play size={13} fill="currentColor" />
                          </span>
                        )}
                      </div>

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/80 px-4 py-2 font-display text-xs font-bold text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 group-hover:scale-105">
                          {media.isVideo ? (
                            <>
                              <Play size={14} fill="currentColor" />
                              {media.platform === "tiktok"
                                ? t.openTiktok
                                : media.platform === "youtube"
                                ? t.openYoutube
                                : media.platform === "instagram"
                                ? t.openInstagram
                                : t.cardViewMedia}
                            </>
                          ) : (
                            <>
                              <Maximize2 size={13} />
                              {t.cardViewMedia}
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold tracking-tight text-text-primary transition-colors group-hover:text-accent-500">
                        {work.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-muted line-clamp-1">
                        {work.client}
                      </p>
                      {work.description && (
                        <p className="mt-2 text-xs leading-relaxed text-text-secondary/80 line-clamp-2">
                          {work.description}
                        </p>
                      )}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-glass-300/40 pt-3">
                        <span className="rounded-full bg-glass-100 px-3 py-1 font-mono text-[10px] font-medium text-text-secondary">
                          {work.category}
                        </span>
                        {hasLink && (
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-accent-500 group-hover:underline">
                            <PlatformMediaIcon platform={media.platform} size={12} />
                            <ExternalLink size={11} />
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / Modal Karya Interaktif */}
      <AnimatePresence>
        {activeWork && activeMedia && (
          <motion.div
            className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveWork(null)}
          >
            <motion.div
              className={`relative mx-auto w-full max-h-[92vh] flex flex-col overflow-hidden rounded-3xl border border-glass-border bg-white/95 dark:bg-slate-950/95 shadow-2xl backdrop-blur-2xl transition-all ${
                activeMedia.isVertical ? "max-w-lg" : "max-w-4xl"
              }`}
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex shrink-0 items-center justify-between border-b border-glass-300/50 px-5 py-4">
                <div className="min-w-0 pr-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-display text-base font-bold text-text-primary sm:text-lg">
                      {activeWork.title}
                    </h3>
                    <PlatformPill platform={activeMedia.platform} />
                  </div>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {activeWork.client} · {activeWork.category}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Direct Link to original social media / external link */}
                  {activeMedia.directUrl && (
                    <a
                      href={activeMedia.directUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-glass-300 bg-white/80 dark:bg-slate-900/80 px-3.5 py-1.5 font-display text-xs font-semibold text-text-primary transition-all hover:border-accent-400 hover:text-accent-500 shadow-sm"
                    >
                      <PlatformMediaIcon platform={activeMedia.platform} size={13} />
                      {activeMedia.platform === "tiktok"
                        ? "TikTok"
                        : activeMedia.platform === "youtube"
                        ? "YouTube"
                        : activeMedia.platform === "instagram"
                        ? "Instagram"
                        : t.openLink}
                      <ExternalLink size={11} />
                    </a>
                  )}

                  <button
                    onClick={() => setActiveWork(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-300 bg-white/80 dark:bg-slate-900/80 text-text-secondary transition-colors hover:bg-rose-500/20 hover:text-rose-400"
                    aria-label={t.close}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Modal Body */}
              <div className="min-h-0 flex-1 overflow-y-auto">
                {/* Media Content Display */}
                <div className="relative bg-black">
                  {/* 1. YouTube Player */}
                  {activeMedia.platform === "youtube" && activeMedia.embedUrl && (
                    <div className="aspect-video w-full">
                      <iframe
                        src={activeMedia.embedUrl}
                        title={activeWork.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* 2. TikTok Player / Embed */}
                  {activeMedia.platform === "tiktok" && (
                    <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-slate-950">
                      {activeMedia.embedUrl ? (
                        <div className="relative w-full max-w-[340px] aspect-[9/16] max-h-[64vh] overflow-hidden rounded-2xl bg-black shadow-2xl">
                          <iframe
                            src={activeMedia.embedUrl}
                            title={activeWork.title}
                            className="h-full w-full border-0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 mb-4">
                            <TikTokIcon size={36} />
                          </span>
                          <h4 className="font-display text-lg font-bold text-white mb-2">
                            Video TikTok
                          </h4>
                          <p className="text-sm text-slate-400 max-w-xs mb-6">
                            Putar video ini langsung di platform resmi TikTok.
                          </p>
                        </div>
                      )}

                      {activeMedia.directUrl && (
                        <div className="mt-3 flex w-full max-w-[340px] justify-center">
                          <a
                            href={activeMedia.directUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 border border-cyan-500/30 px-4 py-2.5 font-display text-xs font-bold text-cyan-300 transition-all hover:bg-slate-800 hover:border-cyan-400 shadow-lg"
                          >
                            <TikTokIcon size={16} />
                            {t.openTiktok}
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. Instagram Embed / Reel */}
                  {activeMedia.platform === "instagram" && (
                    <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-slate-950">
                      {activeMedia.embedUrl ? (
                        <div className="relative w-full max-w-[420px] min-h-[460px] max-h-[64vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
                          <iframe
                            src={activeMedia.embedUrl}
                            title={activeWork.title}
                            className="h-full w-full border-0 min-h-[460px]"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/30 via-pink-500/30 to-purple-500/30 text-pink-300 mb-4">
                            <InstagramIcon size={36} />
                          </span>
                          <h4 className="font-display text-lg font-bold text-white mb-2">
                            Instagram Post / Reel
                          </h4>
                          <p className="text-sm text-slate-400 max-w-xs mb-6">
                            Lihat postingan atau reels ini langsung di Instagram.
                          </p>
                        </div>
                      )}

                      {activeMedia.directUrl && (
                        <div className="mt-3 flex w-full max-w-[420px] justify-center">
                          <a
                            href={activeMedia.directUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 px-4 py-2.5 font-display text-xs font-bold text-white transition-all hover:opacity-95 shadow-lg"
                          >
                            <InstagramIcon size={16} />
                            {t.openInstagram}
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4. Direct HTML5 Video (.mp4 / .webm) */}
                  {activeMedia.platform === "video" && activeMedia.embedUrl && (
                    <div className="max-h-[70vh] w-full flex items-center justify-center bg-black">
                      <video
                        src={activeMedia.embedUrl}
                        controls
                        autoPlay
                        className="max-h-[68vh] w-full object-contain"
                      />
                    </div>
                  )}

                  {/* 5. Direct Image / Foto */}
                  {(activeMedia.platform === "image" ||
                    activeMedia.platform === "link") && (
                    <div className="max-h-[70vh] w-full flex items-center justify-center bg-slate-950 p-2">
                      {activeMedia.thumbnailUrl ? (
                        <img
                          src={activeMedia.thumbnailUrl}
                          alt={activeWork.title}
                          className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl"
                        />
                      ) : (
                        <div className="py-20 text-center">
                          <p className="text-slate-400 font-display text-sm">
                            {activeWork.title}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Deskripsi Proyek / Karya jika ada */}
                {activeWork.description && (
                  <div className="border-t border-glass-300/40 bg-glass-50/50 p-5">
                    <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1.5">
                      Detail Karya & Proses:
                    </h4>
                    <p className="text-sm leading-relaxed text-text-secondary whitespace-pre-line">
                      {activeWork.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Bar */}
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-glass-300/50 bg-glass-50 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-glass-200 px-3 py-1 font-mono text-[11px] font-medium text-text-secondary">
                    {activeWork.category}
                  </span>
                  <span className="font-mono text-xs text-text-muted">
                    {activeWork.client}
                  </span>
                </div>

                {activeMedia.directUrl && (
                  <a
                    href={activeMedia.directUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-4 py-1.5 font-display text-xs font-semibold text-white shadow-md hover:bg-accent-600 transition-colors"
                  >
                    <PlatformMediaIcon platform={activeMedia.platform} size={13} />
                    {activeMedia.platform === "tiktok"
                      ? "Buka di TikTok"
                      : activeMedia.platform === "youtube"
                      ? "Tonton di YouTube"
                      : activeMedia.platform === "instagram"
                      ? "Buka di Instagram"
                      : t.openLink}
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
