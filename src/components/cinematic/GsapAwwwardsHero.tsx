"use client";

import React, { useEffect, useRef, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { HeroDashboardPreview } from "@/components/cinematic/HeroDashboardPreview";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const GsapAwwwardsHero = memo(function GsapAwwwardsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);

  const featherWrapperRef = useRef<HTMLDivElement>(null);
  const featherFloatRef = useRef<HTMLDivElement>(null);
  const featherImgRef = useRef<HTMLDivElement>(null);
  const scorchedTextRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  const realLearningSectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);
  const dashboardPreviewRef = useRef<HTMLDivElement>(null);

  const TRUSTED_AVATARS = [
    { src: "/images/avatars/avatar-1.jpg", alt: "Executive Leader" },
    { src: "/images/avatars/avatar-2.jpg", alt: "Tech Specialist" },
    { src: "/images/avatars/avatar-3.jpg", alt: "Product Manager" },
    { src: "/images/avatars/avatar-4.jpg", alt: "Business Lead" },
  ];

  const circleProgressRef = useRef<SVGCircleElement>(null);
  const autoScrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const hasUserScrolledRef = useRef(false);
  const isInitialEntranceCompleteRef = useRef(false);
  const startProgressRef = useRef<() => void>(() => {});
  const stopProgressRef = useRef<() => void>(() => {});

  const lenis = useLenis();

  // 2-second circular progress timer that auto-scrolls to the hero section.
  // ALWAYS starts the progress when user hits or is at the top of the screen (y <= 5) after entrance fade-in.
  // If the user scrolls away, the progress immediately stops and resets to zero.
  useEffect(() => {
    const circleEl = circleProgressRef.current;
    if (!circleEl) return;

    const radius = 18;
    const circumference = 2 * Math.PI * radius; // ~113.097

    // Initialize progress ring at 0%
    gsap.set(circleEl, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    let isRunning = false;

    const scrollToHeroTarget = () => {
      // Scroll to complete the feather transition, keeping the feather and title clearly in view
      const targetScroll = Math.round(window.innerHeight * 0.52);
      if (lenis) {
        lenis.scrollTo(targetScroll, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    };

    const startProgress = () => {
      if (isRunning) return;
      isRunning = true;
      hasUserScrolledRef.current = false;

      // Ensure clean start from 0%
      gsap.set(circleEl, {
        strokeDashoffset: circumference,
      });

      if (autoScrollTweenRef.current) {
        autoScrollTweenRef.current.kill();
      }

      // Smooth 2-second progress ring
      autoScrollTweenRef.current = gsap.to(circleEl, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "linear",
        onComplete: () => {
          isRunning = false;
          const currentY = window.scrollY || document.documentElement.scrollTop;
          if (currentY <= 5 && !hasUserScrolledRef.current) {
            scrollToHeroTarget();
          }
        },
      });
    };

    const stopAndResetProgress = () => {
      if (!isRunning && autoScrollTweenRef.current === null) return;
      isRunning = false;
      hasUserScrolledRef.current = true;
      if (autoScrollTweenRef.current) {
        autoScrollTweenRef.current.kill();
        autoScrollTweenRef.current = null;
      }
      gsap.to(circleEl, {
        strokeDashoffset: circumference,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    startProgressRef.current = startProgress;
    stopProgressRef.current = stopAndResetProgress;

    const handleScrollCheck = (scrollYPos?: number) => {
      const y =
        typeof scrollYPos === "number"
          ? scrollYPos
          : window.scrollY || document.documentElement.scrollTop;

      if (y <= 5) {
        // User hit the top of the screen: start progress if entrance is done
        if (isInitialEntranceCompleteRef.current) {
          startProgress();
        }
      } else {
        // User scrolled away from top: stop and reset to zero
        stopAndResetProgress();
      }
    };

    const onNativeScroll = () => handleScrollCheck();
    const onLenisScroll = (e: { scroll: number }) =>
      handleScrollCheck(e.scroll);

    window.addEventListener("scroll", onNativeScroll, { passive: true });
    if (lenis) {
      lenis.on("scroll", onLenisScroll);
    }

    return () => {
      if (autoScrollTweenRef.current) {
        autoScrollTweenRef.current.kill();
        autoScrollTweenRef.current = null;
      }
      window.removeEventListener("scroll", onNativeScroll);
      if (lenis) {
        lenis.off("scroll", onLenisScroll);
      }
    };
  }, [lenis]);

  // Synchronize Lenis and ScrollTrigger
  useEffect(() => {
    if (!lenis) return;
    const handleScroll = () => ScrollTrigger.update();
    lenis.on("scroll", handleScroll);
    return () => lenis.off("scroll", handleScroll);
  }, [lenis]);

  // Recalculate ScrollTrigger on device orientation & resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, {
      passive: true,
    });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Subtle organic float parallax on mouse (desktop only, GPU-accelerated, zero React re-renders)
  useEffect(() => {
    const floatEl = featherFloatRef.current;
    if (!floatEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 14;
      const y = (e.clientY / innerHeight - 0.5) * 14;
      gsap.to(floatEl, {
        x,
        y,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP ScrollTrigger Transition & Initial Dark Screen Fade-In
  useEffect(() => {
    if (
      !containerRef.current ||
      !pinSectionRef.current ||
      !featherImgRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Helper to compute exact deltaX and deltaY to center the feather initially in the visible viewport
      const getMetrics = () => {
        if (!pinSectionRef.current || !featherImgRef.current) {
          return { deltaX: 0, deltaY: 200, scale: 3.0, scorchedY: 520, scrollCueTop: 720 };
        }
        const pinRect = pinSectionRef.current.getBoundingClientRect();
        const featherRect = featherImgRef.current.getBoundingClientRect();

        const windowW = window.innerWidth;
        const viewportH = window.innerHeight;
        // Exact vertical and horizontal center of visible screen viewport
        const viewportCenterY = viewportH / 2;
        const viewportCenterX = windowW / 2;

        // Center of feather relative to top-left of pinSectionRef
        const featherCenterY =
          featherRect.top - pinRect.top + featherRect.height / 2;
        const deltaY = viewportCenterY - featherCenterY;

        const featherCenterX =
          featherRect.left - pinRect.left + featherRect.width / 2;
        const deltaX = viewportCenterX - featherCenterX;

        // Large feather size tailored for mobile & desktop screens
        const targetLargeWidth = Math.min(
          windowW * 0.74,
          windowW < 640 ? 230 : windowW < 1024 ? 320 : 420,
        );
        const restingWidth = featherRect.width || (windowW < 640 ? 80 : 112);
        const scale = Math.max(1.8, targetLargeWidth / restingWidth);

        const scaledHeight = (featherRect.height || 60) * scale;
        const scorchedY =
          viewportCenterY + scaledHeight / 2 + (windowW < 640 ? 16 : 24);

        const scrollCueTop = viewportH - (windowW < 640 ? 76 : 96);

        return { deltaX, deltaY, scale, scorchedY, scrollCueTop };
      };

      let metrics = getMetrics();

      // 1. Initial visual state (Warm #fdceb2 canvas with centered large feather, set behind dark curtain)
      gsap.set(pinSectionRef.current, { backgroundColor: "#fdceb2" });
      gsap.set(featherImgRef.current, {
        x: metrics.deltaX,
        y: metrics.deltaY,
        scale: metrics.scale,
        transformOrigin: "center center",
        opacity: 1,
      });
      gsap.set(scorchedTextRef.current, {
        top: `${metrics.scorchedY}px`,
        autoAlpha: 1,
      });
      gsap.set(scrollCueRef.current, {
        top: `${metrics.scrollCueTop}px`,
        autoAlpha: 1,
        y: 0,
      });
      gsap.set(headlineRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(subtitleRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(socialProofRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(dashboardPreviewRef.current, { autoAlpha: 0, y: 30 });

      // Re-center if device rotates or resizes while user is at the top
      ScrollTrigger.addEventListener("refreshInit", () => {
        const currentY = window.scrollY || document.documentElement.scrollTop;
        if (
          currentY <= 5 &&
          featherImgRef.current &&
          scorchedTextRef.current &&
          scrollCueRef.current
        ) {
          metrics = getMetrics();
          gsap.set(featherImgRef.current, {
            x: metrics.deltaX,
            y: metrics.deltaY,
            scale: metrics.scale,
          });
          gsap.set(scorchedTextRef.current, {
            top: `${metrics.scorchedY}px`,
          });
          gsap.set(scrollCueRef.current, {
            top: `${metrics.scrollCueTop}px`,
          });
        }
      });

      // Start 2-second circular progress once global layout dark fade-in completes
      const entranceTimer = setTimeout(() => {
        isInitialEntranceCompleteRef.current = true;
        const currentY = window.scrollY || document.documentElement.scrollTop;
        if (currentY <= 5 && !hasUserScrolledRef.current) {
          startProgressRef.current();
        }
      }, 850);

      // 2. Silky smooth scroll scrub for feather resize
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 0.55)}`,
          pin: pinSectionRef.current,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Initial scroll prompt & "SCORCHED SOULS PRESENTS" softly fade early
      tl.to(
        scrollCueRef.current,
        { autoAlpha: 0, y: -14, duration: 0.25, ease: "power1.out" },
        0,
      );

      tl.to(
        scorchedTextRef.current,
        {
          autoAlpha: 0,
          y: -14,
          duration: 0.25,
          ease: "power1.out",
        },
        0,
      );

      // Warm #fdceb2 background smoothly transitions to clean #fcfdfd across the scroll
      tl.to(
        pinSectionRef.current,
        {
          backgroundColor: "#fcfdfd",
          duration: 1,
          ease: "power1.inOut",
        },
        0,
      );

      // Feather smoothly decreases in size and glides to its resting place in the Hero section
      tl.to(
        featherImgRef.current,
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power1.inOut",
        },
        0,
      );

      // Hero content smoothly fades up beneath the resized feather
      tl.to(
        headlineRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        0.3,
      );

      tl.to(
        subtitleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0.38,
      );

      tl.to(
        socialProofRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0.38,
      );

      tl.to(
        dashboardPreviewRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0.46,
      );

      // Gentle buffer at completion
      tl.to({}, { duration: 0.1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToHero = () => {
    // If auto-scroll timer is running, stop it and reset circle
    if (autoScrollTweenRef.current) {
      autoScrollTweenRef.current.kill();
      autoScrollTweenRef.current = null;
    }
    hasUserScrolledRef.current = true;
    if (circleProgressRef.current) {
      const radius = 18;
      const circumference = 2 * Math.PI * radius;
      gsap.to(circleProgressRef.current, {
        strokeDashoffset: circumference,
        duration: 0.2,
      });
    }

    const targetScroll = Math.round(window.innerHeight * 0.52);
    if (lenis) {
      lenis.scrollTo(targetScroll, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const handleScrollToPatricia = () => {
    const el = document.getElementById("patricia-experience");
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -40, duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollToWhyYouAreHere = () => {
    const el = document.getElementById("why-youre-here");
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -40, duration: 0.9 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-top"
      className="relative w-full bg-[#fdceb2] select-none"
    >
      {/* Pinned Viewport Container with min-h-[100dvh] and top padding for fixed navbar clearance */}
      <div
        ref={pinSectionRef}
        className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start bg-[#fdceb2] pt-14 sm:pt-16 md:pt-18 pb-12 sm:pb-16"
      >
        {/* Subtle graph paper grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
            backgroundSize: "clamp(24px, 4vw, 36px) clamp(24px, 4vw, 36px)",
          }}
        />

        {/* Floating "SCORCHED SOULS PRESENTS" (Initial state directly underneath large feather) */}
        <div
          ref={scorchedTextRef}
          className="absolute left-1/2 -translate-x-1/2 text-center will-change-transform pointer-events-none z-20 px-4 w-full max-w-xl mx-auto"
        >
          <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-sans tracking-[0.32em] sm:tracking-[0.45em] md:tracking-[0.52em] uppercase text-[#141210] font-extrabold sm:font-black whitespace-nowrap drop-shadow-xs antialiased">
            Scorched Souls Presents
          </h2>
        </div>

        {/* Minimal Scroll Prompt with 2-second Circular Auto-Scroll Progress (positioned at bottom of initial 100dvh viewport) */}
        <div
          ref={scrollCueRef}
          onClick={handleScrollToHero}
          className="absolute top-[calc(100dvh-5rem)] sm:top-[calc(100dvh-6rem)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-2.5 cursor-pointer group z-20 select-none"
          role="button"
          aria-label="Scroll to hero section"
        >
          {/* Circular Progress Ring (Responsive 44px - 48px) */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center">
            {/* SVG Ring rotated -90deg so progress starts at 12 o'clock */}
            <svg
              className="w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 44 44"
            >
              {/* Subtle background track */}
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-[#141210]/20"
              />
              {/* Animated Progress Circle (fills within 2s, stops and resets to 0 if user scrolls) */}
              <circle
                ref={circleProgressRef}
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#ea580c"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* Centered Chevron Arrow Icon: bolder and responsive */}
            <div className="absolute inset-0 flex items-center justify-center text-[#141210] group-hover:text-orange-600 transition-colors">
              <svg
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:translate-y-0.5 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>

          {/* Bolder, highly visible, and responsive 'SCROLL' label */}
          <span className="text-xs sm:text-sm font-extrabold sm:font-black tracking-[0.28em] sm:tracking-[0.36em] uppercase font-sans text-[#141210] group-hover:text-orange-600 transition-colors antialiased">
            Scroll
          </span>
        </div>

        {/* ========================================================= */}
        {/* REAL LEARNING HERO (Layout Matching Reference Image)      */}
        {/* ========================================================= */}
        <div
          ref={realLearningSectionRef}
          id="real-learning-intro"
          className="relative z-10 flex flex-col items-stretch px-4 sm:px-6 md:px-8 max-w-5xl mx-auto will-change-transform pointer-events-auto w-full py-1 sm:py-2"
        >
          {/* Feather: starts centered & large, smoothly resizes and glides here on scroll */}
          <div
            ref={featherWrapperRef}
            className="relative flex flex-col items-start mb-2 sm:mb-3 pointer-events-auto"
          >
            <div
              ref={featherFloatRef}
              className="will-change-transform flex items-center justify-start"
            >
              <div
                ref={featherImgRef}
                className="relative w-14 sm:w-16 md:w-20 lg:w-22 aspect-[627/410] flex items-center justify-center will-change-transform cursor-pointer"
              >
                <Image
                  src="/feathers.png"
                  alt="Real Learning Feather"
                  width={627}
                  height={410}
                  priority
                  className="w-full h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(20,15,10,0.18)] select-none pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Large Bold Left-Aligned Headline (matching reference image) */}
          <h1
            ref={headlineRef}
            style={{ opacity: 0, visibility: "hidden" }}
            className="opacity-0 text-3xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[78px] font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.05] sm:leading-[1.0] font-sans will-change-transform text-left"
          >
            Real Learning for <br className="hidden sm:inline" />
            humans and AI agents
          </h1>

          {/* Split Row: Subtitle Paragraph on Left, Social Proof Badge on Right */}
          <div className="w-full mt-6 sm:mt-8 md:mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-10">
            {/* Left Column: Description Paragraph */}
            <p
              ref={subtitleRef}
              style={{ opacity: 0, visibility: "hidden" }}
              className="opacity-0 text-sm sm:text-base md:text-[17px] text-slate-600 font-normal max-w-lg md:max-w-xl leading-relaxed will-change-transform text-left"
            >
              Real Learning gives you the education you deserve so you never
              become outmoded. Practice high-stakes workplace situations, talk
              with Patricia, and master your career.
            </p>

            {/* Right Column: Social Proof / Trust Badge (matching reference image) */}
            <div
              ref={socialProofRef}
              style={{ opacity: 0, visibility: "hidden" }}
              className="opacity-0 flex flex-col items-start md:items-end shrink-0 will-change-transform self-start md:self-end"
            >
              {/* Overlapping rounded squircle avatars */}
              <div className="flex items-center -space-x-3 sm:-space-x-3.5">
                {TRUSTED_AVATARS.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="relative w-11 h-12 sm:w-12 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden border-[2.5px] border-white shadow-sm ring-1 ring-slate-900/10 bg-slate-200 shrink-0 transform transition-transform duration-200 hover:-translate-y-1 hover:z-20 cursor-pointer"
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>

              {/* Stars & Rating */}
              <div className="mt-1 flex items-center justify-start md:justify-end gap-1.5 text-slate-900">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 stroke-amber-500"
                      viewBox="0 0 24 24"
                      strokeWidth="1.2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-extrabold font-sans text-slate-900 tracking-tight">
                  / 5.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
