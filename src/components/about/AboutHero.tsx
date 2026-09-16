"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Target, Activity, ShieldCheck } from "lucide-react";

export function AboutHero() {
  const capabilities = [
    {
      icon: Target,
      tag: "SIMULATION ENGINE",
      title: "Targeted Scenarios",
      subtitle: "Replicating authentic workplace dilemmas and leadership challenges.",
      bg: "bg-orange-50/60 border-orange-200/70 text-orange-950",
      accent: "text-orange-600 bg-orange-100/80",
    },
    {
      icon: Compass,
      tag: "PATRICIA GPS",
      title: "Live AI Navigation",
      subtitle: "Pinpointing where you are and clarifying your immediate next step.",
      bg: "bg-amber-50/60 border-amber-200/70 text-amber-950",
      accent: "text-amber-600 bg-amber-100/80",
    },
    {
      icon: Activity,
      tag: "DIAGNOSTICS",
      title: "Actionable Telemetry",
      subtitle: "In-depth insights into conversational tone, empathy, and decision agility.",
      bg: "bg-stone-50 border-stone-200/80 text-stone-900",
      accent: "text-stone-700 bg-stone-200/70",
    },
    {
      icon: ShieldCheck,
      tag: "LEARNING SANDBOX",
      title: "Zero-Risk Environment",
      subtitle: "A safe, confidential space to practice without real-world stakes.",
      bg: "bg-emerald-50/60 border-emerald-200/70 text-emerald-950",
      accent: "text-emerald-700 bg-emerald-100/80",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#faf9f6] text-stone-900 pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-stone-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.08] text-stone-950 font-sans">
            Practice real careers{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
              before day one.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-stone-600 font-normal leading-relaxed max-w-xl">
            High-fidelity workplace simulations guided by Patricia, your personal AI Life GPS.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 transition-colors border border-stone-900 cursor-pointer"
            >
              <span>Explore Simulations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#patricia-experience"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-orange-50 text-stone-800 font-semibold text-sm border border-stone-300 transition-colors cursor-pointer"
            >
              <span>Talk with Patricia</span>
            </Link>
          </div>
        </div>

        {/* Hero Visual Showcase */}
        <div className="relative mt-14 sm:mt-18 rounded-3xl overflow-hidden border border-stone-200 bg-white p-2 sm:p-3">
          <div className="relative h-[360px] sm:h-[480px] md:h-[540px] w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/about-agency-hero.jpg"
              alt="Real Learning Innovation Studio"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

            {/* Floating Highlight Cards */}
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 flex flex-wrap items-center justify-between gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 max-w-sm text-stone-900">
                <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-wider block mb-0.5">
                  DELIBERATE PRACTICE
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-950">
                  Zero Theoretical Guesswork
                </h4>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Step straight into authentic workplace scenarios with immediate feedback.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 max-w-sm text-stone-900">
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block mb-0.5">
                  RISK-FREE REPS
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-stone-950">
                  Psychologically Safe Sandbox
                </h4>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Practice high-friction situations before facing them in real life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Capability Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-10">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border ${cap.bg} transition-colors flex flex-col justify-between space-y-4`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                      {cap.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-stone-950">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {cap.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}