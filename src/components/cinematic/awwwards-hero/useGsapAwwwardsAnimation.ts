"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapAwwwardsAnimation() {
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

  const circleProgressRef = useRef<SVGCircleElement>(null);
  const autoScrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const hasUserScrolledRef = useRef(false);
  const isInitialEntranceCompleteRef = useRef(false);
  const startProgressRef = useRef<() => void>(() => {});
  const stopProgressRef = useRef<() => void>(() => {});

  const lenis = useLenis();

  // 2-second circular progress timer that auto-scrolls to the hero section.
  useEffect(() => {
    const circleEl = circleProgressRef.current;
    if (!circleEl) return;

    const radius = 18;
    const circumference = 2 * Math.PI * radius;

    // Initialize progress ring at 0%
    gsap.set(circleEl, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    let isRunning = false;

    const scrollToHeroTarget = () => {
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

      gsap.set(circleEl, {
        strokeDashoffset: circumference,
      });

      if (autoScrollTweenRef.current) {
        autoScrollTweenRef.current.kill();
      }

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
        if (isInitialEntranceCompleteRef.current) {
          startProgress();
        }
      } else {
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

  // Subtle organic float parallax on mouse (desktop only)
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
      const getMetrics = () => {
        if (!pinSectionRef.current || !featherImgRef.current) {
          return {
            deltaX: 0,
            deltaY: 200,
            scale: 3.0,
            scorchedY: 520,
            scrollCueTop: 720,
          };
        }
        const pinRect = pinSectionRef.current.getBoundingClientRect();
        const featherRect = featherImgRef.current.getBoundingClientRect();

        const windowW = window.innerWidth;
        const viewportH = window.innerHeight;
        const viewportCenterY = viewportH / 2;
        const viewportCenterX = windowW / 2;

        const featherCenterY =
          featherRect.top - pinRect.top + featherRect.height / 2;
        const deltaY = viewportCenterY - featherCenterY;

        const featherCenterX =
          featherRect.left - pinRect.left + featherRect.width / 2;
        const deltaX = viewportCenterX - featherCenterX;

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

      // Initial visual state
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

      // Re-center on refresh
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

      const entranceTimer = setTimeout(() => {
        isInitialEntranceCompleteRef.current = true;
        const currentY = window.scrollY || document.documentElement.scrollTop;
        if (currentY <= 5 && !hasUserScrolledRef.current) {
          startProgressRef.current();
        }
      }, 850);

      // Scroll timeline scrub
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

      tl.to(
        pinSectionRef.current,
        {
          backgroundColor: "#fcfdfd",
          duration: 1,
          ease: "power1.inOut",
        },
        0,
      );

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

      tl.to({}, { duration: 0.1 });
      return () => clearTimeout(entranceTimer);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToHero = () => {
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

  return {
    containerRef,
    pinSectionRef,
    featherWrapperRef,
    featherFloatRef,
    featherImgRef,
    scorchedTextRef,
    scrollCueRef,
    realLearningSectionRef,
    headlineRef,
    subtitleRef,
    socialProofRef,
    circleProgressRef,
    handleScrollToHero,
  };
}
