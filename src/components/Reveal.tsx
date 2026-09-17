import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type SectionLabelProps = {
  index: string;
  title: string;
  className?: string;
};

export function SectionLabel({ index, title, className = "" }: SectionLabelProps) {
  return (
    <div className={`section-label ${className}`}>
      <span>{index}</span>
      <span>{title}</span>
    </div>
  );
}
