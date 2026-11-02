"use client";

import React, { memo } from "react";
import {
  useGsapAwwwardsAnimation,
  HeroScrollCue,
  HeroIntroTitle,
  HeroMainContent,
  HeroVideoBackground,
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
    videoLayerRef,
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
      className="relative w-full bg-[#0a0d14] select-none"
    >
      {/* Pinned viewport container; the video fills it edge to edge. */}
      <div
        ref={pinSectionRef}
        className="relative min-h-[72dvh] md:min-h-[78dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0d14] pt-24 sm:pt-28 pb-20 sm:pb-24"
      >
        {/* Cinematic video backdrop + legibility scrims */}
        <HeroVideoBackground videoLayerRef={videoLayerRef} />

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
          onBeginJourney={handleScrollToHero}
        />
      </div>
    </div>
  );
});
