"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

export function ScreenFadeIn() {
  const [removed, setRemoved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);

  const lenis = useLenis();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Lock scroll during the cinematic intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (lenis) {
      lenis.stop();
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          if (lenis) {
            lenis.start();
          }
          setRemoved(true);
        },
      });

      timelineRef.current = tl;

      // Initial visual states
      gsap.set(textRef.current, {
        opacity: 0,
        scale: 0.94,
        y: 12,
      });
      gsap.set(glowRef.current, {
        opacity: 0,
        scale: 0.7,
      });
      gsap.set(flashRef.current, {
        opacity: 0,
      });

      // SVG path initial state: covers 100% of the screen with a flat bottom
      const initialPath = "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z";
      const initialStroke = "M 0 100 Q 50 100 100 100";
      gsap.set(curvePathRef.current, { attr: { d: initialPath } });
      gsap.set(strokePathRef.current, {
        attr: { d: initialStroke },
        opacity: 0,
      });

      // ============================================================
      // PHASE 1: Pure Minimalist Studio Text Reveal (0.0s - 0.6s)
      // ============================================================
      tl.to(
        textRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        0,
      );

      tl.to(
        glowRef.current,
        {
          opacity: 0.9,
          scale: 1.15,
          duration: 0.65,
          ease: "power2.out",
        },
        0.05,
      );

      // Brief hold so the user can easily read "Real Learning"
      tl.to({}, { duration: 0.15 });

      // ============================================================
      // PHASE 2: High-Voltage / Nano-Second Blink Sequence (0.75s - 1.05s)
      // ============================================================
      const blinkTarget = textRef.current;

      tl.to(blinkTarget, { opacity: 0.08, duration: 0.035, ease: "steps(1)" });
      tl.to(blinkTarget, { opacity: 1, duration: 0.04, ease: "steps(1)" });
      tl.to(blinkTarget, { opacity: 0, duration: 0.03, ease: "steps(1)" });
      tl.to(blinkTarget, { opacity: 0.9, duration: 0.045, ease: "steps(1)" });
      tl.to(blinkTarget, { opacity: 0.15, duration: 0.035, ease: "steps(1)" });

      // Warm amber pulse on final lock
      tl.to(
        flashRef.current,
        {
          opacity: 0.2,
          duration: 0.04,
          ease: "power1.in",
        },
        "-=0.03",
      );
      tl.to(flashRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.out",
      });

      // Text fully locks into razor-sharp 100% opacity
      tl.to(
        blinkTarget,
        {
          opacity: 1,
          duration: 0.05,
          ease: "power1.out",
        },
        "-=0.08",
      );

      // Settle pause right before the SVG curve reveals the site
      tl.to({}, { duration: 0.18 });

      // ============================================================
      // PHASE 3: Organic SVG Curved Arch Lift (1.2s - 2.1s)
      // The clean white curtain arches upward, unveiling the website
      // ============================================================
      // Center text floats up gracefully as curve pulls upward
      tl.to(
        contentRef.current,
        {
          y: -75,
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
        },
        "<",
      );

      tl.to(
        glowRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        },
        "<",
      );

      // Glowing curved edge line appears
      tl.to(
        strokePathRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: "power1.out",
        },
        "<",
      );

      // Morph 1: Bottom edge curves upward into a smooth arch
      const curvedPath = "M 0 0 L 100 0 L 100 0 Q 50 -38 0 0 Z";
      const curvedStroke = "M 0 0 Q 50 -38 100 0";

      tl.to(
        curvePathRef.current,
        {
          attr: { d: curvedPath },
          duration: 0.78,
          ease: "power4.inOut",
        },
        "<",
      );

      tl.to(
        strokePathRef.current,
        {
          attr: { d: curvedStroke },
          duration: 0.78,
          ease: "power4.inOut",
        },
        "<",
      );

      // Morph 2: Arch flattens out smoothly off-screen at the top
      const finalPath = "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z";
      const finalStroke = "M 0 0 Q 50 0 100 0";

      tl.to(curvePathRef.current, {
        attr: { d: finalPath },
        duration: 0.25,
        ease: "power2.out",
      });

      tl.to(
        strokePathRef.current,
        {
          attr: { d: finalStroke },
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        "<",
      );
    }, containerRef);

    // Skip handler on keydown (Esc, Space, Enter)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        if (timelineRef.current) {
          timelineRef.current.progress(1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (lenis) {
        lenis.start();
      }
      ctx.revert();
    };
  }, [lenis]);

  if (removed) return null;

  // Clicking anywhere fast-forwards/skips the intro
  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      aria-label="Click or press any key to skip intro"
    >
      {/* Fullscreen SVG with Curved Revealing White Curtain */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="whiteStudioEmberStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0" />
            <stop offset="25%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="75%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Crisp Pure White Curtain that curves upward */}
        <path
          ref={curvePathRef}
          d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
          fill="#ffffff"
        />

        {/* Radiant flame sweep line along the bottom curved arch */}
        <path
          ref={strokePathRef}
          d="M 0 100 Q 50 100 100 100"
          fill="none"
          stroke="url(#whiteStudioEmberStroke)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{
            filter: "drop-shadow(0 4px 16px rgba(234, 88, 12, 0.45))",
          }}
        />
      </svg>

      {/* Soft Ambient Pastel-Orange Prism Glow behind text */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[640px] rounded-full bg-gradient-to-tr from-orange-400/20 via-amber-200/25 to-transparent blur-3xl"
      />

      {/* Center Content Block */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center px-4 text-center will-change-transform"
      >
        {/* Subtle Eyebrow Accent */}
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent via-orange-500 to-orange-400" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.35em] uppercase text-orange-600">
            EXPERIENCE
          </span>
          <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent via-orange-500 to-orange-400" />
        </div>

        {/* Main "Real Learning" Title - Pure Minimalist White Studio Styling */}
        <h1
          ref={textRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.14em] font-sans antialiased will-change-transform leading-tight flex items-center justify-center flex-wrap gap-x-4"
        >
          {/* Deep Obsidian Charcoal for High-End Contrast */}
          <span className="text-[#0f1117]">
            REAL
          </span>
          {/* Radiant High-Voltage Orange */}
          <span className="text-[#ea580c] drop-shadow-[0_2px_20px_rgba(234,88,12,0.35)]">
            LEARNING
          </span>
        </h1>

        {/* Subtitle / Tagline in Elegant Slate Gray */}
        <p className="mt-4 text-xs sm:text-sm font-sans font-semibold tracking-[0.28em] uppercase text-slate-500">
          Humans and AI agents
        </p>
      </div>

      {/* Warm Amber Flash Overlay for the Nano-Second Blink Effect */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 bg-orange-400/20 backdrop-blur-[1px]"
      />
    </div>
  );
}

export default ScreenFadeIn;
