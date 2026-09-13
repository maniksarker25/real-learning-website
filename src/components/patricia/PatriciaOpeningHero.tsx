"use client";

import React, { memo, useCallback, useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import {
  ChevronDown,
  Zap,
  Compass,
  Clock,
  MapPin,
  Target,
  Headphones,
} from "lucide-react";
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
      className="relative w-full bg-[#08090d] text-white overflow-hidden select-none py-8 sm:py-14 lg:py-16"
      onPanEnd={handlePanEnd}
    >
      {/* Outer framing wrapper matching the sleek modern design */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative ">
          {/* Subtle ambient lighting inside the container */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Grid Layout: Left Content & Right 3D Globe with Floating Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[580px] lg:min-h-[660px]">
            {/* Left Column: Opening Flow (1. Screen Title, 2. Explanation, 3. Examples of what to ask, 4. Slide up) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-center z-10 space-y-6">
              {/* Eyebrow Badge */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md text-xs text-white/80 font-medium shadow-sm"
                >
                  <Zap className="h-3.5 w-3.5 text-orange-400" />
                  <span>Front Door to Real Learning</span>
                </motion.div>
              </div>

              {/* 1. First screen shows: Real Learning by Scorched Souls with Moving Selection Box & Cursor */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-start gap-2.5 select-none"
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
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="absolute -inset-x-3 -inset-y-2 border-2 border-white bg-white/[0.05] backdrop-blur-[2px] pointer-events-none z-10"
                    >
                      {/* 4 Corner Resize Anchor Squares */}
                      <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />

                      {/* White animated mouse cursor pointer positioned at the bottom-right corner */}
                      <motion.div
                        animate={{ x: [0, 2, 0], y: [0, 2, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[calc(100%-1px)] left-[calc(100%-1px)] z-30 pointer-events-none select-none flex items-start gap-1.5"
                      >
                        <svg
                          className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
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
                        <span className="px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-bold tracking-wide shadow-lg shadow-black/80 flex items-center gap-1 -mt-0.5 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          <span>Selected</span>
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                  <h1 className="relative z-0 text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight uppercase leading-none text-white font-sans text-left">
                    Real Learning
                  </h1>
                </div>

                {/* Line 2: by Scorched Souls */}
                <div
                  className="relative inline-block cursor-pointer group mt-1"
                  onClick={() => setSelectedTextIndex(1)}
                  onMouseEnter={() => setSelectedTextIndex(1)}
                >
                  {selectedTextIndex === 1 && (
                    <motion.div
                      layoutId="activeTextSelectionMarquee"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="absolute -inset-x-3 -inset-y-2 border-2 border-white bg-white/[0.05] backdrop-blur-[2px] pointer-events-none z-10"
                    >
                      {/* 4 Corner Resize Anchor Squares */}
                      <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />

                      {/* White animated mouse cursor pointer positioned at the bottom-right corner */}
                      <motion.div
                        animate={{ x: [0, 2, 0], y: [0, 2, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[calc(100%-1px)] left-[calc(100%-1px)] z-30 pointer-events-none select-none flex items-start gap-1.5"
                      >
                        <svg
                          className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
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
                        <span className="px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-bold tracking-wide shadow-lg shadow-black/80 flex items-center gap-1 -mt-0.5 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          <span>Selected</span>
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                  <span className="relative z-0 text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight uppercase leading-none bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-sans text-left block">
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
                    className="absolute -inset-x-3 -inset-y-2 border-2 border-white bg-white/[0.05] backdrop-blur-[2px] pointer-events-none z-10"
                  >
                    {/* 4 Corner Resize Anchor Squares */}
                    <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                    <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-black/40 shadow-sm" />

                    {/* White animated mouse cursor pointer positioned at the bottom-right corner */}
                    <motion.div
                      animate={{ x: [0, 2, 0], y: [0, 2, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-[calc(100%-1px)] left-[calc(100%-1px)] z-30 pointer-events-none select-none flex items-start gap-1.5"
                    >
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
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
                      <span className="px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-bold tracking-wide shadow-lg shadow-black/80 flex items-center gap-1 -mt-0.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span>Selected</span>
                      </span>
                    </motion.div>
                  </motion.div>
                )}
                <p className="relative z-0 text-base sm:text-lg lg:text-xl text-zinc-300/90 leading-relaxed font-normal text-left">
                  Real Learning is an AI Life GPS that helps you figure out where
                  you are, where you want to go, and your next best step.
                </p>
              </motion.div>

              {/* Slide / Swipe Up Animated Handle Button */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-4 cursor-pointer group select-none pt-2 self-start"
                onClick={() => handleLaunchChat()}
              >
                {/* Circle Icon Button */}
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 group-hover:border-orange-400/60 group-hover:bg-orange-500/20 backdrop-blur-lg flex items-center justify-center text-white transition-all shadow-lg group-hover:scale-105 shrink-0">
                  <motion.div
                    animate={{ y: [0, 3.5, 0] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex items-center justify-center"
                  >
                    <ChevronDown className="w-5 h-5 text-orange-400" />
                  </motion.div>
                </div>

                {/* Text Content - Perfectly Left-Aligned and Vertically Centered */}
                <div className="flex flex-col items-start text-left justify-center gap-1">
                  <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white/90 group-hover:text-orange-300 transition-colors leading-tight">
                    SLIDE / SWIPE UP INTO PATRICIA
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/45 group-hover:text-white/70 transition-colors leading-tight">
                    Patricia becomes your main experience
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: 3D Dotted Canvas Globe with Floating HUD Cards */}
            <div className="lg:col-span-5 relative w-full h-[520px] sm:h-[580px] lg:h-[660px] flex items-center justify-center overflow-visible p-4 sm:p-6">
              {/* The 3D Dotted Canvas Globe */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:pointer-events-auto">
                <DottedGlobe className="w-full h-full" />
              </div>

              {/* FLOATING CARD 1: CAREER TRACKS & SCENARIOS (Top Right) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="absolute top-2 sm:top-6 right-1 sm:right-6 z-20 w-[270px] sm:w-[310px] scale-[0.85] sm:scale-100 origin-top-right rounded-2xl bg-[#0e1118]/95 border border-white/10 p-4 sm:p-4.5 backdrop-blur-md shadow-2xl shadow-black/90"
              >
                {/* Header row: CAREER TRACKS + 135+ Scenarios */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                      CAREER TRACKS
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                    135+ Scenarios
                  </span>
                </div>

                {/* Status & Count */}
                <div className="mb-3.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      4 Tracks
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      live workplace practice
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Simulate real situations with AI feedback
                  </p>
                </div>

                {/* Career Tracks Progress Breakdown */}
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium mb-1">
                      <span className="text-zinc-300">Customer Service</span>
                      <span className="text-zinc-400 font-mono text-[10px]">
                        42 scenarios
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"
                        style={{ width: "85%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium mb-1">
                      <span className="text-zinc-300">Tech Support</span>
                      <span className="text-zinc-400 font-mono text-[10px]">
                        35 scenarios
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                        style={{ width: "70%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium mb-1">
                      <span className="text-zinc-300">IT Specialist</span>
                      <span className="text-zinc-400 font-mono text-[10px]">
                        30 scenarios
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"
                        style={{ width: "60%" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: FEATURED SIMULATION (Middle Left) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute top-[36%] left-0 sm:left-2 lg:-left-2 z-20 w-[245px] sm:w-[275px] scale-[0.85] sm:scale-100 origin-left rounded-2xl bg-[#0e1118]/95 border border-white/10 p-4 backdrop-blur-md shadow-2xl shadow-black/90"
              >
                <div className="flex items-center gap-1.5 text-zinc-400 mb-1.5">
                  <Headphones className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">
                    FEATURED SIMULATION
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-white tracking-tight">
                  Customer Service &amp; Communication
                </h4>

                <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-white/5">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-300 truncate">
                      <Target className="w-3 h-3 text-zinc-400 shrink-0" />
                      <span className="truncate">Client Care</span>
                    </div>
                    <span className="text-[9px] text-zinc-400 mt-0.5">
                      track
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-300">
                      <Compass className="w-3 h-3 text-zinc-400 shrink-0" />
                      <span>AI Practice</span>
                    </div>
                    <span className="text-[9px] text-zinc-400 mt-0.5">
                      mode
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-300">
                      <Clock className="w-3 h-3 text-zinc-400 shrink-0" />
                      <span className="whitespace-nowrap">5 mins</span>
                    </div>
                    <span className="text-[9px] text-zinc-400 mt-0.5">
                      duration
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 3: PATRICIA AI LIFE GPS (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="absolute bottom-2 sm:bottom-6 right-1 sm:right-8 z-20 w-[245px] sm:w-[280px] scale-[0.85] sm:scale-100 origin-bottom-right rounded-2xl bg-[#0e1118]/95 border border-white/10 p-4 backdrop-blur-md shadow-2xl shadow-black/90"
              >
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">
                    PATRICIA AI LIFE GPS
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-white tracking-tight">
                  Where you are → Next best step
                </h4>

                <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-1">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Instant Feedback &amp; Direction</span>
                </div>

                <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-white/5 text-[10px]">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                    <span>Assess</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                    <span>Practice</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
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
