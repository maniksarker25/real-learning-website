import React, { memo } from "react";

interface HeroIntroTitleProps {
  scorchedTextRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroIntroTitle = memo(function HeroIntroTitle({
  scorchedTextRef,
}: HeroIntroTitleProps) {
  return (
    <div
      ref={scorchedTextRef}
      className="absolute left-1/2 -translate-x-1/2 text-center will-change-transform pointer-events-none z-20 px-4 w-full max-w-xl mx-auto"
    >
      <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-sans tracking-[0.32em] sm:tracking-[0.45em] md:tracking-[0.52em] uppercase text-[#141210] font-extrabold sm:font-black whitespace-nowrap drop-shadow-xs antialiased">
        Scorched Souls Presents
      </h2>
    </div>
  );
});
