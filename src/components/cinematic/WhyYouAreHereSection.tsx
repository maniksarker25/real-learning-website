"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PatriciaChatExperience } from "@/components/patricia/PatriciaChatExperience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const WhyYouAreHereSection = memo(function WhyYouAreHereSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !pinWrapperRef.current ||
      !titleBlockRef.current ||
      !titleInnerRef.current ||
      !chatContainerRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;
      const navbarHeight = isMobile ? 54 : 64;
      const initialPadTop = navbarHeight + (isMobile ? 6 : 14);
      const initialPadBottom = isMobile ? 8 : 16;
      const initialPadX = isMobile ? 10 : 24;
      const initialMarginBottom = isMobile ? 6 : 16;

      // Accurately capture the natural unconstrained title height
      const titleHeight = titleInnerRef.current?.offsetHeight || (isMobile ? 65 : 110);

      // 1. Initial visual states: spacious, beautifully aligned, zero layout shift
      gsap.set(pinWrapperRef.current, {
        backgroundColor: "#fdceb2",
        paddingTop: `${initialPadTop}px`,
        paddingBottom: `${initialPadBottom}px`,
        paddingLeft: `${initialPadX}px`,
        paddingRight: `${initialPadX}px`,
      });

      gsap.set(titleBlockRef.current, {
        height: titleHeight,
        marginBottom: `${initialMarginBottom}px`,
        marginTop: 0,
        opacity: 1,
      });

      gsap.set(titleInnerRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
      });

      if (underlineRef.current) {
        gsap.set(underlineRef.current, { scaleX: 0 });
      }

      gsap.set(chatContainerRef.current, {
        width: "100%",
        maxWidth: isMobile ? "100%" : "56rem", // max-w-4xl (896px)
        borderRadius: isMobile ? "14px" : "20px",
      });

      // 2. Master Scrub Timeline: Smooth expansion directly from initial state to 100% full screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.3)}`,
          pin: pinWrapperRef.current,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Step A (0 -> 0.15): Underline on "outmoded" draws in
      if (underlineRef.current) {
        tl.to(
          underlineRef.current,
          {
            scaleX: 1,
            duration: 0.15,
            ease: "power2.out",
          },
          0,
        );
      }

      // Step B (0.05 -> 0.25): Title content fades out cleanly first
      tl.to(
        titleInnerRef.current,
        {
          y: -16,
          opacity: 0,
          scale: 0.97,
          duration: 0.2,
          ease: "power2.inOut",
        },
        0.05,
      );

      // Step C (0.18 -> 0.45): After title fades, smoothly collapse outer height
      tl.to(
        titleBlockRef.current,
        {
          height: 0,
          marginBottom: 0,
          marginTop: 0,
          duration: 0.27,
          ease: "power2.inOut",
        },
        0.18,
      );

      // Step D (0.15 -> 0.6): Pin wrapper background darkens and padding goes flush to navbar
      tl.to(
        pinWrapperRef.current,
        {
          backgroundColor: "#0c0b0a",
          paddingTop: `${navbarHeight}px`,
          paddingBottom: "0px",
          paddingLeft: "0px",
          paddingRight: "0px",
          duration: 0.45,
          ease: "power1.inOut",
        },
        0.15,
      );

      // Step E (0.15 -> 0.65): Chat container expands to full width & flush edges
      tl.to(
        chatContainerRef.current,
        {
          maxWidth: "100%",
          borderRadius: "0px",
          duration: 0.5,
          ease: "power2.inOut",
        },
        0.15,
      );

      // Step F: Hold at full-screen immersion before unpinning
      tl.to({}, { duration: 0.25 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="why-youre-here"
      className="relative w-full bg-[#fdceb2] text-white select-none overflow-hidden"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-start bg-[#fdceb2] pt-[60px] sm:pt-[78px] pb-2 sm:pb-4 px-2.5 sm:px-6"
        style={{ boxSizing: "border-box" }}
      >
        {/* Ambient Scorched Ember Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[320px] sm:w-[900px] h-[250px] sm:h-[600px] rounded-full bg-gradient-to-tr from-orange-600/20 via-amber-600/10 to-rose-600/5 blur-3xl opacity-70" />
        </div>

        {/* Background blueprint grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
            backgroundSize: "clamp(24px, 4vw, 36px) clamp(24px, 4vw, 36px)",
          }}
        />

        {/* 1. TITLE BLOCK FOR THE CHAT: Natural Flow Above Chat - No Overlap & Clean Proportions on Mobile */}
        <div
          ref={titleBlockRef}
          className="relative z-10 w-full max-w-3xl mx-auto px-2 shrink-0 overflow-hidden mb-1.5 sm:mb-4 will-change-[height,margin]"
        >
          <div
            ref={titleInnerRef}
            className="w-full text-center will-change-[transform,opacity]"
          >
            {/* Guidance Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-400 shadow-md backdrop-blur-md mb-1 sm:mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[9px] sm:text-xs font-sans font-semibold tracking-[0.18em] uppercase">
                Why You’re Here
              </span>
            </div>

            {/* Responsive Bold Headline - Compact & crisp on mobile, bold on desktop */}
            <h2 className="text-xs sm:text-base md:text-xl lg:text-2xl font-black uppercase text-[#0c0b0a] tracking-tight sm:tracking-tighter leading-snug font-sans drop-shadow-sm max-w-2xl mx-auto">
              AI was made to take your jobs. We’re here to keep you from becoming{" "}
              <span className="relative inline-block text-orange-500 will-change-transform drop-shadow-[0_0_24px_rgba(249,115,22,0.35)]">
                <span>outmoded</span>
                <span
                  ref={underlineRef}
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 rounded-full origin-left will-change-transform shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>{" "}
              — by using AI to give you the education you deserve.
            </h2>
          </div>
        </div>

        {/* 2. CHAT CONTAINER: Full width on mobile, max-w-4xl on desktop, with fluid flex-1 height */}
        <div
          ref={chatContainerRef}
          id="patricia-chat-container"
          className="relative z-20 flex-1 min-h-0 w-full max-w-4xl rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col will-change-[max-width,border-radius]"
        >
          <PatriciaChatExperience />
        </div>
      </div>
    </section>
  );
});
