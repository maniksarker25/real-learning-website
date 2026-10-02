"use client";

import React, { memo } from "react";
import { PatriciaChatExperience } from "@/components/patricia/PatriciaChatExperience";
import { useWhyYouAreHereAnimation } from "./useWhyYouAreHereAnimation";

export const WhyYouAreHereSection = memo(function WhyYouAreHereSection() {
  const {
    containerRef,
    pinWrapperRef,
    titleBlockRef,
    titleInnerRef,
    underlineRef,
    chatContainerRef,
  } = useWhyYouAreHereAnimation();

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

        {/* Section Headline Block */}
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

            {/* Responsive Bold Headline */}
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

        {/* Chat Experience Container */}
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
