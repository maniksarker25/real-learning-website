"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PatriciaChatExperience } from "@/components/patricia/PatriciaChatExperience";

gsap.registerPlugin(ScrollTrigger);

export const WhyYouAreHereSection = memo(function WhyYouAreHereSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !pinWrapperRef.current ||
      !titleBlockRef.current ||
      !chatContainerRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;
      const navbarHeight = isMobile ? 56 : 64;

      // 1. Initial visual states: spacious, beautifully aligned, NO overlap
      gsap.set(pinWrapperRef.current, {
        backgroundColor: "#fdceb2",
        paddingTop: `${navbarHeight + (isMobile ? 8 : 14)}px`,
        paddingBottom: "16px",
        paddingLeft: isMobile ? "12px" : "24px",
        paddingRight: isMobile ? "12px" : "24px",
      });

      gsap.set(titleBlockRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        height: "auto",
        marginBottom: isMobile ? 12 : 20,
      });

      if (underlineRef.current) {
        gsap.set(underlineRef.current, { scaleX: 0 });
      }

      // Initial card matches the component's natural max-w-4xl layout perfectly
      gsap.set(chatContainerRef.current, {
        maxWidth: isMobile ? "100%" : "56rem", // max-w-4xl (896px)
        width: "100%",
        height: isMobile ? "clamp(360px, 46vh, 420px)" : "clamp(400px, 48vh, 480px)",
        borderRadius: "20px",
        marginTop: isMobile ? 12 : 20,
      });

      // 2. Master Scrub Timeline: Smooth expansion directly from initial width to 100%
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.4)}`,
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

      // Step B (0.05 -> 0.25): Title block fades out COMPLETELY first before height collapse
      tl.to(
        titleBlockRef.current,
        {
          y: -30,
          opacity: 0,
          scale: 0.96,
          duration: 0.2,
          ease: "power2.inOut",
        },
        0.05,
      );

      // Step C (0.2 -> 0.45): After title is completely faded, smoothly collapse its height
      tl.to(
        titleBlockRef.current,
        {
          height: 0,
          marginBottom: 0,
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.25,
          ease: "power2.inOut",
        },
        0.2,
      );

      // Step D (0.15 -> 0.6): Pin wrapper background darkens and padding goes flush to navbar
      tl.to(
        pinWrapperRef.current,
        {
          backgroundColor: "#0c0b0a",
          paddingTop: `${navbarHeight}px`,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          duration: 0.45,
          ease: "power1.inOut",
        },
        0.15,
      );

      // Step E (0.15 -> 0.75): Chat container expands directly from its initial width to 100% full screen!
      tl.to(
        chatContainerRef.current,
        {
          maxWidth: "100%",
          width: "100%",
          height: "100%",
          marginTop: 0,
          borderRadius: "0px",
          duration: 0.6,
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
        className="relative w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-start transition-colors"
        style={{ boxSizing: "border-box" }}
      >
        {/* Ambient Scorched Ember Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] sm:w-[900px] h-[350px] sm:h-[600px] rounded-full bg-gradient-to-tr from-orange-600/20 via-amber-600/10 to-rose-600/5 blur-3xl opacity-70" />
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

        {/* 1. TITLE BLOCK FOR THE CHAT: Natural Flow Above Chat - No Overlap! */}
        <div
          ref={titleBlockRef}
          className="relative z-10 text-center max-w-3xl mx-auto px-3 shrink-0 will-change-[transform,opacity]"
        >
          {/* Guidance Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-400 shadow-md backdrop-blur-md mb-2 sm:mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-[0.2em] uppercase">
              Why You’re Here
            </span>
          </div>

          {/* Monolithic Bold Headline - Balanced line heights so it never crushes or overlaps */}
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase text-[#0c0b0a] tracking-tight sm:tracking-tighter leading-snug font-sans drop-shadow-sm">
            AI was made to take your jobs. We’re here to keep you from becoming{" "}
            <span className="relative inline-block text-orange-500 will-change-transform drop-shadow-[0_0_24px_rgba(249,115,22,0.35)]">
              <span>outmoded</span>
              <span
                ref={underlineRef}
                className="absolute -bottom-0.5 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 rounded-full origin-left will-change-transform shadow-[0_0_12px_rgba(249,115,22,0.6)]"
              />
            </span>{" "}
            — by using AI to give you the education you deserve.
          </h2>
        </div>

        {/* 2. CHAT CONTAINER: Starts at its natural max-w-4xl width, smoothly expands to 100% full width and height */}
        <div
          ref={chatContainerRef}
          id="patricia-experience"
          className="relative z-20 overflow-hidden shadow-2xl flex flex-col items-center justify-center will-change-[max-width,width,height,border-radius,transform] w-full max-w-4xl"
          style={{
            height: "clamp(380px, 48vh, 480px)",
            borderRadius: "20px",
          }}
        >
          <PatriciaChatExperience />
        </div>
      </div>
    </section>
  );
});
