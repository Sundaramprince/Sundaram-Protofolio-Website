import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Sparkles,
  Send,
  Mic,
  MicOff,
  X,
  Bot,
  User,
  Globe,
  MapPin,
  Zap,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  BrainCircuit,
  Volume2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  modelUsed?: string;
  groundingMetadata?: any;
  timestamp: string;
}

export function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hello! I'm the official AI IT Engineer for **Sundaram Tech Solutions**.\n\nHow can I help you today? You can ask me about our **AMC Plans**, IT repairs, network setup, UPI payments (`Sundaram.1@ptaxis`), or speak to me directly using your microphone!",
      timestamp: "Just now",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [modelSpeed, setModelSpeed] = useState<"standard" | "fast" | "pro">("standard");
  const [groundingMode, setGroundingMode] = useState<"none" | "search" | "maps">("search");
  const [showConfig, setShowConfig] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle Speech Recording & Transcription using gemini-3.5-transcribe
  const handleToggleRecord = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          // Stop media tracks
          stream.getTracks().forEach((track) => track.stop());

          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          if (audioBlob.size < 500) {
            return;
          }

          setIsTranscribing(true);

          try {
            // Convert to base64
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
              const base64Data = (reader.result as string).split(",")[1];
              const response = await fetch("/api/gemini/transcribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  audioBase64: base64Data,
                  mimeType: "audio/webm",
                }),
              });

              const data = await response.json();
              if (data.transcription) {
                setInput((prev) => (prev ? `${prev} ${data.transcription}` : data.transcription));
              }
              setIsTranscribing(false);
            };
          } catch (err) {
            console.error("Transcription error:", err);
            setIsTranscribing(false);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied or error:", err);
        alert("Microphone access was denied or not supported in this browser.");
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, text: m.text })),
          groundingMode,
          modelSpeed,
        }),
      });

      const data = await response.json();

      if (data.reply) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: data.reply,
          modelUsed: data.modelUsed,
          groundingMetadata: data.groundingMetadata,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || "Failed to receive AI response");
      }
    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: `Sorry, I encountered an issue: ${err.message || "Please check server connectivity."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Which AMC plan is right for 5 computers?",
    "How do I pay with UPI (Sundaram.1@ptaxis)?",
    "Where are your branches located?",
    "My Windows PC is freezing on boot",
  ];

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[120]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-2xl shadow-cyan-500/30 border border-white/20 hover:opacity-95 transition-all cursor-pointer"
        >
          <div className="relative">
            <Sparkles size={18} className="animate-spin-slow text-yellow-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span>Ask Sundaram AI</span>
        </motion.button>
      </div>

      {/* Slide-out Gemini Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 sm:right-6 z-[150] w-[calc(100vw-2rem)] sm:w-[460px] h-[600px] max-h-[82vh] bg-[#090d16] border border-blue-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Chatbot Header */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0d1629] to-[#0a1120] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold shadow-md">
                  <Bot size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">Sundaram Tech AI</h4>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {modelSpeed === "fast" ? "Flash Lite" : modelSpeed === "pro" ? "Pro 3.1" : "Flash 3.5"}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Online • Grounded Assistant</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Grounding Mode Toggle */}
                <button
                  type="button"
                  onClick={() => setShowConfig(!showConfig)}
                  className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                    showConfig
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
                  }`}
                  title="Configure AI model and grounding"
                >
                  <BrainCircuit size={15} />
                  <ChevronDown size={12} />
                </button>

                {/* Reset Chat */}
                <button
                  type="button"
                  onClick={() =>
                    setMessages([
                      {
                        id: "welcome-reset",
                        role: "assistant",
                        text: "Conversation reset. How else can I assist your IT needs?",
                        timestamp: "Just now",
                      },
                    ])
                  }
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Clear chat history"
                >
                  <RotateCcw size={15} />
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Collapsible Model & Grounding Config Drawer */}
            <AnimatePresence>
              {showConfig && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-[#0b1324] border-b border-white/10 p-3 text-xs space-y-2.5 overflow-hidden"
                >
                  {/* Grounding Mode */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                      Data Grounding Tool
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setGroundingMode("search")}
                        className={`p-1.5 rounded-lg border flex items-center justify-center gap-1 font-semibold ${
                          groundingMode === "search"
                            ? "bg-blue-600/30 border-blue-500 text-cyan-300"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        <Globe size={13} />
                        <span>Google Search</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setGroundingMode("maps")}
                        className={`p-1.5 rounded-lg border flex items-center justify-center gap-1 font-semibold ${
                          groundingMode === "maps"
                            ? "bg-blue-600/30 border-blue-500 text-cyan-300"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        <MapPin size={13} />
                        <span>Maps Location</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setGroundingMode("none")}
                        className={`p-1.5 rounded-lg border flex items-center justify-center gap-1 font-semibold ${
                          groundingMode === "none"
                            ? "bg-blue-600/30 border-blue-500 text-cyan-300"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        <Zap size={13} />
                        <span>Direct Model</span>
                      </button>
                    </div>
                  </div>

                  {/* Model Speed Tier */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                      Gemini Intelligence Tier
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setModelSpeed("standard")}
                        className={`p-1.5 rounded-lg border text-[11px] font-semibold ${
                          modelSpeed === "standard"
                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        gemini-3.5-flash
                      </button>
                      <button
                        type="button"
                        onClick={() => setModelSpeed("fast")}
                        className={`p-1.5 rounded-lg border text-[11px] font-semibold ${
                          modelSpeed === "fast"
                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        3.1-flash-lite
                      </button>
                      <button
                        type="button"
                        onClick={() => setModelSpeed("pro")}
                        className={`p-1.5 rounded-lg border text-[11px] font-semibold ${
                          modelSpeed === "pro"
                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        3.1-pro-preview
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                      <Bot size={15} />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 shadow-md ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-xs"
                        : "bg-[#11192e] border border-white/10 text-gray-200 rounded-tl-xs"
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </div>

                    {/* Google Grounding Sources (Search / Maps) */}
                    {msg.groundingMetadata?.groundingChunks && (
                      <div className="mt-2 pt-2 border-t border-white/10 text-[10px] space-y-1">
                        <span className="font-semibold text-cyan-400 flex items-center gap-1">
                          <Globe size={11} />
                          <span>Sources & Grounded Data:</span>
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {msg.groundingMetadata.groundingChunks.slice(0, 3).map((chunk: any, i: number) => {
                            const title = chunk.web?.title || `Source ${i + 1}`;
                            const uri = chunk.web?.uri;
                            return (
                              <a
                                key={i}
                                href={uri || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 text-cyan-200 hover:bg-white/20 transition-colors"
                              >
                                <span className="truncate max-w-[120px]">{title}</span>
                                <ExternalLink size={9} />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="mt-1 text-[9px] text-gray-400 text-right">
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <User size={15} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 items-center text-gray-400 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-300">
                    <Bot size={15} />
                  </div>
                  <div className="p-2.5 bg-[#11192e] border border-white/10 rounded-2xl rounded-tl-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-300"></span>
                    <span className="text-[11px] text-gray-400">Sundaram AI is analyzing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Pills */}
            <div className="px-3 py-1.5 bg-[#0a101f] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white whitespace-nowrap border border-white/10 transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input & Microphone Bar */}
            <div className="p-3 bg-[#0d1629] border-t border-white/10">
              {isTranscribing && (
                <div className="mb-2 p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] flex items-center gap-2 animate-pulse">
                  <Volume2 size={13} />
                  <span>Transcribing with gemini-3.5-transcribe...</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* Voice Input Button using gemini-3.5-transcribe */}
                <button
                  type="button"
                  onClick={handleToggleRecord}
                  disabled={isTranscribing}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isRecording
                      ? "bg-red-500 text-white border-red-400 animate-pulse shadow-lg shadow-red-500/30"
                      : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 hover:text-white"
                  }`}
                  title={isRecording ? "Stop Recording" : "Voice Input (Microphone)"}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={
                    isRecording ? "Listening... speak now" : "Ask about AMC, IT repair, pricing, UPI..."
                  }
                  className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold disabled:opacity-40 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </div>

              <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-500 px-1">
                <span>Microphone uses gemini-3.5-transcribe</span>
                <span>Powered by Gemini 3.5</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
