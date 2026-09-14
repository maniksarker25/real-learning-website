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

interface Persona {
  id: string;
  name: string;
  role: string;
  color: string;
  eyeType: "dots" | "happy" | "glasses" | "wink";
}

const PERSONAS: Persona[] = [
  {
    id: "patricia",
    name: "Patricia",
    role: "AI Life GPS",
    color: "#c26d44",
    eyeType: "happy",
  },
  {
    id: "mentor",
    name: "Alex",
    role: "Career Guide",
    color: "#546573",
    eyeType: "dots",
  },
  {
    id: "coach",
    name: "Maya",
    role: "Skills Coach",
    color: "#9e7144",
    eyeType: "glasses",
  },
  {
    id: "sim",
    name: "Liam",
    role: "Sim Specialist",
    color: "#516752",
    eyeType: "wink",
  },
];

function SquircleAvatar({
  color,
  eyeType,
  className = "w-8 h-8",
}: {
  color: string;
  eyeType: Persona["eyeType"];
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl flex items-center justify-center shadow-inner select-none transition-transform hover:scale-105 ${className}`}
      style={{ backgroundColor: color }}
    >
      <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current text-white/90">
        {eyeType === "happy" && (
          <>
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
          </>
        )}
        {eyeType === "dots" && (
          <>
            <circle cx="11" cy="14" r="1.8" fill="rgba(0,0,0,0.7)" />
            <circle cx="21" cy="14" r="1.8" fill="rgba(0,0,0,0.7)" />
            <path
              d="M14 19.5h4"
              stroke="rgba(0,0,0,0.7)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        )}
        {eyeType === "glasses" && (
          <>
            <circle
              cx="11"
              cy="14"
              r="3.2"
              stroke="rgba(0,0,0,0.75)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="21"
              cy="14"
              r="3.2"
              stroke="rgba(0,0,0,0.75)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M14.2 14h3.6"
              stroke="rgba(0,0,0,0.75)"
              strokeWidth="1.5"
            />
            <circle cx="11" cy="14" r="1.2" fill="rgba(0,0,0,0.8)" />
            <circle cx="21" cy="14" r="1.2" fill="rgba(0,0,0,0.8)" />
            <path
              d="M13.5 20c1.2 .8 2.8 .8 4 0"
              stroke="rgba(0,0,0,0.7)"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}
        {eyeType === "wink" && (
          <>
            <circle cx="11" cy="14" r="1.8" fill="rgba(0,0,0,0.75)" />
            <path
              d="M19 14.5l3-1.5"
              stroke="rgba(0,0,0,0.75)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M13 19c1.5 1 3.5 1 5 0"
              stroke="rgba(0,0,0,0.75)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}
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
  const [activePersonaId, setActivePersonaId] = useState("patricia");
  const [activeGpsStep, setActiveGpsStep] = useState(0);

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
  const activePersona =
    PERSONAS.find((p) => p.id === activePersonaId) || PERSONAS[0];

  return (
    <section className="relative w-full bg-orange-50 text-stone-900 py-8 sm:py-16 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-8 lg:gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden p-3 sm:p-7 md:p-9 shadow-2xl border border-stone-900/15 bg-stone-950 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
              style={{ backgroundImage: "url('/images/forest-tapestry.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

            <div className="relative w-full max-w-[530px] rounded-2xl bg-[#191917]/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden flex flex-col h-[520px] sm:h-[550px]">
              <div className="h-11 px-4 bg-[#1e1e1b] border-b border-white/[0.08] flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/20 inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/20 inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/20 inline-block shadow-sm" />
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-white/85 tracking-wide">
                  <span>Inbox</span>
                  <span className="text-white/30 font-normal">/</span>
                  <span className="text-orange-50/90 font-medium">
                    Patricia
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-[10px] font-mono text-white/60 tracking-wider">
                    in_10xPro92
                  </div>
                  <button
                    onClick={handleReset}
                    className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Reset Conversation"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex overflow-hidden">
                <div className="w-14 bg-[#141412] border-r border-white/[0.06] py-3.5 flex flex-col items-center gap-3 shrink-0 select-none">
                  {PERSONAS.map((persona) => {
                    const isActive = activePersonaId === persona.id;
                    return (
                      <div
                        key={persona.id}
                        className="relative flex items-center"
                      >
                        <button
                          onClick={() => setActivePersonaId(persona.id)}
                          className={`cursor-pointer transition-opacity ${
                            isActive
                              ? "opacity-100"
                              : "opacity-45 hover:opacity-85"
                          }`}
                          title={`${persona.name} (${persona.role})`}
                        >
                          <SquircleAvatar
                            color={persona.color}
                            eyeType={persona.eyeType}
                            className="w-8 h-8"
                          />
                        </button>
                        {isActive && (
                          <span className="absolute -right-2.5 w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex-1 flex flex-col min-w-0 bg-[#181816]/90">
                  <div className="px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-white/95 truncate">
                          {gpsState.whereYouAre.length > 28
                            ? "Real Learning · Life GPS Session"
                            : gpsState.whereYouAre}
                        </h4>
                        <p className="text-[10px] text-white/40 truncate">
                          Email · Life GPS · Northstar Labs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 shrink-0">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-rose-500 to-orange-50 flex items-center justify-center text-[9px] font-bold text-white">
                        P
                      </div>
                      <span className="text-[11px] font-medium text-white/90">
                        {activePersona.name}
                      </span>
                    </div>
                  </div>

                  <div
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 text-xs"
                  >
                    <AnimatePresence initial={false}>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-1.5"
                        >
                          <div className="flex items-center gap-2">
                            {msg.sender === "user" ? (
                              <>
                                <span className="w-2 h-2 rounded-full bg-orange-50 shrink-0" />
                                <span className="font-semibold text-[11px] text-white/90">
                                  You (Learner)
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-rose-500 to-orange-50 flex items-center justify-center text-[8px] font-bold text-white shrink-0">
                                  P
                                </div>
                                <span className="font-semibold text-[11px] text-orange-50">
                                  {activePersona.name}
                                </span>
                              </>
                            )}
                            <span className="text-[9px] text-white/30">
                              {msg.timestamp}
                            </span>
                          </div>

                          <div
                            className={`leading-relaxed pl-4 text-xs ${
                              msg.sender === "user"
                                ? "text-white/80 font-normal"
                                : "text-white/95 font-medium"
                            }`}
                          >
                            {msg.text}
                          </div>

                          {msg.suggestedQuestions &&
                            msg.suggestedQuestions.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-2 pl-4">
                                {msg.suggestedQuestions.map((q, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleSendMessage(q)}
                                    className="text-left text-[11px] font-medium px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-orange-500/15 border border-white/[0.08] hover:border-orange-50/40 text-white/80 hover:text-orange-50 transition-all cursor-pointer shadow-sm active:scale-95"
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
                        className="space-y-1 pl-4"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-rose-500 to-orange-50 flex items-center justify-center text-[8px] font-bold text-white shrink-0">
                            P
                          </div>
                          <span className="font-semibold text-[11px] text-orange-50">
                            {activePersona.name}
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

                  <div className="p-2.5 sm:p-3 border-t border-white/[0.08] bg-[#141412] shrink-0">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage(input);
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={input}
                        disabled={isTyping}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Ask ${activePersona.name}...`}
                        className="flex-1 bg-transparent px-2 py-1.5 text-xs text-white placeholder-white/35 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-orange-500 disabled:opacity-30 disabled:hover:bg-white/10 text-white font-medium text-xs transition-all flex items-center gap-1 cursor-pointer"
                        title="Send Message"
                      >
                        <Send className="w-3 h-3" />
                        <span className="text-[10px] hidden sm:inline opacity-70 font-mono">
                          ↵
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
