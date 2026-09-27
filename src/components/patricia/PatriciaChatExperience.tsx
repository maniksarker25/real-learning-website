"use client";

import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  RefreshCw,
  ArrowDown,
  ArrowRight,
  Compass,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useLenis } from "@/components/providers/lenis-provider";
import {
  ChatMessage,
  LifeGPSState,
  INITIAL_PROMPTS,
  INITIAL_LIFE_GPS,
  getPatriciaResponse,
} from "./patriciaDialogEngine";

interface PatriciaChatExperienceProps {
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
  onGoNext?: () => void;
}

function PatriciaAvatar({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div
      className={`relative rounded-xl flex items-center justify-center shadow-inner select-none transition-transform hover:scale-105 bg-[#c26d44] shrink-0 ${className}`}
    >
      <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-current text-white/90">
        <path
          d="M10 13c0-1.5 1.2-2.5 2.5-2.5s2.5 1 2.5 2.5M17 13c0-1.5 1.2-2.5 2.5-2.5s2.5 1 2.5 2.5"
          stroke="rgba(0,0,0,0.65)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M13 19c1 1.2 2.5 1.8 3.5 1.8s2.5-.6 3.5-1.8"
          stroke="rgba(0,0,0,0.65)"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

export const PatriciaChatExperience = memo(function PatriciaChatExperience({
  initialPrompt,
  onClearInitialPrompt,
  onGoNext,
}: PatriciaChatExperienceProps = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "patricia",
      text: "Hi! I'm Patricia, your AI Life GPS. Let's figure out where you are, where you want to go, and your next best step.",
      timestamp: "Just now",
      suggestedQuestions: INITIAL_PROMPTS,
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [gpsState, setGpsState] = useState<LifeGPSState>(INITIAL_LIFE_GPS);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handledPromptRef = useRef<string | null>(null);

  const lenis = useLenis();

  const handleGoNext = useCallback(() => {
    if (onGoNext) {
      onGoNext();
      return;
    }
    const nextEl = document.getElementById("how-it-works");
    if (nextEl) {
      if (lenis) {
        lenis.scrollTo(nextEl, { duration: 1.2, offset: -20 });
      } else {
        nextEl.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (lenis) {
        lenis.scrollTo(window.scrollY + window.innerHeight, { duration: 1.2 });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }
    }
  }, [onGoNext, lenis]);

  const scrollToBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Keep input focused after typing ends for desktop devices
  useEffect(() => {
    if (!isTyping) {
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        inputRef.current?.focus();
      }
    }
  }, [isTyping]);

  const handleSendMessage = useCallback(
    (textToSend: string) => {
      const trimmed = textToSend.trim();
      if (!trimmed || isTyping) return;

      const userMsgId = `user-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: userMsgId,
          sender: "user",
          text: trimmed,
          timestamp: "Just now",
        },
      ]);
      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        const reply = getPatriciaResponse(trimmed);

        if (reply.gpsUpdate) {
          setGpsState((prev) => ({
            ...prev,
            ...reply.gpsUpdate,
          }));
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `patricia-${Date.now()}`,
            sender: "patricia",
            text: reply.replyText,
            timestamp: "Just now",
            suggestedQuestions: reply.suggestedQuestions,
            gpsUpdate: reply.gpsUpdate,
          },
        ]);

        setIsTyping(false);
      }, 450);
    },
    [isTyping],
  );

  useEffect(() => {
    if (initialPrompt && initialPrompt !== handledPromptRef.current) {
      handledPromptRef.current = initialPrompt;
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, handleSendMessage, onClearInitialPrompt]);

  const handleReset = useCallback(() => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: "patricia",
        text: "Hi! I'm Patricia, your AI Life GPS. Let's figure out where you are, where you want to go, and your next best step.",
        timestamp: "Just now",
        suggestedQuestions: INITIAL_PROMPTS,
      },
    ]);
    setGpsState(INITIAL_LIFE_GPS);
  }, []);

  return (
    <div
      id="patricia-chat-card"
      className="relative z-20 w-full h-full bg-[#141412] flex flex-col justify-between overflow-hidden text-white select-none border border-white/10"
    >
      {/* Background blueprint grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-36 bg-gradient-to-b from-orange-500/10 via-amber-500/[0.02] to-transparent pointer-events-none blur-3xl" />

      {/* ========================================================= */}
      {/* 1. TOP HEADER BAR: Clean, spacious, no-clutter layout     */}
      {/* ========================================================= */}
      <header className="relative z-20 h-12 sm:h-14 px-3 sm:px-6 border-b border-white/[0.08] bg-[#1a1a18]/95 backdrop-blur-xl flex items-center justify-between shrink-0">
        {/* Left: macOS Dots + Patricia Brand Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              title="Reset Conversation"
              className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/20 flex items-center justify-center cursor-pointer transition-transform hover:scale-115 active:scale-95 shadow-sm"
            />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/20" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/20" />
          </div>

          <div className="flex items-center gap-1.5 ml-0.5 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
            <span className="font-bold text-xs sm:text-sm text-white tracking-tight truncate">
              Patricia
            </span>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-[9px] font-mono text-orange-300 font-semibold tracking-wider uppercase shrink-0">
              AI Life GPS
            </span>
          </div>
        </div>

        {/* Center: Live GPS Status Breadcrumb (Only on desktop screens where space permits) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/70 max-w-xs truncate">
          <Compass className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <span className="truncate">{gpsState.whereYouAre}</span>
        </div>

        {/* Right Tools: Reset + Skip CTA (Always cleanly visible!) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* SKIP BUTTON */}
          <button
            type="button"
            onClick={handleGoNext}
            className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-[11px] sm:text-xs font-semibold shadow-sm transition-all cursor-pointer group active:scale-95 shrink-0"
            title="Skip and go to next section"
          >
            <span>Skip</span>
            <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. CHAT FEED: Comfortable, readable message list          */}
      {/* ========================================================= */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex-1 overflow-y-auto overscroll-y-auto w-full no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overscrollBehaviorY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="max-w-4xl mx-auto w-full px-3.5 sm:px-6 py-4 sm:py-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col w-full ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Sender Tag */}
                <div
                  className={`flex items-center gap-1.5 mb-1 text-[11px] ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span className="font-semibold text-orange-200">You</span>
                    </>
                  ) : (
                    <>
                      <PatriciaAvatar className="w-4 h-4 rounded-md" />
                      <span className="font-semibold text-orange-200">
                        Patricia
                      </span>
                    </>
                  )}
                  <span className="text-[10px] text-white/30">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`w-full max-w-2xl text-xs sm:text-sm leading-relaxed rounded-2xl p-3 sm:p-4 shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-orange-600 to-[#c26d44] text-white rounded-tr-sm self-end"
                      : "bg-[#1d1d1b] border border-white/[0.08] text-white/95 rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* GPS Next Step card inside message if update occurred */}
                  {msg.gpsUpdate?.nextBestStep && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-white/[0.03] p-2.5 rounded-xl">
                      <div className="flex items-center gap-1.5 text-orange-200 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>
                          <strong>Next Step:</strong> {msg.gpsUpdate.nextBestStep}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleGoNext}
                        className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-medium text-xs transition-colors cursor-pointer shrink-0"
                      >
                        <span>Explore Step</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Prompts Options - Flex Wrap with comfortable pills */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 w-full max-w-2xl">
                    {msg.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        disabled={isTyping}
                        onClick={() => handleSendMessage(q)}
                        className="text-left font-medium rounded-xl bg-white/[0.05] hover:bg-orange-500/20 border border-white/[0.1] hover:border-orange-500/40 text-white/90 hover:text-orange-200 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm active:scale-95 px-3 py-1.5 sm:py-2 text-xs leading-snug"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start space-y-1"
            >
              <div className="flex items-center gap-1.5 text-xs text-orange-200">
                <PatriciaAvatar className="w-4 h-4 rounded-md" />
                <span className="font-semibold text-xs">Patricia</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl rounded-tl-sm bg-[#1d1d1b] border border-white/10 text-xs text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse [animation-delay:0.4s]" />
                <span className="ml-1 text-xs text-zinc-300">
                  Patricia is consulting your Life GPS...
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. BOTTOM INPUT DOCK: Clean, comfortable spacing          */}
      {/* ========================================================= */}
      <footer className="relative z-20 border-t border-white/[0.08] bg-[#181816]/95 backdrop-blur-xl px-3 sm:px-6 py-2.5 sm:py-3.5 shrink-0 pb-[max(env(safe-area-inset-bottom),12px)]">
        <div className="max-w-4xl mx-auto w-full space-y-1.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="relative flex items-center gap-1.5 bg-[#121210] border border-white/[0.12] focus-within:border-orange-500/60 rounded-xl p-1 transition-all shadow-inner"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              disabled={isTyping}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isTyping
                  ? "Patricia is responding..."
                  : "Ask Patricia anything..."
              }
              className="flex-1 bg-transparent px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none min-w-0"
            />

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-3 py-1.5 rounded-lg bg-[#c26d44] hover:bg-[#d47b50] disabled:opacity-30 disabled:hover:bg-[#c26d44] text-white font-medium transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-95 shrink-0"
              title="Send message"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden sm:inline font-mono opacity-80">
                ↵
              </span>
            </button>
          </form>

          {/* Under-input cues: Keyboard hint & Skip to Next Section */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 px-0.5">
            <span className="hidden sm:inline text-[10px]">Enter ↵</span>
            <button
              type="button"
              onClick={handleGoNext}
              className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-medium transition-colors cursor-pointer ml-auto text-xs"
            >
              <span>Skip to next section</span>
              <ChevronDown className="w-3 h-3 animate-bounce" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
});
