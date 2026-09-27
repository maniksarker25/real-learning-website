"use client";

import React, { useRef, memo, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { ChevronDown, Sparkles, ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";

interface CinematicHeroProps {
  onScrollToNext?: () => void;
}

export const CinematicHero = memo(function CinematicHero({
  onScrollToNext,
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Scroll tracking across the cinematic container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth springs for buttery cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // 1. FEATHER & SCORCHED SOULS transforms (Phase 1: 0.0 -> 0.38)
  const featherOpacity = useTransform(smoothProgress, [0, 0.22, 0.36], [1, 0.9, 0]);
  const featherScale = useTransform(smoothProgress, [0, 0.36], [1, 0.92]);
  const featherY = useTransform(smoothProgress, [0, 0.36], [0, -70]);
  const blurVal = useTransform(smoothProgress, [0, 0.22, 0.36], [0, 2, 12]);
  const featherBlur = useMotionTemplate`blur(${blurVal}px)`;

  const scorchedOpacity = useTransform(smoothProgress, [0, 0.16, 0.30], [1, 0.7, 0]);
  const scorchedY = useTransform(smoothProgress, [0, 0.30], [0, -35]);

  const scrollPromptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  // Pointer events toggling based on active phase
  const featherPointerEvents = useTransform(smoothProgress, (v) => (v < 0.35 ? "auto" : "none"));
  const realLearningPointerEvents = useTransform(smoothProgress, (v) => (v > 0.32 ? "auto" : "none"));

  // Ambient lighting glow transformation during transition
  const ambientGlowScale = useTransform(smoothProgress, [0, 0.35, 0.7], [1, 1.4, 1.1]);
  const ambientGlowOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.7, 1],
    [0.45, 0.8, 0.6, 0.3]
  );

  // 2. REAL LEARNING transforms (Phase 2: 0.32 -> 1.0)
  const realLearningOpacity = useTransform(
    smoothProgress,
    [0.32, 0.50, 0.92, 1],
    [0, 1, 1, 0.9]
  );
  const realLearningScale = useTransform(
    smoothProgress,
    [0.32, 0.52],
    [0.90, 1]
  );
  const realLearningY = useTransform(
    smoothProgress,
    [0.32, 0.52],
    [60, 0]
  );

  // Subtle next prompt opacity at the end of the scroll
  const nextSectionPromptOpacity = useTransform(
    smoothProgress,
    [0.55, 0.75, 1],
    [0, 1, 1]
  );

  const handleScrollToRealLearning = useCallback(() => {
    if (!containerRef.current) return;
    const targetScroll =
      containerRef.current.offsetTop + containerRef.current.offsetHeight * 0.55;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.4 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, [lenis]);

  const handleScrollToNextSection = useCallback(() => {
    if (onScrollToNext) {
      onScrollToNext();
      return;
    }
    const nextElem = document.getElementById("why-youre-here");
    if (nextElem) {
      if (lenis) {
        lenis.scrollTo(nextElem, { offset: -30, duration: 1.2 });
      } else {
        nextElem.scrollIntoView({ behavior: "smooth" });
      }
    } else if (containerRef.current) {
      const targetScroll =
        containerRef.current.offsetTop + containerRef.current.offsetHeight;
      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  }, [lenis, onScrollToNext]);

  return (
    <div
      ref={containerRef}
      id="hero-top"
      className="relative w-full h-[250vh] bg-[#07080b] text-white select-none"
    >
      {/* Sticky Cinematic Screen Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Film Grain / Subtle Radial Atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Deep Dark Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050608_95%)]" />

          {/* Dynamic Ambient Core Glow that shifts between Feather and Real Learning */}
          <motion.div
            style={{
              scale: ambientGlowScale,
              opacity: ambientGlowOpacity,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[450px] sm:h-[600px] rounded-full bg-gradient-to-tr from-amber-600/15 via-orange-500/10 to-transparent blur-3xl pointer-events-none"
          />

          {/* Subtle Grid texture for precision feel */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: FEATHER & SCORCHED SOULS PRESENTS (First visual/brand moment) */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: featherOpacity,
            scale: featherScale,
            y: featherY,
            filter: featherBlur,
            pointerEvents: featherPointerEvents,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
        >
          {/* Subtle floating wrapper for natural organic motion */}
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
            {/* Ethereal Halo behind the feather */}
            <div className="absolute -inset-10 bg-radial from-amber-500/25 via-orange-500/10 to-transparent blur-2xl rounded-full scale-125 opacity-70 pointer-events-none" />

            {/* The Feather Image */}
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

            {/* Directly underneath: SCORCHED SOULS PRESENTS */}
            <motion.div
              style={{
                opacity: scorchedOpacity,
                y: scorchedY,
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

        {/* Scroll Indicator Prompt (Visible during Feather moment) */}
        <motion.div
          style={{ opacity: scrollPromptOpacity }}
          onClick={handleScrollToRealLearning}
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

        {/* ========================================================================= */}
        {/* SECTION 4: REAL LEARNING (Large, clean brand introduction)                */}
        {/* Emerges seamlessly from the scroll transition                             */}
        {/* ========================================================================= */}
        <motion.div
          id="real-learning-intro"
          style={{
            opacity: realLearningOpacity,
            scale: realLearningScale,
            y: realLearningY,
            pointerEvents: realLearningPointerEvents,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center max-w-5xl mx-auto"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[10px] sm:text-xs tracking-[0.2em] uppercase text-zinc-300 mb-6 sm:mb-8 font-medium shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>Front Door to Real Learning</span>
          </motion.div>

          {/* Monumental Headline: REAL LEARNING */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[108px] font-black tracking-tight uppercase leading-[0.9] text-white font-sans select-none drop-shadow-2xl">
            REAL{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              LEARNING
            </span>
          </h1>

          {/* Clean Subtitle / Tagline introduction */}
          <p className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed tracking-normal">
            Where artificial intelligence prepares you for real-world mastery.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto font-normal">
            An AI Life GPS that figures out where you are, where you want to go,
            and your next best step.
          </p>

          {/* Subtle scroll progress cue towards Section 5 ("Why You're Here") */}
          <motion.div
            style={{ opacity: nextSectionPromptOpacity }}
            className="mt-10 sm:mt-12 flex flex-col items-center gap-3 cursor-pointer group"
            onClick={handleScrollToNextSection}
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
