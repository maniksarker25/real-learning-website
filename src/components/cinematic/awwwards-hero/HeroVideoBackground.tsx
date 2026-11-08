import React, { memo } from "react";

/**
 * Full-bleed cinematic video backdrop for the hero.
 *
 * Sits behind every hero layer (z-0) and is purely decorative, so it is hidden
 * from assistive tech. The gradient scrims above it are what keep the headline
 * readable regardless of which frame of the clip is on screen.
 */
interface HeroVideoBackgroundProps {
  videoLayerRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroVideoBackground = memo(function HeroVideoBackground({
  videoLayerRef,
}: HeroVideoBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={videoLayerRef}
        className="absolute inset-0 will-change-transform"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/real-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
        />
      </div>

      {/* Vertical scrim: darkens top (navbar) and bottom (scroll cue) edges. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />

      {/* Centre vignette: lifts contrast directly behind the headline block. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.45)_0%,_rgba(0,0,0,0.3)_45%,_rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
});
