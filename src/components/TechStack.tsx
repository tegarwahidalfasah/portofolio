import { Reveal, SectionLabel } from "./Reveal";

const techStack = [
  { name: "Figma", category: "Design" },
  { name: "Canva", category: "Design" },
  { name: "Photoshop", category: "Design" },
  { name: "Premiere Pro", category: "Video" },
  { name: "After Effects", category: "Video" },
  { name: "DaVinci Resolve", category: "Video" },
  { name: "CapCut", category: "Video" },
  { name: "OBS Studio", category: "Streaming" },
  { name: "Live2D", category: "VTuber" },
  { name: "VS Code", category: "Dev" },
  { name: "React", category: "Dev" },
  { name: "Tailwind CSS", category: "Dev" },
];

const categoryColors: Record<string, string> = {
  Design: "from-pink-500 to-rose-500",
  Video: "from-accent-500 to-purple-500",
  Streaming: "from-sky-400 to-cyan-500",
  VTuber: "from-green-500 to-emerald-500",
  Dev: "from-amber-500 to-orange-500",
};

export function TechStack() {
  return (
    <section className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 06" title="Tech Stack" />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {techStack.map((tech, i) => {
              const colorClass = categoryColors[tech.category] || "from-accent-500 to-accent-600";
              return (
                <Reveal key={tech.name} delay={0.05 * i}>
                  <div className="glass-card glass-hover group flex flex-col items-center justify-center p-5 text-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClass} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <p className="mt-3 font-display text-sm font-bold text-text-primary">
                      {tech.name}
                    </p>
                    <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-text-muted">
                      {tech.category}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>

        {/* Design Philosophy */}
        <Reveal delay={0.15}>
          <div className="mt-10 glass-card-strong p-8 sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent-500">
              Design Philosophy
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-text-primary sm:text-3xl">
              Human-Centered, Clean Aesthetics
            </h3>
            <p className="mt-3 max-w-2xl text-text-secondary">
              Setiap karya yang saya buat berpusat pada pengalaman pengguna.
              Desain yang bersih dan fungsional, namun tetap mengekspresikan
              kreativitas dan identitas visual yang kuat.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { title: "Human Centered", desc: "Fokus pada pengguna" },
                { title: "Clean Aesthetics", desc: "Visual yang bersih" },
                { title: "Purposeful", desc: "Bermakna & fungsional" },
                { title: "Impactful", desc: "Memberikan dampak" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center rounded-2xl border border-glass-300 bg-white/50 p-5 text-center"
                >
                  <div className="mb-3 h-2 w-2 rounded-full bg-gradient-to-br from-accent-500 to-sky-400" />
                  <p className="font-display text-sm font-bold text-text-primary">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
