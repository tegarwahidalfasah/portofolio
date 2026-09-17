import { useState, useEffect } from "react";
import { Reveal, SectionLabel } from "./Reveal";
import { useCms } from "../cms/store";

export function Skills() {
  const { disciplines, programmingSkills, languages, interests, creativeSkills } =
    useCms().content;
  const { t } = useCms();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById("skills");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 05" title={t.skillLabel} />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            {t.skillH1} <span className="gradient-text">{t.skillH2}</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Creative skills with progress bars */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent-500">
                {t.skillCreative}
              </p>
            </Reveal>

            <div className="mt-5 space-y-5">
              {creativeSkills.map((skill, i) => (
                <Reveal key={skill.name} delay={0.06 * i}>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-semibold text-text-primary">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs font-medium text-text-muted">
                        {skill.percent}%
                      </span>
                    </div>
                    <div className="progress-bar mt-2.5">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: visible ? `${skill.percent}%` : "0%",
                          transitionDelay: `${i * 0.08}s`,
                        }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6 lg:col-span-5">
            {/* Programming Skills */}
            <Reveal delay={0.1}>
              <div className="glass-card-strong p-7">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent-500">
                  {t.skillProgramming}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {programmingSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-xl border border-glass-300 bg-white/50 dark:bg-slate-950/50 px-3 py-2"
                    >
                      <p className="font-display text-xs font-bold text-text-primary">
                        {skill.name}
                      </p>
                      <p className="font-mono text-[9px] text-text-muted">
                        {skill.level}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Languages */}
            <Reveal delay={0.15}>
              <div className="glass-card p-7">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent-500">
                  {t.skillLanguages}
                </p>
                <div className="mt-4 space-y-3">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between">
                      <span className="font-display text-sm font-semibold text-text-primary">
                        {lang.name}
                      </span>
                      <span className="rounded-full bg-accent-500/10 px-3 py-1 font-mono text-[10px] font-medium text-accent-600">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Interests */}
            <Reveal delay={0.2}>
              <div className="glass-card p-7">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent-500">
                  {t.skillInterests}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-glass-300 bg-white/50 dark:bg-slate-950/50 px-4 py-2 text-xs font-medium text-text-secondary"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* All disciplines */}
        <Reveal delay={0.25}>
          <div className="mt-8 glass-card p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent-500">
              {t.skillAll}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {disciplines.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-glass-300 bg-white/50 dark:bg-slate-950/50 px-4 py-2 text-xs font-medium text-text-secondary transition-all hover:border-accent-400 hover:bg-accent-500/10 hover:text-accent-600"
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
