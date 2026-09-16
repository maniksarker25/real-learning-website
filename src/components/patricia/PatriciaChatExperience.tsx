"use client";

import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  RefreshCw,
  MapPin,
  Target,
  ShieldCheck,
  Compass,
  ArrowRight,
  HelpCircle,
  FileQuestion,
  Maximize2,
  Minimize2,
  X,
  Minus,
  Sparkles,
} from "lucide-react";
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
}

function PatriciaAvatar({
  className = "w-8 h-8",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl flex items-center justify-center shadow-inner select-none transition-transform hover:scale-105 bg-[#c26d44] ${className}`}
    >
      <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current text-white/90">
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
  const [activeGpsStep, setActiveGpsStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const handledPromptRef = useRef<string | null>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

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
          setActiveGpsStep(2);
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
      }, 550);
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
    setActiveGpsStep(0);
  }, []);

  const stepsData = [
    {
      title: "1. Where you are right now",
      subtitle: "Current position & baseline assessment",
      value: gpsState.whereYouAre,
      icon: MapPin,
      badge: "Step 01",
      color: "text-amber-400",
    },
    {
      title: "2. Where you want to go",
      subtitle: "Target career outcome & strengths alignment",
      value: gpsState.whereYouWantToGo,
      icon: Target,
      badge: "Step 02",
      color: "text-rose-400",
    },
    {
      title: "3. Your next best step",
      subtitle: "5-minute low-risk practice simulation",
      value: gpsState.nextBestStep,
      icon: ShieldCheck,
      badge: "Step 03",
      color: "text-emerald-400",
    },
  ];

  const currentStep = stepsData[activeGpsStep];
  const StepIcon = currentStep.icon;

  const renderMacChatWindow = (isModal: boolean) => (
    <div
      className={`flex flex-col overflow-hidden ${
        isModal
          ? "w-full h-full"
          : "w-full max-w-[530px] rounded-2xl bg-[#191917]/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl h-[520px] sm:h-[550px]"
      }`}
    >
      {/* Mac-Style Window Titlebar */}
      <div
        className={`px-4 bg-[#1e1e1b] border-b border-white/[0.08] flex items-center justify-between select-none shrink-0 ${
          isModal ? "h-14 px-6" : "h-11"
        }`}
      >
        {/* macOS Window Traffic Lights */}
        <div className="flex items-center gap-2 group/macbtns py-1">
          {/* Red Dot (Close / Exit Fullscreen / Reset) */}
          <button
            type="button"
            onClick={() => {
              if (isModal) {
                setIsFullscreen(false);
              } else {
                handleReset();
              }
            }}
            className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-black/20 flex items-center justify-center shadow-sm cursor-pointer transition-transform hover:scale-115 active:scale-95 group-hover/macbtns:brightness-105"
            title={isModal ? "Exit Fullscreen (Esc)" : "Reset Chat"}
            aria-label={isModal ? "Exit Fullscreen" : "Reset Chat"}
          >
            <X className="w-2 h-2 text-black/80 opacity-0 group-hover/macbtns:opacity-100 transition-opacity" />
          </button>

          {/* Yellow Dot (Minimize) */}
          <button
            type="button"
            onClick={() => {
              if (isModal) setIsFullscreen(false);
            }}
            className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-black/20 flex items-center justify-center shadow-sm cursor-pointer transition-transform hover:scale-115 active:scale-95 group-hover/macbtns:brightness-105"
            title={isModal ? "Minimize to window" : "Minimize"}
            aria-label="Minimize"
          >
            <Minus className="w-2 h-2 text-black/80 opacity-0 group-hover/macbtns:opacity-100 transition-opacity" />
          </button>

          {/* Green Dot (Fullscreen Expand / Collapse) */}
          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-black/20 flex items-center justify-center shadow-sm cursor-pointer transition-transform hover:scale-115 active:scale-95 group-hover/macbtns:brightness-105"
            title={isModal ? "Exit Fullscreen (Esc)" : "Expand to Fullscreen"}
            aria-label="Toggle Fullscreen"
          >
            {isModal ? (
              <Minimize2 className="w-2 h-2 text-black/80 opacity-0 group-hover/macbtns:opacity-100 transition-opacity" />
            ) : (
              <Maximize2 className="w-2 h-2 text-black/80 opacity-0 group-hover/macbtns:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        {/* Window Title and Mode Info */}
        <div className="flex items-center gap-2 text-xs font-semibold text-white/85 tracking-wide">
          <div className="flex items-center gap-1.5">
            <span>Inbox</span>
            <span className="text-white/30 font-normal">/</span>
            <span className="text-orange-50/90 font-medium">Patricia</span>
          </div>
          {isModal && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              Fullscreen (ESC)
            </span>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-[10px] font-mono text-white/60 tracking-wider">
            in_10xPro92
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Reset Conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1 text-xs"
            title={isModal ? "Exit Fullscreen (Esc)" : "Expand to Fullscreen"}
          >
            {isModal ? (
              <Minimize2 className="w-3.5 h-3.5 text-orange-400" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-white/70" />
            )}
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#181816]/90 overflow-hidden">
        {/* Status / Patricia Header Banner */}
        <div
          className={`px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between gap-2 shrink-0 ${
            isModal ? "px-6 py-3" : ""
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <div className="min-w-0">
              <h4
                className={`font-semibold text-white/95 truncate ${
                  isModal ? "text-sm" : "text-xs"
                }`}
              >
                {gpsState.whereYouAre.length > 35 && !isModal
                  ? "Real Learning · Life GPS Session"
                  : gpsState.whereYouAre}
              </h4>
              <p className="text-[10px] text-white/40 truncate">
                Patricia · AI Life GPS · Northstar Labs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#c26d44]/15 border border-[#c26d44]/30 shrink-0">
            <PatriciaAvatar className="w-4 h-4 rounded-md" />
            <span className="text-[11px] font-medium text-orange-200">
              Patricia
            </span>
          </div>
        </div>

        {/* Messages Feed */}
        <div
          ref={messagesContainerRef}
          className={`flex-1 overflow-y-auto space-y-4 ${
            isModal ? "p-6 sm:p-8 space-y-6 text-sm" : "p-4 text-xs"
          }`}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`space-y-1.5 ${isModal ? "max-w-4xl" : ""}`}
              >
                <div className="flex items-center gap-2">
                  {msg.sender === "user" ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-orange-50 shrink-0" />
                      <span
                        className={`font-semibold text-white/90 ${
                          isModal ? "text-xs" : "text-[11px]"
                        }`}
                      >
                        You (Learner)
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-3.5 h-3.5 rounded-md bg-[#c26d44] flex items-center justify-center text-[8px] font-bold text-white shrink-0">
                        P
                      </div>
                      <span
                        className={`font-semibold text-orange-200 ${
                          isModal ? "text-xs" : "text-[11px]"
                        }`}
                      >
                        Patricia
                      </span>
                    </>
                  )}
                  <span className="text-[9px] text-white/30">
                    {msg.timestamp}
                  </span>
                </div>

                <div
                  className={`leading-relaxed pl-4 ${
                    isModal ? "text-sm sm:text-base pl-5" : "text-xs"
                  } ${
                    msg.sender === "user"
                      ? "text-white/85 font-normal"
                      : "text-white/95 font-medium"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.suggestedQuestions &&
                  msg.suggestedQuestions.length > 0 && (
                    <div
                      className={`flex flex-wrap gap-2 pt-2.5 ${
                        isModal ? "pl-5" : "pl-4"
                      }`}
                    >
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className={`text-left font-medium rounded-xl bg-white/[0.05] hover:bg-orange-500/20 border border-white/[0.1] hover:border-orange-50/50 text-white/85 hover:text-orange-50 transition-all cursor-pointer shadow-sm active:scale-95 ${
                            isModal
                              ? "px-4 py-2 text-xs"
                              : "px-3 py-1.5 text-[11px]"
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`space-y-1 ${isModal ? "pl-5" : "pl-4"}`}
            >
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-md bg-[#c26d44] flex items-center justify-center text-[8px] font-bold text-white shrink-0">
                  P
                </div>
                <span className="font-semibold text-[11px] text-orange-200">
                  Patricia
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/50 pl-5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-50 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-50 animate-pulse [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-50 animate-pulse [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] text-white/40">
                  On it. Checking Life GPS...
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Form Box */}
        <div
          className={`border-t border-white/[0.08] bg-[#141412] shrink-0 ${
            isModal ? "p-4 sm:p-5" : "p-2.5 sm:p-3"
          }`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex items-center gap-2.5"
          >
            <input
              type="text"
              value={input}
              disabled={isTyping}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Patricia..."
              className={`flex-1 bg-transparent px-3 py-2 text-white placeholder-white/35 focus:outline-none ${
                isModal
                  ? "text-sm rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-orange-50/40"
                  : "text-xs"
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`rounded-xl bg-white/10 hover:bg-orange-500 disabled:opacity-30 disabled:hover:bg-white/10 text-white font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 ${
                isModal ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs"
              }`}
              title="Send Message"
            >
              <Send className={isModal ? "w-4 h-4" : "w-3 h-3"} />
              <span className="text-[10px] hidden sm:inline opacity-70 font-mono">
                ↵
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full bg-orange-50 text-stone-900 py-8 sm:py-16 px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* Fullscreen Modal with GPU-Accelerated Apple Physics */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
            {/* Backdrop Blur Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={() => setIsFullscreen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{
                duration: 0.28,
                ease: [0.16, 1, 0.3, 1], // Smooth Apple zoom curve
              }}
              style={{ willChange: "transform, opacity" }}
              className="relative z-10 w-full max-w-6xl h-[92vh] max-h-[920px] rounded-3xl bg-[#191917]/98 border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-xl overflow-hidden flex flex-col transform-gpu"
            >
              {renderMacChatWindow(true)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-8 lg:gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden p-3 sm:p-7 md:p-9 shadow-2xl border border-stone-900/15 bg-stone-950 flex items-center justify-center min-h-[550px]">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
              style={{ backgroundImage: "url('/images/forest-tapestry.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

            {/* In-place Placeholder when Fullscreen is active */}
            {isFullscreen ? (
              <div className="w-full max-w-[530px] h-[520px] sm:h-[550px] rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center p-6 bg-black/40 backdrop-blur-sm z-10 select-none">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-3 shadow-lg animate-pulse">
                  <Maximize2 className="w-7 h-7" />
                </div>
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  Chat expanded to Full Screen
                </h4>
                <p className="text-xs text-white/50 max-w-xs mt-1 mb-4">
                  Enjoy an immersive experience with Patricia, your personal AI Life GPS.
                </p>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Minimize2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>Restore Window (or press ESC)</span>
                </button>
              </div>
            ) : (
              /* Inline Chat Box */
              <div className="relative z-20 w-full flex justify-center">
                {renderMacChatWindow(false)}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-7 lg:pl-2">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px]  uppercase font-extrabold text-stone-950 tracking-tight leading-[1.15]">
                Yes, you even have a{" "}
                <span className="border-b-4  border-dashed border-orange-400">
                  personal Life GPS.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-stone-900/80 font-medium leading-relaxed max-w-xl">
                When you're trying to figure out what career to pursue or what
                skill to practice next, vague advice isn't enough. That's where
                Patricia maps your exact direction.
              </p>
            </div>

            <div className="rounded-2xl bg-[#191917] border border-stone-800 shadow-2xl p-5 sm:p-6 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                  <StepIcon className={`w-5 h-5 ${currentStep.color}`} />
                </div>

                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                      {currentStep.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.08] text-orange-50 border border-white/10">
                      {currentStep.badge}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {currentStep.subtitle}
                  </p>
                  <motion.div
                    key={activeGpsStep}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pt-2 text-xs sm:text-sm font-medium text-orange-50/95 leading-relaxed bg-stone-800/80 p-3 rounded-xl border border-stone-700/60"
                  >
                    {currentStep.value}
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-1 select-none">
              {stepsData.map((_, idx) => {
                const isActive = activeGpsStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveGpsStep(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? "w-7 h-2.5 bg-stone-950 shadow-sm"
                        : "w-2.5 h-2.5 bg-stone-900/25 hover:bg-stone-900/50"
                    }`}
                    title={`View ${stepsData[idx].title}`}
                    aria-label={`Step ${idx + 1}`}
                  />
                );
              })}
            </div>

            <div className="pt-2 border-t border-stone-900/15 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-stone-900/70 font-semibold">
                  Alternative to:
                </span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs text-stone-900 font-semibold border border-stone-900/10 shadow-sm backdrop-blur transition-all">
                    <FileQuestion className="w-3.5 h-3.5 text-amber-600" />
                    Generic Tests
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs text-stone-900 font-semibold border border-stone-900/10 shadow-sm backdrop-blur transition-all">
                    <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                    Vague Advice
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs text-stone-900 font-semibold border border-stone-900/10 shadow-sm backdrop-blur transition-all">
                    <Compass className="w-3.5 h-3.5 text-emerald-700" />
                    Guesswork
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href={gpsState.actionCta?.href || "#explore-careers"}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs sm:text-sm transition-all shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer"
                >
                  <span>
                    {gpsState.actionCta?.label || "Explore 5-Min Simulations"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
