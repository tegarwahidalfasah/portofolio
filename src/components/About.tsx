import { Reveal, SectionLabel } from "./Reveal";
import { useCms } from "../cms/store";
import { Quote } from "lucide-react";

export function About() {
  const { profile, about } = useCms().content;
  const { t } = useCms();

  return (
    <section id="about" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 01" title={t.aboutLabel} />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
                {about.titleA}{" "}
                <span className="gradient-text">{about.titleB}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                {profile.summary}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-accent-500/15 bg-accent-500/5 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/20">
                  <Quote size={18} />
                </span>
                <p className="font-accent text-xl leading-snug text-text-primary sm:text-2xl">
                  &ldquo;{about.quote}&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          {/* Info card */}
          <div className="lg:col-span-4">
            <Reveal delay={0.15}>
              <div className="glass-card-strong h-full p-7">
                <div className="mb-5 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-sky-400 text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  </span>
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-text-secondary">
                    {t.cardProfile}
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: t.rowName, value: profile.name },
                    { label: t.rowLocation, value: profile.locationShort },
                    { label: "Email", value: profile.email },
                    { label: t.rowPhone, value: profile.phone },
                    { label: "Instagram", value: profile.instagram },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                        {item.label}
                      </span>
                      <span className="text-right text-sm font-medium text-text-primary break-all">
                        {item.value}
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
