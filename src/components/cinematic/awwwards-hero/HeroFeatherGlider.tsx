import React, { memo } from "react";
import Image from "next/image";

interface HeroFeatherGliderProps {
  featherWrapperRef: React.RefObject<HTMLDivElement | null>;
  featherFloatRef: React.RefObject<HTMLDivElement | null>;
  featherImgRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroFeatherGlider = memo(function HeroFeatherGlider({
  featherWrapperRef,
  featherFloatRef,
  featherImgRef,
}: HeroFeatherGliderProps) {
  return (
    <div
      ref={featherWrapperRef}
      className="relative flex flex-col items-start mb-2 sm:mb-3 pointer-events-auto"
    >
      <div
        ref={featherFloatRef}
        className="will-change-transform flex items-center justify-start"
      >
        <div
          ref={featherImgRef}
          className="relative w-14 sm:w-16 md:w-20 lg:w-22 aspect-[627/410] flex items-center justify-center will-change-transform cursor-pointer"
        >
          <Image
            src="/feathers.png"
            alt="Real Learning Feather"
            width={627}
            height={410}
            priority
            className="w-full h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(20,15,10,0.18)] select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
});
