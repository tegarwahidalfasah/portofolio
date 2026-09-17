import { useState } from "react";
import { Play, X, Clock, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { mediaShowcase } from "../data";
import type { MediaItem } from "../data";

function MediaCard({ item, onPlay }: { item: MediaItem; onPlay: () => void }) {
  return (
    <article className="card-hover group relative overflow-hidden rounded-3xl border border-navy-900/10 bg-navy-900">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

        {/* Play button overlay */}
        <button
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`Putar ${item.title}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/90 text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-500">
            <Play size={24} fill="currentColor" />
          </span>
        </button>

        {/* Duration badge */}
        {item.duration && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-navy-950/80 px-2.5 py-1 backdrop-blur">
            <Clock size={12} className="text-cream-100/70" />
            <span className="font-mono text-xs text-cream-50">{item.duration}</span>
          </span>
        )}

        {/* Type badge */}
        <span className="absolute left-3 top-3 rounded-full bg-accent-500 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-white">
          {item.type}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold text-cream-50">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-cream-100/60">
          {item.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cream-100/10 px-2.5 py-1 font-mono text-[10px] text-cream-100/50"
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
  const [active, setActive] = useState<MediaItem | null>(null);

  return (
    <section
      id="media"
      className="grain relative overflow-hidden bg-navy-950 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-1/4 h-80 w-80 rounded-full bg-accent-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="// 05" title="Media & Highlight" tone="dark" />
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-tight tracking-tight text-cream-50 sm:text-5xl">
              Cuplikan{" "}
              <span className="font-accent font-normal italic text-brand-400">
                stream
              </span>{" "}
              & showcase
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-cream-100/60">
              Tonton highlight stream Sora Wirya, sampel hasil editing video,
              dan momen seru bersama komunitas. Klik untuk memutar!
            </p>
          </Reveal>
        </div>

        {/* Media grid */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mediaShowcase.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * i}>
                <MediaCard item={item} onPlay={() => setActive(item)} />
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://youtube.com/@sorawirya"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              <ExternalLink size={16} />
              Lihat Semua di YouTube
            </a>
            <a
              href="https://twitch.tv/sorawirya"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full border border-cream-100/25 px-7 py-3.5 font-display text-sm font-semibold text-cream-50 transition-colors hover:border-accent-400 hover:text-accent-400"
            >
              <ExternalLink size={16} />
              Live di Twitch
            </a>
          </div>
        </Reveal>
      </div>

      {/* Lightbox / Video Player Modal */}
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
              className="mx-4 w-full max-w-4xl overflow-hidden rounded-3xl bg-navy-900 shadow-2xl"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex items-center justify-between border-b border-cream-100/10 px-5 py-4">
                <h3 className="font-display text-base font-semibold text-cream-50">
                  {active.title}
                </h3>
                <button
                  onClick={() => setActive(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-100/15 text-cream-100/70 transition-colors hover:bg-cream-100/10 hover:text-cream-50"
                  aria-label="Tutup"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video embed */}
              <div className="video-embed">
                <iframe
                  src={active.embedUrl}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Description */}
              <div className="p-5">
                <p className="text-sm text-cream-100/60">{active.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cream-100/10 px-2.5 py-1 font-mono text-[10px] text-cream-100/50"
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
