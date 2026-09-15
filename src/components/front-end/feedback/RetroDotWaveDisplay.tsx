"use client";

import React, { useEffect, useRef } from "react";
import { AnimatedScore } from "./AnimatedScore";

/** Retro dot-matrix display component with circular cells and smooth wave animations */
export function RetroDotWaveDisplay({
  score,
  isTyping,
}: {
  score: number;
  isTyping?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const size = 236;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Denser, high-resolution matrix grid
    const cols = 23;
    const rows = 23;
    const spacing = size / cols;
    const center = size / 2;
    const maxRadius = size / 2 - 4;

    const render = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      ctx.clearRect(0, 0, size, size);

      const speed = isTyping ? 3.2 : 2.0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) * spacing;
          const y = (r + 0.5) * spacing;

          const dx = x - center;
          const dy = y - center;
          const distFromCenter = Math.hypot(dx, dy);
          if (distFromCenter > maxRadius) continue;

          const angle = Math.atan2(dy, dx);

          // Multi-harmonic radial wave flow (center-to-out with rotational nuance)
          const wave1 = Math.sin(distFromCenter * 0.16 - elapsed * speed * 2.8);
          const wave2 = Math.sin(distFromCenter * 0.08 - elapsed * speed * 1.4 + angle * 2);
          const wave3 = Math.cos(distFromCenter * 0.22 - elapsed * speed * 3.5);
          const combined = wave1 * 0.6 + wave2 * 0.25 + wave3 * 0.15;

          const intensity = Math.max(0, Math.min(1, (combined + 1) / 2));

          const baseRadius = 1.3;
          const dotRadius = baseRadius + intensity * 2.4;
          const alpha = 0.15 + intensity * 0.85;

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);

          // Highly luminous white dots with radial glow
          if (intensity > 0.65) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 1.15)})`;
            ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
            ctx.shadowBlur = 8;
          } else if (intensity > 0.35) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
            ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
            ctx.shadowBlur = 3;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.12, alpha * 0.25)})`;
            ctx.shadowBlur = 0;
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTyping]);

  return (
    <div className="w-full lg:w-[240px] h-[240px] max-h-[240px] shrink-0 relative flex items-center justify-center">
      <div className="w-[236px] h-[236px] rounded-full bg-[#0f1015] border border-white/15 shadow-2xl flex items-center justify-center relative overflow-hidden select-none">
        {/* Dot Matrix Canvas */}
        <canvas
          ref={canvasRef}
          style={{ width: "236px", height: "236px" }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Center Retro Telemetry Overlay */}
        <div className="relative z-10 text-center px-4 py-2.5 rounded-2xl bg-[#0b0c10]/85 border border-white/10 backdrop-blur-md shadow-xl flex flex-col items-center justify-center">
          <AnimatedScore
            value={score}
            className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tighter drop-shadow-md"
          />
          <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-orange-400 mt-0.5">
            Live Turn Mastery
          </div>
          <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-400/90 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>DOT WAVE MATRIX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
