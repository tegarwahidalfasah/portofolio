import { useState, useEffect } from "react";
import { Reveal, SectionLabel } from "./Reveal";
import { tools, disciplines } from "../data";

const skillData = [
  { name: "UI / UX Design", percent: 95 },
  { name: "Desain Grafis", percent: 90 },
  { name: "Photography", percent: 88 },
  { name: "Videography", percent: 85 },
  { name: "Video Editing", percent: 90 },
  { name: "Streaming / VTuber", percent: 80 },
];

export function Skills() {
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

    const el = document.getElementById("keahlian");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="keahlian" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 05" title="Skills & Expertise" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Skills with progress bars */}
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
                Keahlian{" "}
                <span className="gradient-text">kreatif</span>
              </h2>
            </Reveal>

            <div className="mt-8 space-y-6">
              {skillData.map((skill, i) => (
                <Reveal key={skill.name} delay={0.08 * i}>
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
                          transitionDelay: `${i * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Disciplines */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="glass-card-strong p-7">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent-500">
                  Bidang Kreatif
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {disciplines.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-glass-300 bg-white/60 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur transition-all hover:border-accent-400 hover:bg-accent-500/10 hover:text-accent-600"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Tools quick list */}
            <Reveal delay={0.15}>
              <div className="glass-card mt-6 p-7">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent-500">
                  Tools Utama
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {tools.slice(0, 6).map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-2.5 rounded-xl border border-glass-300 bg-white/50 px-3 py-2.5"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500/10 to-sky-400/10 text-accent-500">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                      </span>
                      <span className="text-xs font-semibold text-text-primary">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
