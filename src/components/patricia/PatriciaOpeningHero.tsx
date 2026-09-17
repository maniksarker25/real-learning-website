"use client";

import React, { memo, useCallback, useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { DottedGlobe } from "./DottedGlobe";

interface PatriciaOpeningHeroProps {
  onSlideUp?: (prompt?: string) => void;
}

export const PatriciaOpeningHero = memo(function PatriciaOpeningHero({
  onSlideUp,
}: PatriciaOpeningHeroProps) {
  // State for dynamic moving selection between separate text elements
  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(0);

  // Automatically move selection through "Real Learning", "by Scorched Souls", and the description
  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setSelectedTextIndex((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Swipe / drag up handler for mobile gesture
  const handlePanEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.y < -40 || info.velocity.y < -300) {
        if (onSlideUp) onSlideUp();
      }
    },
    [onSlideUp],
  );

  const handleLaunchChat = useCallback(
    (prompt?: string) => {
      if (onSlideUp) {
        onSlideUp(prompt);
      } else {
        const el = document.getElementById("patricia-experience");
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [onSlideUp],
  );

  return (
    <motion.section
      className="relative px-2 w-full bg-[#08090d] text-white select-none py-6 sm:py-8 lg:py-10"
      onPanEnd={handlePanEnd}
    >
      {/* Outer framing wrapper matching the sleek modern design */}
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Grid Layout: Left Content & Right 3D Globe with Floating Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8">
            <div className="lg:col-span-7 p-2 sm:p-6 lg:p-8 flex flex-col justify-center z-10 space-y-4 sm:space-y-5">
              {/* Eyebrow Badge */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs text-white/80 font-medium shadow-sm"
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-400" />
                  <span>Front Door to Real Learning</span>
                </motion.div>
              </div>

              {/* 1. First screen shows: Real Learning by Scorched Souls with Moving Selection Box & Cursor */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-start gap-1.5 sm:gap-2 select-none"
              >
                {/* Line 1: Real Learning */}
                <div
                  className="relative inline-block cursor-pointer group"
                  onClick={() => setSelectedTextIndex(0)}
                  onMouseEnter={() => setSelectedTextIndex(0)}
                >
                  {selectedTextIndex === 0 && (
                    <motion.div
                      layoutId="activeTextSelectionMarquee"
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 28,
                      }}
                      className="absolute -inset-x-2.5 -inset-y-1.5 border-2 border-white bg-white/[0.05] pointer-events-none z-10"
                    >
                      {/* 4 Corner Resize Anchor Squares */}
                      <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />

                      {/* White animated mouse cursor pointer positioned at the bottom-right corner */}
                      <motion.div
                        animate={{ x: [0, 2, 0], y: [0, 2, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute top-[calc(100%-1px)] left-[calc(100%-1px)] z-30 pointer-events-none select-none flex items-start gap-1.5"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 0 L0 18 L5 13.5 L8.5 21.5 L11.5 20 L8 12 L14 12 Z"
                            stroke="rgba(0,0,0,0.5)"
                            strokeWidth="0.8"
                          />
                        </svg>
                        <span className="px-2 py-0.5 rounded-full bg-white text-black text-[9px] sm:text-[10px] font-bold tracking-wide shadow-lg shadow-black/80 flex items-center gap-1 -mt-0.5 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          <span>Selected</span>
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                  <h1 className="relative z-0 text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight uppercase leading-none text-white font-sans text-left">
                    Real Learning
                  </h1>
                </div>

                {/* Line 2: by Scorched Souls */}
                <div
                  className="relative inline-block cursor-pointer group mt-0.5"
                  onClick={() => setSelectedTextIndex(1)}
                  onMouseEnter={() => setSelectedTextIndex(1)}
                >
                  {selectedTextIndex === 1 && (
                    <motion.div
                      layoutId="activeTextSelectionMarquee"
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 28,
                      }}
                      className="absolute -inset-x-2.5 -inset-y-1.5 border-2 border-white bg-white/[0.05] pointer-events-none z-10"
                    >
                      {/* 4 Corner Resize Anchor Squares */}
                      <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />

                      {/* White animated mouse cursor pointer positioned at the bottom-right corner */}
                      <motion.div
                        animate={{ x: [0, 2, 0], y: [0, 2, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute top-[calc(100%-1px)] left-[calc(100%-1px)] z-30 pointer-events-none select-none flex items-start gap-1.5"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 0 L0 18 L5 13.5 L8.5 21.5 L11.5 20 L8 12 L14 12 Z"
                            stroke="rgba(0,0,0,0.5)"
                            strokeWidth="0.8"
                          />
                        </svg>
                        <span className="px-2 py-0.5 rounded-full bg-white text-black text-[9px] sm:text-[10px] font-bold tracking-wide shadow-lg shadow-black/80 flex items-center gap-1 -mt-0.5 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          <span>Selected</span>
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                  <span className="relative z-0 text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight uppercase leading-none text-orange-400 font-sans text-left block">
                    by Scorched Souls
                  </span>
                </div>
              </motion.div>

              {/* 2. Short explanation: Real Learning is an AI Life GPS with dynamic selection */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="relative inline-block cursor-pointer group max-w-xl"
                onClick={() => setSelectedTextIndex(2)}
                onMouseEnter={() => setSelectedTextIndex(2)}
              >
                {selectedTextIndex === 2 && (
                  <motion.div
                    layoutId="activeTextSelectionMarquee"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    className="absolute -inset-x-2.5 -inset-y-1.5 border-2 border-white bg-white/[0.05] pointer-events-none z-10"
                  >
                    {/* 4 Corner Resize Anchor Squares */}
                    <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                    <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />

                    {/* White animated mouse cursor pointer positioned at the bottom-right corner */}
                    <motion.div
                      animate={{ x: [0, 2, 0], y: [0, 2, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-[calc(100%-1px)] left-[calc(100%-1px)] z-30 pointer-events-none select-none flex items-start gap-1.5"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 0 L0 18 L5 13.5 L8.5 21.5 L11.5 20 L8 12 L14 12 Z"
                          stroke="rgba(0,0,0,0.5)"
                          strokeWidth="0.8"
                        />
                      </svg>
                      <span className="px-2 py-0.5 rounded-full bg-white text-black text-[9px] sm:text-[10px] font-bold tracking-wide shadow-lg shadow-black/80 flex items-center gap-1 -mt-0.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span>Selected</span>
                      </span>
                    </motion.div>
                  </motion.div>
                )}
                <p className="relative z-0 text-sm sm:text-base lg:text-[17px] text-zinc-300/90 leading-relaxed font-normal text-left max-w-lg">
                  Real Learning is an AI Life GPS that helps you figure out
                  where you are, where you want to go, and your next best step.
                </p>
              </motion.div>

              {/* Slide / Swipe Up Animated Handle Button */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-3.5 cursor-pointer group select-none pt-1 self-start relative"
                onClick={() => handleLaunchChat()}
              >
                {/* Overlay SVG with responsive path pointing into the next section */}
                <TracingPath className="top-0 -right-[70px] xs:-right-[85px] sm:-right-[125px] md:-right-[150px] lg:-right-[175px]" />

                {/* Circle Icon Button */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-white/20 group-hover:border-orange-400/60 group-hover:bg-orange-500/20 backdrop-blur-lg flex items-center justify-center text-white transition-all shadow-lg group-hover:scale-105 shrink-0">
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex items-center justify-center"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  </motion.div>
                </div>

                {/* Text Content - Perfectly Left-Aligned and Vertically Centered */}
                <div className="flex flex-col items-start text-left justify-center gap-0.5">
                  <span className="text-xs sm:text-[13px] font-bold tracking-wider uppercase text-white/90 group-hover:text-orange-300 transition-colors leading-tight">
                    SLIDE / SWIPE UP INTO PATRICIA
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-white/45 group-hover:text-white/70 transition-colors leading-tight">
                    Patricia becomes your main experience
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: 3D Dotted Canvas Globe with Floating Career Simulation Cards */}
            <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[400px] lg:h-[450px] flex items-center justify-center overflow-visible p-1 sm:p-2 mt-4 lg:mt-0">
              {/* Ambient Radiant Glow behind Globe */}
              <div className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-tr from-orange-500/15 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* The 3D Dotted Canvas Globe */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:pointer-events-auto">
                <DottedGlobe className="w-full h-full" />
              </div>

              {/* FLOATING CARD 1: CAREER TRACKS & SCENARIOS (Top Right) - #BD492D */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="absolute top-0 sm:top-1 right-0 sm:right-1 lg:-right-3 z-20 w-[215px] sm:w-[245px] scale-[0.78] sm:scale-[0.88] lg:scale-[0.92] origin-top-right rounded-xl sm:rounded-2xl bg-[#BD492D]/95 border border-white/20 p-3 sm:p-3.5 backdrop-blur-md shadow-2xl shadow-black/80 text-white"
              >
                {/* Status & Count */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                      4 Tracks
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/80 font-medium">
                      live practice
                    </span>
                  </div>
                  <p className="text-[10px] text-white/75 mt-0.5">
                    Real workplace simulations &amp; feedback
                  </p>
                </div>

                {/* Career Tracks Progress Breakdown */}
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[10px] font-medium mb-0.5">
                      <span className="text-white/95 font-medium">
                        Customer Service
                      </span>
                      <span className="text-white/70 font-mono text-[9px]">
                        42 scenarios
                      </span>
                    </div>
                    <div className="h-1 w-full bg-black/25 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full shadow-sm"
                        style={{ width: "85%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-medium mb-0.5">
                      <span className="text-white/95 font-medium">
                        Tech Support
                      </span>
                      <span className="text-white/70 font-mono text-[9px]">
                        35 scenarios
                      </span>
                    </div>
                    <div className="h-1 w-full bg-black/25 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full shadow-sm"
                        style={{ width: "70%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-medium mb-0.5">
                      <span className="text-white/95 font-medium">
                        IT Specialist
                      </span>
                      <span className="text-white/70 font-mono text-[9px]">
                        30 scenarios
                      </span>
                    </div>
                    <div className="h-1 w-full bg-black/25 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full shadow-sm"
                        style={{ width: "60%" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: FEATURED SIMULATION (Middle Left) - #2B5748 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute top-[32%] -left-3 sm:left-0 lg:-left-6 z-20 w-[195px] sm:w-[225px] scale-[0.75] sm:scale-[0.84] lg:scale-[0.88] origin-left rounded-xl sm:rounded-2xl bg-[#2B5748]/95 border border-white/20 p-2.5 sm:p-3 backdrop-blur-md shadow-2xl shadow-black/80 text-white"
              >
                <div className="mb-1">
                  <span className="text-[9px] font-mono font-semibold tracking-wider uppercase text-emerald-200">
                    FEATURED SIMULATION
                  </span>
                </div>

                <h4 className="text-[11px] sm:text-xs font-bold text-white tracking-tight">
                  Customer Service &amp; Comms
                </h4>

                <div className="grid grid-cols-3 gap-1.5 mt-2 pt-2 border-t border-white/15 text-[9px]">
                  <div className="flex flex-col">
                    <span className="text-white font-medium truncate">
                      Client Care
                    </span>
                    <span className="text-emerald-200/70 text-[8px]">
                      Track
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white font-medium">Practice</span>
                    <span className="text-emerald-200/70 text-[8px]">Mode</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white font-medium whitespace-nowrap">
                      5 mins
                    </span>
                    <span className="text-emerald-200/70 text-[8px]">
                      Duration
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 3: PATRICIA AI LIFE GPS (Bottom Right) - #2B5748 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="absolute bottom-0 sm:bottom-1 right-0 sm:right-1 lg:-right-2 z-20 w-[205px] sm:w-[230px] scale-[0.75] sm:scale-[0.84] lg:scale-[0.88] origin-bottom-right rounded-xl sm:rounded-2xl bg-[#2B5748]/95 border border-white/20 p-2.5 sm:p-3 backdrop-blur-md shadow-2xl shadow-black/80 text-white"
              >
                <div className="mb-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-emerald-200">
                    PATRICIA LIFE GPS
                  </span>
                </div>

                <h4 className="text-[11px] sm:text-xs font-bold text-white tracking-tight">
                  Where you are → Next best step
                </h4>

                <div className="text-[9px] text-white/80 mt-0.5">
                  <span>Instant Feedback &amp; Direction</span>
                </div>

                <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-white/15 text-[9px]">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/20 text-white/90">
                    <span className="w-1 h-1 rounded-full bg-blue-300 inline-block" />
                    <span>Assess</span>
                  </div>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/20 text-white/90">
                    <span className="w-1 h-1 rounded-full bg-orange-300 inline-block" />
                    <span>Practice</span>
                  </div>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/20 text-emerald-200 font-medium">
                    <span className="w-1 h-1 rounded-full bg-emerald-300 inline-block" />
                    <span>Grow</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
});

interface TracingPathProps {
  className?: string;
}

const TracingPath = ({ className = "" }: TracingPathProps) => {
  return (
    <div
      className={`pointer-events-none select-none absolute z-20 transition-all duration-300 ${className}`}
    >
      <svg
        width="229"
        height="231"
        viewBox="0 0 229 231"
        fill="none"
        className="w-[110px] h-[110px] xs:w-[130px] xs:h-[130px] sm:w-[170px] sm:h-[170px] md:w-[200px] md:h-[200px] lg:w-[229px] lg:h-[231px] max-w-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
      >
        <mask
          id="mask0_1140_3"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="229"
          height="231"
        >
          <path d="M228.28 0H0V230.935H228.28V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_1140_3)">
          <path
            d="M1.45251 0.378906C19.7635 70.4019 226.413 193.85 226.781 136.573C210 50 54 40 76.5306 224.759"
            stroke="url(#paint0_linear_1140_3)"
            stroke-width="3"
          />
          <path
            d="M63.0615 209.023L76.2535 226.53L93.7598 213.338"
            stroke="#FF8000"
            stroke-width="3"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_1140_3"
            x1="145.5"
            y1="129.5"
            x2="0.999971"
            y2="8.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FF8000" />
            <stop offset="0.962887" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
