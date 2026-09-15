import { GraduationCap, ArrowRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { education } from "../data";

export function Education() {
  return (
    <section id="pendidikan" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32">
      <span
        aria-hidden
        className="text-outline-navy pointer-events-none absolute -right-6 top-8 select-none font-display text-[16vw] font-bold leading-none tracking-tight opacity-60 lg:text-[10rem]"
      >
        STUDI
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="// 04" title="Pendidikan" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {education.map((edu, i) => (
            <Reveal key={edu.school} delay={0.1 * i}>
              <article className="card-hover group relative h-full overflow-hidden rounded-3xl border border-navy-900/10 bg-cream-100/80 p-8 hover:border-brand-500/60 hover:shadow-lg sm:p-10">
                <span className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-8xl font-bold text-navy-900/5 transition-colors duration-500 group-hover:text-accent-500/20">
                  0{i + 1}
                </span>

                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-brand-400">
                    <GraduationCap size={22} />
                  </span>
                  <span className="rounded-full border border-navy-900/15 bg-cream-50 px-4 py-1.5 font-mono text-xs font-medium text-navy-700">
                    {edu.period}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-2xl font-bold tracking-tight text-navy-900">
                  {edu.school}
                </h3>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-brand-600">
                  {edu.program}
                </p>
                <p className="mt-4 leading-relaxed text-navy-600">
                  {edu.description}
                </p>

                <span className="mt-7 flex items-center gap-2 font-display text-sm font-semibold text-navy-900 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Program keahlian
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
