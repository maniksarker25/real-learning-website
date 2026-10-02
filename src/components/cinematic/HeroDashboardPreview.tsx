"use client";

import React, { useState } from "react";

type TabKey = "career" | "simulation" | "feedback" | "progress";

function PatriciaAvatar({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div
      className={`relative rounded-lg sm:rounded-xl flex items-center justify-center shadow-xs select-none shrink-0 bg-gradient-to-br from-[#c26d44] to-[#a04e28] border border-orange-400/30 ${className}`}
    >
      <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-current text-white/95">
        <path
          d="M10 13c0-1.5 1.2-2.5 2.5-2.5s2.5 1 2.5 2.5M17 13c0-1.5 1.2-2.5 2.5-2.5s2.5 1 2.5 2.5"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M13 19c1 1.2 2.5 1.8 3.5 1.8s2.5-.6 3.5-1.8"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function UserAvatar({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div
      className={`relative rounded-lg sm:rounded-xl flex items-center justify-center shadow-xs select-none shrink-0 bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-[10px] border border-blue-400/30 ${className}`}
    >
      U
    </div>
  );
}

export function HeroDashboardPreview() {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "career", label: "career" },
    { key: "simulation", label: "simulation" },
    { key: "feedback", label: "feedback" },
    { key: "progress", label: "progress" },
  ];

  return (
    <div id="hero-dashboard-showcase" className="w-full flex flex-col items-center text-left text-start">
      {/* Tab Switcher */}
      <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#18181b] border border-white/10 shadow-2xl backdrop-blur-md mb-4 sm:mb-5 select-none z-10">
        {tabs.map((tab) => {
          const isActive = tab.key === "simulation";
          return (
            <button
              key={tab.key}
              type="button"
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all duration-200 select-none capitalize ${
                isActive
                  ? "bg-[#27272a] text-white shadow-xs font-semibold cursor-default"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Preview Window Frame */}
      <div className="w-full rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-[#121214] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.45)] overflow-hidden text-zinc-100 transition-all duration-300 text-left text-start">
        {/* Top Window Chrome / Titlebar */}
        <div className="h-10 sm:h-11 border-b border-zinc-800/70 bg-[#161619] px-3.5 sm:px-4 flex items-center justify-between select-none text-left text-start">
          {/* macOS Traffic Lights */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] inline-block shadow-xs" />

            {/* Sidebar toggle icon */}
            <div className="hidden sm:flex items-center ml-2.5 pl-2.5 border-l border-zinc-800 text-zinc-500">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                <path d="M9 3v18" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Window Title Skeleton */}
          <div className="flex items-center gap-2 max-w-xs sm:max-w-md">
            <span className="h-2.5 w-28 sm:w-36 rounded bg-zinc-600/70 animate-pulse inline-block" />
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span className="h-2 w-32 sm:w-44 rounded bg-zinc-700/60 animate-pulse inline-block" />
            </span>
          </div>

          {/* Search Shortcut & Actions Skeleton */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
              <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="h-2 w-16 rounded bg-zinc-700/50 animate-pulse inline-block" />
              <span className="h-3 w-6 rounded bg-zinc-800 text-zinc-500 text-[9px] flex items-center justify-center font-mono">⌘K</span>
            </div>
            <div className="text-zinc-500 p-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Window Body: Sidebar + Main Content Skeleton */}
        <div className="flex flex-col md:flex-row min-h-[340px] sm:min-h-[390px] text-left text-start">
          {/* Left Sidebar: Skeletons */}
          <div className="hidden md:flex flex-col w-48 lg:w-56 border-r border-zinc-800/70 bg-[#141417] p-2.5 text-xs justify-between shrink-0 select-none text-left text-start">
            <div className="space-y-3">
              {/* Primary Nav List Skeletons */}
              <div className="space-y-1">
                {/* Nav item 1 (Active) */}
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5">
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-orange-500/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" />
                    </svg>
                    <span className="h-2.5 w-16 rounded bg-zinc-600/70 animate-pulse inline-block" />
                  </span>
                  <span className="h-3 w-4 rounded bg-zinc-700/60 animate-pulse inline-block" />
                </div>

                {/* Nav item 2 */}
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg">
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <span className="h-2.5 w-20 rounded bg-zinc-700/50 animate-pulse inline-block" />
                  </span>
                  <span className="h-3 w-5 rounded bg-zinc-800/70 animate-pulse inline-block" />
                </div>

                {/* Nav item 3 */}
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg">
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="h-2.5 w-14 rounded bg-zinc-700/50 animate-pulse inline-block" />
                  </span>
                  <span className="h-3 w-4 rounded bg-zinc-800/70 animate-pulse inline-block" />
                </div>

                {/* Nav item 4 */}
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg">
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="h-2.5 w-16 rounded bg-zinc-700/50 animate-pulse inline-block" />
                  </span>
                  <span className="h-3 w-4 rounded bg-zinc-800/70 animate-pulse inline-block" />
                </div>
              </div>

              {/* Folders Section Skeletons */}
              <div className="pt-1.5">
                <div className="px-2 mb-2">
                  <span className="h-2 w-12 rounded bg-zinc-700/60 animate-pulse inline-block" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80 shrink-0" />
                    <span className="h-2 w-16 rounded bg-zinc-700/50 animate-pulse inline-block" />
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 shrink-0" />
                    <span className="h-2 w-14 rounded bg-zinc-700/50 animate-pulse inline-block" />
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shrink-0" />
                    <span className="h-2 w-10 rounded bg-zinc-700/50 animate-pulse inline-block" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Skeletons */}
            <div className="mt-4 p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <span className="h-2 w-20 rounded bg-zinc-700/60 animate-pulse block" />
              <span className="h-2.5 w-28 rounded bg-zinc-600/70 animate-pulse block" />
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse shrink-0" />
                <span className="h-2 w-16 rounded bg-zinc-700/50 animate-pulse inline-block" />
              </div>
            </div>
          </div>

          {/* Main Content Area: Fully Skeletonized Simulation Experience */}
          <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between relative bg-gradient-to-b from-[#121214] via-[#101012] to-[#0c0c0e] text-left text-start">
            {/* Top Simulation Status Ribbon */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-800/80 text-xs text-left text-start">
              <div className="flex items-center gap-2">
                {/* Active Indicator Skeleton */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-950/60 border border-orange-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="h-2 w-20 rounded bg-orange-400/40 animate-pulse inline-block" />
                </div>
                {/* Score Pill Skeleton */}
                <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="h-2 w-14 rounded bg-emerald-400/40 animate-pulse inline-block" />
                </div>
              </div>

              {/* Audio Waveform & Timer Skeleton */}
              <div className="flex items-center gap-2.5">
                <div className="hidden sm:flex items-center gap-0.5 h-4 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  {[35, 60, 95, 45, 80, 50, 90, 70, 40, 85, 65, 30].map((h, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-orange-400/80 rounded-full transition-all duration-300"
                      style={{
                        height: `${h}%`,
                        animation: `pulse 1.4s ease-in-out infinite ${i * 0.08}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="bg-zinc-900/90 border border-zinc-800 px-2 py-1 rounded-md flex items-center">
                  <span className="h-2.5 w-9 rounded bg-zinc-600/80 animate-pulse inline-block" />
                </div>
              </div>
            </div>

            {/* Conversation Stream: Abstract, Pulsing Skeletons */}
            <div className="flex-1 space-y-3.5 pr-1 max-h-[220px] sm:max-h-[260px] overflow-hidden text-left text-start">
              {/* Message 1 (Patricia AI) */}
              <div className="flex items-start gap-2 justify-start text-left text-start">
                <PatriciaAvatar className="w-6 h-6 mt-0.5" />

                <div className="flex flex-col items-start max-w-[88%] sm:max-w-[80%] text-left text-start space-y-1">
                  {/* Sender Header Skeleton */}
                  <div className="flex items-center gap-2 mb-0.5 px-0.5">
                    <span className="h-2 w-16 rounded bg-orange-400/50 animate-pulse inline-block" />
                    <span className="text-zinc-600">•</span>
                    <span className="h-2 w-10 rounded bg-zinc-700/50 animate-pulse inline-block" />
                  </div>

                  {/* Speech Bubble Skeleton */}
                  <div className="p-3 rounded-2xl rounded-tl-xs bg-zinc-900/90 border border-orange-500/20 w-full space-y-2">
                    <span className="h-2.5 w-[94%] rounded bg-zinc-700/70 animate-pulse block" />
                    <span className="h-2.5 w-[85%] rounded bg-zinc-700/60 animate-pulse block" />
                    <span className="h-2.5 w-[65%] rounded bg-zinc-700/40 animate-pulse block" />

                    {/* Sub-tip skeleton */}
                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400/80 shrink-0" />
                      <span className="h-2 w-48 sm:w-64 rounded bg-orange-400/30 animate-pulse inline-block" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message 2 (User) */}
              <div className="flex items-start gap-2 justify-end text-left text-start">
                <div className="flex flex-col items-end max-w-[88%] sm:max-w-[78%] text-left text-start space-y-1">
                  {/* Sender Header Skeleton */}
                  <div className="flex items-center gap-2 mb-0.5 px-0.5">
                    <span className="h-2 w-16 rounded bg-blue-400/50 animate-pulse inline-block" />
                    <span className="text-zinc-600">•</span>
                    <span className="h-2 w-10 rounded bg-zinc-700/50 animate-pulse inline-block" />
                  </div>

                  {/* Speech Bubble Skeleton */}
                  <div className="p-3 rounded-2xl rounded-tr-xs bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 w-full space-y-2">
                    <span className="h-2.5 w-[92%] rounded bg-blue-300/40 animate-pulse block" />
                    <span className="h-2.5 w-[82%] rounded bg-blue-300/30 animate-pulse block" />
                    <span className="h-2.5 w-[50%] rounded bg-blue-300/20 animate-pulse block" />

                    {/* Metric badge skeleton */}
                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="h-2 w-40 sm:w-56 rounded bg-emerald-400/30 animate-pulse inline-block" />
                    </div>
                  </div>
                </div>

                <UserAvatar className="w-6 h-6 mt-0.5" />
              </div>
            </div>

            {/* Quick Suggestion Chips Skeletons */}
            <div className="pt-2 pb-1.5 flex items-center gap-2 overflow-hidden text-left text-start">
              <span className="h-2 w-14 rounded bg-zinc-700/60 animate-pulse inline-block shrink-0" />
              <div className="flex items-center gap-1.5">
                <div className="px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center">
                  <span className="h-2 w-24 sm:w-32 rounded bg-zinc-600/40 animate-pulse inline-block" />
                </div>
                <div className="px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center">
                  <span className="h-2 w-28 sm:w-36 rounded bg-zinc-600/40 animate-pulse inline-block" />
                </div>
                <div className="hidden sm:flex px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 items-center">
                  <span className="h-2 w-20 rounded bg-zinc-600/40 animate-pulse inline-block" />
                </div>
              </div>
            </div>

            {/* Live Chat Input Bar Skeleton */}
            <div className="pt-2 border-t border-zinc-800/80 flex items-center gap-2 text-left text-start">
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <svg className="w-3.5 h-3.5 text-orange-400/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="h-2.5 w-44 sm:w-60 rounded bg-zinc-700/40 animate-pulse inline-block" />
              </div>

              <div className="px-3 py-2 rounded-xl bg-orange-600/70 border border-orange-500/30 flex items-center gap-1.5 shrink-0 shadow-xs">
                <span className="h-2 w-7 rounded bg-white/80 animate-pulse inline-block" />
                <span className="text-[10px] text-white/80 font-mono">↵</span>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
                <span className="h-2 w-10 rounded bg-zinc-700/50 animate-pulse inline-block" />
                <span className="h-2.5 w-5 rounded bg-zinc-800 text-[9px] text-zinc-500 font-mono flex items-center justify-center">⌘M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


