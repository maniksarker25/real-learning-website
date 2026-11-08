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
      className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 text-center will-change-transform pointer-events-none z-20 px-4 w-full max-w-xl mx-auto"
    >
      <h2 className="text-[10px] sm:text-xs md:text-sm font-sans tracking-[0.32em] sm:tracking-[0.45em] md:tracking-[0.52em] uppercase text-white/85 font-extrabold sm:font-black whitespace-nowrap [text-shadow:0_2px_16px_rgba(0,0,0,0.8)] antialiased">
        Scorched Souls Presents
      </h2>
    </div>
  );
});
