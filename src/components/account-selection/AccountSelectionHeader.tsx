"use client";

import React, { memo } from "react";
import { Zap } from "lucide-react";

export const AccountSelectionHeader = memo(function AccountSelectionHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4">
      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 backdrop-blur text-xs text-orange-300 font-medium">
        <Zap className="h-3.5 w-3.5 text-orange-400" />
        <span>START WHERE YOU ARE</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white uppercase font-sans">
        Start where{" "}
        <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
          you are.
        </span>
      </h1>

      {/* Supporting Copy */}
      <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-xl mx-auto">
        Choose how you want to use Real Learning. Whether you are building skills independently or launching a learning program for your organization.
      </p>
    </div>
  );
});
