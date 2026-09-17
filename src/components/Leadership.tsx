import { Award, ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { useCms } from "../cms/store";

export function Leadership() {
  const { organizations } = useCms().content;
  const { t } = useCms();
  return (
    <section id="organisasi" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 07" title={t.leadLabel} />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            {t.leadH1} <span className="gradient-text">{t.leadH2}</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {organizations.map((org, i) => (
            <Reveal key={org.name} delay={0.08 * i}>
              <article className="glass-card glass-hover group relative h-full overflow-hidden p-6">
                <span className="pointer-events-none absolute -right-2 -top-3 select-none font-display text-5xl font-bold text-glass-200/40 transition-colors duration-500 group-hover:text-accent-400/15">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/10 to-sky-400/10 text-accent-600 transition-all duration-300 group-hover:from-accent-500 group-hover:to-sky-400 group-hover:text-white">
                    <Award size={18} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent-500">
                    {org.period}
                  </span>
                </div>

                <h3 className="relative mt-4 font-display text-base font-bold leading-snug text-text-primary">
                  {org.role}
                </h3>
                <p className="relative mt-1 text-xs font-semibold text-accent-600">
                  {org.name}
                </p>
                <p className="relative mt-1 text-[10px] text-text-muted">
                  {org.location}
                </p>
                <p className="relative mt-3 text-xs leading-relaxed text-text-secondary">
                  {org.description}
                </p>

                <span className="absolute bottom-4 right-4 flex h-7 w-7 items-center justify-center rounded-full border border-glass-300 text-text-muted transition-all duration-300 group-hover:border-accent-400 group-hover:bg-accent-500 group-hover:text-white">
                  <ArrowUpRight size={13} />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
