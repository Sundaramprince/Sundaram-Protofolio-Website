import { motion } from "motion/react";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({ id, title, subtitle, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 relative", className)}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-2 mb-2">
            <h2 className="text-xs font-mono text-neon-blue uppercase tracking-widest before:content-['//_']">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-white/50 text-sm max-w-2xl">{subtitle}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
