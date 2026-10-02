"use client";

import React, { memo } from "react";
import {
  useGsapAwwwardsAnimation,
  HeroScrollCue,
  HeroIntroTitle,
  HeroMainContent,
} from "./awwwards-hero";

export const GsapAwwwardsHero = memo(function GsapAwwwardsHero() {
  const {
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
  } = useGsapAwwwardsAnimation();

  return (
    <div
      ref={containerRef}
      id="hero-top"
      className="relative w-full bg-[#fdceb2] select-none"
    >
      {/* Pinned Viewport Container with top padding for navbar clearance */}
      <div
        ref={pinSectionRef}
        className="relative min-h-[70dvh] w-full flex flex-col items-center justify-start bg-[#fdceb2] pt-14 sm:pt-16 md:pt-18 pb-12 sm:pb-16"
      >
        {/* Graph paper grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
            backgroundSize: "clamp(24px, 4vw, 36px) clamp(24px, 4vw, 36px)",
          }}
        />

        {/* Floating "SCORCHED SOULS PRESENTS" Title */}
        <HeroIntroTitle scorchedTextRef={scorchedTextRef} />

        {/* Minimal Scroll Prompt with 2s Circular Auto-Scroll Progress */}
        <HeroScrollCue
          scrollCueRef={scrollCueRef}
          circleProgressRef={circleProgressRef}
          onScrollToHero={handleScrollToHero}
        />

        {/* Main Hero Content & Gliding Feather */}
        <HeroMainContent
          realLearningSectionRef={realLearningSectionRef}
          featherWrapperRef={featherWrapperRef}
          featherFloatRef={featherFloatRef}
          featherImgRef={featherImgRef}
          headlineRef={headlineRef}
          subtitleRef={subtitleRef}
          socialProofRef={socialProofRef}
        />
      </div>
    </div>
  );
});
