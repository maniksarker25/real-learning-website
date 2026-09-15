"use client";

import React from "react";
import Image from "next/image";

export function PractitionerPhotoCard() {
  return (
    <div className="w-full hidden lg:flex  lg:w-[260px] h-[240px] max-h-[240px] shrink-0 relative rounded-[50px] bg-[#121318] text-white border border-white/10 shadow-2xl overflow-hidden flex-col justify-between">
      <Image
        src="/images/teck.jpg"
        alt="Support Specialist"
        width={500}
        height={500}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
