"use client";

import React from "react";

export function AboutValues() {
  const values = [
    {
      number: "01",
      title: "Practice Over Theory",
      description:
        "Reading about a crisis isn't the same as resolving one. We prioritize active interactive decision-making over passive content consumption.",
      badge: "Core Foundation",
      cardStyle: "bg-orange-50/50 border-orange-200/70 hover:border-orange-300",
      numColor: "text-orange-600",
      badgeStyle: "bg-orange-100 text-orange-800 border-orange-200",
    },
    {
      number: "02",
      title: "The 5-Minute Micro-Rep",
      description:
        "High-density learning in digestible 5-minute sprints. Daily simulated practice builds unstoppable conversational and analytical muscle memory.",
      badge: "High Velocity",
      cardStyle: "bg-amber-50/50 border-amber-200/70 hover:border-amber-300",
      numColor: "text-amber-600",
      badgeStyle: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      number: "03",
      title: "Psychological Safety First",
      description:
        "You cannot learn if you are afraid of failing. Our sandbox gives learners a confidential, non-judgmental environment to experiment and grow.",
      badge: "Safe Space",
      cardStyle: "bg-emerald-50/50 border-emerald-200/70 hover:border-emerald-300",
      numColor: "text-emerald-700",
      badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      number: "04",
      title: "AI Life GPS Navigation",
      description:
        "Patricia doesn't give vague generalities. She pinpoints where you are, where you want to go, and maps your immediate next best actionable step.",
      badge: "Patricia Engine",
      cardStyle: "bg-rose-50/50 border-rose-200/70 hover:border-rose-300",
      numColor: "text-rose-600",
      badgeStyle: "bg-rose-100 text-rose-800 border-rose-200",
    },
    {
      number: "05",
      title: "Real Workplace Fidelity",
      description:
        "Our scenario engine replicates actual customer friction, technical escalations, executive negotiations, and leadership dilemmas.",
      badge: "Fidelity",
      cardStyle: "bg-sky-50/50 border-sky-200/70 hover:border-sky-300",
      numColor: "text-sky-700",
      badgeStyle: "bg-sky-100 text-sky-800 border-sky-200",
    },
    {
      number: "06",
      title: "Actionable Skill Metrics",
      description:
        "Objective, granular telemetry on empathy, problem resolution, clarity, and pacing. Real growth is measurable growth.",
      badge: "Telemetry",
      cardStyle: "bg-purple-50/50 border-purple-200/70 hover:border-purple-300",
      numColor: "text-purple-700",
      badgeStyle: "bg-purple-100 text-purple-800 border-purple-200",
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-stone-900 overflow-hidden border-b border-stone-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-mono text-orange-900">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="font-semibold uppercase">OUR CORE PILLARS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-[1.15] text-stone-950">
            The principles that guide{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
              our platform architecture.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-xl">
            Everything we build is engineered around one core objective: ensuring you are 100% prepared when it matters most.
          </p>
        </div>

        {/* Bento Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((v) => {
            return (
              <div
                key={v.number}
                className={`relative rounded-3xl p-7 sm:p-8 border transition-colors flex flex-col justify-between ${v.cardStyle}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-2xl font-mono font-extrabold tracking-tighter ${v.numColor}`}>
                      {v.number}
                    </span>
                    <span className={`text-[10px] font-mono font-semibold uppercase px-2.5 py-1 rounded-full border ${v.badgeStyle}`}>
                      {v.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-stone-950 mb-2.5 tracking-tight">
                    {v.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {v.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-[10px] font-mono uppercase text-stone-500">
                  <span>Real Learning Standard</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
