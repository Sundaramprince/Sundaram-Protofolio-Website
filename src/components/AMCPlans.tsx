import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Shield,
  Zap,
  Clock,
  Check,
  Headphones,
  CheckCircle2,
  Sparkles,
  QrCode,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { AMCPaymentModal } from "./AMCPaymentModal";

interface PlanModalProps {
  planName: string;
  price: string;
  onClose: () => void;
}

function PlanInquiryModal({ planName, price, onClose }: PlanModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [systemsCount, setSystemsCount] = useState("1-3 Systems");
  const [city, setCity] = useState("Bhopal");
  const [submitted, setSubmitted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleOpenPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phone) {
      alert("Please enter your Phone / WhatsApp number so we can link your payment.");
      return;
    }
    setShowPaymentModal(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi Sundaram Tech Solutions, I would like to book the ${planName} (${price}) for my infrastructure.`
    );
    window.open(`https://wa.me/917061523829?text=${text}`, "_blank");
    onClose();
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await fetch("/api/amc/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          customerName: name || "Customer",
          phone,
          city,
          systemsCount,
          amount: price,
          paymentMethod: "WhatsApp Inquiry",
          status: "pending",
        }),
      });
    } catch (err) {
      console.error("Failed to save AMC inquiry to database:", err);
    }
    setTimeout(() => {
      const text = encodeURIComponent(
        `Hi Sundaram Tech Solutions! I am interested in ${planName} (${price}).\nName: ${name}\nPhone: ${phone}\nLocation: ${city}\nTotal Systems: ${systemsCount}`
      );
      window.open(`https://wa.me/917061523829?text=${text}`, "_blank");
      onClose();
    }, 800);
  };

  if (showPaymentModal) {
    return (
      <AMCPaymentModal
        planName={planName}
        price={price}
        customerData={{
          name: name || "Valued Client",
          phone: phone || "+91 7061523829",
          city: city || "Bhopal",
          systemsCount,
        }}
        onClose={onClose}
        onBack={() => setShowPaymentModal(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0a0f1d] border border-blue-500/30 rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
              Annual Maintenance Contract
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">{planName}</h3>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-white">{price}</span>
            <span className="text-[11px] text-gray-400 block font-normal">1 Year Coverage</span>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 size={44} className="text-emerald-400 mx-auto" />
            <p className="font-semibold text-white">Opening Direct Support...</p>
            <p className="text-xs text-gray-400">Connecting you with our technical manager</p>
          </div>
        ) : (
          <form onSubmit={handleOpenPayment} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-gray-200 mb-1.5 flex items-center justify-between">
                <span>Your Name / Organization</span>
                <span className="text-[10px] text-cyan-400 font-normal">Contact Person</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sundaram / Tech Solutions"
                className="w-full px-4 py-2.5 bg-white/[0.07] border border-cyan-500/30 hover:border-cyan-500/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl text-sm font-medium text-white placeholder:text-gray-400/80 shadow-inner focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  Phone / WhatsApp <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Location / City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Bhopal / Bihar"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">Systems to Cover</label>
              <select
                value={systemsCount}
                onChange={(e) => setSystemsCount(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#0c1424] border border-white/10 focus:border-cyan-400 rounded-xl text-sm text-white focus:outline-none"
              >
                <option value="1 PC">1 PC / Laptop</option>
                <option value="2-3 Systems">2-3 Systems</option>
                <option value="4-10 Systems">4-10 Systems</option>
                <option value="Entire Office / Institution (10+)">Entire Office / Institution (10+)</option>
              </select>
            </div>

            {/* Payment Method Highlights Banner */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#00baf2]/20 border border-[#00baf2]/40 flex items-center justify-center text-[#00baf2]">
                  <QrCode size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-300 text-[11px] leading-tight">
                    Paytm / UPI: <strong className="text-white font-mono">7061523829</strong>
                  </span>
                  <span className="text-[10px] text-cyan-400">Custom sender amount supported</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00baf2]/20 text-[#00baf2] border border-[#00baf2]/40 font-bold uppercase tracking-wider">
                Paytm QR
              </span>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              {/* PRIMARY ACTION: PAY NOW WITH PAYTM QR / UPI METHODS */}
              <button
                type="button"
                onClick={handleOpenPayment}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00baf2] via-[#00d2ff] to-[#2563eb] hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-sm flex flex-col items-center justify-center shadow-xl shadow-cyan-500/30 border-2 border-white/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <QrCode size={19} className="text-slate-950 group-hover:scale-110 transition-transform" />
                  <span className="tracking-tight">Pay Now: Generate Paytm QR (7061523829)</span>
                  <ArrowRight size={17} className="text-slate-950 group-hover:translate-x-1.5 transition-transform" />
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] font-bold text-slate-900/90">
                  <span className="px-1.5 py-0.2 rounded bg-white/40">Paytm • UPI</span>
                  <span>Enter Sender Amount Online</span>
                </div>
              </button>

              {/* SECONDARY ACTION: INQUIRE VIA WHATSAPP */}
              <button
                type="button"
                onClick={handleSubmitForm}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Consult / Inquire via WhatsApp First</span>
              </button>

              {/* DIRECT WHATSAPP CONNECT */}
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full py-2 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-400 border border-emerald-500/30 font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Headphones size={13} />
                <span>Direct WhatsApp: +91 7061523829</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-xs text-gray-400 hover:text-white pt-1"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function AMCPlans() {
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null);

  const featuresHighlights = [
    {
      icon: <Zap size={22} className="text-blue-500" />,
      iconBg: "bg-blue-50",
      title: "SLA Priority",
      description: "4-24 hour guaranteed resolution time for critical issues",
    },
    {
      icon: <Clock size={22} className="text-emerald-500" />,
      iconBg: "bg-emerald-50",
      title: "Proactive Health Checks",
      description: "Quarterly preventative maintenance to catch issues before they happen",
    },
    {
      icon: <Shield size={22} className="text-purple-500" />,
      iconBg: "bg-purple-50",
      title: "Inventory Coverage",
      description: "Comprehensive management of all your IT assets under one contract",
    },
  ];

  const plans = [
    {
      name: "Basic AMC",
      price: "₹3,999",
      period: "/ year",
      response: "24-48 hours response",
      isPopular: false,
      buttonText: "Select Basic AMC",
      buttonVariant: "outline",
      features: [
        "1 PC / Laptop",
        "Software issues",
        "OS installation",
        "Remote support",
        "24-48 hrs response",
      ],
    },
    {
      name: "Standard AMC",
      price: "₹7,999",
      period: "/ year",
      response: "12-24 hours response",
      isPopular: true,
      buttonText: "Select Standard AMC",
      buttonVariant: "primary",
      features: [
        "2-3 Systems",
        "Hardware + Software",
        "Printer support",
        "Network support",
        "Priority support",
        "12-24 hrs response",
      ],
    },
    {
      name: "Premium AMC",
      price: "₹14,999",
      period: "/ year",
      response: "4-8 hours response",
      isPopular: false,
      buttonText: "Select Premium AMC",
      buttonVariant: "outline",
      features: [
        "Office / Shop / School",
        "Unlimited support",
        "On-site + Remote",
        "Network + Hardware",
        "Emergency support",
        "4-8 hrs response",
      ],
    },
  ];

  return (
    <section id="amc-plans" className="relative w-full pt-20 pb-28">
      {/* Top Banner with Dark Cyber Grid Background (Image 1 Style) */}
      <div className="relative py-20 px-6 overflow-hidden bg-[#030712] border-t border-b border-white/10">
        {/* Subtle Background Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111c3a]/80 border border-[#2563eb]/40 text-blue-300 text-xs sm:text-sm font-medium shadow-md shadow-blue-900/20"
          >
            <Shield size={16} className="text-[#38bdf8]" />
            <span>Enterprise Support Plans</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white"
          >
            Premium{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#60a5fa] drop-shadow-[0_2px_15px_rgba(0,210,255,0.4)]">
              AMC Packages
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Guaranteed uptime for your IT infrastructure. Our Annual Maintenance Contracts provide
            priority response, unlimited support, and peace of mind.
          </motion.p>
        </div>
      </div>

      {/* Light Clean Surface Section with 3 Feature Highlight Cards (Image 1 Bottom Row) */}
      <div className="bg-[#f8fafc] text-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* 3 Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresHighlights.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${feat.iconBg} shadow-sm`}
                >
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Choose Your Plan Section (Image 2 Style) */}
          <div className="pt-4">
            <div className="text-center space-y-2 mb-12">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Choose Your Plan
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                India-friendly pricing for businesses of all sizes
              </p>
            </div>

            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {plans.map((plan, idx) => {
                const isPopular = plan.isPopular;

                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 }}
                    className={`relative flex flex-col bg-white rounded-2xl p-8 transition-all duration-300 ${
                      isPopular
                        ? "border-2 border-[#2563eb] shadow-xl shadow-blue-500/10 scale-[1.02] z-10"
                        : "border border-slate-200 shadow-md hover:shadow-lg"
                    }`}
                  >
                    {/* Most Popular Ribbon */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <div className="px-4 py-1 rounded-full bg-[#2563eb] text-white text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md shadow-blue-600/30">
                          <span>★</span>
                          <span>MOST POPULAR</span>
                        </div>
                      </div>
                    )}

                    {/* Plan Name & Pricing */}
                    <div className="text-center pt-2 pb-6 border-b border-slate-100">
                      <h4 className="text-xl font-bold text-slate-900">{plan.name}</h4>

                      <div className="mt-4 flex items-baseline justify-center gap-1">
                        <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                          {plan.price}
                        </span>
                        <span className="text-sm font-medium text-slate-500">
                          {plan.period}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium">
                        <Clock size={14} className="text-slate-400" />
                        <span>{plan.response}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="py-6 flex-1 space-y-3.5">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-sm text-slate-700">
                          <Check size={16} className="text-emerald-600 shrink-0 font-bold" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      {isPopular ? (
                        <button
                          type="button"
                          onClick={() => setSelectedPlan({ name: plan.name, price: plan.price })}
                          className="w-full py-3 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm shadow-md shadow-blue-600/30 hover:shadow-blue-600/40 transition-all active:scale-[0.99] cursor-pointer"
                        >
                          {plan.buttonText}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedPlan({ name: plan.name, price: plan.price })}
                          className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-sm hover:border-slate-300 transition-all active:scale-[0.99] cursor-pointer"
                        >
                          {plan.buttonText}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Custom Support Consultation Note */}
            <div className="mt-12 text-center p-6 max-w-3xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#2563eb]" />
                  <span className="text-sm font-bold text-slate-900">
                    Need Custom AMC for Institutions or Colleges?
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  We provide tailored on-site contracts, lab setups, and bulk SLA across Bhopal and Bihar.
                </p>
              </div>

              <a
                href="https://wa.me/917061523829?text=Hi%20Sundaram%20Tech%20Solutions,%20I%20would%20like%20to%20request%20a%20Custom%20Enterprise%20AMC%20Quote."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shrink-0 shadow"
              >
                Inquire Custom Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Inquiry Modal */}
      {selectedPlan && (
        <PlanInquiryModal
          planName={selectedPlan.name}
          price={selectedPlan.price}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  );
}
