import { Users, ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { organizations } from "../data";

export function Organizations() {
  return (
    <section id="organisasi" className="relative bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="// 06" title="Organisasi" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal delay={0.05} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-brand-400">
                <Users size={22} />
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-navy-900 sm:text-5xl">
                Pengalaman{" "}
                <span className="font-accent font-normal italic text-brand-600">
                  berorganisasi
                </span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-navy-600">
                Aktif di berbagai organisasi sejak bangku SMP — dari
                bendahara, riset teknologi, sekretaris, hingga memimpin HIMA dan
                kini berada di departemen seni budaya & olahraga BEM.
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-navy-900/10 bg-white/70">
              {organizations.map((org, i) => (
                <Reveal key={org.name} delay={0.06 * i}>
                  <article
                    className={`card-hover group relative flex items-center gap-4 p-6 sm:gap-7 sm:p-7 ${
                      i !== organizations.length - 1
                        ? "border-b border-navy-900/10"
                        : ""
                    } hover:bg-navy-900`}
                  >
                    <span className="font-mono text-sm text-navy-400 transition-colors group-hover:text-brand-400">
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-bold tracking-tight text-navy-900 transition-colors group-hover:text-cream-50 sm:text-xl">
                        {org.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-navy-600 transition-colors group-hover:text-cream-100/70">
                        {org.role}
                      </p>
                      <p className="mt-1.5 font-mono text-[11px] text-navy-500 transition-colors group-hover:text-cream-100/50 sm:hidden">
                        {org.period}
                      </p>
                    </div>
                    <span className="hidden shrink-0 font-mono text-xs text-navy-500 transition-colors group-hover:text-cream-100/60 sm:block">
                      {org.period}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-all duration-300 group-hover:border-accent-400 group-hover:bg-accent-500 group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
