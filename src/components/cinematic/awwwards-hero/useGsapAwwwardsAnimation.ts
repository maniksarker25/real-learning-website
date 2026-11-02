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
  const videoLayerRef = useRef<HTMLDivElement>(null);

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
        // The ring is an ambient "there's more below" hint only. It no longer
        // auto-scrolls the page: forcing a jump fought the user and pushed the
        // hero copy out of view. Scrolling is now entirely user-driven, via
        // the wheel or by clicking the cue.
        onComplete: () => {
          isRunning = false;
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
      // Initial visual state. The hero reads as a finished composition on load
      // (video backdrop + left-aligned headline), so the feather rests inline
      // above the headline rather than flying in oversized from the centre.
      //
      // The eyebrow and scroll cue are anchored with CSS (top-6 / bottom-5)
      // against the hero section itself, so nothing here positions them from
      // window.innerHeight — that broke once the hero stopped being full-height.
      gsap.set(featherImgRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: "center center",
        opacity: 1,
      });
      gsap.set([scorchedTextRef.current, scrollCueRef.current], {
        autoAlpha: 1,
        y: 0,
      });

      // Headline block is visible immediately and stays visible.
      gsap.set(
        [headlineRef.current, subtitleRef.current, socialProofRef.current],
        { autoAlpha: 1, y: 0 },
      );

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
          end: () => `+=${Math.round(window.innerHeight * 0.3)}`,
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

      // The headline block stays fully visible for the whole pinned stretch —
      // it only drifts up slightly, so auto-scroll never blanks the hero.
      tl.to(
        [headlineRef.current, subtitleRef.current, socialProofRef.current],
        { y: -24, duration: 1, ease: "none" },
        0,
      );

      // Slow push-in on the footage keeps the pinned section alive.
      if (videoLayerRef.current) {
        tl.to(
          videoLayerRef.current,
          { scale: 1.08, duration: 1, ease: "none" },
          0,
        );
      }

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

    // Scroll just past the hero (section height + its pinned stretch) rather
    // than a fixed fraction of the viewport, which no longer matches now that
    // the hero is shorter than the screen.
    const heroHeight =
      containerRef.current?.offsetHeight ?? Math.round(window.innerHeight * 0.7);
    const targetScroll = Math.round(
      heroHeight + window.innerHeight * 0.3 - window.innerHeight * 0.08,
    );
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
    videoLayerRef,
    realLearningSectionRef,
    headlineRef,
    subtitleRef,
    socialProofRef,
    circleProgressRef,
    handleScrollToHero,
  };
}
