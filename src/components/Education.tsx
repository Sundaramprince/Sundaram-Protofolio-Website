import React, { useState } from "react";
import { SectionWrapper } from "./SectionWrapper";
import { motion } from "motion/react";
import { GraduationCap, FileText, Download, Eye, Printer, Check, Sparkles } from "lucide-react";
import { generateResumePdf } from "../lib/generateResumePdf";

interface EducationProps {
  onOpenResume?: () => void;
}

export function Education({ onOpenResume }: EducationProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsDownloading(true);
    try {
      generateResumePdf();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenResume) {
      onOpenResume();
    } else {
      window.print();
    }
  };

  return (
    <SectionWrapper id="education" title="Education & Resume">
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        
        {/* Education Card */}
        <motion.div
           whileHover={{ y: -5 }}
           className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-neon-blue/5 blur-3xl pointer-events-none group-hover:bg-neon-blue/10 transition-colors" />
          
          <div>
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-neon-blue border border-white/10">
              <GraduationCap size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Technology</h3>
            <h4 className="text-lg text-neon-blue mb-3 font-medium">Computer Science - Data Science</h4>
            <p className="text-gray-300 font-medium">NRI Group of Research & Technology</p>
            <p className="text-gray-400 text-sm mb-6">Rajiv Gandhi Prodyogiki Vishwavidyalaya (RGPV)</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5">
            <div className="inline-flex px-3 py-1 rounded bg-white/5 text-sm text-gray-300 font-mono border border-white/10">
              2022 – 2027
            </div>
            <span className="text-xs text-white/50 font-mono">Bhopal, India</span>
          </div>
        </motion.div>

        {/* Resume Card with Interactive Click Features */}
        <motion.div
           id="resume"
           whileHover={{ y: -5 }}
           className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-neon-purple/10 blur-3xl pointer-events-none group-hover:bg-neon-purple/20 transition-colors" />
          
          <div>
            {/* Top Bar with Badges and Icon Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-[#7c3aed]/10 border border-[#7c3aed]/30 rounded-xl flex items-center justify-center text-neon-purple shadow-lg shadow-[#7c3aed]/20">
                <FileText size={26} />
              </div>

              {/* Quick Icon Click Features */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenResume}
                  title="Preview Full Resume PDF"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-neon-purple/50 transition-all cursor-pointer group/btn"
                >
                  <Eye size={17} className="group-hover/btn:scale-110 transition-transform text-neon-purple" />
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  title="Print Resume"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-neon-blue/50 transition-all cursor-pointer group/btn"
                >
                  <Printer size={17} className="group-hover/btn:scale-110 transition-transform text-neon-blue" />
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  title="Download Resume PDF"
                  className="p-2.5 rounded-lg bg-[#7c3aed]/20 border border-[#7c3aed]/40 text-white hover:bg-[#7c3aed] transition-all cursor-pointer group/btn"
                >
                  <Download size={17} className="group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">Resume PDF</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-semibold">
                Verified ATS
              </span>
            </div>

            <p className="text-gray-400 mb-5 leading-relaxed text-sm">
              Comprehensive overview of my Software Developer experience at VedTech Service Group (Gurgaon), system engineering, AI/ML pipelines, and data analytics.
            </p>

            {/* Resume Features Meta Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70 font-mono">
                📄 PDF Format (2 Pages)
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70 font-mono">
                ⚡ 2026 Updated
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-neon-purple font-mono">
                ✓ Full-Stack & Data Science
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Primary Download Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#2563eb] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#7c3aed]/25 hover:opacity-95 transition-all relative z-10 text-sm cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check size={18} className="text-emerald-300" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download size={18} className={isDownloading ? "animate-bounce" : ""} />
                    <span>{isDownloading ? "Generating PDF..." : "Download PDF"}</span>
                  </>
                )}
              </motion.button>

              {/* Preview Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onOpenResume}
                className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/15 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors relative z-10 text-sm cursor-pointer"
              >
                <Eye size={18} className="text-neon-purple" />
                <span>View & Print</span>
              </motion.button>
            </div>

            {/* Quick Feedback Notice */}
            {downloadSuccess && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-emerald-400 font-mono"
              >
                Sundaram_Kumar_Resume.pdf successfully downloaded to your device!
              </motion.p>
            )}
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}

