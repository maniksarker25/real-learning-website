import React, { memo } from "react";
import { HeroFeatherGlider } from "./HeroFeatherGlider";
import { HeroSocialProof } from "./HeroSocialProof";

interface HeroMainContentProps {
  realLearningSectionRef: React.RefObject<HTMLDivElement | null>;
  featherWrapperRef: React.RefObject<HTMLDivElement | null>;
  featherFloatRef: React.RefObject<HTMLDivElement | null>;
  featherImgRef: React.RefObject<HTMLDivElement | null>;
  headlineRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  socialProofRef: React.RefObject<HTMLDivElement | null>;
  onBeginJourney: () => void;
}

export const HeroMainContent = memo(function HeroMainContent({
  realLearningSectionRef,
  featherWrapperRef,
  featherFloatRef,
  featherImgRef,
  headlineRef,
  subtitleRef,
  socialProofRef,
  onBeginJourney,
}: HeroMainContentProps) {
  return (
    <div
      ref={realLearningSectionRef}
      id="real-learning-intro"
      className="relative z-10 flex w-full max-w-7xl mx-auto flex-col items-start px-5 sm:px-6 md:px-8 lg:px-12 text-left will-change-transform pointer-events-auto"
    >
      {/* Resizable gliding feather */}
      <HeroFeatherGlider
        featherWrapperRef={featherWrapperRef}
        featherFloatRef={featherFloatRef}
        featherImgRef={featherImgRef}
      />

      {/* Headline — heavy, tight, maximum contrast against the footage */}
      <h1
        ref={headlineRef}
        className="font-sans font-extrabold text-white tracking-[-0.035em] leading-[0.95] max-w-4xl text-left text-[clamp(2.5rem,7vw,5.5rem)] [text-shadow:0_4px_32px_rgba(0,0,0,0.75),0_1px_4px_rgba(0,0,0,0.6)] will-change-transform"
      >
        Real Learning for
        <br className="hidden sm:inline" /> humans and AI agents
      </h1>

      {/* Supporting copy */}
      <p
        ref={subtitleRef}
        className="mt-6 sm:mt-7 max-w-xl text-pretty text-sm sm:text-base md:text-[17px] font-medium leading-relaxed text-white/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.8)] will-change-transform text-left"
      >
        Practice high-stakes workplace situations, talk with Patricia, and
        master your career — so you never become outmoded.
      </p>

      {/* Call to action + social proof */}
      <div
        ref={socialProofRef}
        className="mt-9 sm:mt-11 flex flex-col sm:flex-row sm:items-center items-start gap-7 sm:gap-10 will-change-transform"
      >
        <button
          type="button"
          onClick={onBeginJourney}
          className="group inline-flex items-center gap-2.5 cursor-pointer rounded-full bg-white px-7 py-3.5 sm:px-9 sm:py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-[0.12em] text-slate-950 shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out hover:bg-orange-500 hover:text-white hover:shadow-[0_12px_40px_rgba(234,88,12,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Begin Journey
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12h16m0 0l-6-6m6 6l-6 6"
            />
          </svg>
        </button>

        <HeroSocialProof />
      </div>
    </div>
  );
});
