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
  // Initial rotY angle ~ -1.1 puts Bangladesh prominently on the front face
  const rotYRef = useRef<number>(-1.1);
  const rotXRef = useRef<number>(0.28); // slight forward tilt (~16 degrees)
  const isDraggingRef = useRef<boolean>(false);
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

  // Handle pointer interactions (Desktop mouse only - disabled on mobile/touch to prioritize thumb scrolling)
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      // Mobile-first focus: ignore touch/thumb events so the user can scroll naturally without hijacking
      if (e.pointerType === "touch" || (typeof window !== "undefined" && window.innerWidth < 1024)) {
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

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);
    handleResize();

    const render = (time: number) => {
      if (!isDraggingRef.current) {
        // Natural idle rotation
        rotYRef.current += 0.0018;
        // Damping any residual drag velocity
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

      // 1. Atmosphere halo glow behind globe
      const haloGrad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.5,
        cx,
        cy,
        radius * 1.35,
      );
      haloGrad.addColorStop(0, "rgba(251, 146, 60, 0.20)");
      haloGrad.addColorStop(0.5, "rgba(244, 63, 94, 0.08)");
      haloGrad.addColorStop(1, "rgba(255, 247, 237, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Subtle sphere rim edge
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(28, 25, 23, 0.12)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 2. Render dots
      // First pass: Back hemisphere dots (z <= 0)
      ctx.fillStyle = "rgba(120, 113, 108, 0.16)";
      for (let i = 0; i < GLOBE_LAND_POINTS.length; i++) {
        const pt = GLOBE_LAND_POINTS[i];
        // Rotate Y
        const rx = pt[0] * cosY + pt[2] * sinY;
        const ry = pt[1];
        const rz = -pt[0] * sinY + pt[2] * cosY;

        // Rotate X (tilt)
        const z = ry * sinX + rz * cosX;

        if (z <= 0) {
          const y = ry * cosX - rz * sinX;
          const sx = cx + rx * radius;
          const sy = cy - y * radius;

          ctx.beginPath();
          ctx.arc(sx, sy, 0.85, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Second pass: Front hemisphere dots (z > 0)
      for (let i = 0; i < GLOBE_LAND_POINTS.length; i++) {
        const pt = GLOBE_LAND_POINTS[i];
        const rx = pt[0] * cosY + pt[2] * sinY;
        const ry = pt[1];
        const rz = -pt[0] * sinY + pt[2] * cosY;

        const z = ry * sinX + rz * cosX;

        if (z > 0) {
          const y = ry * cosX - rz * sinX;
          const sx = cx + rx * radius;
          const sy = cy - y * radius;

          const alpha = 0.25 + 0.75 * (z * z);
          const dotRadius = 0.9 + 1.2 * z;

          ctx.fillStyle = `rgba(28, 25, 23, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Render Beacons
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

        // Render beacon if on front side or near limb
        if (bFinalZ > -0.05) {
          const bFinalY = bry * cosX - brz * sinX;
          const bsx = cx + brx * radius;
          const bsy = cy - bFinalY * radius;
          const visibility = Math.max(0, Math.min(1, (bFinalZ + 0.05) * 3));

          if (beacon.isPrimary) {
            // Bangladesh Primary Beacon: Intense Orange / Rose pulse with radar rings
            const glowSize = 36 * visibility;
            const beaconGlow = ctx.createRadialGradient(
              bsx,
              bsy,
              0,
              bsx,
              bsy,
              glowSize,
            );
            beaconGlow.addColorStop(
              0,
              `rgba(234, 88, 12, ${0.95 * visibility})`,
            );
            beaconGlow.addColorStop(
              0.35,
              `rgba(249, 115, 22, ${0.5 * visibility})`,
            );
            beaconGlow.addColorStop(1, "rgba(249, 115, 22, 0)");

            ctx.fillStyle = beaconGlow;
            ctx.beginPath();
            ctx.arc(bsx, bsy, glowSize, 0, Math.PI * 2);
            ctx.fill();

            // Animated pulsing radar rings
            const pulsePhase1 = (time * 0.0012) % 1;
            const pulseRadius1 = (6 + pulsePhase1 * 26) * visibility;
            const pulseAlpha1 = (1 - pulsePhase1) * 0.75 * visibility;

            ctx.beginPath();
            ctx.arc(bsx, bsy, pulseRadius1, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(234, 88, 12, ${pulseAlpha1.toFixed(2)})`;
            ctx.lineWidth = 1.6;
            ctx.stroke();

            const pulsePhase2 = (time * 0.0012 + 0.5) % 1;
            const pulseRadius2 = (6 + pulsePhase2 * 26) * visibility;
            const pulseAlpha2 = (1 - pulsePhase2) * 0.75 * visibility;

            ctx.beginPath();
            ctx.arc(bsx, bsy, pulseRadius2, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(234, 88, 12, ${pulseAlpha2.toFixed(2)})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();

            // Inner vibrant beacon disc
            ctx.beginPath();
            ctx.arc(bsx, bsy, 5.5 * visibility, 0, Math.PI * 2);
            ctx.fillStyle = "#ea580c";
            ctx.fill();

            // Brilliant white hot core
            ctx.beginPath();
            ctx.arc(bsx, bsy, 3.2 * visibility, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
          } else {
            // Secondary beacon
            const secGlowSize = 22 * visibility;
            const secGlow = ctx.createRadialGradient(
              bsx,
              bsy,
              0,
              bsx,
              bsy,
              secGlowSize,
            );
            secGlow.addColorStop(0, `rgba(234, 88, 12, ${0.8 * visibility})`);
            secGlow.addColorStop(
              0.4,
              `rgba(249, 115, 22, ${0.35 * visibility})`,
            );
            secGlow.addColorStop(1, "rgba(249, 115, 22, 0)");

            ctx.fillStyle = secGlow;
            ctx.beginPath();
            ctx.arc(bsx, bsy, secGlowSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(bsx, bsy, 3.5 * visibility, 0, Math.PI * 2);
            ctx.fillStyle = "#ea580c";
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
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
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
