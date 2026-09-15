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
      className="relative w-full bg-orange-50 text-stone-900 overflow-hidden select-none py-10 sm:py-16 lg:py-24 border-b border-stone-200/80"
      onPanEnd={handlePanEnd}
    >
      {/* Background blueprint grid styling matching the rest of the landing page */}
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

      {/* Subtle ambient warm lighting accents */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Outer framing wrapper */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 z-10">
        {/* Grid Layout: Left Content & Right 3D Globe with Floating Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[580px] lg:min-h-[660px]">
          {/* Left Column: Opening Flow (1. Screen Title, 2. Explanation, 3. Examples of what to ask, 4. Slide up) */}
          <div className="lg:col-span-7 p-4 sm:p-8 lg:p-12 flex flex-col justify-center z-10 space-y-6">
            {/* Eyebrow Badge */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/5 border border-stone-900/10 backdrop-blur-md text-xs font-mono text-stone-800 shadow-xs"
              >
                <Zap className="h-3.5 w-3.5 text-orange-600" />
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
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 28,
                    }}
                    className="absolute -inset-x-3 -inset-y-2 border-2 border-stone-950 bg-stone-950/[0.04] pointer-events-none z-10"
                  >
                    {/* 4 Corner Resize Anchor Squares */}
                    <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />
                    <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />

                    {/* Dark animated mouse cursor pointer positioned at the bottom-right corner */}
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
                        className="w-6 h-6 sm:w-7 sm:h-7 text-stone-950 fill-stone-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 0 L0 18 L5 13.5 L8.5 21.5 L11.5 20 L8 12 L14 12 Z"
                          stroke="rgba(255,255,255,0.9)"
                          strokeWidth="0.8"
                        />
                      </svg>
                      <span className="px-2 py-0.5 rounded-full bg-stone-950 text-white text-[10px] font-bold tracking-wide shadow-lg flex items-center gap-1 -mt-0.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span>Selected</span>
                      </span>
                    </motion.div>
                  </motion.div>
                )}
                <h1 className="relative z-0 text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight uppercase leading-none text-stone-950 font-sans text-left">
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
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 28,
                    }}
                    className="absolute -inset-x-3 -inset-y-2 border-2 border-stone-950 bg-stone-950/[0.04] pointer-events-none z-10"
                  >
                    {/* 4 Corner Resize Anchor Squares */}
                    <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />
                    <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />

                    {/* Dark animated mouse cursor pointer positioned at the bottom-right corner */}
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
                        className="w-6 h-6 sm:w-7 sm:h-7 text-stone-950 fill-stone-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 0 L0 18 L5 13.5 L8.5 21.5 L11.5 20 L8 12 L14 12 Z"
                          stroke="rgba(255,255,255,0.9)"
                          strokeWidth="0.8"
                        />
                      </svg>
                      <span className="px-2 py-0.5 rounded-full bg-stone-950 text-white text-[10px] font-bold tracking-wide shadow-lg flex items-center gap-1 -mt-0.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span>Selected</span>
                      </span>
                    </motion.div>
                  </motion.div>
                )}
                <span className="relative z-0 text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight uppercase leading-none bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 bg-clip-text text-transparent font-sans text-left block">
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
                  className="absolute -inset-x-3 -inset-y-2 border-2 border-stone-950 bg-stone-950/[0.04] pointer-events-none z-10"
                >
                  {/* 4 Corner Resize Anchor Squares */}
                  <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />
                  <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-stone-950 shadow-xs" />

                  {/* Dark animated mouse cursor pointer positioned at the bottom-right corner */}
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
                      className="w-6 h-6 sm:w-7 sm:h-7 text-stone-950 fill-stone-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0 L0 18 L5 13.5 L8.5 21.5 L11.5 20 L8 12 L14 12 Z"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="0.8"
                      />
                    </svg>
                    <span className="px-2 py-0.5 rounded-full bg-stone-950 text-white text-[10px] font-bold tracking-wide shadow-lg flex items-center gap-1 -mt-0.5 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      <span>Selected</span>
                    </span>
                  </motion.div>
                </motion.div>
              )}
              <p className="relative z-0 text-base sm:text-lg lg:text-xl text-stone-600 leading-relaxed font-normal text-left">
                Real Learning is an AI Life GPS that helps you figure out
                where you are, where you want to go, and your next best step.
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
              <div className="w-12 h-12 rounded-full bg-stone-950 border border-stone-800 group-hover:border-stone-700 group-hover:bg-stone-800 backdrop-blur-lg flex items-center justify-center text-white transition-all shadow-md group-hover:scale-105 shrink-0">
                <motion.div
                  animate={{ y: [0, 3.5, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center justify-center"
                >
                  <ChevronDown className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
                </motion.div>
              </div>

              {/* Text Content - Perfectly Left-Aligned and Vertically Centered */}
              <div className="flex flex-col items-start text-left justify-center gap-1">
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-stone-950 group-hover:text-orange-600 transition-colors leading-tight">
                  SLIDE / SWIPE UP INTO PATRICIA
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 group-hover:text-stone-700 transition-colors leading-tight font-medium">
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
              className="absolute top-2 sm:top-6 right-1 sm:right-6 z-20 w-[270px] sm:w-[310px] scale-[0.85] sm:scale-100 origin-top-right rounded-2xl bg-white/95 border border-stone-200/90 p-4 sm:p-4.5 backdrop-blur-md shadow-[0_16px_40px_rgba(28,25,23,0.08)]"
            >
              {/* Status & Count */}
              <div className="mb-3.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                    4 Tracks
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    live workplace practice
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Simulate real situations with AI feedback
                </p>
              </div>

              {/* Career Tracks Progress Breakdown */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[11px] font-medium mb-1">
                    <span className="text-stone-800">Customer Service</span>
                    <span className="text-stone-500 font-mono text-[10px]">
                      42 scenarios
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-900 rounded-full"
                      style={{ width: "85%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-medium mb-1">
                    <span className="text-stone-800">Tech Support</span>
                    <span className="text-stone-500 font-mono text-[10px]">
                      35 scenarios
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-900 rounded-full"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-medium mb-1">
                    <span className="text-stone-800">IT Specialist</span>
                    <span className="text-stone-500 font-mono text-[10px]">
                      30 scenarios
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-900 rounded-full"
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
              className="absolute top-[36%] left-0 sm:left-2 lg:-left-2 z-20 w-[245px] sm:w-[275px] scale-[0.85] sm:scale-100 origin-left rounded-2xl bg-white/95 border border-stone-200/90 p-4 backdrop-blur-md shadow-[0_16px_40px_rgba(28,25,23,0.08)]"
            >
              <div className="flex items-center gap-1.5 text-stone-500 mb-1.5">
                <Headphones className="w-3.5 h-3.5 text-orange-600" />
                <span className="text-[10px] font-bold tracking-wider uppercase text-stone-500">
                  FEATURED SIMULATION
                </span>
              </div>

              <h4 className="text-sm font-bold text-stone-950 tracking-tight">
                Customer Service &amp; Communication
              </h4>

              <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-stone-100">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-stone-800 truncate">
                    <Target className="w-3 h-3 text-stone-500 shrink-0" />
                    <span className="truncate">Client Care</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-stone-800">
                    <Compass className="w-3 h-3 text-stone-500 shrink-0" />
                    <span>AI Practice</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-stone-800">
                    <Clock className="w-3 h-3 text-stone-500 shrink-0" />
                    <span className="whitespace-nowrap">5 mins</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FLOATING CARD 3: PATRICIA AI LIFE GPS (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="absolute bottom-2 sm:bottom-6 right-1 sm:right-8 z-20 w-[245px] sm:w-[280px] scale-[0.85] sm:scale-100 origin-bottom-right rounded-2xl bg-white/95 border border-stone-200/90 p-4 backdrop-blur-md shadow-[0_16px_40px_rgba(28,25,23,0.08)]"
            >
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 font-mono">
                  PATRICIA AI LIFE GPS
                </span>
              </div>

              <h4 className="text-sm font-bold text-stone-950 tracking-tight">
                Where you are → Next best step
              </h4>

              <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium mt-1">
                <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Instant Feedback &amp; Direction</span>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-stone-100 text-[10px]">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                  <span>Assess</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                  <span>Practice</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Grow</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
});
