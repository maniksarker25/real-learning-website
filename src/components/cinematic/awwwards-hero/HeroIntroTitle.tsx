import React, { memo } from "react";

interface HeroIntroTitleProps {
  scorchedTextRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const HeroIntroTitle = memo(function HeroIntroTitle({
  scorchedTextRef,
  className,
}: HeroIntroTitleProps) {
  return (
    <div
      ref={scorchedTextRef}
      className={
        className ??
        "absolute bottom-[98px] sm:bottom-[118px] md:bottom-[124px] left-1/2 -translate-x-1/2 text-center will-change-transform pointer-events-none z-20 px-4 w-auto flex items-center justify-center gap-2 sm:gap-3"
      }
    >
      <span className="w-5 sm:w-8 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-orange-400/80" />
      <h2 className="text-[10px] sm:text-xs md:text-sm font-sans tracking-[0.32em] sm:tracking-[0.42em] md:tracking-[0.48em] uppercase text-white/85 font-extrabold sm:font-black whitespace-nowrap [text-shadow:0_2px_16px_rgba(0,0,0,0.85)] antialiased">
        Scorched Souls Presents
      </h2>
      <span className="w-5 sm:w-8 h-px bg-gradient-to-l from-transparent via-orange-500/50 to-orange-400/80" />
    </div>
  );
});
