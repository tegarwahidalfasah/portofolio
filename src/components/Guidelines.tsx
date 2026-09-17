import { MessageCircle, Palette, Coins, Shield, CheckCircle2 } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { guidelines } from "../data";

const iconMap: Record<string, typeof MessageCircle> = {
  "message-circle": MessageCircle,
  palette: Palette,
  coins: Coins,
  shield: Shield,
};

const toneMeta: Record<string, { label: string; color: string; bg: string }> = {
  info: {
    label: "Informasi",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  success: {
    label: "Diizinkan",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  warning: {
    label: "Perhatian",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
};

export function Guidelines() {
  return (
    <section id="guideline" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 08" title="Pedoman Komunitas" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            Panduan <span className="gradient-text">komunitas</span> Sora Wirya
          </h2>
          <p className="mt-3 max-w-md text-text-secondary">
            Agar komunitas tetap nyaman dan positif, berikut pedoman yang perlu
            diperhatikan.
          </p>
        </Reveal>

        {/* Guidelines grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {guidelines.map((section, i) => {
            const Icon = iconMap[section.icon] || Shield;
            const meta = toneMeta[section.tone] || toneMeta.info;
            return (
              <Reveal key={section.title} delay={0.1 * i}>
                <article className={`glass-card glass-hover group relative h-full overflow-hidden p-7 sm:p-8 tone-${section.tone}`}>
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.bg} ${meta.color} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-text-primary">
                        {section.title}
                      </h3>
                      <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${meta.bg} ${meta.color}`}>
                        {meta.label}
                      </span>
                    </div>
                  </div>

                  {/* Rules list */}
                  <ul className="mt-6 space-y-3">
                    {section.rules.map((rule, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
                          <CheckCircle2 size={13} className={meta.color} />
                        </span>
                        <span className="text-sm leading-relaxed text-text-secondary">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Summary note */}
        <Reveal delay={0.2}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-accent-500/20 bg-gradient-to-br from-accent-500/5 via-white/40 to-sky-400/5 p-8 text-center sm:p-10 backdrop-blur-xl">
            <p className="font-accent text-xl text-text-primary sm:text-2xl">
              "Komunitas yang hebat dimulai dari saling menghargai. Mari berkarya
              bersama dengan positif!"
            </p>
            <p className="mt-3 font-mono text-xs text-text-muted">
              — Sora Wirya
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
