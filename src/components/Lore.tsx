import { Compass, Route, Sparkles, Target } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { lore, hashtags } from "../data";

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
      className="relative px-5 py-16 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 04" title="Kisah Karakter" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lore.map((entry, i) => {
            const Icon = iconMap[entry.icon] || Compass;
            return (
              <Reveal key={entry.chapter} delay={0.1 * i}>
                <article className="glass-card glass-hover group relative h-full overflow-hidden p-7">
                  {/* Number */}
                  <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-6xl font-bold text-glass-200/50 transition-colors duration-500 group-hover:text-accent-400/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/10 to-sky-400/10 text-accent-600 transition-all duration-300 group-hover:from-accent-500 group-hover:to-sky-400 group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  {/* Chapter */}
                  <span className="mt-5 block font-mono text-[10px] uppercase tracking-widest text-accent-500">
                    Bab {String(i + 1).padStart(2, "0")} — {entry.chapter}
                  </span>

                  <h3 className="relative mt-2 font-display text-xl font-bold leading-snug text-text-primary">
                    {entry.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-text-secondary">
                    {entry.content}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Reference sheet + Hashtags */}
        <Reveal delay={0.15}>
          <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-3xl border border-glass-border bg-white/60 dark:bg-slate-950/60 shadow-xl shadow-accent-500/5 backdrop-blur-xl lg:grid-cols-2">
            {/* Reference sheet side */}
            <div className="relative flex items-center justify-center p-10 sm:p-14">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-sky-400/5" />
              <div className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-glass-border bg-white/80 dark:bg-slate-950/80 shadow-xl backdrop-blur-xl">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent-400 to-sky-400 flex items-center justify-center">
                    <Sparkles size={24} className="text-white" />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-text-primary">
                  Reference Sheet
                </h3>
                <p className="mt-2 font-accent text-lg italic text-text-secondary">
                  Tampak Depan, Samping & Belakang
                </p>
                <p className="mt-4 text-sm text-text-muted">
                  Desain karakter Sora Wirya — referensi visual resmi untuk
                  seniman dan kreator.
                </p>
              </div>
            </div>

            {/* Hashtags side */}
            <div className="flex flex-col items-start justify-center border-t border-glass-300/50 p-10 sm:p-14 lg:border-t-0 lg:border-l">
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent-500">
                Hashtag Resmi Stream & Fanart
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent-500/20 bg-accent-500/5 px-4 py-2 text-sm font-medium text-accent-600 transition-all hover:border-accent-500/40 hover:bg-accent-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-text-secondary">
                Gunakan hashtag resmi saat memposting fanart, clip, atau
                konten yang berhubungan dengan Sora Wirya!
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
