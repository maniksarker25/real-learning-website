"use client";

import React, { useState } from "react";
import HowRealLearningWorks from "@/components/front-end/HowRealLearningWorks";
import { Monitor, Tablet, Smartphone, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DemoPage() {
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [key, setKey] = useState<number>(0);

  const containerWidths = {
    desktop: "w-full max-w-full",
    tablet: "w-[768px] max-w-full border-x border-slate-300 shadow-2xl rounded-2xl overflow-hidden my-8",
    mobile: "w-[390px] max-w-full border-x border-slate-300 shadow-2xl rounded-2xl overflow-hidden my-8",
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Demo Controls Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <span className="text-slate-500">|</span>
          <h1 className="text-sm font-bold text-white tracking-tight">
            How Real Learning Works — Component Showcase
          </h1>
        </div>

        {/* Viewport Switcher Controls */}
        <div className="flex items-center gap-2 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewportMode("desktop")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
              viewportMode === "desktop"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            )}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop (1440px)
          </button>
          <button
            onClick={() => setViewportMode("tablet")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
              viewportMode === "tablet"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            )}
          >
            <Tablet className="w-3.5 h-3.5" />
            Tablet (768px)
          </button>
          <button
            onClick={() => setViewportMode("mobile")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
              viewportMode === "mobile"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            )}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile (390px)
          </button>
        </div>

        <button
          onClick={() => setKey((k) => k + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Replay Animations
        </button>
      </header>

      {/* Component Sandbox Canvas */}
      <main className="flex-1 flex justify-center items-start bg-slate-950 p-0 sm:p-4 overflow-x-auto">
        <div className={cn("transition-all duration-500", containerWidths[viewportMode])}>
          <HowRealLearningWorks key={key} />
        </div>
      </main>
    </div>
  );
}
