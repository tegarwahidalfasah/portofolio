import { Reveal, SectionLabel } from "./Reveal";
import { profile, stats } from "../data";
import { Quote } from "lucide-react";

export function About() {
  return (
    <section id="tentang" className="relative bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="// 01" title="Tentang Saya" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl">
                Bercerita lewat{" "}
                <span className="font-accent font-normal italic text-brand-600">
                  desain, foto
                </span>{" "}
                &amp; video.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-700">
                {profile.about}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-navy-900/10 bg-cream-100 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-600">
                  <Quote size={18} />
                </span>
                <p className="font-accent text-2xl italic leading-snug text-navy-800">
                  “Kreativitas bukan sekadar hobi — itu adalah perjalanan yang
                  saya bangun sejak SMP hingga ke bangku kuliah.”
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-navy-900/10 bg-cream-100 p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-navy-500">
                    Fokus Saat Ini
                  </dt>
                  <dd className="mt-1.5 font-display text-base font-semibold text-navy-900">
                    Konten kreatif & media sosial
                  </dd>
                </div>
                <div className="rounded-2xl border border-navy-900/10 bg-cream-100 p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-navy-500">
                    Status
                  </dt>
                  <dd className="mt-1.5 font-display text-base font-semibold text-navy-900">
                    Mahasiswa TKJ tingkat 3
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Stats */}
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`card-hover group rounded-3xl border border-navy-900/10 p-7 ${
                      i % 2 === 0
                        ? "bg-navy-900 text-cream-50"
                        : "bg-cream-100 text-navy-900"
                    } ${i === 0 ? "sm:translate-y-0" : ""} ${
                      i === 1 ? "sm:translate-y-8" : ""
                    } ${i === 3 ? "sm:translate-y-8" : ""}`}
                  >
                    <span
                      className={`font-display text-5xl font-bold tracking-tight ${
                        i % 2 === 0 ? "text-brand-400" : "text-brand-600"
                      }`}
                    >
                      {stat.value}
                    </span>
                    <p
                      className={`mt-3 text-sm leading-snug ${
                        i % 2 === 0 ? "text-cream-100/70" : "text-navy-600"
                      }`}
                    >
                      {stat.label}
                    </p>
                    <span
                      className={`mt-5 block h-px w-10 transition-all duration-300 group-hover:w-16 ${
                        i % 2 === 0 ? "bg-brand-400" : "bg-brand-600"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
