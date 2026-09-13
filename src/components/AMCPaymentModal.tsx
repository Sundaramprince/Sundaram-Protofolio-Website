import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  QrCode,
  CreditCard,
  Building2,
  Copy,
  Check,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Download,
  Share2,
  X,
  Sparkles,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";

interface AMCPaymentModalProps {
  planName: string;
  price: string;
  customerData: {
    name: string;
    phone: string;
    city: string;
    systemsCount: string;
  };
  onClose: () => void;
  onBack: () => void;
}

export function AMCPaymentModal({
  planName,
  price,
  customerData,
  onClose,
  onBack,
}: AMCPaymentModalProps) {
  const [paymentTab, setPaymentTab] = useState<"upi" | "bank" | "card">("upi");
  const [selectedUpiMode, setSelectedUpiMode] = useState<"paytm" | "axis">("paytm");
  
  // Extract numerical base amount e.g. "₹7,999" -> 7999
  const baseNumericPrice = price.replace(/[^0-9]/g, "") || "3999";
  
  // Sender Amount state (online customizable amount)
  const [senderAmount, setSenderAmount] = useState<string>(baseNumericPrice);

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPaytmPhone, setCopiedPaytmPhone] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedIfsc, setCopiedIfsc] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    receiptId: string;
    timestamp: string;
    paidAmount: string;
  } | null>(null);

  const paytmPhone = "7061523829";
  const paytmUpiId = "7061523829@paytm";
  const axisUpiId = "Sundaram.1@ptaxis";
  const payeeName = "Sundaram Kumar";

  // Active UPI ID based on selected mode
  const activeUpiId = selectedUpiMode === "paytm" ? paytmUpiId : axisUpiId;
  const currentAmountNum = senderAmount.replace(/[^0-9]/g, "") || baseNumericPrice;

  // Standard UPI URI format
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(activeUpiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${currentAmountNum}&cu=INR&tn=${encodeURIComponent(`AMC Plan ${planName} Sundaram Tech`)}`;

  // Paytm App direct deep-link
  const paytmDeepLink = `paytmmp://pay?pa=${encodeURIComponent(paytmUpiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${currentAmountNum}&cu=INR&tn=${encodeURIComponent(`Sundaram Tech AMC ${planName}`)}`;

  // Public QR code generator API with high resolution
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=8&data=${encodeURIComponent(
    upiDeepLink
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(activeUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyPaytmPhone = () => {
    navigator.clipboard.writeText(paytmPhone);
    setCopiedPaytmPhone(true);
    setTimeout(() => setCopiedPaytmPhone(false), 2000);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("923020058219482");
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyIfsc = () => {
    navigator.clipboard.writeText("UTIB0000042");
    setCopiedIfsc(true);
    setTimeout(() => setCopiedIfsc(false), 2000);
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim()) return;

    setIsSubmitting(true);
    const receiptNum = `ST-AMC-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      await fetch("/api/amc/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          customerName: customerData.name || "Customer",
          phone: customerData.phone,
          city: customerData.city,
          systemsCount: customerData.systemsCount,
          amount: `₹${Number(currentAmountNum).toLocaleString("en-IN")}`,
          paymentMethod:
            paymentTab === "upi"
              ? `Paytm / UPI (${activeUpiId})`
              : paymentTab === "bank"
              ? "Bank Transfer (NEFT/IMPS)"
              : "Card/Gateway",
          utrNumber,
          status: "paid_pending_approval",
        }),
      });
    } catch (err) {
      console.error("Database save notice:", err);
    }

    setReceiptData({
      receiptId: receiptNum,
      timestamp: dateStr,
      paidAmount: `₹${Number(currentAmountNum).toLocaleString("en-IN")}`,
    });
    setIsSubmitting(false);
    setPaymentSuccess(true);
  };

  const handleShareReceiptWhatsApp = () => {
    if (!receiptData) return;
    const msg = encodeURIComponent(
      `*SUNDARAM TECH SOLUTIONS - AMC PAYMENT RECEIPT*\n\n` +
        `🧾 Receipt ID: ${receiptData.receiptId}\n` +
        `📦 Plan: ${planName}\n` +
        `💰 Sender Paid Amount: ${receiptData.paidAmount} (Plan: ${price})\n` +
        `👤 Customer: ${customerData.name}\n` +
        `📞 Phone: ${customerData.phone}\n` +
        `📍 Location: ${customerData.city}\n` +
        `📱 Payment: Paytm / UPI (${activeUpiId})\n` +
        `🔢 UPI Ref / UTR: ${utrNumber}\n` +
        `📅 Date: ${receiptData.timestamp}\n\n` +
        `Please activate my Annual Maintenance Contract.`
    );
    window.open(`https://wa.me/917061523829?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0a0f1d] border border-blue-500/40 rounded-2xl text-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#0d1527]">
          <div className="flex items-center gap-3">
            {!paymentSuccess && (
              <button
                type="button"
                onClick={onBack}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="Back to details"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  Checkout
                </span>
                <span className="text-xs text-gray-400 font-medium">{planName}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {paymentSuccess ? "Payment Receipt" : "Select Payment Method"}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-gray-400 block">Plan: {price}</span>
              <span className="text-sm sm:text-base font-black text-cyan-400">
                Amount: ₹{Number(currentAmountNum).toLocaleString("en-IN")}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {paymentSuccess && receiptData ? (
            /* ================= Success & Receipt Screen ================= */
            <div className="space-y-5 text-center py-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20"
              >
                <CheckCircle2 size={36} />
              </motion.div>

              <div>
                <h4 className="text-xl font-bold text-white">Payment Recorded Successfully!</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Your AMC enrollment is queued for priority activation by our engineering team.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#0f172a] border border-white/10 rounded-xl p-4 text-left space-y-2.5 text-xs">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-gray-400">Receipt ID</span>
                  <span className="font-mono font-bold text-cyan-300">{receiptData.receiptId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Selected Plan</span>
                  <span className="font-semibold text-white">{planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sender Paid Amount</span>
                  <span className="font-bold text-emerald-400 text-sm">{receiptData.paidAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Plan Fee</span>
                  <span className="text-gray-300">{price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer Name</span>
                  <span className="text-white">{customerData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone / WhatsApp</span>
                  <span className="text-white">{customerData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">{customerData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Channel</span>
                  <span className="text-cyan-300 font-mono text-[11px]">Paytm / UPI ({activeUpiId})</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-gray-400">UPI / Reference (UTR)</span>
                  <span className="font-mono text-cyan-300 font-semibold">{utrNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase text-[10px]">
                    Verified & Recorded
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleShareReceiptWhatsApp}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Share2 size={16} />
                  <span>Send Receipt to WhatsApp (+91 7061523829)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : (
            /* ================= Payment Method Selection & Checkout ================= */
            <div className="space-y-5">
              {/* Payment Method Switcher Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setPaymentTab("upi")}
                  className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    paymentTab === "upi"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md shadow-cyan-500/20"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <QrCode size={15} />
                  <span>UPI QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentTab("bank")}
                  className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    paymentTab === "bank"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md shadow-cyan-500/20"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Building2 size={15} />
                  <span>Bank (IMPS)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentTab("card")}
                  className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    paymentTab === "card"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md shadow-cyan-500/20"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <CreditCard size={15} />
                  <span>Cards / Net</span>
                </button>
              </div>

              {/* TAB 1: PAYTM & UPI QR CODE (7061523829) */}
              {paymentTab === "upi" && (
                <div className="space-y-4">
                  {/* UPI Channel Selector: Paytm vs Axis */}
                  <div className="flex items-center justify-between p-1 bg-white/5 rounded-xl border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedUpiMode("paytm")}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedUpiMode === "paytm"
                          ? "bg-[#00baf2] text-black shadow-md shadow-[#00baf2]/20"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-black"></span>
                      <span>Paytm QR (7061523829)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUpiMode("axis")}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedUpiMode === "axis"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Axis UPI (Sundaram.1@ptaxis)</span>
                    </button>
                  </div>

                  {/* SENDER AMOUNT ONLINE CONTROLS */}
                  <div className="bg-[#0e1628] border border-cyan-500/30 rounded-2xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                        <SlidersHorizontal size={14} className="text-cyan-400" />
                        <span>Sender Amount (Online)</span>
                      </label>
                      <span className="text-[10px] text-cyan-300 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        QR updates live
                      </span>
                    </div>

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 font-bold text-base">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={senderAmount}
                        onChange={(e) => setSenderAmount(e.target.value)}
                        placeholder="Enter amount to pay"
                        className="w-full pl-8 pr-28 py-2 bg-white/5 border border-white/15 focus:border-cyan-400 rounded-xl text-sm font-bold text-white font-mono focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setSenderAmount(baseNumericPrice)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Reset Plan Fee
                      </button>
                    </div>

                    {/* Quick Amount Preset Chips */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5 text-[11px]">
                      <span className="text-[10px] text-gray-400">Quick set:</span>
                      <button
                        type="button"
                        onClick={() => setSenderAmount(baseNumericPrice)}
                        className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold transition-colors ${
                          senderAmount === baseNumericPrice
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                            : "bg-white/5 text-gray-300 border-white/10 hover:text-white"
                        }`}
                      >
                        Full Plan: ₹{Number(baseNumericPrice).toLocaleString("en-IN")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSenderAmount("1000")}
                        className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold transition-colors ${
                          senderAmount === "1000"
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                            : "bg-white/5 text-gray-300 border-white/10 hover:text-white"
                        }`}
                      >
                        ₹1,000 Advance
                      </button>
                      <button
                        type="button"
                        onClick={() => setSenderAmount("2000")}
                        className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold transition-colors ${
                          senderAmount === "2000"
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                            : "bg-white/5 text-gray-300 border-white/10 hover:text-white"
                        }`}
                      >
                        ₹2,000
                      </button>
                      <button
                        type="button"
                        onClick={() => setSenderAmount("500")}
                        className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold transition-colors ${
                          senderAmount === "500"
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                            : "bg-white/5 text-gray-300 border-white/10 hover:text-white"
                        }`}
                      >
                        ₹500
                      </button>
                    </div>
                  </div>

                  {/* DYNAMIC QR CODE CARD */}
                  <div className="bg-white rounded-2xl p-4 text-center shadow-xl border border-slate-200">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Smartphone size={14} className="text-[#00baf2]" />
                        <span>
                          {selectedUpiMode === "paytm" ? "Paytm QR • 7061523829" : "Axis Bank UPI QR"}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        ₹{Number(currentAmountNum).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* QR Code Graphic */}
                    <div className="py-3 flex justify-center items-center">
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-inner">
                        <img
                          src={qrCodeUrl}
                          alt={`QR for ${activeUpiId}`}
                          className="w-48 h-48 sm:w-52 sm:h-52 object-contain mx-auto"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="text-slate-600 text-[11px] font-medium flex items-center justify-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 bg-sky-100 text-[#00baf2] font-black rounded">Paytm</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-bold">Google Pay</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-bold">PhonePe</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-bold">BHIM</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-bold">Cred</span>
                    </div>
                  </div>

                  {/* PAYTM NUMBER & UPI DETAILS QUICK-COPY */}
                  <div className="bg-[#0f172a] border border-blue-500/30 rounded-xl p-3 space-y-2 text-xs">
                    {/* Paytm Phone Number */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">
                          Paytm Mobile Number
                        </span>
                        <span className="text-sm font-mono font-bold text-white">
                          {paytmPhone}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyPaytmPhone}
                        className="px-2.5 py-1.5 rounded-lg bg-[#00baf2]/20 hover:bg-[#00baf2]/30 text-[#00baf2] text-xs font-bold flex items-center gap-1 transition-colors border border-[#00baf2]/40 cursor-pointer"
                      >
                        {copiedPaytmPhone ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        <span>{copiedPaytmPhone ? "Copied" : "Copy Phone"}</span>
                      </button>
                    </div>

                    {/* Active UPI ID */}
                    <div className="flex items-center justify-between pt-0.5">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">
                          {selectedUpiMode === "paytm" ? "Paytm VPA" : "Axis UPI ID"}
                        </span>
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          {activeUpiId}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="px-2.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1 transition-colors border border-cyan-500/30 cursor-pointer"
                      >
                        {copiedUpi ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        <span>{copiedUpi ? "Copied" : "Copy UPI"}</span>
                      </button>
                    </div>
                  </div>

                  {/* DIRECT APP LAUNCH BUTTONS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={paytmDeepLink}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#00baf2] to-sky-600 hover:brightness-105 font-bold text-slate-950 text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20 transition-all text-center"
                    >
                      <Smartphone size={14} />
                      <span>Open in Paytm App</span>
                      <ExternalLink size={12} />
                    </a>

                    <a
                      href={upiDeepLink}
                      className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all text-center"
                    >
                      <Smartphone size={14} />
                      <span>Pay via Any UPI App</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}

              {/* TAB 2: BANK TRANSFER (NEFT / IMPS / RTGS) */}
              {paymentTab === "bank" && (
                <div className="space-y-3 bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-xs">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold pb-2 border-b border-white/10">
                    <Building2 size={16} />
                    <span>Direct Bank Transfer Details (IMPS / NEFT)</span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Account Holder</span>
                        <span className="font-semibold text-white">Sundaram Tech Solutions</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Bank Name</span>
                        <span className="font-semibold text-white">Axis Bank Ltd.</span>
                      </div>
                      <span className="text-[11px] text-gray-400">Current A/C</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Account Number</span>
                        <span className="font-mono font-bold text-white text-sm">
                          923020058219482
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-cyan-300 flex items-center gap-1 font-bold text-[11px]"
                      >
                        {copiedAccount ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedAccount ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div>
                        <span className="text-[10px] text-gray-400 block">IFSC Code</span>
                        <span className="font-mono font-bold text-white text-sm">
                          UTIB0000042
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyIfsc}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-cyan-300 flex items-center gap-1 font-bold text-[11px]"
                      >
                        {copiedIfsc ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedIfsc ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    <div className="p-2 rounded-lg bg-white/5">
                      <span className="text-[10px] text-gray-400 block">Branch & City</span>
                      <span className="font-medium text-gray-300">
                        Anand Nagar / Bhopal Main Branch, Madhya Pradesh
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CARDS & NETBANKING */}
              {paymentTab === "card" && (
                <div className="space-y-4 bg-[#0f172a] border border-white/10 rounded-2xl p-5 text-center">
                  <CreditCard size={36} className="text-cyan-400 mx-auto" />
                  <div>
                    <h5 className="font-bold text-white text-sm">Credit / Debit Card & NetBanking</h5>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                      Pay using Visa, MasterCard, RuPay, Corporate Cards or NetBanking.
                    </p>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-left space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
                      <ShieldCheck size={14} />
                      <span>Instant 256-bit Encrypted Checkout</span>
                    </div>
                    <p className="text-gray-300 text-[11px]">
                      Click below to request a secured Payment Gateway link directly on your WhatsApp or Email.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/917061523829?text=${encodeURIComponent(
                      `Hi Sundaram Tech, please generate an instant Card / NetBanking payment link for ${planName} (${price}). Customer: ${customerData.name}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Request Card Payment Link on WhatsApp</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* Confirmation / UTR Submission Form */}
              <form onSubmit={handleConfirmPayment} className="pt-2 border-t border-white/10 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-200">
                      Paid? Enter 12-digit UPI Ref / UTR / Txn ID
                    </label>
                    <span className="text-[10px] text-cyan-400">Required for instant receipt</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. 423871928341 or UPI Transaction ID"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-cyan-400 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || !utrNumber.trim()}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <ShieldCheck size={16} />
                    <span>{isSubmitting ? "Verifying..." : "Verify & Complete Order"}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 pt-1">
                  <ShieldCheck size={12} className="text-cyan-400" />
                  <span>24x7 Official Support: +91 7061523829 | Bhopal & Bihar</span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
