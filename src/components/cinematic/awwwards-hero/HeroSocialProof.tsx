import React, { memo } from "react";
import Image from "next/image";

const TRUSTED_AVATARS = [
  { src: "/images/avatars/avatar-1.jpg", alt: "Executive Leader" },
  { src: "/images/avatars/avatar-2.jpg", alt: "Tech Specialist" },
  { src: "/images/avatars/avatar-3.jpg", alt: "Product Manager" },
  { src: "/images/avatars/avatar-4.jpg", alt: "Business Lead" },
];

export const HeroSocialProof = memo(function HeroSocialProof() {
  return (
    <div className="flex flex-col items-start">
      {/* Overlapping rounded squircle avatars */}
      <div className="flex items-center -space-x-3 sm:-space-x-3.5">
        {TRUSTED_AVATARS.map((avatar, idx) => (
          <div
            key={idx}
            className="relative w-9 h-10 sm:w-10 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden border-2 border-white/80 shadow-lg shadow-black/30 bg-slate-200 shrink-0"
          >
            <Image
              src={avatar.src}
              alt={avatar.alt}
              fill
              sizes="48px"
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>

      {/* Stars & Rating */}
      <div className="mt-2 flex items-center justify-start gap-1.5">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-300 stroke-amber-200"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          ))}
        </div>
        <span className="text-[11px] sm:text-xs font-semibold font-sans text-white/90 tracking-tight [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          / 5.0
        </span>
      </div>
    </div>
  );
});
