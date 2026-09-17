import { Reveal } from "./Reveal";
import { Quote } from "lucide-react";

const stats = [
  { value: "03", label: "Pengalaman\nKerja" },
  { value: "40+", label: "Proyek\nKreatif" },
  { value: "05", label: "Organisasi\nAktif" },
  { value: "02", label: "Institusi\nPendidikan" },
];

export function Stats() {
  return (
    <section className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-glass-border bg-white/60 p-8 shadow-xl shadow-accent-500/5 backdrop-blur-xl sm:p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="group flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/10 to-sky-400/10 font-display text-lg font-bold text-accent-600 transition-all duration-300 group-hover:from-accent-500 group-hover:to-sky-400 group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                      {stat.value}
                    </span>
                    <p className="mt-1 text-sm leading-snug whitespace-pre-line text-text-muted">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}

              {/* Quote */}
              <div className="flex items-center gap-3 border-t border-glass-300/50 pt-6 md:col-span-1 md:border-t-0 md:border-l md:pl-6 md:pt-0">
                <Quote size={28} className="shrink-0 text-accent-400" />
                <p className="font-accent text-lg italic leading-snug text-text-secondary">
                  "Kreativitas adalah perjalanan yang saya bangun sejak SMP."
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
