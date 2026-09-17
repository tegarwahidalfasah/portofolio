import { GraduationCap } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { useCms } from "../cms/store";

export function Education() {
  const { education } = useCms().content;
  return (
    <section id="pendidikan" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 02" title="Education" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((edu, i) => (
            <Reveal key={edu.school} delay={0.1 * i}>
              <article className="glass-card glass-hover group relative h-full overflow-hidden p-7 sm:p-8">
                <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-6xl font-bold text-glass-200/50 transition-colors duration-500 group-hover:text-accent-400/20">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/10 to-sky-400/10 text-accent-600 transition-all duration-300 group-hover:from-accent-500 group-hover:to-sky-400 group-hover:text-white">
                    <GraduationCap size={20} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent-500">
                    {edu.period}
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-xl font-bold text-text-primary">
                  {edu.school}
                </h3>
                <p className="relative mt-1 text-sm font-semibold text-accent-600">
                  {edu.program}
                </p>
                <p className="relative mt-1 text-xs text-text-muted">
                  {edu.location}
                </p>
                <p className="relative mt-4 text-sm leading-relaxed text-text-secondary">
                  {edu.description}
                </p>

                {edu.gpa && (
                  <div className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent-600">
                      GPA
                    </span>
                    <span className="font-display text-sm font-bold text-accent-600">
                      {edu.gpa}
                    </span>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
