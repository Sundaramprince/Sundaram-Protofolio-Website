import { motion } from "motion/react";
import { ArrowUp, MapPin, Mail, Phone, Linkedin, Instagram, Facebook, Twitter, Github, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { SundaramLogo } from "./SundaramLogo";

export function Footer() {
  const [showNotification, setShowNotification] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#skills" },
    { name: "AMC Plans", href: "#amc-plans" },
    { name: "Careers", href: "#experience" },
    { name: "Blog", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "AI Solutions",
    "IT AMC Maintenance",
    "Web Development",
    "Mobile Apps",
    "SaaS Platforms",
    "Cloud Deployment",
  ];

  return (
    <footer className="border-t border-white/10 mt-16 bg-[#060a12] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none" />

      {/* Main 4-Column Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-5">
            {/* Logo */}
            <a href="#" className="flex items-center group transition-transform hover:scale-105">
              <SundaramLogo size={50} showText={true} />
            </a>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Building smart AI-powered software, scalable web platforms, and innovative digital experiences.
            </p>

            {/* Social Media Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.linkedin.com/in/sundaram-prince-kumar"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00d2ff]/50 hover:bg-[#00d2ff]/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/sundaramprincekumar/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X Twitter"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-sky-400/50 hover:bg-sky-400/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-white mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-base font-semibold text-white mb-5 tracking-wide">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#skills"
                    className="text-gray-400 hover:text-white text-sm transition-colors block py-0.5"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white mb-5 tracking-wide">
              Contact Us
            </h4>

            {/* Primary Address */}
            <div className="flex items-start gap-3 text-sm text-gray-400">
              <div className="text-[#00d2ff] mt-0.5 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-[#00d2ff] uppercase">Primary</span>
                <p className="text-white font-medium leading-snug">Anand Nagar, Bhopal</p>
                <p className="text-gray-400 text-xs mt-0.5">Madhya Pradesh, India</p>
              </div>
            </div>

            {/* Secondary Address */}
            <div className="flex items-start gap-3 text-sm text-gray-400">
              <div className="text-[#a78bfa] mt-0.5 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-[#a78bfa] uppercase">Secondary</span>
                <p className="text-white font-medium leading-snug">Madhubani, Bihar</p>
                <p className="text-gray-400 text-xs mt-0.5">Bihar, India</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="text-[#00d2ff]">
                <Mail size={18} />
              </div>
              <a
                href="mailto:contact@sundaramtech.com"
                className="hover:text-white transition-colors"
              >
                contact@sundaramtech.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="text-[#00d2ff]">
                <Phone size={18} />
              </div>
              <a
                href="tel:+917061523829"
                className="hover:text-white transition-colors font-medium"
              >
                +91 7061523829
              </a>
            </div>

            {/* WhatsApp CTA Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/917061523829?text=Hi%20Sundaram%20Tech%20Solutions,%20I%20would%20like%20to%20inquire%20about%20your%20services"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#06382b]/80 border border-[#10b981]/30 hover:border-[#10b981]/60 hover:bg-[#074737] text-emerald-300 font-medium flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-950/40 text-sm group"
              >
                {/* WhatsApp SVG Icon */}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-emerald-400 group-hover:scale-110 transition-transform">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.196 8.196 0 0 1-1.26-4.47c0-4.54 3.7-8.23 8.24-8.23m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#03060c] py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Sundaram Tech Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {/* Latest Blogs Pill */}
            <a
              href="#resume"
              className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-white text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>🔥</span>
              <span>Check our latest blogs!</span>
            </a>

            {/* Notification Badge / Assistant Button */}
            {showNotification && (
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                title="Connect with AI & Tech Specialists"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6366f1] via-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-white shadow-lg shadow-purple-500/30 relative group cursor-pointer"
              >
                <Sparkles size={17} className="animate-pulse" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#060a12]">
                  1
                </span>
              </motion.a>
            )}

            {/* Scroll To Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.92 }}
              aria-label="Scroll to top"
              className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowUp size={17} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

