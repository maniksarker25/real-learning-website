"use client";

import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SHOWCASE_STEPS, StepShowcaseCard } from "./learning-steps";

export default memo(function HowRealLearningWorks() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const nextIdx = Math.max(0, Math.min(SHOWCASE_STEPS.length - 1, index));
    setActiveIndex(nextIdx);

    const container = scrollContainerRef.current;
    if (container) {
      const firstChild = container.firstElementChild as HTMLElement | null;
      const targetCard = container.children[nextIdx] as HTMLElement | null;
      if (firstChild && targetCard) {
        const baseOffset = firstChild.offsetLeft;
        const targetScroll = targetCard.offsetLeft - baseOffset;

        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: "smooth",
        });
      }
    }
  };

  const handleNext = () => scrollToIndex(activeIndex + 1);
  const handlePrev = () => scrollToIndex(activeIndex - 1);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const firstChild = container.firstElementChild as HTMLElement | null;
        const baseOffset = firstChild ? firstChild.offsetLeft : 0;
        const children = Array.from(container.children) as HTMLElement[];
        let closestIdx = 0;
        let minDiff = Infinity;

        children.forEach((child, i) => {
          const childScrollPos = child.offsetLeft - baseOffset;
          const diff = Math.abs(childScrollPos - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });

        setActiveIndex(closestIdx);
      }, 60);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full py-12 sm:py-20 lg:py-28 bg-orange-50 text-white overflow-hidden select-none border-t border-white/[0.08]">
      {/* Precision Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.18) 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-14">
          <div className="max-w-2xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] sm:text-xs font-mono text-orange-400">
              <span>HOW REAL LEARNING WORKS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-black leading-[1.15] uppercase">
              Learn by{" "}
              <span className="border-b-4 border-dashed border-orange-400 text-gray-900">
                Doing.
              </span>
            </h2>

            <p className="text-xs sm:text-base text-gray-900/60 font-medium leading-relaxed max-w-xl">
              Build verifiable workplace skills through realistic scenarios,
              adaptive AI dialogues, and real-time coaching feedback.
            </p>
          </div>

          {/* Navigation Controls: Tabs and Previous/Next Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-black/[0.04] border border-white/10 max-w-full overflow-x-auto no-scrollbar">
              {SHOWCASE_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => scrollToIndex(idx)}
                  className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                    activeIndex === idx
                      ? "bg-black text-white font-bold"
                      : "text-black/80 hover:text-black"
                  }`}
                >
                  <span className="font-mono">{step.stepNumber}</span>
                  <span className="hidden sm:inline">{step.shortLabel}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-black/70 hover:text-black hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-white/5 cursor-pointer transition-all"
                title="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex === SHOWCASE_STEPS.length - 1}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-black/70 hover:text-black hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-white/5 cursor-pointer transition-all"
                title="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-2 no-scrollbar px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {SHOWCASE_STEPS.map((step, index) => (
            <StepShowcaseCard
              key={step.id}
              step={step}
              isCurrent={activeIndex === index}
              onSelect={() => scrollToIndex(index)}
            />
          ))}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-2.5 pt-4">
          {SHOWCASE_STEPS.map((step, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center text-[10px] font-mono ${
                  isCurrent
                    ? "w-8 h-2.5 bg-black text-black font-bold shadow-md"
                    : "w-2.5 h-2.5 bg-black/20 hover:bg-black/50"
                }`}
                title={`Jump to step ${idx + 1}`}
                aria-label={`Slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
});
