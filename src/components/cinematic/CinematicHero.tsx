"use client";

import React, { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCinematicHeroAnimation } from "./useCinematicHeroAnimation";

interface CinematicHeroProps {
  onScrollToNext?: () => void;
}

export const CinematicHero = memo(function CinematicHero({
  onScrollToNext,
}: CinematicHeroProps) {
  const {
    containerRef,
    feather,
    scorched,
    scrollPromptOpacity,
    ambientGlow,
    realLearning,
    nextSectionPromptOpacity,
    scrollToRealLearning,
    scrollToNextSection,
  } = useCinematicHeroAnimation({ onScrollToNext });

  return (
    <div
      ref={containerRef}
      id="hero-top"
      className="relative w-full h-[250vh] bg-[#07080b] text-white select-none"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background & Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050608_95%)]" />

          <motion.div
            style={{
              scale: ambientGlow.scale,
              opacity: ambientGlow.opacity,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[450px] sm:h-[600px] rounded-full bg-gradient-to-tr from-amber-600/15 via-orange-500/10 to-transparent blur-3xl pointer-events-none"
          />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Phase 1: Feather & Scorched Souls Brand Intro */}
        <motion.div
          style={{
            opacity: feather.opacity,
            scale: feather.scale,
            y: feather.y,
            filter: feather.filter,
            pointerEvents: feather.pointerEvents,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [-0.6, 0.8, -0.6],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="absolute -inset-10 bg-radial from-amber-500/25 via-orange-500/10 to-transparent blur-2xl rounded-full scale-125 opacity-70 pointer-events-none" />

            <div className="relative w-56 sm:w-80 md:w-[380px] lg:w-[440px] aspect-[627/410] flex items-center justify-center">
              <Image
                src="/feathers.png"
                alt="Scorched Souls Feather"
                width={627}
                height={410}
                priority
                className="w-full h-auto object-contain filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.9)] drop-shadow-[0_0_20px_rgba(251,146,60,0.22)] select-none"
              />
            </div>

            <motion.div
              style={{
                opacity: scorched.opacity,
                y: scorched.y,
              }}
              className="mt-6 sm:mt-8 flex flex-col items-center text-center select-none"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-zinc-500/60" />
                <h2 className="text-[11px] sm:text-xs md:text-sm font-serif tracking-[0.38em] sm:tracking-[0.48em] uppercase text-zinc-200/90 font-medium">
                  Scorched Souls Presents
                </h2>
                <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-zinc-500/60" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll To Enter Indicator */}
        <motion.div
          style={{ opacity: scrollPromptOpacity }}
          onClick={scrollToRealLearning}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer text-zinc-400 hover:text-white transition-colors group select-none"
        >
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
            Scroll To Enter
          </span>
          <div className="w-[1.5px] h-10 bg-white/10 rounded-full relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 40, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-3.5 bg-gradient-to-b from-orange-400 to-amber-300 rounded-full"
            />
          </div>
        </motion.div>

        {/* Phase 2: Real Learning Reveal */}
        <motion.div
          id="real-learning-intro"
          style={{
            opacity: realLearning.opacity,
            scale: realLearning.scale,
            y: realLearning.y,
            pointerEvents: realLearning.pointerEvents,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[10px] sm:text-xs tracking-[0.2em] uppercase text-zinc-300 mb-6 sm:mb-8 font-medium shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>Front Door to Real Learning</span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[108px] font-black tracking-tight uppercase leading-[0.9] text-white font-sans select-none drop-shadow-2xl">
            REAL{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              LEARNING
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed tracking-normal">
            Where artificial intelligence prepares you for real-world mastery.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto font-normal">
            An AI Life GPS that figures out where you are, where you want to go,
            and your next best step.
          </p>

          <motion.div
            style={{ opacity: nextSectionPromptOpacity }}
            className="mt-10 sm:mt-12 flex flex-col items-center gap-3 cursor-pointer group"
            onClick={scrollToNextSection}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all duration-200">
              <span>Explore Why You&apos;re Here</span>
              <ChevronDown className="w-3.5 h-3.5 text-orange-400 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});
