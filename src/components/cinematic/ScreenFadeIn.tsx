"use client";

import React, { useEffect, useState } from "react";

/**
 * ScreenFadeIn: Global dark fade-in overlay for the main layout.
 * Displays a sleek dark screen (#0a0a0c) on initial page load / refresh,
 * then smoothly fades out over 800ms to reveal the fully hydrated page.
 */
export function ScreenFadeIn() {
  const [fadedOut, setFadedOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Brief delay to ensure initial dark frame is rendered before starting transition
    const timer = setTimeout(() => {
      setFadedOut(true);
    }, 60);

    // Completely unmount/remove overlay from DOM after transition completes
    const cleanup = setTimeout(() => {
      setRemoved(true);
    }, 950);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanup);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      style={{ opacity: fadedOut ? 0 : 1 }}
      className={`fixed inset-0 z-[99999] pointer-events-none bg-[#0a0a0c] transition-opacity duration-800 ease-out will-change-[opacity] ${
        fadedOut ? "opacity-0" : "opacity-100"
      }`}
    />
  );
}
