import { Reveal, SectionLabel } from "./Reveal";
import { experience } from "../data";

export function Experience() {
  return (
    <section id="pengalaman" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 03" title="Experience" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            Professional <span className="gradient-text">Experience</span>
          </h2>
        </Reveal>

        <div className="mt-10 space-y-6">
          {experience.map((exp, i) => (
            <Reveal key={exp.company} delay={0.08 * i}>
              <article className="glass-card glass-hover group relative overflow-hidden p-7 sm:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-accent-500">
                        {exp.period}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-glass-300" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                        {exp.location}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-text-primary">
                      {exp.role}
                    </h3>
                    <p className="mt-1 font-display text-base font-semibold text-accent-600">
                      {exp.company}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {exp.description.map((desc, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent-500 to-sky-400" />
                      <span className="text-sm leading-relaxed text-text-secondary">
                        {desc}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-glass-100 px-3 py-1 font-mono text-[10px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
