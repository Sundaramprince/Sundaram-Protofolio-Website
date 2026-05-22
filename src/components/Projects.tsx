import { SectionWrapper } from "./SectionWrapper";
import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Stock Market Analysis & Forecasting",
    desc: "A comprehensive time series analysis application for trend prediction and dashboard visualization of market movements.",
    tech: ["Python", "Pandas", "NumPy", "Plotly", "Scikit-learn", "Prophet", "TensorFlow"],
    github: "#",
    color: "from-neon-blue/20 to-transparent",
  },
  {
    title: "Banking Data Analysis Project",
    desc: "Extracted data-driven insights from rich real-world banking datasets to support critical financial decision-making processes.",
    tech: ["Python", "Data Analysis", "Seaborn", "Matplotlib"],
    github: "#",
    color: "from-neon-purple/20 to-transparent",
  },
  {
    title: "PowerGrid Stock Analysis",
    desc: "Targeted analysis of PowerGrid Corporation's historical stock performance, modeling volatility and future outlooks.",
    tech: ["Python", "Pandas", "Scikit-learn", "Time Series"],
    github: "#",
    color: "from-blue-500/20 to-transparent",
  },
  {
    title: "Cryptocurrency Analysis",
    desc: "Exploration of volatile market trends in the cryptocurrency space, identifying patterns using advanced statistical methods.",
    tech: ["Data Science", "Plotly", "Statsmodels"],
    github: "#",
    color: "from-purple-500/20 to-transparent",
  }
];

export function Projects() {
  return (
    <SectionWrapper id="projects" title="Featured Projects" subtitle="A collection of my work in data science, machine learning, and analysis.">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8 }}
            className="group relative glass rounded-2xl overflow-hidden border border-white/10 flex flex-col h-full"
          >
            {/* Background Gradient Effect */}
            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${project.color} opacity-50 pointer-events-none transition-opacity group-hover:opacity-100`} />
            
            <div className="p-8 flex flex-col flex-1 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold heading-display text-white group-hover:text-neon-blue transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a href={project.github} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                    <Github size={20} />
                  </a>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                {project.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-2 py-1 bg-black/40 text-gray-300 rounded border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
