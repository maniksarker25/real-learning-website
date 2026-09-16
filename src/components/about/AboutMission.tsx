"use client";

import React from "react";
import Image from "next/image";

export function AboutMission() {
  const outdatedPoints = [
    "Relying on multiple-choice quizzes that test memorization, not capability.",
    "Reading static PDF textbooks that fail to mirror high-stakes workplace pressure.",
    "Navigating vague, generic career quizzes that don't tell you your next best step.",
    "Experiencing stage fright and costly mistakes in real interviews or client calls.",
  ];

  const modernPoints = [
    "5-minute interactive scenario simulations replicating realistic workplace dynamics.",
    "Personalized direction mapped by Patricia, your dedicated AI Life GPS.",
    "Instant, non-judgmental feedback analyzing tone, empathy, and problem resolution.",
    "Zero-risk practice sandbox where failure is simply actionable feedback.",
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#faf9f6] text-stone-900 overflow-hidden select-none border-b border-stone-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-2xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-mono text-stone-800">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span className="font-semibold uppercase">THE REAL LEARNING MANIFESTO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-stone-950 leading-[1.1]">
              Why traditional learning{" "}
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
                no longer works.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-stone-600 text-sm sm:text-base font-normal leading-relaxed">
            The workplace demands instant adaptability. Theoretical regurgitation is obsolete. The only way to build true capability is through deliberate, low-stakes experiential simulation.
          </p>
        </div>

        {/* Split Contrast Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Outdated Way */}
          <div className="rounded-3xl p-8 sm:p-10 bg-rose-50/40 border border-rose-200/80 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-100/80 px-3 py-1 rounded-full border border-rose-300">
                  The Outdated Way
                </span>
                <span className="text-[10px] font-mono text-rose-500 uppercase font-semibold">
                  01 / LEGACY
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                Static courses, guesswork, and high anxiety.
              </h3>

              <ul className="space-y-4 pt-2">
                {outdatedPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-rose-200/60 flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>Legacy Paradigm</span>
              <span className="text-rose-600 font-bold">Minimal Practical Retention</span>
            </div>
          </div>

          {/* The Real Learning Way */}
          <div className="rounded-3xl p-8 sm:p-10 bg-white border border-emerald-300/80 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  The Real Learning Standard
                </span>
                <span className="text-[10px] font-mono text-emerald-700 uppercase font-semibold">
                  02 / STANDARD
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-stone-950">
                Live simulated practice, instant AI feedback, and clarity.
              </h3>

              <ul className="space-y-4 pt-2">
                {modernPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>Experiential Paradigm</span>
              <span className="text-emerald-700 font-bold">Maximum Behavioral Retention</span>
            </div>
          </div>
        </div>

        {/* Studio Image Banner */}
        <div className="relative mt-12 sm:mt-16 rounded-3xl overflow-hidden border border-stone-200 bg-white p-2">
          <div className="relative h-[260px] sm:h-[380px] w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/about-lab-studio.jpg"
              alt="Real Learning Innovation Lab"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-transparent flex items-center p-8 sm:p-14">
              <div className="max-w-lg space-y-3 text-white">
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                  RESEARCH & SCENARIO LABS
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight">
                  Engineered with behavioral psychologists and industry executives.
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Every simulation is calibrated to trigger realistic cognitive patterns and measure real-time response accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
