"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/** Retro dot-matrix equalizer bar with circular cells and traveling wave animations that scales with percentage */
export function RetroDotBar({
  score,
  isTyping,
}: {
  score: number;
  isTyping?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    const cols = 5;

    const render = (currentTime: number) => {
      const width = container.clientWidth || 56;
      const height = container.clientHeight || 120;

      if (width > 0 && height > 0) {
        const targetW = Math.round(width * dpr);
        const targetH = Math.round(height * dpr);

        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const elapsed = (currentTime - startTime) / 1000;
        ctx.clearRect(0, 0, width, height);

        const spacingX = width / cols;
        const rows = Math.max(3, Math.round(height / spacingX));
        const spacingY = height / rows;
        const speed = isTyping ? 3.4 : 2.0;

        const centerX = width / 2;
        const centerY = height / 2;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = (c + 0.5) * spacingX;
            const y = (r + 0.5) * spacingY;

            const dx = x - centerX;
            const dy = y - centerY;
            const distFromCenter = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx);

            // Center-to-out radial wave flow matching the circular telemetry display
            const wave1 = Math.sin(distFromCenter * 0.16 - elapsed * speed * 2.8);
            const wave2 = Math.sin(distFromCenter * 0.08 - elapsed * speed * 1.4 + angle * 2);
            const wave3 = Math.cos(distFromCenter * 0.22 - elapsed * speed * 3.5);
            const combined = wave1 * 0.6 + wave2 * 0.25 + wave3 * 0.15;

            const intensity = Math.max(0, Math.min(1, (combined + 1) / 2));

            const baseRadius = 1.3;
            const dotRadius = baseRadius + intensity * 2.2;
            const alpha = 0.15 + intensity * 0.85;

            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);

            // Highly luminous white dots with radial glow matching the circle
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
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTyping]);

  return (
    <div className="relative w-full h-full bg-black/25 rounded-2xl sm:rounded-3xl p-1 border border-white/10 flex flex-col justify-end items-center overflow-hidden shadow-inner">
      {/* 80% Benchmark Tick Line */}
      <div className="absolute left-0 right-0 bottom-[80%] border-b-2 border-dashed border-white/35 pointer-events-none z-20">
        <span className="absolute -top-3.5 right-1.5 text-[8px] font-mono font-bold text-white/50 tracking-wider">
          80%
        </span>
      </div>

      {/* Dynamic Rising & Falling Bar based on Percentage Score - Instant initial render and smooth spring updates */}
      <motion.div
        initial={false}
        animate={{ height: `${Math.max(10, Math.min(100, score))}%` }}
        transition={{ type: "spring", stiffness: 65, damping: 15 }}
        className="w-full relative rounded-xl sm:rounded-2xl bg-linear-to-b from-[#1e2029] via-[#121319] to-[#0a0b0f] border border-white/20 overflow-hidden shadow-xl flex flex-col justify-end items-center"
      >
        <div ref={containerRef} className="relative w-full h-full">
          {/* Retro Dot-Matrix Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full pointer-events-none block"
          />
        </div>
      </motion.div>
    </div>
  );
}
