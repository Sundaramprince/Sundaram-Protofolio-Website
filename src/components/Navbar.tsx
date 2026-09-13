import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, LogIn, UserCheck, LogOut, Shield, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { SundaramLogo } from "./SundaramLogo";
import { EmployeeAuthModal, EmployeeUser } from "./EmployeeAuthModal";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "AMC Plans", href: "#amc-plans" },
  { name: "Experience", href: "#experience" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Auto-open Login / Sign Up modal on site first open if user not logged in
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    try {
      const saved = localStorage.getItem("sundaram_tech_employee_user");
      return !saved;
    } catch {
      return true;
    }
  });
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Check local session
  const [currentUser, setCurrentUser] = useState<EmployeeUser | null>(() => {
    try {
      const saved = localStorage.getItem("sundaram_tech_employee_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (user: EmployeeUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem("sundaram_tech_employee_user", JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserMenuOpen(false);
    try {
      localStorage.removeItem("sundaram_tech_employee_user");
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass py-3.5 shadow-xl" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center group transition-transform hover:scale-105">
            <SundaramLogo size={42} showText={true} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7">
            {links.map((link) => {
              const isAmc = link.name === "AMC Plans";
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[10px] lg:text-xs font-medium uppercase tracking-[0.2em] transition-colors relative flex items-center gap-1.5",
                    isAmc
                      ? "text-cyan-300 font-bold hover:text-white"
                      : "text-white/50 hover:text-neon-purple"
                  )}
                >
                  {link.name}
                  {isAmc && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/40 font-bold tracking-normal uppercase">
                      Plans
                    </span>
                  )}
                </a>
              );
            })}

            {/* Employee Portal Action / Profile Badge */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 flex items-center gap-2 text-xs font-semibold transition-all shadow-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-black font-black text-[10px] flex items-center justify-center">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="max-w-[110px] truncate">{currentUser.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200">
                    {currentUser.employeeId}
                  </span>
                  <ChevronDown size={12} className="opacity-60" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#090e1a] border border-white/10 shadow-2xl p-3 space-y-2 z-50">
                    <div className="border-b border-white/10 pb-2">
                      <p className="text-xs font-bold text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{currentUser.email}</p>
                      <p className="text-[10px] text-cyan-400 font-mono mt-0.5">{currentUser.department}</p>
                    </div>

                    <div className="py-1 text-xs text-gray-300 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                        <span className="flex items-center gap-1">
                          <Shield size={12} />
                          <span>Status: Active Employee</span>
                        </span>
                        <span>Verified</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Sign Out from Workspace</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center gap-2 text-xs font-bold transition-all shadow-sm group cursor-pointer"
              >
                <LogIn size={13} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Login / Sign Up</span>
              </button>
            )}

            <a
              href="#contact"
              className="text-[10px] px-3.5 py-1.5 font-bold uppercase tracking-[0.2em] rounded border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle & Quick Login Trigger */}
          <div className="md:hidden flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-1.5 font-bold"
            >
              <LogIn size={14} />
              <span className="text-[11px]">Login</span>
            </button>

            <button
              className="text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/5 mt-4 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 gap-3">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-medium uppercase tracking-widest text-white/50 hover:text-neon-purple transition-colors py-1"
                  >
                    {link.name}
                  </a>
                ))}

                <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
                  >
                    <LogIn size={15} />
                    <span>Employee Login / Sign Up</span>
                  </button>

                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center text-xs py-2 font-bold uppercase tracking-wider rounded border border-white/20 text-white hover:bg-white/5 transition-colors"
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Employee Authentication Modal */}
      <EmployeeAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

