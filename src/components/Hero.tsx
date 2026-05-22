import { motion } from "motion/react";
import { Github, Linkedin, Mail, Download, ArrowRight } from "lucide-react";
import React from "react";
import profileImage from "../assets/images/regenerated_image_1779477419758.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden pb-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-start gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-neon-purple text-[10px] font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse"></span>
            Available for Work
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-mono text-neon-purple uppercase tracking-widest mb-2 before:content-['//_']">Primary Objective</h2>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-4">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue text-[#e2e8f0]">
                Sundaram Kumar
              </span>
            </h1>
            <h2 className="text-lg md:text-xl font-bold text-white/80">
              AI Engineer & Data Scientist
            </h2>
            <p className="text-sm text-white/60 max-w-lg leading-relaxed mt-2">
              Building intelligent systems using AI, ML & Data Science. Passionate about predictive modeling and frontend architecture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <motion.a
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-5 py-2.5 bg-[#7c3aed] text-white text-xs font-bold rounded-full hover:bg-[#6d28d9] transition-colors uppercase tracking-wider flex items-center gap-2"
            >
              View Projects <ArrowRight size={16} />
            </motion.a>
            <motion.a
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
              href="#resume"
              className="px-5 py-2.5 border border-white/20 text-white text-xs font-bold rounded-full transition-colors uppercase tracking-wider flex items-center gap-2"
            >
              Download Resume <Download size={16} />
            </motion.a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 w-full max-w-md">
            <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">Connectivity</div>
            <div className="flex items-center gap-4">
              <SocialIcon href="https://github.com" icon={<Github size={18} />} />
              <SocialIcon href="https://www.linkedin.com/in/sundaram-prince-kumar" icon={<Linkedin size={18} />} />
              <SocialIcon href="mailto:sundaramkumara2a29576@gmail.com" icon={<Mail size={18} />} />
            </div>
          </div>
        </motion.div>

        {/* Profile Image & Cybernetic Orbital Representation */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
           className="relative flex justify-center items-center"
        >
          {/* Neon atmospheric glows */}
          <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-tr from-[#7c3aed]/25 to-[#2563eb]/25 blur-3xl absolute opacity-60 mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
          
          <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-white/10 rounded-full flex items-center justify-center relative p-8 glass overflow-hidden group">
              {/* Spinning decorative orbital rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/5 animate-spin" style={{ animationDuration: '40s' }} />
              <div className="absolute inset-4 rounded-full border border-dashed border-neon-purple/10 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
              <div className="absolute inset-8 rounded-full border border-neon-blue/20 animate-spin" style={{ animationDuration: '20s' }} />
              
              {/* Scanline overlay effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-30 group-hover:opacity-10 transition-opacity" />
              
              {/* Photo Frame Container in the center */}
              <div className="w-[180px] h-[180px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden border-2 border-neon-purple/30 group-hover:border-neon-blue/80 transition-all duration-700 relative z-20 shadow-2xl shadow-neon-purple/10">
                <img 
                  src={profileImage} 
                  alt="Sundaram Kumar" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Cyber Scanner Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent animate-bounce pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDuration: '2.5s' }} />
              </div>

              {/* Orbital Hub nodes */}
              <div className="absolute top-1/2 left-4 w-2 h-2 rounded-full bg-neon-blue animate-ping" />
              <div className="absolute bottom-12 right-12 w-1.5 h-1.5 rounded-full bg-neon-purple" />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-current to-transparent" />
      </motion.div>
    </section>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, borderColor: "rgba(167, 139, 250, 0.5)" }}
      className="p-3 bg-white/5 rounded-lg border border-white/10 text-white cursor-pointer hover:border-neon-purple transition-all"
    >
      {icon}
    </motion.a>
  );
}
