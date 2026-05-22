import { SectionWrapper } from "./SectionWrapper";
import { motion } from "motion/react";
import { Send, Github, Linkedin, Mail } from "lucide-react";

export function Contact() {
  return (
    <SectionWrapper id="contact" title="Get In Touch" subtitle="Currently open to new opportunities. Let's build something amazing together.">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-3 glass p-8 rounded-2xl border border-white/10">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-colors resize-none"
                placeholder="Hello Sundaram, I would like to talk about..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Send Message <Send size={18} />
            </motion.button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">Connect directly</h3>
            <div className="space-y-6">
              
              <a href="mailto:sundaramkumara2a29576@gmail.com" className="flex items-center gap-4 text-gray-400 hover:text-white group transition-colors">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-blue/20 group-hover:text-neon-blue transition-colors text-white">
                   <Mail size={20} />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 mb-1">Email</p>
                   <p className="font-medium">sundaramkumara2a29576@gmail.com</p>
                 </div>
              </a>

              <a href="https://www.linkedin.com/in/sundaram-prince-kumar" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white group transition-colors">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-blue/20 group-hover:text-neon-blue transition-colors text-white">
                   <Linkedin size={20} />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
                   <p className="font-medium">/in/sundaram-prince-kumar</p>
                 </div>
              </a>

              <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white group transition-colors">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-blue/20 group-hover:text-neon-blue transition-colors text-white">
                   <Github size={20} />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 mb-1">GitHub</p>
                   <p className="font-medium">github.com/Sundaram</p>
                 </div>
              </a>

            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
