import { Briefcase } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { experience } from "../data";

export function Experience() {
  return (
    <section
      id="pengalaman"
      className="grain relative overflow-hidden bg-navy-950 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="// 05" title="Riwayat Pekerjaan" tone="dark" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal delay={0.05} className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-cream-50 sm:text-5xl">
                Perjalanan{" "}
                <span className="font-accent font-normal italic text-brand-400">
                  berkarya
                </span>
              </h2>
              <p className="mt-5 text-cream-100/60">
                Dari technical support, dokumentasi, hingga menjadi content
                creator penuh — setiap peran mengasah cara saya bercerita secara
                visual.
              </p>
            </div>
          </Reveal>

          <div className="relative lg:col-span-8">
            {/* timeline rail */}
            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-cream-100/15 sm:left-[22px]" />

            <div className="space-y-6">
              {experience.map((job, i) => (
                <Reveal key={job.company} delay={0.08 * i}>
                  <article className="group relative pl-14 sm:pl-20">
                    {/* node */}
                    <span className="absolute left-0 top-7 flex h-9 w-9 items-center justify-center rounded-full border border-brand-500/40 bg-navy-900 sm:h-11 sm:w-11">
                      <Briefcase size={16} className="text-brand-400" />
                      <span className="absolute inset-0 rounded-full bg-accent-500/40 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                    </span>

                    <div className="card-hover h-full rounded-3xl border border-cream-100/10 bg-navy-900 p-7 hover:border-brand-500/40 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-brand-500/15 px-3.5 py-1 font-mono text-xs font-medium text-brand-300">
                          {job.period}
                        </span>
                        <span className="font-mono text-xs text-cream-100/40">
                          0{i + 1} / 0{experience.length}
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-cream-50">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-base font-medium text-brand-400">
                        {job.company}
                      </p>
                      <p className="mt-4 leading-relaxed text-cream-100/60">
                        {job.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-cream-100/10 px-3 py-1 text-xs font-medium text-cream-100/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
