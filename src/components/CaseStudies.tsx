import { ArrowRight, Play } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { works } from "../data";

const categories = ["Desain", "Foto", "Video", "Sosial Media"];

export function CaseStudies() {
  return (
    <section className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center justify-between">
            <SectionLabel index="// 02" title="Featured Case Studies" />
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-300 bg-white/60 text-text-secondary backdrop-blur-xl transition-all hover:border-accent-400 hover:text-accent-600">
              <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>

        {/* Category filter */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`rounded-full px-4 py-2 font-display text-xs font-semibold transition-all ${
                  i === 0
                    ? "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25"
                    : "border border-glass-300 bg-white/60 text-text-secondary backdrop-blur-xl hover:border-accent-400 hover:text-accent-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Horizontal scroll cards */}
        <div className="scroll-hide mt-8 flex gap-6 overflow-x-auto pb-6">
          {works.map((work, i) => (
            <Reveal key={work.title} delay={0.08 * i}>
              <article className="glass-card glass-hover group w-[320px] shrink-0 overflow-hidden sm:w-[380px]">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
                  
                  {/* Number badge */}
                  <span className="absolute left-4 top-4 font-display text-sm font-bold text-white/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Type badge */}
                  {work.type === "video" && (
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xl">
                      <Play size={14} fill="currentColor" />
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold tracking-tight text-text-primary">
                    {work.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    {work.client}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="rounded-full bg-glass-100 px-3 py-1 font-mono text-[10px] font-medium text-text-secondary">
                      {work.category}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
