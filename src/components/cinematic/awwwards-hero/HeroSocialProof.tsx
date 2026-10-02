import React, { memo } from "react";
import Image from "next/image";

const TRUSTED_AVATARS = [
  { src: "/images/avatars/avatar-1.jpg", alt: "Executive Leader" },
  { src: "/images/avatars/avatar-2.jpg", alt: "Tech Specialist" },
  { src: "/images/avatars/avatar-3.jpg", alt: "Product Manager" },
  { src: "/images/avatars/avatar-4.jpg", alt: "Business Lead" },
];

interface HeroSocialProofProps {
  socialProofRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroSocialProof = memo(function HeroSocialProof({
  socialProofRef,
}: HeroSocialProofProps) {
  return (
    <div
      ref={socialProofRef}
      style={{ opacity: 0, visibility: "hidden" }}
      className="opacity-0 flex flex-col items-start md:items-end shrink-0 will-change-transform self-start md:self-end"
    >
      {/* Overlapping rounded squircle avatars */}
      <div className="flex items-center -space-x-3 sm:-space-x-3.5">
        {TRUSTED_AVATARS.map((avatar, idx) => (
          <div
            key={idx}
            className="relative w-11 h-12 sm:w-12 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden border-[2.5px] border-white shadow-sm ring-1 ring-slate-900/10 bg-slate-200 shrink-0 transform transition-transform duration-200 cursor-pointer"
          >
            <Image
              src={avatar.src}
              alt={avatar.alt}
              fill
              sizes="64px"
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>

      {/* Stars & Rating */}
      <div className="mt-1 flex items-center justify-start md:justify-end gap-1.5 text-slate-900">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 stroke-amber-500"
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
        <span className="text-xs sm:text-sm font-extrabold font-sans text-slate-900 tracking-tight">
          / 5.0
        </span>
      </div>
    </div>
  );
});
