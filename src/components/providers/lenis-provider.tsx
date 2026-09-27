"use client";

import React, { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

interface LenisProviderProps {
  children: ReactNode;
}

/**
 * Handles resetting or managing scroll position on Next.js client-side route transitions.
 */
function RouteChangeHandler() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // If an anchor hash exists on initial load/navigation, scroll to it smoothly
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      if (document.querySelector(hash)) {
        lenis.scrollTo(hash, { offset: -80, immediate: false });
        return;
      }
    }

    // Otherwise, ensure new page begins at the top instantly
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.14,
        wheelMultiplier: 1.25,
        touchMultiplier: 1.8,
        smoothWheel: true,
        autoRaf: true,
        anchors: true,
      }}
    >
      <RouteChangeHandler />
      {children}
    </ReactLenis>
  );
}

export { useLenis };
