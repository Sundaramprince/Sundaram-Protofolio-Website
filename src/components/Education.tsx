import { SectionWrapper } from "./SectionWrapper";
import { motion } from "motion/react";
import { GraduationCap, FileText, Download } from "lucide-react";

export function Education() {
  return (
    <SectionWrapper id="education" title="Education & Resume">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Education Card */}
        <motion.div
           whileHover={{ y: -5 }}
           className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-neon-blue/5 blur-3xl pointer-events-none group-hover:bg-neon-blue/10 transition-colors" />
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-neon-blue">
            <GraduationCap size={28} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Technology</h3>
          <h4 className="text-lg text-neon-blue mb-4">Computer Science - Data Science</h4>
          <p className="text-gray-400 mb-6 font-medium">Rajiv Gandhi Prodyogiki Vishwavidyalaya</p>
          <div className="inline-flex px-3 py-1 rounded bg-white/5 text-sm text-gray-300 font-mono">
            2023 – 2027
          </div>
        </motion.div>

        {/* Resume Card */}
        <motion.div
           whileHover={{ y: -5 }}
           className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-neon-purple/5 blur-3xl pointer-events-none group-hover:bg-neon-purple/10 transition-colors" />
          <div>
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-neon-purple">
              <FileText size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Resume</h3>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
              Get an in-depth look at my background, technical skills, and project experience. Available for download in PDF format.
            </p>
          </div>
          
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#"
            className="w-full py-4 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors relative z-10"
          >
            Download Resume <Download size={20} />
          </motion.a>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
