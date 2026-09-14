"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";

// Four core performance competencies
const PERFORMANCE_METRICS = [
  { key: "communication" as const, label: "Communication" },
  { key: "empathy" as const, label: "Empathy" },
  { key: "problem_solving" as const, label: "Problem Solving" },
  { key: "professionalism" as const, label: "Professionalism" },
];

interface ScenarioStep {
  customerMessage: string;
  customerTone: string;
  suggestedReply: string;
  specialistTone: string;
  scores: {
    communication: number;
    empathy: number;
    problem_solving: number;
    professionalism: number;
  };
}

const SCENARIO_STEPS: ScenarioStep[] = [
  {
    customerMessage:
      '"Our payment gateway has been offline for 45 minutes, and our checkout is completely halted!"',
    customerTone: "Incident Escalation",
    suggestedReply:
      "I understand how critical this is for your revenue. I am taking personal ownership of this right now.",
    specialistTone: "Calming & Ownership",
    scores: {
      communication: 88,
      empathy: 91,
      problem_solving: 78,
      professionalism: 89,
    },
  },
  {
    customerMessage:
      '"We are losing sales every minute. I need an exact timeline for when our servers will be restored."',
    customerTone: "Time Pressure",
    suggestedReply:
      "Our telemetry isolated a webhook timeout. I am initiating the backup server reroute immediately.",
    specialistTone: "Root-Cause Isolation",
    scores: {
      communication: 92,
      empathy: 90,
      problem_solving: 85,
      professionalism: 92,
    },
  },
  {
    customerMessage:
      '"Will any customer transaction data or in-flight checkout carts be lost during this failover?"',
    customerTone: "Integrity Verification",
    suggestedReply:
      "All queued carts are cached in our isolated Redis broker. Zero data loss will occur throughout the cutover.",
    specialistTone: "Composed Transparency",
    scores: {
      communication: 94,
      empathy: 93,
      problem_solving: 90,
      professionalism: 95,
    },
  },
  {
    customerMessage:
      '"Okay, the backup route is active. The first batch of network nodes is reconnecting now."',
    customerTone: "De-escalated Relief",
    suggestedReply:
      "The server failover is 100% verified. Live transaction health is restored to nominal 99.98% throughput.",
    specialistTone: "Decisive Execution",
    scores: {
      communication: 96,
      empathy: 95,
      problem_solving: 95,
      professionalism: 97,
    },
  },
  {
    customerMessage:
      '"Payment gateway is fully green. Thank you for staying composed and resolving this so quickly!"',
    customerTone: "Satisfaction Confirmed",
    suggestedReply:
      "You are very welcome! I have locked in automated health monitors to guarantee zero recurrence.",
    specialistTone: "Mastery Closure",
    scores: {
      communication: 98,
      empathy: 97,
      problem_solving: 96,
      professionalism: 98,
    },
  },
];

