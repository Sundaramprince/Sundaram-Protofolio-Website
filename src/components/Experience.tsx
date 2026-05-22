import { SectionWrapper } from "./SectionWrapper";
import { motion } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Database Admin",
    company: "CBSL Group",
    date: "2025 – Present",
    desc: [
      "Managed comprehensive data entry workflows and large Excel-based datasets.",
      "Vastly improved data retrieval efficiency and data integrity protocols."
    ]
  },
  {
    role: "Data Analysis Intern",
    company: "Zidio Development",
    date: "Past",
    desc: [
      "Worked heavily on complex banking data projects.",
      "Built and presented analytical models to support real-world financial decision making."
    ]
  }
];

export function Experience() {
  return (
    <SectionWrapper id="experience" title="Experience" subtitle="My professional journey and roles in the industry.">
      <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 pb-8">
        
        {/* Animated line highlighter */}
        <motion.div 
          className="absolute top-0 -left-[1px] w-[2px] bg-gradient-to-b from-neon-blue via-neon-purple to-transparent origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "circOut" }}
          style={{ height: '100%' }}
        />

        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-dark-bg border-2 border-neon-blue" />
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-neon-blue animate-ping" />

            <div className="glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <Briefcase size={18} className="text-neon-purple" />
                    {exp.role}
                  </h3>
                  <h4 className="text-lg text-neon-blue/80 font-medium">{exp.company}</h4>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-full w-fit">
                  <Calendar size={14} />
                  {exp.date}
                </div>
              </div>
              
              <ul className="space-y-2">
                {exp.desc.map((item, i) => (
                  <li key={i} className="text-gray-400 text-sm md:text-base flex items-start gap-3">
                     <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></span>
                     {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
