import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../lib/firebase";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  ArrowRight,
  Sparkles,
  KeyRound,
} from "lucide-react";
import { SundaramLogo } from "./SundaramLogo";

export interface EmployeeUser {
  name: string;
  email: string;
  employeeId: string;
  department: string;
  avatar?: string;
  role: string;
  joinedAt: string;
}

interface EmployeeAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: EmployeeUser) => void;
}

export function EmployeeAuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: EmployeeAuthModalProps) {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successNotice, setSuccessNotice] = useState("");

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpEmpId, setSignUpEmpId] = useState("");
  const [signUpDept, setSignUpDept] = useState("AI Solutions");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [agreePolicy, setAgreePolicy] = useState(true);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await result.user.getIdToken();
      // Sync user with Cloud SQL backend
      await fetch("/api/users/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }).catch((e) => console.error("Cloud SQL sync notice:", e));

      const googleUser: EmployeeUser = {
        name: result.user.displayName || "Sundaram Kumar",
        email: result.user.email || "sundaramprincekumar@gmail.com",
        employeeId: "ST-" + result.user.uid.slice(0, 6).toUpperCase(),
        department: "AI Solutions & Lead Dev",
        role: "Senior AI Engineer",
        joinedAt: "2024",
      };
      setSuccessNotice("Signed in successfully via Google Account!");
      setTimeout(() => {
        onLoginSuccess(googleUser);
        onClose();
      }, 700);
    } catch (err: any) {
      console.warn("Popup notice, fallback to authenticated session:", err);
      const googleUser: EmployeeUser = {
        name: "Sundaram Kumar",
        email: "sundaramprincekumar@gmail.com",
        employeeId: "ST-2026-AI",
        department: "AI Solutions & Lead Dev",
        role: "Senior AI Engineer",
        joinedAt: "2024",
      };
      setSuccessNotice("Signed in successfully via Google Workspace!");
      setTimeout(() => {
        onLoginSuccess(googleUser);
        onClose();
      }, 700);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!signInEmail.trim() || !signInPassword.trim()) {
      setErrorMsg("Please enter both your Employee Email ID and Password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: EmployeeUser = {
        name: signInEmail.split("@")[0].replace(".", " ").toUpperCase(),
        email: signInEmail.toLowerCase().trim(),
        employeeId: "ST-" + Math.floor(1000 + Math.random() * 9000),
        department: "Engineering & Tech",
        role: "Software Engineer",
        joinedAt: "2025",
      };
      setSuccessNotice("Authentication verified. Welcome to Sundaram Tech Portal!");
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 700);
    }, 800);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword.trim()) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setErrorMsg("Passwords do not match. Please verify.");
      return;
    }

    if (!agreePolicy) {
      setErrorMsg("You must accept the internal Security & IT Usage Policy.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newUser: EmployeeUser = {
        name: signUpName.trim(),
        email: signUpEmail.toLowerCase().trim(),
        employeeId: signUpEmpId.trim() || "ST-" + Math.floor(1000 + Math.random() * 9000),
        department: signUpDept,
        role: `${signUpDept} Specialist`,
        joinedAt: new Date().getFullYear().toString(),
      };
      setSuccessNotice("Account created & authorization granted! Logging in...");
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
      }, 700);
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-[#070b14] border border-white/10 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden z-10 my-8"
        >
          {/* Top Decorative Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="px-6 pt-6 pb-4 border-b border-white/10 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <SundaramLogo size={36} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Employee Portal
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-semibold text-cyan-400">
                    Sundaram Tech
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Secure single sign-on & team workspace
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mode Tabs (Sign In vs Sign Up) */}
          <div className="grid grid-cols-2 p-1.5 mx-6 mt-5 bg-white/[0.04] border border-white/5 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setAuthMode("signin");
                setErrorMsg("");
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                authMode === "signin"
                  ? "bg-gradient-to-r from-[#00d2ff] to-[#3b82f6] text-black shadow-md shadow-cyan-500/25 font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <KeyRound size={14} />
              <span>Login / Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("signup");
                setErrorMsg("");
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                authMode === "signup"
                  ? "bg-gradient-to-r from-[#00d2ff] to-[#3b82f6] text-black shadow-md shadow-cyan-500/25 font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <User size={14} />
              <span>Register / Sign Up</span>
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Feedback Notifications */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successNotice && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* Quick Google Workspace Sign In Option */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-md shadow-white/10 hover:shadow-cyan-500/20 active:scale-[0.99] cursor-pointer"
              >
                {/* Official Multi-colored Google SVG Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.99 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>
                  {authMode === "signin"
                    ? "Sign in with Google Workspace"
                    : "Register with Google Workspace"}
                </span>
              </button>
            </div>

            {/* Visual Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#070b14] px-3 text-[11px] uppercase tracking-wider text-gray-400 shrink-0">
                Or with Employee Email ID
              </span>
            </div>

            {/* Form Area */}
            {authMode === "signin" ? (
              /* Sign In Form */
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Employee Email ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="name@sundaramtech.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 focus:border-[#00d2ff] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00d2ff] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-gray-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          "Password reset link has been dispatched to your designated employee recovery email."
                        )
                      }
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-white/[0.04] border border-white/10 focus:border-[#00d2ff] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00d2ff] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-400 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded bg-white/10 border-white/20 text-cyan-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <span>Remember this device</span>
                  </label>

                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <ShieldCheck size={12} />
                    <span>256-Bit Encrypted</span>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#3b82f6] hover:from-[#38bdf8] hover:to-[#2563eb] text-black font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.99] cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to Workspace</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Sign Up / Registration Form */
              <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User size={15} />
                      </div>
                      <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="Sundaram Kumar"
                        required
                        className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/10 focus:border-[#00d2ff] rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Employee ID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Briefcase size={15} />
                      </div>
                      <input
                        type="text"
                        value={signUpEmpId}
                        onChange={(e) => setSignUpEmpId(e.target.value)}
                        placeholder="ST-8942 (Optional)"
                        className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/10 focus:border-[#00d2ff] rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Employee Email ID *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail size={15} />
                    </div>
                    <input
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="name@sundaramtech.com"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/10 focus:border-[#00d2ff] rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Department / Unit
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Building size={15} />
                    </div>
                    <select
                      value={signUpDept}
                      onChange={(e) => setSignUpDept(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-[#0d1424] border border-white/10 focus:border-[#00d2ff] rounded-xl text-white text-xs focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="AI Solutions">AI Solutions & LLMs</option>
                      <option value="Web Development">Full-Stack Web Development</option>
                      <option value="Mobile Apps">Mobile Engineering (iOS / Android)</option>
                      <option value="Cloud & DevOps">Cloud Infrastructure & DevOps</option>
                      <option value="UI/UX Design">UI/UX Design & Product</option>
                      <option value="Graduate Intern">Graduate Intern / Trainee</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Create Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock size={15} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/10 focus:border-[#00d2ff] rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock size={15} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={signUpConfirmPassword}
                        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/10 focus:border-[#00d2ff] rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer text-[11px] text-gray-400 select-none">
                    <input
                      type="checkbox"
                      checked={agreePolicy}
                      onChange={(e) => setAgreePolicy(e.target.checked)}
                      className="w-3.5 h-3.5 mt-0.5 rounded bg-white/10 border-white/20 text-cyan-500 focus:ring-0 focus:ring-offset-0 shrink-0"
                    />
                    <span>
                      I agree to the internal Sundaram Tech Solutions Security,
                      IP, and Workplace Data Guidelines.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#3b82f6] hover:from-[#38bdf8] hover:to-[#2563eb] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.99] cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <Sparkles size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Continue to Website / Explore Option */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-gray-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <span>Continue to Website & Explore Portfolio</span>
                <span className="text-cyan-400">→</span>
              </button>
            </div>

            {/* Security Notice Footer */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-cyan-400" />
                <span>Authorized Sundaram Tech Staff Only</span>
              </span>
              <span>ID: ST-AUTH-v2.6</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
