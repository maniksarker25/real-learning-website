"use client";

import React, { memo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroVideoShowcase } from "./HeroVideoShowcase";

export const GsapAwwwardsHero = memo(function GsapAwwwardsHero() {
  return (
    <section
      className="relative w-full bg-black text-white px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 select-none"
    >
      {/* Soft orange ambient light across the whole hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 72%, rgba(234,88,12,0.32) 0%, rgba(249,115,22,0.16) 35%, rgba(124,45,18,0.07) 60%, transparent 80%), radial-gradient(ellipse 60% 40% at 50% 15%, rgba(251,146,60,0.09) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 35% at 50% 62%, rgba(249,115,22,0.14) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 8% 22%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 18% 58%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 27% 38%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 39% 12%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 52% 44%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 61% 8%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 72% 30%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 84% 52%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 93% 18%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 4% 82%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 96% 76%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 12% 94%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 88% 92%, #fff 50%, transparent 51%)",
          }}
        />
        {/* Fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full flex flex-col items-start text-left">
        {/* Large Bold Left-Aligned Headline matching reference layout */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[74px] font-semibold tracking-[-0.035em] text-white leading-[1.06] sm:leading-[1.08] max-w-4xl text-left antialiased">
          Real Learning for humans <br className="hidden sm:inline" />
          and AI agents
        </h1>

        {/* Clean Subtitle Paragraph */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-[17px] text-zinc-400 font-normal leading-relaxed max-w-2xl text-left antialiased">
          Practice high-stakes workplace situations, talk with Patricia, and
          master your career so you never become outmoded.
        </p>

        {/* Bottom Split Action Row */}
        <div className="mt-10 sm:mt-12 md:mt-14 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
          {/* Left Group: Primary Pill Button & Connected Platform Badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {/* White Rounded CTA Button */}
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-black font-medium text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
            >
              Get started for free
            </Link>

            {/* Secondary action: try the product without signing up */}
            <Link
              href="/demo"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-300 hover:text-white font-medium transition-colors"
            >
              Try the demo
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Group: Announcement Pill / Feature Link */}
          <Link
            href="/demo"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span className="font-semibold text-white">New:</span>
            <span>Real-time chat simulations with Patricia</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      <HeroVideoShowcase src="/hero.mp4" />
    </section>
  );
});

export default GsapAwwwardsHero;
