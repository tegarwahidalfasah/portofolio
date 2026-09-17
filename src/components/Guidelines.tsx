import { MessageCircle, Palette, Coins, Shield, CheckCircle2 } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { guidelines } from "../data";

const iconMap: Record<string, typeof MessageCircle> = {
  "message-circle": MessageCircle,
  palette: Palette,
  coins: Coins,
  shield: Shield,
};

const toneColors: Record<string, { bg: string; text: string; badge: string }> = {
  info: {
    bg: "bg-info-500/15",
    text: "text-info-400",
    badge: "bg-info-500/20 text-info-400",
  },
  success: {
    bg: "bg-success-500/15",
    text: "text-success-400",
    badge: "bg-success-500/20 text-success-400",
  },
  warning: {
    bg: "bg-warning-500/15",
    text: "text-warning-400",
    badge: "bg-warning-500/20 text-warning-400",
  },
};

export function Guidelines() {
  return (
    <section
      id="guideline"
      className="relative overflow-hidden bg-cream-50 py-24 sm:py-32"
    >
      <span
        aria-hidden
        className="text-outline-navy pointer-events-none absolute -right-6 top-12 select-none font-display text-[14vw] font-bold leading-none tracking-tight opacity-50 lg:text-[10rem]"
      >
        RULES
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="// 06" title="Pedoman Komunitas" />
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-navy-900 sm:text-5xl">
              Panduan{" "}
              <span className="font-accent font-normal italic text-brand-600">
                komunitas
              </span>{" "}
              Sora Wirya
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-navy-600">
              Agar komunitas tetap nyaman dan positif, berikut adalah pedoman
              yang perlu diperhatikan saat berinteraksi di stream maupun
              membuat konten turunan.
            </p>
          </Reveal>
        </div>

        {/* Guidelines grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {guidelines.map((section, i) => {
            const Icon = iconMap[section.icon] || Shield;
            const colors = toneColors[section.tone] || toneColors.info;
            return (
              <Reveal key={section.title} delay={0.1 * i}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-navy-900/10 bg-cream-100/80 p-7 hover:border-brand-500/40 hover:shadow-lg transition-all duration-300 sm:p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${colors.bg} ${colors.text} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-navy-900">
                        {section.title}
                      </h3>
                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${colors.badge}`}
                      >
                        {section.tone === "info"
                          ? "Informasi"
                          : section.tone === "success"
                          ? "Diizinkan"
                          : "Perhatian"}
                      </span>
                    </div>
                  </div>

                  {/* Rules list */}
                  <ul className="mt-6 space-y-3">
                    {section.rules.map((rule, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span
                          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${colors.bg}`}
                        >
                          <CheckCircle2
                            size={13}
                            className={colors.text}
                          />
                        </span>
                        <span className="text-sm leading-relaxed text-navy-700">
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
          <div className="mt-10 rounded-3xl border border-brand-500/30 bg-brand-500/5 p-7 text-center sm:p-9">
            <p className="font-accent text-xl italic text-navy-800 sm:text-2xl">
              "Komunitas yang hebat dimulai dari saling menghargai. Mari
              berkarya bersama dengan positif!"
            </p>
            <p className="mt-3 font-mono text-xs text-navy-500">
              — Sora Wirya
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
