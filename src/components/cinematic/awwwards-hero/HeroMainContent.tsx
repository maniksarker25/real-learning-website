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
}

export const HeroMainContent = memo(function HeroMainContent({
  realLearningSectionRef,
  featherWrapperRef,
  featherFloatRef,
  featherImgRef,
  headlineRef,
  subtitleRef,
  socialProofRef,
}: HeroMainContentProps) {
  return (
    <div
      ref={realLearningSectionRef}
      id="real-learning-intro"
      className="relative z-10 flex flex-col items-stretch px-4 sm:px-6 md:px-8 max-w-7xl mx-auto will-change-transform pointer-events-auto w-full py-1 sm:py-2"
    >
      {/* Resizable gliding feather */}
      <HeroFeatherGlider
        featherWrapperRef={featherWrapperRef}
        featherFloatRef={featherFloatRef}
        featherImgRef={featherImgRef}
      />

      {/* Headline */}
      <h1
        ref={headlineRef}
        style={{ opacity: 0, visibility: "hidden" }}
        className="opacity-0 text-3xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[78px] font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.05] sm:leading-[1.0] font-sans will-change-transform text-left"
      >
        Real Learning for <br className="hidden sm:inline" />
        humans and AI agents
      </h1>

      {/* Description Paragraph & Social Proof Row */}
      <div className="w-full mt-6 sm:mt-8 md:mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-10">
        <p
          ref={subtitleRef}
          style={{ opacity: 0, visibility: "hidden" }}
          className="opacity-0 text-sm sm:text-base md:text-[17px] text-slate-600 font-normal max-w-lg md:max-w-xl leading-relaxed will-change-transform text-left"
        >
          Real Learning gives you the education you deserve so you never become
          outmoded. Practice high-stakes workplace situations, talk with
          Patricia, and master your career.
        </p>

        <HeroSocialProof socialProofRef={socialProofRef} />
      </div>
    </div>
  );
});
