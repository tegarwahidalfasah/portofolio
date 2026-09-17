import { Reveal, SectionLabel } from "./Reveal";
import { useCms } from "../cms/store";

const categoryColors: Record<string, string> = {
  film: "from-rose-500 to-pink-500",
  sparkles: "from-purple-500 to-violet-500",
  palette: "from-amber-500 to-orange-500",
  camera: "from-cyan-500 to-sky-500",
  clapperboard: "from-accent-500 to-accent-600",
  radio: "from-sky-400 to-cyan-500",
  smartphone: "from-pink-500 to-rose-500",
  music: "from-green-500 to-emerald-500",
  shapes: "from-blue-500 to-indigo-500",
  "file-text": "from-slate-500 to-slate-600",
};

export function TechStack() {
  const { tools } = useCms().content;
  return (
    <section className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 06" title="Tech Stack" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            Tools & <span className="gradient-text">Software</span>
          </h2>
          <p className="mt-3 max-w-lg text-text-secondary">
            Professional tools I use for creative media production, video editing,
            graphic design, and IT support.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {tools.map((tool, i) => {
              const colorClass = categoryColors[tool.icon] || "from-accent-500 to-accent-600";
              return (
                <Reveal key={tool.name} delay={0.05 * i}>
                  <article className="glass-card glass-hover group p-5">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClass} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <p className="mt-3 font-display text-sm font-bold text-text-primary">
                      {tool.name}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                      {tool.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-glass-100 px-2 py-0.5 font-mono text-[9px] text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
