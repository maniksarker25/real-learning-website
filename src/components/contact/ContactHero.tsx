"use client";

import React from "react";
import { ShieldCheck, Clock, MessageSquare } from "lucide-react";

export function ContactHero() {

  return (
    <section className="relative w-full py-12 bg-[#faf9f6] text-stone-900 overflow-hidden select-none border-b border-stone-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.05] text-stone-950 font-sans">
            Let&apos;s build the future{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
              of practice together.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
            Whether you are piloting workplace simulations for your enterprise, exploring university curriculum integration, or seeking personal career guidance with Patricia our team is ready to assist.
          </p>
        </div>
      </div>
    </section>
  );
}
