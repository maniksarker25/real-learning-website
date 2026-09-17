"use client";

import React from "react";
import { Headphones, Laptop, Network, HeartHandshake } from "lucide-react";

export function CareerTrackVisual() {
  return (
    <div className="relative w-full h-full flex-1 min-h-[260px] sm:min-h-[300px] rounded-2xl overflow-hidden shadow-inner flex flex-col justify-between p-3.5 sm:p-7">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/step-career.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30" />

      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-mono text-white/90 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Tracks
        </span>
        <span className="text-[9px] sm:text-[10px] font-mono text-white/70">
          4 Specialized Paths
        </span>
      </div>

      <div className="relative z-10 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
          {[
            { label: "Customer Service & Comms", icon: Headphones },
            { label: "Tech & Data Support", icon: Laptop },
            { label: "IT & Systems Specialist", icon: Network },
            { label: "Healthcare Patient Care", icon: HeartHandshake },
          ].map((track, tIdx) => (
            <div
              key={tIdx}
              className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-white/95 shadow-sm hover:border-orange-400/50 transition-colors"
            >
              <track.icon className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="truncate">{track.label}</span>
            </div>
          ))}
        </div>

        <p className="text-[10px] sm:text-[11px] text-white/70 leading-relaxed pt-0.5 font-medium">
          Choose the pathway that matches your natural instincts, communication
          style, and target income.
        </p>
      </div>
    </div>
  );
}
