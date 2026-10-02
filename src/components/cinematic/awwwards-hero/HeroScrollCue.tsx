import React, { memo } from "react";

interface HeroScrollCueProps {
  scrollCueRef: React.RefObject<HTMLDivElement | null>;
  circleProgressRef: React.RefObject<SVGCircleElement | null>;
  onScrollToHero: () => void;
}

export const HeroScrollCue = memo(function HeroScrollCue({
  scrollCueRef,
  circleProgressRef,
  onScrollToHero,
}: HeroScrollCueProps) {
  return (
    <div
      ref={scrollCueRef}
      onClick={onScrollToHero}
      className="absolute top-[calc(100dvh-5rem)] sm:top-[calc(100dvh-6rem)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-2.5 cursor-pointer group z-20 select-none"
      role="button"
      aria-label="Scroll to hero section"
    >
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center">
        <svg
          className="w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-[#141210]/20"
          />
          <circle
            ref={circleProgressRef}
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="#ea580c"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-[#141210] group-hover:text-orange-600 transition-colors">
          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:translate-y-0.5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <span className="text-xs sm:text-sm font-extrabold sm:font-black tracking-[0.28em] sm:tracking-[0.36em] uppercase font-sans text-[#141210] group-hover:text-orange-600 transition-colors antialiased">
        Scroll
      </span>
    </div>
  );
});
