"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function AboutStory() {
  const milestones = [
    {
      year: "PHASE 1",
      tag: "ORIGIN",
      title: "The Problem Identified & Northstar Labs Inception",
      description:
        "Frustrated by standard e-learning platforms where learners memorized quiz answers without developing real-world confidence, our founding team set out to construct high-fidelity interactive simulation environments.",
      stats: "Initial prototype validated across real-world cohort workflows.",
    },
    {
      year: "PHASE 2",
      tag: "AI LIFE GPS",
      title: "Patricia Dialog & Navigation Engine",
      description:
        "Introduced Patricia, the AI Life GPS engineered to eliminate career ambiguity. Rather than overwhelming users with long assessments, Patricia maps actionable 3-step navigation in minutes.",
      stats: "Consistently delivering immediate clarity and direct next-step roadmaps.",
    },
    {
      year: "PHASE 3",
      tag: "SIM ENGINE 2.0",
      title: "Real-Time Telemetry & Behavioral Scoring",
      description:
        "Upgraded our simulation architecture to provide millisecond-accurate feedback on empathy, conversational pacing, technical accuracy, and conflict de-escalation.",
      stats: "Comprehensive workplace scenarios spanning high-friction career tracks.",
    },
    {
      year: "PHASE 4",
      tag: "GLOBAL IMPACT",
      title: "Enterprise & Institutional Ecosystem",
      description:
        "Empowering universities, workforce accelerators, and forward-thinking enterprises to measure genuine student and employee readiness with verified capability index scores.",
      stats: "Interactive simulation reps completed across global learning teams.",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#faf9f6] text-stone-900 overflow-hidden select-none border-b border-stone-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-2xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-mono text-stone-800">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span className="font-semibold uppercase">THE TIMELINE & EVOLUTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-stone-950 leading-[1.1]">
              How we built the{" "}
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
                future of practice.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-stone-600 text-sm sm:text-base font-normal leading-relaxed">
            From experimental behavioral AI sandboxes to a platform preparing learners and teams for high-impact workplace execution.
          </p>
        </div>

        {/* Interactive Timeline Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Milestone Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {milestones.map((m, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-colors cursor-pointer border flex items-center justify-between group ${
                    isActive
                      ? "bg-white text-stone-950 border-orange-400"
                      : "bg-white/60 hover:bg-white hover:border-stone-300 text-stone-700 border-stone-200/80"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isActive
                            ? "bg-orange-100 text-orange-800 border border-orange-200"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {m.year}
                      </span>
                      <span
                        className={`text-[10px] font-mono tracking-wider font-semibold uppercase ${
                          isActive ? "text-orange-700" : "text-stone-500"
                        }`}
                      >
                        {m.tag}
                      </span>
                    </div>
                    <h4
                      className={`text-sm sm:text-base font-bold tracking-tight ${
                        isActive ? "text-stone-950" : "text-stone-800 group-hover:text-orange-600"
                      }`}
                    >
                      {m.title}
                    </h4>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-orange-600" : "text-stone-400 group-hover:text-stone-700"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Milestone Deep Dive Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-8 sm:p-12 bg-white text-stone-900 border border-stone-200 relative">
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-orange-800 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                    {milestones[activeTab].tag} · {milestones[activeTab].year}
                  </span>
                  <span className="text-xs font-mono text-stone-500 font-medium">
                    0{activeTab + 1} / 04
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-stone-950 leading-tight">
                  {milestones[activeTab].title}
                </h3>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                  {milestones[activeTab].description}
                </p>

                <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-orange-100 text-orange-700 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-orange-800 font-bold uppercase tracking-wider block">
                      Validated Milestone
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-stone-800">
                      {milestones[activeTab].stats}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
