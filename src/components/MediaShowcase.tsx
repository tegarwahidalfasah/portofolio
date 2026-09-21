import { useState } from "react";
import { Play, X, Clock, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { useCms } from "../cms/store";
import type { MediaItem } from "../cms/defaults";
import {
  parseYouTube,
  isDirectVideo,
  PlatformMediaIcon,
} from "../utils/mediaEmbed";
import { TikTokIcon, InstagramIcon, YouTubeIcon } from "./PlatformIcons";

function MediaCard({
  item,
  onPlay,
  playLabel,
  playable,
  soonLabel,
}: {
  item: MediaItem;
  onPlay: () => void;
  playLabel: string;
  playable: boolean;
  soonLabel: string;
}) {
  // Cek thumbnail YouTube otomatis jika thumbnail kosong
  let displayThumb = item.thumbnail;
  if (!displayThumb && item.embedUrl) {
    const yt = parseYouTube(item.embedUrl);
    if (yt) displayThumb = yt.thumbnailUrl;
  }

  return (
    <article className="glass-card glass-hover group relative overflow-hidden rounded-3xl">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-t-3xl bg-slate-900">
        {displayThumb ? (
          <img
            src={displayThumb}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6 text-center">
            {item.type === "tiktok" && (
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300">
                <TikTokIcon size={30} />
              </span>
            )}
            {item.type === "instagram" && (
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/30 via-pink-500/30 to-purple-500/30 text-pink-300">
                <InstagramIcon size={30} />
              </span>
            )}
            {item.type === "youtube" && (
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-red-400">
                <YouTubeIcon size={30} />
              </span>
            )}
            {item.type !== "tiktok" &&
              item.type !== "instagram" &&
              item.type !== "youtube" && (
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
                  <Play size={24} />
                </span>
              )}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-transparent pointer-events-none" />

        {/* Play button / segera hadir */}
        {playable ? (
          <button
            onClick={onPlay}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={playLabel}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-glass-border bg-white/80 dark:bg-slate-950/80 text-accent-600 shadow-xl backdrop-blur-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
              <Play size={22} fill="currentColor" />
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-glass-border bg-white/80 dark:bg-slate-950/80 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-text-secondary shadow-xl backdrop-blur-xl">
              {soonLabel}
            </span>
          </div>
        )}

        {/* Duration badge */}
        {item.duration && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-slate-950/80 px-3 py-1.5 shadow-lg backdrop-blur-xl">
            <Clock size={11} className="text-text-secondary" />
            <span className="font-mono text-xs font-semibold text-text-primary">
              {item.duration}
            </span>
          </span>
        )}

        {/* Type badge */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          <PlatformMediaIcon platform={item.type as any} size={11} />
          {item.type}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display text-base font-bold text-text-primary">
          {item.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
          {item.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-glass-100 px-2.5 py-1 font-mono text-[10px] text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function MediaShowcase() {
  const { mediaShowcase, mediaSection } = useCms().content;
  const { t } = useCms();
  const [active, setActive] = useState<MediaItem | null>(null);

  const isVertical =
    active &&
    (active.type === "tiktok" ||
      active.type === "instagram" ||
      (active.embedUrl && /\/shorts\//i.test(active.embedUrl)));

  return (
    <section id="media" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 10" title={t.mediaLabel} />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            {mediaSection.titleA}{" "}
            <span className="gradient-text">{mediaSection.titleB}</span>{" "}
            {mediaSection.titleC}
          </h2>
          <p className="mt-3 max-w-md text-text-secondary">
            {mediaSection.description}
          </p>
        </Reveal>

        {/* Media grid */}
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mediaShowcase.map((item, i) => (
              <Reveal key={item.title + i} delay={0.08 * i}>
                <MediaCard
                  item={item}
                  onPlay={() => setActive(item)}
                  playLabel={`${t.play} ${item.title}`}
                  playable={Boolean(item.embedUrl)}
                  soonLabel={t.mediaSoon}
                />
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={mediaSection.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-7 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-xl"
            >
              <ExternalLink size={16} />
              {mediaSection.youtubeLabel}
            </a>
            <a
              href={mediaSection.twitchUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full border border-glass-300 bg-white/60 dark:bg-slate-950/60 px-7 py-3.5 font-display text-sm font-semibold text-text-primary backdrop-blur-xl transition-all hover:border-accent-400"
            >
              <ExternalLink size={16} />
              {mediaSection.twitchLabel}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className={`relative mx-auto w-full overflow-hidden rounded-3xl border border-glass-border bg-white/95 dark:bg-slate-950/95 shadow-2xl backdrop-blur-2xl transition-all ${
                isVertical ? "max-w-lg" : "max-w-4xl"
              }`}
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-glass-300/50 px-5 py-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold text-text-primary">
                    {active.title}
                  </h3>
                  <span className="rounded-full bg-accent-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-accent-500 uppercase">
                    {active.type}
                  </span>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-300 bg-white/80 dark:bg-slate-950/80 text-text-secondary transition-colors hover:bg-glass-100 hover:text-text-primary"
                  aria-label={t.close}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Embed Container */}
              <div className="bg-black">
                {active.type === "tiktok" ? (
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-950">
                    <div className="w-full max-w-[340px] aspect-[9/16] max-h-[65vh] overflow-hidden rounded-2xl bg-black">
                      <iframe
                        src={active.embedUrl}
                        title={active.title}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : active.type === "instagram" ? (
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-950">
                    <div className="w-full max-w-[420px] min-h-[460px] max-h-[68vh] overflow-hidden rounded-2xl bg-white">
                      <iframe
                        src={active.embedUrl}
                        title={active.title}
                        className="h-full w-full border-0 min-h-[460px]"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : isDirectVideo(active.embedUrl) ? (
                  <div className="max-h-[75vh] w-full flex items-center justify-center bg-black">
                    <video
                      src={active.embedUrl}
                      controls
                      autoPlay
                      className="max-h-[72vh] w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="video-embed aspect-video w-full">
                    <iframe
                      src={active.embedUrl}
                      title={active.title}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              <div className="p-5">
                <p className="text-sm text-text-secondary">{active.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-glass-100 px-2.5 py-1 font-mono text-[10px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
