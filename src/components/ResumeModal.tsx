import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Download, 
  Printer, 
  Eye, 
  Phone, 
  Mail, 
  Linkedin, 
  MapPin, 
  Check, 
  Copy, 
  ExternalLink,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Instagram,
  Globe
} from "lucide-react";
import { generateResumePdf } from "../lib/generateResumePdf";
import profileImage from "../assets/images/regenerated_image_1779477419758.jpg";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [copied, setCopied] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      generateResumePdf();
    } catch (e) {
      console.error("Download failed:", e);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl shadow-purple-950/40 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#0b0f19] border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple">
                <Eye size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  Sundaram_Kumar_Resume.pdf
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
                    ATS Ready
                  </span>
                </h3>
                <p className="text-[11px] text-white/50">2 Pages • Software & Data Science • Updated 2026</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {/* Page Controls */}
              <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setActivePage(1)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activePage === 1 ? "bg-[#7c3aed] text-white font-semibold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Page 1
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage(2)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activePage === 2 ? "bg-[#7c3aed] text-white font-semibold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Page 2
                </button>
              </div>

              {/* Zoom controls */}
              <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
                <button
                  type="button"
                  title="Zoom Out"
                  onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.1))}
                  className="p-1 text-white/60 hover:text-white transition-colors"
                >
                  <ZoomOut size={15} />
                </button>
                <span className="text-[11px] text-white/50 px-1 font-mono">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  title="Zoom In"
                  onClick={() => setZoomLevel((z) => Math.min(1.25, z + 0.1))}
                  className="p-1 text-white/60 hover:text-white transition-colors"
                >
                  <ZoomIn size={15} />
                </button>
              </div>

              {/* Print Button */}
              <button
                type="button"
                onClick={handlePrint}
                title="Print Resume"
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/10"
              >
                <Printer size={16} />
              </button>

              {/* Direct Download Button */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-lg shadow-[#7c3aed]/30 transition-all cursor-pointer"
              >
                <Download size={14} className={isDownloading ? "animate-bounce" : ""} />
                <span>{isDownloading ? "Generating PDF..." : "Download PDF"}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Interactive Document Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#030712] flex justify-center">
            <div 
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top center" }}
              className="w-full max-w-[760px] bg-white text-slate-900 rounded-lg shadow-2xl transition-transform duration-150 overflow-hidden font-sans border border-slate-200"
            >
              {activePage === 1 ? (
                /* --- PAGE 1: Core Resume --- */
                <div className="p-8 sm:p-10 space-y-6">
                  {/* Resume Header */}
                  <div className="border-b-2 border-[#7c3aed] pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
                          SUNDARAM KUMAR
                        </h1>
                      </div>
                      <p className="text-sm font-semibold text-[#7c3aed] tracking-wide">
                        Software & Data Science
                      </p>

                      {/* Interactive Contact Badges */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs text-slate-600">
                        <a
                          href="tel:+917061523829"
                          className="flex items-center gap-1.5 hover:text-[#7c3aed] transition-colors group"
                        >
                          <Phone size={13} className="text-slate-400 group-hover:text-[#7c3aed]" />
                          <span>+91 7061523829</span>
                        </a>

                        <a
                          href="mailto:sundaramprincekumar@gmail.com"
                          className="flex items-center gap-1.5 hover:text-[#7c3aed] transition-colors group"
                        >
                          <Mail size={13} className="text-slate-400 group-hover:text-[#7c3aed]" />
                          <span>sundaramprincekumar@gmail.com</span>
                        </a>

                        <a
                          href="https://www.linkedin.com/in/sundaram-prince-kumar"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 hover:text-[#7c3aed] transition-colors group"
                        >
                          <Linkedin size={13} className="text-slate-400 group-hover:text-[#7c3aed]" />
                          <span className="underline decoration-slate-300">linkedin.com/in/sundaram-prince-kumar</span>
                        </a>

                        <a
                          href="https://www.instagram.com/sundaramprincekumar/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 hover:text-[#7c3aed] transition-colors group"
                        >
                          <Instagram size={13} className="text-slate-400 group-hover:text-[#7c3aed]" />
                          <span className="underline decoration-slate-300">instagram.com/sundaramprincekumar</span>
                        </a>

                        <a
                          href="https://sundaramprince.weebly.com/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 hover:text-[#7c3aed] transition-colors group"
                        >
                          <Globe size={13} className="text-slate-400 group-hover:text-[#7c3aed]" />
                          <span className="underline decoration-slate-300">sundaramprince.weebly.com</span>
                        </a>

                        <span className="flex items-center gap-1.5 text-slate-500">
                          <MapPin size={13} className="text-slate-400" />
                          <span>Bhopal, India</span>
                        </span>
                      </div>
                    </div>

                    {/* Profile Avatar Thumbnail */}
                    <div className="flex items-center gap-3 self-start">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[#7c3aed]/40 shadow-md">
                        <img
                          src={profileImage}
                          alt="Sundaram Kumar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs leading-relaxed">
                    {/* Left Column (7 cols) */}
                    <div className="md:col-span-7 space-y-6">
                      {/* Summary */}
                      <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                          Summary
                        </h2>
                        <p className="text-slate-700 leading-relaxed text-[11.5px]">
                          Dedicated B.Tech student specializing in Computer Science with a focus on Data Science and Machine Learning at NRI Group of Research & Technology College Bhopal. Passionate about software system design, backend architectures, and data-driven insights with a strong foundation in both software engineering and predictive AI/ML models.
                        </p>
                      </div>

                      {/* Experience */}
                      <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
                          Experience
                        </h2>
                        
                        <div className="space-y-4">
                          {/* Role 1 */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-slate-900 text-xs">Software Developer</h3>
                              <span className="text-[10px] font-bold text-[#7c3aed] bg-purple-50 px-2 py-0.5 rounded">
                                2026 – Present
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-medium italic">
                              VedTech Service Group (Gurgaon)
                            </p>
                            <ul className="list-disc list-inside text-slate-700 space-y-1 text-[11px] pt-1">
                              <li>Architected and deployed scalable REST APIs with Python, Django, and FastAPI.</li>
                              <li>Engineered database schemas and query indexing utilizing MongoDB & SQL.</li>
                              <li>Conducted testing, debugging, and optimized backend query retrieval performance.</li>
                            </ul>
                          </div>

                          {/* Role 2 */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-slate-900 text-xs">Database Admin</h3>
                              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                06/2025 – 2026
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-medium italic">
                              Capital Business Systems Pvt. Ltd. (CBSL Group)
                            </p>
                            <ul className="list-disc list-inside text-slate-700 space-y-1 text-[11px] pt-1">
                              <li>Supervised dataset workflows for IT enterprise software using advanced Excel techniques.</li>
                              <li>Maintained relational databases and enhanced data retrieval efficiency protocols.</li>
                            </ul>
                          </div>

                          {/* Role 3 */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-slate-900 text-xs">Data Analysis Intern</h3>
                              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                11/2025 – 02/2026
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-medium italic">
                              Zidio Development • Bangalore, India
                            </p>
                            <ul className="list-disc list-inside text-slate-700 space-y-1 text-[11px] pt-1">
                              <li>Contributed to 3 key data science projects focused on banking data analysis.</li>
                              <li>Evaluated financial transaction models to guide analytical decision making.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Featured Project */}
                      <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                          Featured Project
                        </h2>
                        <div className="space-y-1">
                          <h3 className="font-bold text-slate-900 text-xs">
                            Zidio Stock Market Analysis & Forecasting
                          </h3>
                          <p className="text-[11px] text-slate-700">
                            Analyzed and forecast stock trends using statistical and LSTM time series modeling. Visualized predictions with Python, Plotly, Pandas, Scikit-learn, and Facebook Prophet.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column (5 cols) */}
                    <div className="md:col-span-5 space-y-6">
                      {/* Skills */}
                      <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
                          Skills
                        </h2>
                        <div className="space-y-2.5 text-[11px]">
                          <div>
                            <span className="font-semibold text-slate-900 block mb-1">Data Science & ML:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "Prophet", "Plotly"].map(
                                (s) => (
                                  <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-mono">
                                    {s}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block mb-1">Backend & Systems:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {["Django", "FastAPI", "REST API", "SQL", "MongoDB"].map((s) => (
                                <span key={s} className="px-2 py-0.5 rounded bg-purple-50 text-[#7c3aed] text-[10px] font-mono font-medium">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block mb-1">Dev Tools:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {["Git", "GitHub", "Excel", "Streamlit", "Linux"].map((s) => (
                                <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Strengths */}
                      <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
                          Strengths
                        </h2>
                        <div className="space-y-2 text-[11px]">
                          <div>
                            <span className="font-bold text-slate-900 block">Analytical Problem Solving</span>
                            <p className="text-slate-600 text-[10.5px]">
                              Resolved complex hardware/software integration and algorithmic challenges.
                            </p>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">Proactive Collaboration</span>
                            <p className="text-slate-600 text-[10.5px]">
                              Led cross-functional team initiatives with seamless technical communication.
                            </p>
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">Technical Documentation</span>
                            <p className="text-slate-600 text-[10.5px]">
                              Documented software workflows, database schemas, and APIs with precision.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
                          Education
                        </h2>
                        <div className="space-y-1 text-[11px]">
                          <span className="font-bold text-slate-900 block text-xs">
                            Bachelor of Technology (B.Tech)
                          </span>
                          <span className="text-[#7c3aed] font-medium block">
                            Computer Science - Data Science
                          </span>
                          <p className="text-slate-600 text-[10.5px]">
                            NRI Group of Research & Technology
                          </p>
                          <p className="text-slate-600 text-[10.5px]">
                            Rajiv Gandhi Prodyogiki Vishwavidyalaya
                          </p>
                          <span className="inline-block mt-1 font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            2022 – 2027 • Bhopal, India
                          </span>
                        </div>
                      </div>

                      {/* Interests */}
                      <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-1.5">
                          Interests
                        </h2>
                        <p className="text-slate-600 text-[10.5px]">
                          Robotics, AIML, System Architecture, Autonomous Systems, and Predictive Finance.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Page 1 Footer */}
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400">
                    <span>Sundaram Kumar • Software & Data Science</span>
                    <button
                      type="button"
                      onClick={() => setActivePage(2)}
                      className="text-[#7c3aed] font-semibold flex items-center gap-1 hover:underline"
                    >
                      View Page 2 (Projects & Details) <ChevronRight size={12} />
                    </button>
                    <span>Page 1 of 2</span>
                  </div>
                </div>
              ) : (
                /* --- PAGE 2: Expanded Projects & Details --- */
                <div className="p-8 sm:p-10 space-y-6">
                  {/* Page 2 Header */}
                  <div className="border-b-2 border-[#7c3aed] pb-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold uppercase text-slate-950">
                        Sundaram Kumar — Technical Projects
                      </h2>
                      <p className="text-xs text-[#7c3aed] font-medium">
                        Detailed Project Case Studies & Certifications
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActivePage(1)}
                      className="text-xs text-[#7c3aed] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <ChevronLeft size={14} /> Back to Page 1
                    </button>
                  </div>

                  {/* Projects Detailed List */}
                  <div className="space-y-6 text-xs">
                    {/* Project 1 */}
                    <div className="space-y-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-slate-950 text-sm">
                          1. Stock Market Analysis Forecasting (Zidio Project)
                        </h3>
                        <span className="text-[10px] text-slate-500 font-mono">Time Series Analysis</span>
                      </div>
                      <p className="text-[11px] text-[#7c3aed] font-medium">
                        Tech Stack: Python, Pandas, NumPy, Matplotlib, Seaborn, Plotly, Scikit-learn, Prophet, TensorFlow/Keras, Flask
                      </p>
                      <ul className="list-disc list-inside text-slate-700 space-y-1 text-[11px] pt-1">
                        <li>Analyzed multi-year stock trends using statistical and LSTM neural networks.</li>
                        <li>Identified seasonality patterns to deliver short-term and long-term price predictions.</li>
                        <li>Visualized predictive financial insights through interactive Plotly dashboards.</li>
                      </ul>
                    </div>

                    {/* Project 2 */}
                    <div className="space-y-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-slate-950 text-sm">
                          2. POWERGRID Stock Analysis
                        </h3>
                        <span className="text-[10px] text-slate-500 font-mono">Market Cap ₹ 2,68,556 Cr.</span>
                      </div>
                      <p className="text-[11px] text-[#7c3aed] font-medium">
                        Associated with Zidio Development • Energy & Transmission Analytics
                      </p>
                      <ul className="list-disc list-inside text-slate-700 space-y-1 text-[11px] pt-1">
                        <li>Evaluated historical performance of Power Grid Corporation of India transmission networks.</li>
                        <li>Implemented regression models and risk volatility analysis to calculate risk-adjusted returns.</li>
                        <li>Presented key findings to team mentors with clear data-driven takeaways.</li>
                      </ul>
                    </div>

                    {/* Project 3 */}
                    <div className="space-y-1.5 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-slate-950 text-sm">
                          3. Cryptocurrency Market Year Analysis
                        </h3>
                        <span className="text-[10px] text-slate-500 font-mono">Market Volatility Study</span>
                      </div>
                      <p className="text-[11px] text-[#7c3aed] font-medium">
                        Crypto Trend Analytics & Anomaly Detection
                      </p>
                      <ul className="list-disc list-inside text-slate-700 space-y-1 text-[11px] pt-1">
                        <li>Extracted and cleaned crypto market transaction feeds to model high-frequency price fluctuations.</li>
                        <li>Applied moving average convergence-divergence (MACD) and relative strength index (RSI) algorithms.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Certifications & Declarations */}
                  <div className="pt-4 border-t border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Certifications & Key Highlights
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                      <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                        <span className="font-semibold block text-slate-900">✓ Certified Ethical Hacker (CEH)</span>
                        <span className="text-[10px] text-slate-500">Security Fundamentals & Best Practices</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                        <span className="font-semibold block text-slate-900">✓ Full-Stack Systems & APIs</span>
                        <span className="text-[10px] text-slate-500">Python, Django, FastAPI, MongoDB & SQL</span>
                      </div>
                    </div>

                    <div className="pt-4 text-[10.5px] text-slate-500 italic">
                      "I hereby declare that the details furnished in this resume are true and correct to the best of my knowledge and belief."
                      <span className="block font-bold text-slate-800 not-italic mt-1">Sundaram Kumar</span>
                    </div>
                  </div>

                  {/* Page 2 Footer */}
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400">
                    <span>Sundaram Kumar • Software & Data Science</span>
                    <span>Page 2 of 2</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="px-6 py-3 bg-[#0b0f19] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-white/50 text-[11px]">
              <Sparkles size={14} className="text-neon-purple" />
              <span>Available for immediate hiring & internships</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard("sundaramprincekumar@gmail.com", "Email")}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors"
              >
                {copied === "Email" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied === "Email" ? "Copied Email!" : "Copy Email"}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="px-4 py-1.5 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold flex items-center gap-1.5 shadow-md shadow-[#7c3aed]/20 transition-all cursor-pointer"
              >
                <Download size={14} className={isDownloading ? "animate-bounce" : ""} />
                <span>{isDownloading ? "Downloading..." : "Download Official PDF"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
