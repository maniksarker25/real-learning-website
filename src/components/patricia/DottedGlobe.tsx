"use client";

import React, { useEffect, useRef, useCallback, memo } from "react";
import { GLOBE_LAND_POINTS } from "./globeData";

interface DottedGlobeProps {
  className?: string;
}

// Spherical coordinates converter for beacons
function getUnitVector(lat: number, lon: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -Math.sin(phi) * Math.cos(theta);
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

// Bangladesh coordinates: 23.8° N, 90.4° E
const BD_VECTOR = getUnitVector(23.8, 90.4);
// Secondary beacon: Europe / Central Asia
const SEC_VECTOR = getUnitVector(48.2, 16.3);

export const DottedGlobe = memo(function DottedGlobe({
  className,
}: DottedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Rotation angles (radians)
  const rotYRef = useRef<number>(-1.1);
  const rotXRef = useRef<number>(0.28);
  const isDraggingRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    rotY: number;
    rotX: number;
  }>({
    x: 0,
    y: 0,
    rotY: -1.1,
    rotX: 0.28,
  });
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0.0018, vy: 0 });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (
        e.pointerType === "touch" ||
        (typeof window !== "undefined" && window.innerWidth < 1024)
      ) {
        return;
      }
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        rotY: rotYRef.current,
        rotX: rotXRef.current,
      };
      velocityRef.current = { vx: 0, vy: 0 };
      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDraggingRef.current || e.pointerType === "touch") return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      const newRotY = dragStartRef.current.rotY + dx * 0.005;
      const newRotX = Math.max(
        -0.8,
        Math.min(0.8, dragStartRef.current.rotX - dy * 0.005),
      );

      velocityRef.current = {
        vx: (newRotY - rotYRef.current) * 0.5,
        vy: (newRotX - rotXRef.current) * 0.5,
      };

      rotYRef.current = newRotY;
      rotXRef.current = newRotX;
    },
    [],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 640;
    const step = isMobileDevice ? 2 : 1;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const fallbackW = canvas.clientWidth || canvas.offsetWidth || canvas.parentElement?.clientWidth || 350;
      const fallbackH = canvas.clientHeight || canvas.offsetHeight || canvas.parentElement?.clientHeight || 350;
      const maxDpr = isMobileDevice ? 1 : 2;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      width = rect.width > 0 ? rect.width : fallbackW;
      height = rect.height > 0 ? rect.height : fallbackH;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);
    // Execute handleResize immediately to calculate dimensions on frame 0
    handleResize();

    // IntersectionObserver to pause rendering loop when globe is out of view
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && animationFrameId === null) {
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    const render = (time: number) => {
      if (!isVisibleRef.current) {
        animationFrameId = null;
        return;
      }

      if (width === 0 || height === 0) {
        handleResize();
      }

      if (!isDraggingRef.current) {
        rotYRef.current += 0.0018;
        rotYRef.current += velocityRef.current.vx;
        rotXRef.current += velocityRef.current.vy;
        velocityRef.current.vx *= 0.95;
        velocityRef.current.vy *= 0.95;
      }

      ctx.clearRect(0, 0, width, height);

      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const cx = width * 0.5;
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.44;

      const cosY = Math.cos(rotYRef.current);
      const sinY = Math.sin(rotYRef.current);
      const cosX = Math.cos(rotXRef.current);
      const sinX = Math.sin(rotXRef.current);

      // Atmosphere halo glow behind globe
      const haloGrad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.6,
        cx,
        cy,
        radius * 1.35,
      );
      haloGrad.addColorStop(0, "rgba(30, 58, 138, 0.22)");
      haloGrad.addColorStop(0.5, "rgba(14, 165, 233, 0.07)");
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Subtle sphere rim edge
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Batch 1: Back hemisphere dots (z <= 0) in a single path
      ctx.fillStyle = "rgba(148, 163, 184, 0.08)";
      ctx.beginPath();
      const landLen = GLOBE_LAND_POINTS.length;
      for (let i = 0; i < landLen; i += step) {
        const pt = GLOBE_LAND_POINTS[i];
        const rx = pt[0] * cosY + pt[2] * sinY;
        const ry = pt[1];
        const rz = -pt[0] * sinY + pt[2] * cosY;
        const z = ry * sinX + rz * cosX;

        if (z <= 0) {
          const y = ry * cosX - rz * sinX;
          const sx = cx + rx * radius;
          const sy = cy - y * radius;
          ctx.moveTo(sx + 0.85, sy);
          ctx.arc(sx, sy, 0.85, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // Batch 2: Front hemisphere dots (z > 0) grouped into alpha buckets
      ctx.fillStyle = "rgba(240, 246, 255, 0.55)";
      ctx.beginPath();
      for (let i = 0; i < landLen; i += step) {
        const pt = GLOBE_LAND_POINTS[i];
        const rx = pt[0] * cosY + pt[2] * sinY;
        const ry = pt[1];
        const rz = -pt[0] * sinY + pt[2] * cosY;
        const z = ry * sinX + rz * cosX;

        if (z > 0) {
          const y = ry * cosX - rz * sinX;
          const sx = cx + rx * radius;
          const sy = cy - y * radius;
          const dotRadius = 0.9 + 1.2 * z;
          ctx.moveTo(sx + dotRadius, sy);
          ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // Render Beacons
      const beacons = [
        { vec: BD_VECTOR, isPrimary: true },
        { vec: SEC_VECTOR, isPrimary: false },
      ];

      for (const beacon of beacons) {
        const [bx, by, bz] = beacon.vec;
        const brx = bx * cosY + bz * sinY;
        const bry = by;
        const brz = -bx * sinY + bz * cosY;
        const bFinalZ = bry * sinX + brz * cosX;

        if (bFinalZ > -0.05) {
          const bFinalY = bry * cosX - brz * sinX;
          const bsx = cx + brx * radius;
          const bsy = cy - bFinalY * radius;
          const visibility = Math.max(0, Math.min(1, (bFinalZ + 0.05) * 3));

          if (beacon.isPrimary) {
            const glowSize = 36 * visibility;
            const beaconGlow = ctx.createRadialGradient(
              bsx,
              bsy,
              0,
              bsx,
              bsy,
              glowSize,
            );
            beaconGlow.addColorStop(0, `rgba(56, 189, 248, ${0.95 * visibility})`);
            beaconGlow.addColorStop(0.35, `rgba(14, 165, 233, ${0.5 * visibility})`);
            beaconGlow.addColorStop(1, "rgba(14, 165, 233, 0)");

            ctx.fillStyle = beaconGlow;
            ctx.beginPath();
            ctx.arc(bsx, bsy, glowSize, 0, Math.PI * 2);
            ctx.fill();

            const pulsePhase1 = (time * 0.0012) % 1;
            const pulseRadius1 = (6 + pulsePhase1 * 26) * visibility;
            const pulseAlpha1 = (1 - pulsePhase1) * 0.75 * visibility;

            ctx.beginPath();
            ctx.arc(bsx, bsy, pulseRadius1, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(56, 189, 248, ${pulseAlpha1.toFixed(2)})`;
            ctx.lineWidth = 1.6;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(bsx, bsy, 5.5 * visibility, 0, Math.PI * 2);
            ctx.fillStyle = "#38bdf8";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(bsx, bsy, 3.2 * visibility, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
          } else {
            const secGlowSize = 22 * visibility;
            const secGlow = ctx.createRadialGradient(
              bsx,
              bsy,
              0,
              bsx,
              bsy,
              secGlowSize,
            );
            secGlow.addColorStop(0, `rgba(56, 189, 248, ${0.8 * visibility})`);
            secGlow.addColorStop(0.4, `rgba(14, 165, 233, ${0.35 * visibility})`);
            secGlow.addColorStop(1, "rgba(14, 165, 233, 0)");

            ctx.fillStyle = secGlow;
            ctx.beginPath();
            ctx.arc(bsx, bsy, secGlowSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(bsx, bsy, 3.5 * visibility, 0, Math.PI * 2);
            ctx.fillStyle = "#38bdf8";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(bsx, bsy, 1.8 * visibility, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`pointer-events-none lg:pointer-events-auto cursor-default lg:cursor-grab lg:active:cursor-grabbing touch-pan-y lg:touch-none select-none w-full h-full ${className || ""}`}
      style={{ display: "block" }}
    />
  );
});
