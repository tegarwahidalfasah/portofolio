import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type SectionLabelProps = {
  index: string;
  title: string;
  tone?: "dark" | "light";
  className?: string;
};

export function SectionLabel({
  index,
  title,
  tone = "light",
  className = "",
}: SectionLabelProps) {
  const isDark = tone === "dark";
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span
        className={`font-mono text-sm tracking-tight ${
          isDark ? "text-brand-400" : "text-brand-600"
        }`}
      >
        {index}
      </span>
      <span
        className={`font-display text-xs font-bold uppercase tracking-[0.32em] ${
          isDark ? "text-cream-100" : "text-navy-800"
        }`}
      >
        {title}
      </span>
      <span
        className={`h-px flex-1 ${
          isDark ? "bg-cream-100/20" : "bg-navy-800/25"
        }`}
      />
    </div>
  );
}
