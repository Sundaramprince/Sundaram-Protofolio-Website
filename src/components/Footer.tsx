import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 mt-12 bg-dark-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-xl font-bold heading-display text-white mb-2">
            SUNDARAM<span className="text-neon-blue">.</span>KUMAR
          </p>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Sundaram Kumar. All rights reserved.
          </p>
        </div>

        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
}
