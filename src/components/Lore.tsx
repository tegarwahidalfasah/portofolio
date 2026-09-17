import { Compass, Route, Sparkles, Target } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { lore, referenceSheet, hashtags } from "../data";

const iconMap: Record<string, typeof Compass> = {
  compass: Compass,
  route: Route,
  sparkles: Sparkles,
  target: Target,
};

export function Lore() {
  return (
    <section
      id="lore"
      className="relative overflow-hidden bg-cream-50 py-24 sm:py-32"
    >
      <span
        aria-hidden
        className="text-outline-navy pointer-events-none absolute -left-4 top-8 select-none font-display text-[14vw] font-bold leading-none tracking-tight opacity-50 lg:text-[11rem]"
      >
        LORE
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="// 02" title="Kisah Karakter" />
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-navy-900 sm:text-5xl">
              Kisah di balik{" "}
              <span className="font-accent font-normal italic text-brand-600">
                Sora Wirya
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-navy-600">
              Setiap karakter memiliki cerita. Kenali perjalanan Sora Wirya —
              dari lahir di langit Subang hingga menjadi VTuber yang aktif
              berkarya.
            </p>
          </Reveal>
        </div>

        {/* Timeline Lore */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {lore.map((entry, i) => {
            const Icon = iconMap[entry.icon] || Compass;
            return (
              <Reveal key={entry.chapter} delay={0.1 * i}>
                <article className="card-hover group relative h-full overflow-hidden rounded-3xl border border-navy-900/10 bg-cream-100/80 p-7 hover:border-brand-500/60 hover:shadow-lg">
                  <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-7xl font-bold text-navy-900/5 transition-colors duration-500 group-hover:text-accent-500/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-navy-400">
                      Bab {String(i + 1).padStart(2, "0")} — {entry.chapter}
                    </span>
                  </div>

                  <h3 className="relative mt-5 font-display text-xl font-semibold leading-snug text-navy-900">
                    {entry.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-navy-600">
                    {entry.content}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Reference Sheet Section */}
        <Reveal delay={0.15}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-navy-900/10 bg-navy-900">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative flex items-center justify-center bg-gradient-to-br from-brand-500/20 to-accent-500/20 p-10 sm:p-14">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-cream-50">
                    {referenceSheet.title}
                  </h3>
                  <p className="mt-2 font-accent text-lg italic text-cream-100/60">
                    {referenceSheet.subtitle}
                  </p>
                  <p className="mt-4 text-sm text-cream-100/50">
                    {referenceSheet.description}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {referenceSheet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cream-100/15 px-3 py-1 text-xs text-cream-100/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hashtags */}
              <div className="flex flex-col items-start justify-center p-10 sm:p-14">
                <p className="font-mono text-[11px] uppercase tracking-widest text-cream-100/40">
                  Hashtag Resmi untuk Stream & Fanart
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-300 transition-colors hover:bg-brand-500 hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-cream-100/50">
                  Gunakan hashtag resmi saat memposting fanart, clip, atau
                  konten yang berhubungan dengan Sora Wirya. Bantu komunitas
                  untuk menemukan dan mengapresiasi karya sesama kreator!
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
