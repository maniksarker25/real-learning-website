"use client";

import React, { useEffect, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

interface LenisProviderProps {
  children: ReactNode;
}

/**
 * Handles resetting or managing scroll position on Next.js client-side route transitions.
 * Uses native browser scrolling (Lenis smooth scrolling is currently disabled).
 */
function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If an anchor hash exists on initial load/navigation, scroll to it
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
    }

    // Otherwise, ensure new page begins at the top instantly
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Lenis smooth scrolling is disabled for now. To turn it back on, wrap
 * children in <ReactLenis root options={{ lerp: 0.14, wheelMultiplier: 1.25,
 * touchMultiplier: 1.8, smoothWheel: true, autoRaf: true, anchors: true }}>
 * from "lenis/react". Components calling useLenis() fall back to native scroll.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <>
      <RouteChangeHandler />
      {children}
    </>
  );
}

export { useLenis };
