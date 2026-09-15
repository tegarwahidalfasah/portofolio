import { Palette, Shapes, Clapperboard, FileText, ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { tools, disciplines } from "../data";

const iconMap: Record<string, typeof Palette> = {
  palette: Palette,
  shapes: Shapes,
  clapperboard: Clapperboard,
  "file-text": FileText,
};

export function Skills() {
  return (
    <section id="keahlian" className="grain relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="// 02" title="Keahlian" tone="dark" />
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-tight tracking-tight text-cream-50 sm:text-5xl">
              Tools yang saya{" "}
              <span className="font-accent font-normal italic text-brand-400">
                kuasai
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-cream-100/60">
              Perangkat lunak utama yang saya gunakan untuk menghasilkan karya
              desain, foto, video dan dokumen.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, i) => {
            const Icon = iconMap[tool.icon];
            return (
              <Reveal key={tool.name} delay={0.08 * i}>
                <article className="card-hover group relative h-full overflow-hidden rounded-3xl border border-cream-100/10 bg-navy-900 p-7 hover:border-brand-500/50">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-500/10 blur-2xl transition-opacity duration-500 group-hover:bg-brand-500/20" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-400 transition-transform duration-500 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="relative mt-6 font-display text-xl font-semibold text-cream-50">
                    {tool.name}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-cream-100/55">
                    {tool.description}
                  </p>
                  <div className="relative mt-5 flex flex-wrap gap-1.5">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cream-100/10 px-2.5 py-1 font-mono text-[10px] text-cream-100/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Disciplines */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-start gap-6 rounded-3xl border border-cream-100/10 bg-navy-900/60 p-7 sm:flex-row sm:items-center sm:p-9">
            <div className="flex items-center gap-3 shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 text-white">
                <ArrowUpRight size={18} />
              </span>
              <span className="font-display text-sm font-semibold uppercase tracking-widest text-cream-50">
                Bidang Kreatif
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {disciplines.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-300 transition-colors hover:bg-brand-500 hover:text-white"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
