"use client";

import { useRef, useCallback } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";
import { useLenis } from "lenis/react";

interface UseCinematicHeroAnimationProps {
  onScrollToNext?: () => void;
}

export interface CinematicHeroAnimation {
  containerRef: React.RefObject<HTMLDivElement | null>;
  // Phase 1 - Feather & Scorched Souls
  feather: {
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
    y: MotionValue<number>;
    filter: MotionValue<string>;
    pointerEvents: MotionValue<"auto" | "none">;
  };
  scorched: {
    opacity: MotionValue<number>;
    y: MotionValue<number>;
  };
  scrollPromptOpacity: MotionValue<number>;
  // Ambient visual effects
  ambientGlow: {
    scale: MotionValue<number>;
    opacity: MotionValue<number>;
  };
  // Phase 2 - Real Learning Intro
  realLearning: {
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
    y: MotionValue<number>;
    pointerEvents: MotionValue<"auto" | "none">;
  };
  nextSectionPromptOpacity: MotionValue<number>;
  // Actions
  scrollToRealLearning: () => void;
  scrollToNextSection: () => void;
}

export function useCinematicHeroAnimation({
  onScrollToNext,
}: UseCinematicHeroAnimationProps = {}): CinematicHeroAnimation {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Track overall scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out progress with a physics-based spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // --- Phase 1: Feather & Scorched Souls (0.0 -> 0.38) ---
  const featherOpacity = useTransform(smoothProgress, [0, 0.22, 0.36], [1, 0.9, 0]);
  const featherScale = useTransform(smoothProgress, [0, 0.36], [1, 0.92]);
  const featherY = useTransform(smoothProgress, [0, 0.36], [0, -70]);
  const blurVal = useTransform(smoothProgress, [0, 0.22, 0.36], [0, 2, 12]);
  const featherBlur = useMotionTemplate`blur(${blurVal}px)`;
  const featherPointerEvents = useTransform(smoothProgress, (v) => (v < 0.35 ? "auto" : "none"));

  const scorchedOpacity = useTransform(smoothProgress, [0, 0.16, 0.30], [1, 0.7, 0]);
  const scorchedY = useTransform(smoothProgress, [0, 0.30], [0, -35]);

  const scrollPromptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  // --- Ambient Atmosphere ---
  const ambientGlowScale = useTransform(smoothProgress, [0, 0.35, 0.7], [1, 1.4, 1.1]);
  const ambientGlowOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.7, 1],
    [0.45, 0.8, 0.6, 0.3]
  );

  // --- Phase 2: Real Learning Reveal (0.32 -> 1.0) ---
  const realLearningOpacity = useTransform(
    smoothProgress,
    [0.32, 0.50, 0.92, 1],
    [0, 1, 1, 0.9]
  );
  const realLearningScale = useTransform(smoothProgress, [0.32, 0.52], [0.90, 1]);
  const realLearningY = useTransform(smoothProgress, [0.32, 0.52], [60, 0]);
  const realLearningPointerEvents = useTransform(smoothProgress, (v) =>
    v > 0.32 ? "auto" : "none"
  );

  const nextSectionPromptOpacity = useTransform(
    smoothProgress,
    [0.55, 0.75, 1],
    [0, 1, 1]
  );

  // --- Smooth Scroll Handlers ---
  const scrollToRealLearning = useCallback(() => {
    if (!containerRef.current) return;
    const targetScroll =
      containerRef.current.offsetTop + containerRef.current.offsetHeight * 0.55;

    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.4 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, [lenis]);

  const scrollToNextSection = useCallback(() => {
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

  return {
    containerRef,
    feather: {
      opacity: featherOpacity,
      scale: featherScale,
      y: featherY,
      filter: featherBlur,
      pointerEvents: featherPointerEvents,
    },
    scorched: {
      opacity: scorchedOpacity,
      y: scorchedY,
    },
    scrollPromptOpacity,
    ambientGlow: {
      scale: ambientGlowScale,
      opacity: ambientGlowOpacity,
    },
    realLearning: {
      opacity: realLearningOpacity,
      scale: realLearningScale,
      y: realLearningY,
      pointerEvents: realLearningPointerEvents,
    },
    nextSectionPromptOpacity,
    scrollToRealLearning,
    scrollToNextSection,
  };
}
