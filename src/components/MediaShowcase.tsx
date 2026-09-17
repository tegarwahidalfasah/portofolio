import { useState } from "react";
import { Play, X, Clock, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { useCms } from "../cms/store";
import type { MediaItem } from "../cms/defaults";

function MediaCard({ item, onPlay, playLabel }: { item: MediaItem; onPlay: () => void; playLabel: string }) {
  return (
    <article className="glass-card glass-hover group relative overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-t-3xl">
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-transparent" />

        {/* Play button */}
        <button
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={playLabel}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-glass-border bg-white/80 dark:bg-slate-950/80 text-accent-600 shadow-xl backdrop-blur-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
            <Play size={22} fill="currentColor" />
          </span>
        </button>

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
        <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
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

  return (
    <section id="media" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 07" title={t.mediaLabel} />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            {mediaSection.titleA} <span className="gradient-text">{mediaSection.titleB}</span> {mediaSection.titleC}
          </h2>
          <p className="mt-3 max-w-md text-text-secondary">
            {mediaSection.description}
          </p>
        </Reveal>

        {/* Media grid */}
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mediaShowcase.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * i}>
                <MediaCard item={item} onPlay={() => setActive(item)} playLabel={`${t.play} ${item.title}`} />
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
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="mx-4 w-full max-w-4xl overflow-hidden rounded-3xl border border-glass-border bg-white/90 dark:bg-slate-950/90 shadow-2xl backdrop-blur-xl"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-glass-300/50 px-5 py-4">
                <h3 className="font-display text-base font-bold text-text-primary">
                  {active.title}
                </h3>
                <button
                  onClick={() => setActive(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-300 bg-white/80 dark:bg-slate-950/80 text-text-secondary transition-colors hover:bg-glass-100 hover:text-text-primary"
                  aria-label={t.close}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="video-embed">
                <iframe
                  src={active.embedUrl}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
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
