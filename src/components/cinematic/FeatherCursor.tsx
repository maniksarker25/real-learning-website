"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";

export const FeatherCursor = memo(function FeatherCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const featherInnerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Strict mobile/thumb device check:
    // Phones, tablets, and thumb-operated touchscreen devices are strictly excluded
    const isMobileDevice =
      typeof navigator !== "undefined" &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
        (navigator.maxTouchPoints > 1 &&
          window.matchMedia("(pointer: coarse)").matches &&
          !window.matchMedia("(pointer: fine)").matches));

    if (isMobileDevice) {
      return;
    }

    const cursor = cursorRef.current;
    const featherInner = featherInnerRef.current;
    if (!cursor || !featherInner) return;

    // Hide the real OS cursor across the entire page while custom feather cursor is active
    document.documentElement.classList.add("custom-feather-cursor-active");

    let isVisible = false;
    let lastX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to(cursor, { opacity: 1, duration: 0.12 });
        isVisible = true;
      }

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Subtle dynamic tilt based on horizontal velocity
      const vx = e.clientX - lastX;
      lastX = e.clientX;

      const tilt = Math.max(-16, Math.min(16, vx * 0.45));
      gsap.to(featherInner, {
        rotation: tilt,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.15 });
      isVisible = false;
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.12 });
      isVisible = true;
    };

    const handleMouseDown = () => {
      gsap.to(featherInner, { scale: 0.9, duration: 0.1, ease: "power1.out" });
    };

    const handleMouseUp = () => {
      gsap.to(featherInner, { scale: 1, duration: 0.15, ease: "power2.out" });
    };

    // Scale and glow when hovering over any interactive clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest(
        "button, a, input, textarea, select, [role='button'], .cursor-pointer"
      );
      if (isInteractive) {
        gsap.to(featherInner, {
          scale: 1.22,
          filter: "drop-shadow(0 6px 14px rgba(234, 88, 12, 0.45))",
          duration: 0.18,
          ease: "power2.out",
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest(
        "button, a, input, textarea, select, [role='button'], .cursor-pointer"
      );
      if (isInteractive) {
        gsap.to(featherInner, {
          scale: 1,
          filter: "drop-shadow(0 3px 8px rgba(20, 15, 10, 0.35))",
          duration: 0.18,
          ease: "power2.out",
        });
      }
    };

    // If any touch event occurs on a hybrid screen, immediately disable and restore default cursor
    const handleTouchStart = () => {
      document.documentElement.classList.remove("custom-feather-cursor-active");
      gsap.set(cursor, { display: "none" });
      window.removeEventListener("mousemove", handleMouseMove);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-feather-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] opacity-0 select-none will-change-transform"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
      }}
      aria-hidden="true"
    >
      {/* Precision micro-point cursor at exact (0, 0) coordinates */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-600 ring-2 ring-white shadow-xs pointer-events-none z-20" />

      {/* Anchor container: bottom-left aligns with (0, 0) pointer location */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: "42px",
          height: "27px",
        }}
      >
        {/* Animated feather container: scale & rotation pivot pinned exactly at bottom-left quill tip */}
        <div
          ref={featherInnerRef}
          className="relative w-full h-full will-change-transform"
          style={{
            transformOrigin: "0% 100%",
            filter: "drop-shadow(0 3px 8px rgba(20, 15, 10, 0.35))",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/feathers.png"
            alt="Feather cursor"
            className="w-full h-full object-contain select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
});