const INITIAL_SCORES = {
  communication: 80,
  empathy: 76,
  problem_solving: 72,
  professionalism: 82,
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Smooth physical spring number counter for Framer Motion */
function AnimatedScore({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const spring = useSpring(value, { stiffness: 60, damping: 15, mass: 0.8 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
  }, [spring]);

  return <span className={className}>{display}%</span>;
}

export default function FeedbackSection() {
  const [stepIdx, setStepIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [displayedSpeaker, setDisplayedSpeaker] = useState<"Customer" | "Learner">("Customer");
  const [displayedRole, setDisplayedRole] = useState("Frustrated Client");
  const [displayedMessage, setDisplayedMessage] = useState(SCENARIO_STEPS[0].customerMessage);
  const [currentToneTag, setCurrentToneTag] = useState(SCENARIO_STEPS[0].customerTone);
  const [currentScores, setCurrentScores] = useState(INITIAL_SCORES);

  // Virtual cursor & automated UI interaction states
  const [cursorPos, setCursorPos] = useState({ x: 280, y: 70 });
  const [cursorDuration, setCursorDuration] = useState(0.8);
  const [isClicking, setIsClicking] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSendPressed, setIsSendPressed] = useState(false);
  const [isCustomerTyping, setIsCustomerTyping] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  // Dynamic coordinates relative to card container
  const getTargetCoords = () => {
    if (!cardRef.current) {
      return {
        input: { x: 120, y: 155 },
        send: { x: 380, y: 155 },
        rest: { x: 260, y: 70 },
      };
    }
    const cardRect = cardRef.current.getBoundingClientRect();
    const inputRect = inputContainerRef.current?.getBoundingClientRect();
    const sendRect = sendButtonRef.current?.getBoundingClientRect();

    const inputX = inputRect ? inputRect.left - cardRect.left + 70 : cardRect.width * 0.35;
    const inputY = inputRect ? inputRect.top - cardRect.top + inputRect.height / 2 : 155;

    const sendX = sendRect ? sendRect.left - cardRect.left + sendRect.width / 2 : cardRect.width - 55;
    const sendY = sendRect ? sendRect.top - cardRect.top + sendRect.height / 2 : 155;

    const restX = Math.min(cardRect.width * 0.65, cardRect.width - 90);
    const restY = 70;

    return {
      input: { x: inputX, y: inputY },
      send: { x: sendX, y: sendY },
      rest: { x: restX, y: restY },
    };
  };

  // Automated human-like simulation runner
  useEffect(() => {
    let isMounted = true;

    const runSimulationTurn = async (index: number) => {
      if (!isMounted) return;
      const scenario = SCENARIO_STEPS[index % SCENARIO_STEPS.length];
      const initialCoords = getTargetCoords();

      // 1. Customer turn is active, cursor rests naturally
      setDisplayedSpeaker("Customer");
      setDisplayedRole("Frustrated Client");
      setDisplayedMessage(scenario.customerMessage);
      setCurrentToneTag(scenario.customerTone);
      setIsCustomerTyping(false);
      setTypedText("");
      setIsInputFocused(false);
      setIsSendPressed(false);
      setCursorDuration(0.8);
      setCursorPos(initialCoords.rest);

      // Natural pause while reading customer's message
      await delay(1200);
      if (!isMounted) return;

      // 2. Cursor glides smoothly toward input box
      const freshCoords = getTargetCoords();
      setCursorDuration(0.75);
      setCursorPos(freshCoords.input);

      await delay(800);
      if (!isMounted) return;

      // 3. Cursor clicks inside the input (triggers focus ring & click pulse)
      setIsClicking(true);
      setIsInputFocused(true);
      await delay(200);
      if (!isMounted) return;
      setIsClicking(false);

      // 4. Type the specialist reply letter-by-letter
      const textToType = scenario.suggestedReply;
      for (let i = 1; i <= textToType.length; i++) {
        if (!isMounted) return;
        setTypedText(textToType.slice(0, i));
        // Snappy, realistic keystroke interval
        await delay(22);
      }

      await delay(350);
      if (!isMounted) return;

      // 5. Cursor glides smoothly toward the "Send" button
      const sendCoords = getTargetCoords();
      setCursorDuration(0.65);
      setCursorPos(sendCoords.send);

      await delay(700);
      if (!isMounted) return;

      // 6. Cursor clicks "Send" button (button depresses & triggers ripple)
      setIsClicking(true);
      setIsSendPressed(true);
      await delay(180);
      if (!isMounted) return;
      setIsClicking(false);

      // 7. Message is sent! Dialogue bubble updates, scores update, input resets
      setDisplayedSpeaker("Learner");
      setDisplayedRole("Support Specialist");
      setDisplayedMessage(`"${textToType}"`);
      setCurrentToneTag(scenario.specialistTone);
      setCurrentScores(scenario.scores);
      setTypedText("");
      setIsInputFocused(false);
      setIsSendPressed(false);

      // Cursor moves back toward neutral rest position
      const restCoords = getTargetCoords();
      setCursorDuration(0.9);
      setCursorPos(restCoords.rest);

      // 8. Realistic customer response typing interval
      await delay(400);
      if (!isMounted) return;
      setIsCustomerTyping(true);

      await delay(1500);
      if (!isMounted) return;
      setIsCustomerTyping(false);

      // 9. Advance to next scenario in automated cycle
      setStepIdx((prev) => (prev + 1) % SCENARIO_STEPS.length);
    };

    runSimulationTurn(stepIdx);

    return () => {
      isMounted = false;
    };
  }, [stepIdx]);

  // Live average score calculated across all 4 competencies
  const averageMastery = Math.round(
    (currentScores.communication +
      currentScores.empathy +
      currentScores.problem_solving +
      currentScores.professionalism) /
      4,
  );

  return (
    <section
      id="feedback-section"
      className="relative w-full py-20 sm:py-28 bg-orange-50 text-stone-900 font-sans overflow-hidden select-none border-t border-stone-200/80"
    >
      {/* Background Subtle Dot Grid Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3.5">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-stone-950 leading-[1.15] uppercase">
              Real-Time Skill{" "}
              <span className="border-b-4 border-dashed border-orange-400">
                Performance.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-stone-600 font-medium leading-relaxed max-w-xl">
              Turn-by-turn multi-dimensional evaluation, voice acoustic telemetry,
              and live facial expression scoring across every simulation scenario.
            </p>
          </div>

          <div>
            <Link
              href="#patricia-experience"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-xl hover:shadow-2xl active:scale-95"
            >
              <span>Practice Scenarios Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento Cards Container */}
        <div className="space-y-[18px]">
          {/* Row 1: Vertical Performance Bars Card (Slightly narrower than row 2, solid bg-orange-50 bars) */}
          <div className="w-[94%] sm:w-[95%] lg:w-[96%] max-w-[1280px] mx-auto rounded-[50px] bg-[#14151b] text-white p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="overflow-x-auto pb-4 scrollbar-none w-full">
              <div className="min-w-[500px] md:min-w-0 w-full">
                <div className="grid grid-cols-4 gap-3 sm:gap-5 md:gap-6 items-end w-full">
                  {PERFORMANCE_METRICS.map((metric) => {
                    const score = currentScores[metric.key];

                    return (
                      <div
                        key={metric.key}
                        className="flex flex-col items-center group cursor-default w-full"
                      >
                        {/* Top Metric Header: Rolling Spring Score */}
                        <div className="flex flex-col items-center gap-1 mb-4 h-12 justify-end text-center w-full">
                          <AnimatedScore
                            value={score}
                            className="font-mono font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight text-white"
                          />
                        </div>

                        {/* Vertical Bar Track */}
                        <div className="relative h-48 sm:h-52 w-full flex flex-col justify-end items-center my-1 px-1">
                          {/* Track Background Shell */}
                          <div className="relative w-full h-full bg-[#181920] rounded-2xl sm:rounded-3xl p-1.5 border border-white/10 flex flex-col justify-end items-center overflow-hidden shadow-inner">
                            {/* 80% Benchmark Tick Line */}
                            <div className="absolute left-0 right-0 bottom-[80%] border-b-2 border-dashed border-white/20 pointer-events-none z-10" />

                            {/* Animated Vertical Bar Fill (Solid bg-orange-50 - No Gradients) */}
                            <motion.div
                              animate={{ height: `${score}%` }}
                              transition={{
                                type: "spring",
                                stiffness: 70,
                                damping: 18,
                                mass: 0.8,
                              }}
                              className="w-full rounded-xl sm:rounded-2xl relative shadow-md bg-orange-50 transform-gpu flex items-start justify-center pt-1"
                            >
                              {/* Sleek top indicator bar */}
                              <div className="w-8 h-1 rounded-full bg-orange-200/60" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Bottom Metric Label */}
                        <div className="mt-4 flex flex-col items-center gap-1.5 w-full text-center px-1">
                          <span className="font-bold text-xs sm:text-sm text-white leading-tight line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                            {metric.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Live Conversation & Automated Cursor Interaction (Full Width Grid) */}
          <div className="flex flex-col lg:flex-row items-stretch gap-[18px] justify-center">
            {/* 1. Circle Stat Card */}
            <div className="w-full lg:w-[240px] h-[240px] max-h-[240px] shrink-0 relative flex items-center justify-center">
              <div className="w-[236px] h-[236px] rounded-full bg-[#14151b] border border-white/15 shadow-2xl flex flex-col items-center justify-center relative select-none">
                <div className="relative z-10 text-center">
                  <AnimatedScore
                    value={averageMastery}
                    className="text-4xl font-black text-white font-mono tracking-tighter drop-shadow-md"
                  />
                  <div className="text-[10px] font-semibold text-white/60 uppercase tracking-widest mt-0.5">
                    Live Turn Mastery
                  </div>
                </div>

                <div className="absolute bottom-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Simulation</span>
                </div>
              </div>
            </div>

            {/* 2. Automated Cursor-Driven Dialogue Card (Zero Layout Shift - Fixed 240px) */}
            <div
              ref={cardRef}
              className="flex-1 h-[240px] max-h-[240px] relative rounded-[30px] bg-[#121318] text-white p-4 sm:p-5 border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Virtual Mouse Pointer Cursor that glides, clicks, types and sends */}
              <motion.div
                animate={{
                  x: cursorPos.x,
                  y: cursorPos.y,
                }}
                transition={{
                  duration: cursorDuration,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute top-0 left-0 pointer-events-none z-30 transform -translate-x-1 -translate-y-1"
              >
                {/* Click Ripple Pulse */}
                {isClicking && (
                  <motion.span
                    initial={{ scale: 0.3, opacity: 0.9 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 0.38, ease: "easeOut" }}
                    className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-400/40 border border-emerald-300 pointer-events-none"
                  />
                )}

                {/* Clean OS-style Mouse Pointer SVG */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
                >
                  <path
                    d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.86a.5.5 0 0 0-.35.35z"
                    fill="#ffffff"
                    stroke="#0d0e12"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              <div className="relative z-10">
                {/* Header with Turn Step and Typing Status */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                      Simulation Dialogue
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                      Turn {stepIdx + 1} of 5
                    </span>
                  </div>

                  {isCustomerTyping ? (
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-orange-300">
                      <span>Customer responding</span>
                      <span className="flex gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-orange-400 animate-bounce" />
                        <span className="w-1 h-1 rounded-full bg-orange-400 animate-bounce [animation-delay:0.15s]" />
                        <span className="w-1 h-1 rounded-full bg-orange-400 animate-bounce [animation-delay:0.3s]" />
                      </span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-mono text-emerald-400/90">
                      {displayedSpeaker === "Learner" ? "Response Evaluated" : "Awaiting Specialist"}
                    </span>
                  )}
                </div>

                {/* Active Dialogue Bubble (Fixed Height: 74px) */}
                <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-3 my-0.5 backdrop-blur-sm overflow-hidden h-[74px] flex flex-col justify-start">
                  <div className="flex items-center gap-2 mb-1 shrink-0">
                    <span
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0",
                        displayedSpeaker === "Customer"
                          ? "bg-orange-500/20 border border-orange-400/40 text-orange-300"
                          : "bg-emerald-500/20 border border-emerald-400/40 text-emerald-300",
                      )}
                    >
                      {displayedSpeaker === "Customer" ? "C" : "S"}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-white/90">
                      {displayedSpeaker}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      • {displayedRole}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-white/95 italic font-medium leading-snug line-clamp-2 pl-7">
                    {displayedMessage}
                  </p>
                </div>
              </div>

              {/* Simulated Clickable Input Field & Send Button (Cursor enters, clicks, types, and sends) */}
              <div
                ref={inputContainerRef}
                className={cn(
                  "relative z-10 flex items-center gap-2 bg-white/[0.06] border rounded-2xl p-1 sm:p-1.5 transition-all duration-200 h-[46px]",
                  isInputFocused
                    ? "border-emerald-400/80 bg-white/[0.1] ring-2 ring-emerald-500/20 shadow-lg"
                    : "border-white/15",
                )}
              >
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[10px] font-mono font-bold text-emerald-300 shrink-0 ml-1">
                  S
                </span>

                <div className="flex-1 text-xs sm:text-sm text-white font-medium px-1.5 flex items-center min-h-[22px] overflow-hidden whitespace-nowrap">
                  {typedText ? (
                    <>
                      <span className="truncate">{typedText}</span>
                      <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-emerald-400 animate-pulse shrink-0" />
                    </>
                  ) : (
                    <span className="text-white/35 truncate">
                      {SCENARIO_STEPS[stepIdx % SCENARIO_STEPS.length].suggestedReply}
                    </span>
                  )}
                </div>

                <button
                  ref={sendButtonRef}
                  type="button"
                  tabIndex={-1}
                  className={cn(
                    "shrink-0 px-3 py-1.5 rounded-xl text-white flex items-center gap-1.5 shadow-md text-xs font-bold transition-all duration-150 transform",
                    isSendPressed
                      ? "scale-95 bg-emerald-600 ring-2 ring-emerald-400/50"
                      : "bg-emerald-500",
                  )}
                >
                  <span>Send</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>

              {/* Telemetry Tone & Live Status Bar */}
              <div className="relative z-10 flex items-center justify-between gap-2 h-[22px]">
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full border text-[10px] font-mono shrink-0 transition-colors duration-300",
                    displayedSpeaker === "Customer"
                      ? "bg-orange-500/10 border-orange-400/30 text-orange-300"
                      : "bg-emerald-500/10 border-emerald-400/30 text-emerald-300",
                  )}
                >
                  {currentToneTag}
                </span>

                <div className="flex items-center gap-2 font-mono text-[9px] text-white/40">
                  <span>Automated Telemetry Simulation</span>
                </div>
              </div>
            </div>

            {/* 3. Practitioner Photo Card */}
            <div className="w-full lg:w-[260px] h-[240px] max-h-[240px] shrink-0 relative rounded-[50px] bg-[#121318] text-white border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between">
              <Image
                src="/images/teck.jpg"
                alt="Support Specialist"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
