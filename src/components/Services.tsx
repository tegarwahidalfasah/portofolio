import { Video, Palette, Camera, Monitor, ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { useCms } from "../cms/store";

const iconMap: Record<string, typeof Video> = {
  video: Video,
  palette: Palette,
  camera: Camera,
  monitor: Monitor,
};

export function Services() {
  const { services } = useCms().content;
  const { t } = useCms();

  return (
    <section id="layanan" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 07" title={t.svcLabel} />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            {t.svcH1} <span className="gradient-text">{t.svcH2}</span>
          </h2>
          <p className="mt-3 max-w-lg text-text-secondary">
            {t.svcDesc}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Video;
            return (
              <Reveal key={service.title} delay={0.08 * i}>
                <article className="glass-card glass-hover group relative h-full overflow-hidden p-7">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-glass-100 px-2.5 py-1 font-mono text-[9px] text-text-muted"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-glass-300/50 pt-4">
                    <span className="font-display text-sm font-bold gradient-text">
                      {service.price}
                    </span>
                    <a
                      href="#kontak"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-glass-300 text-text-muted transition-all group-hover:border-accent-400 group-hover:bg-accent-500 group-hover:text-white"
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
