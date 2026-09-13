"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  MapPin,
  Target,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Headphones,
  Laptop,
  CheckCircle2,
} from "lucide-react";
import { LifeGPSState } from "./patriciaDialogEngine";

interface LifeGPSWidgetProps {
  gpsState: LifeGPSState;
  onActionClick?: () => void;
  className?: string;
}

export const LifeGPSWidget = memo(function LifeGPSWidget({
  gpsState,
  onActionClick,
  className,
}: LifeGPSWidgetProps) {
  // Determine relevant career track from GPS state to connect with project tracks
  const isTech =
    gpsState.whereYouWantToGo.toLowerCase().includes("data") ||
    gpsState.whereYouWantToGo.toLowerCase().includes("tech") ||
    gpsState.whereYouWantToGo.toLowerCase().includes("system");

  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-[#0d0d14]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between ${
        className || "h-full"
      }`}
    >
      {/* Subtle background ambient gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar - Exactly matching Patricia Chat Header height and styling */}
      <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-rose-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center text-orange-400">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-sans uppercase tracking-wide">
                YOUR LIFE GPS
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-white/50">
              Live direction updated by Patricia
            </p>
          </div>
        </div>
      </div>

      {/* Body Area - Scrollable, structured, and informative */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
        {/* 1. Where You Are */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-white/60 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>1. WHERE YOU ARE</span>
            </div>
            <span className="text-[10px] font-mono text-orange-400/80 lowercase">
              current position
            </span>
          </div>
          <motion.div
            key={gpsState.whereYouAre}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-white/90 leading-relaxed shadow-sm"
          >
            {gpsState.whereYouAre}
          </motion.div>
        </div>

        {/* 2. Where You Want To Go */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-white/60 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-rose-400" />
              <span>2. WHERE YOU WANT TO GO</span>
            </div>
            <span className="text-[10px] font-mono text-rose-400/80 lowercase">
              target goal
            </span>
          </div>
          <motion.div
            key={gpsState.whereYouWantToGo}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-white/90 leading-relaxed shadow-sm"
          >
            {gpsState.whereYouWantToGo}
          </motion.div>
        </div>

        {/* 3. Next Best Step */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-white/60 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>3. NEXT BEST STEP</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400/80 lowercase">
              recommended
            </span>
          </div>
          <motion.div
            key={gpsState.nextBestStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-gradient-to-r from-orange-500/15 via-rose-500/10 to-transparent border border-orange-400/35 text-xs font-semibold text-orange-200 leading-relaxed shadow-sm"
          >
            {gpsState.nextBestStep}
          </motion.div>
        </div>

        {/* Dynamic Project Track Alignment Card */}
        <div className="pt-2">
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                {isTech ? (
                  <Laptop className="w-3.5 h-3.5 text-blue-400" />
                ) : (
                  <Headphones className="w-3.5 h-3.5 text-orange-400" />
                )}
                <span>
                  {isTech
                    ? "Tech & Data Support Track"
                    : "Customer Service & Comms Track"}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-400/30">
                {isTech ? "35 SCENARIOS" : "42 SCENARIOS"}
              </span>
            </div>

            <p className="text-[11px] text-white/60 leading-relaxed">
              Practice real workplace conversations with instant scoring on
              clarity, confidence, and empathy.
            </p>

            <div className="flex items-center gap-3 pt-1 text-[10px] text-white/40">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                5-Min Practice
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-orange-400" />
                Instant AI Feedback
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Area - Exactly matching Chat Input bar height and styling */}
      <div className="p-4 border-t border-white/10 bg-white/[0.02]">
        <a
          href={gpsState.actionCta?.href || "#explore-careers"}
          onClick={onActionClick}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-orange-500/20 active:scale-[0.98] cursor-pointer"
        >
          <span>{gpsState.actionCta?.label || "Explore Simulations"}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-[10px] text-white/40 text-center mt-2 font-medium">
          100% risk-free workplace simulation
        </p>
      </div>
    </div>
  );
});
