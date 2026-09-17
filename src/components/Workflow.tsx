import { MessageSquare, FileText, Clapperboard, Eye, CheckCircle } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { useCms } from "../cms/store";

const iconMap: Record<string, typeof Eye> = {
  "message-square": MessageSquare,
  "file-text": FileText,
  clapperboard: Clapperboard,
  eye: Eye,
  "check-circle": CheckCircle,
};

export function Workflow() {
  const { workflowSteps } = useCms().content;

  return (
    <section id="workflow" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 09" title="How I Work" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            Alur <span className="gradient-text">Kerja</span>
          </h2>
          <p className="mt-3 max-w-lg text-text-secondary">
            Proses kerja yang terstruktur dan transparan untuk memastikan hasil
            yang memuaskan.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {workflowSteps.map((step, i) => {
            const Icon = iconMap[step.icon] || MessageSquare;
            return (
              <Reveal key={step.step} delay={0.08 * i}>
                <div className="glass-card glass-hover group relative p-6 text-center">
                  {/* Connector line */}
                  {i < workflowSteps.length - 1 && (
                    <div className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-accent-400 to-transparent lg:block" />
                  )}

                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent-500">
                    Step {step.step}
                  </span>

                  <div className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/10 to-sky-400/10 text-accent-600 transition-all duration-300 group-hover:from-accent-500 group-hover:to-sky-400 group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
