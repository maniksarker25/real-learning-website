"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minimize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useLenis } from "lenis/react";

type Props = {
  src: string;
  poster?: string;
};

const SPRING = { type: "spring", stiffness: 170, damping: 26, mass: 0.9 } as const;

export function HeroVideoShowcase({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();

  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const play = useCallback(async (opts?: { unmute?: boolean }) => {
    const v = videoRef.current;
    if (!v) return;
    if (opts?.unmute) {
      v.muted = false;
      setMuted(false);
    }
    try {
      await v.play();
    } catch {
      // Browser blocked unmuted autoplay -> fall back to muted playback
      v.muted = true;
      setMuted(true);
      await v.play().catch(() => {});
    }
  }, []);

  const pause = useCallback(() => videoRef.current?.pause(), []);

  const open = useCallback(() => {
    setExpanded(true);
    play({ unmute: true });
  }, [play]);

  // Minimise / close / Esc / backdrop click: shrink back and stop the video
  const close = useCallback(() => {
    setExpanded(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
      v.muted = true;
      setMuted(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  // Lock page scroll + Esc to close while expanded
  useEffect(() => {
    if (!expanded) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, lenis, close]);

  return (
    <div className="relative mx-auto mt-16 sm:mt-20 w-full max-w-5xl">
      {/* Placeholder keeps layout height while the frame floats when expanded */}
      <div className="relative aspect-video w-full">
        {/* Black glass backdrop */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={close}
            />
          )}
        </AnimatePresence>

        {/* Device frame */}
        <motion.div
          layout
          transition={SPRING}
          className={
            expanded
              ? "fixed inset-0 z-[100] m-auto aspect-video h-fit"
              : "absolute inset-0 z-10"
          }
          style={{
            borderRadius: 32,
            width: expanded ? "min(92vw, calc(84vh * 16 / 9))" : undefined,
          }}
        >
          <motion.div
            layout
            transition={SPRING}
            className="relative h-full w-full bg-gradient-to-b from-zinc-700/80 via-zinc-800 to-zinc-900 p-[1px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)]"
            style={{ borderRadius: 32 }}
          >
            <motion.div
              layout
              transition={SPRING}
              className="h-full w-full bg-[#1c1c1f] p-2.5 sm:p-3.5"
              style={{ borderRadius: 31 }}
            >
              <motion.div
                layout
                transition={SPRING}
                className="group relative h-full w-full overflow-hidden bg-black ring-1 ring-white/10"
                style={{ borderRadius: 20 }}
              >
                <video
                  ref={videoRef}
                  src={src}
                  poster={poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onClick={expanded ? undefined : open}
                  className={`h-full w-full object-cover ${expanded ? "" : "cursor-zoom-in"}`}
                />

                {/* Paused state: dim + center resume button */}
                <AnimatePresence>
                  {!playing && (
                    <motion.div
                      key="paused-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30"
                    >
                      <button
                        type="button"
                        aria-label="Play video"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (expanded) play();
                          else open();
                        }}
                        className="pointer-events-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/20"
                      >
                        <Play className="ml-1 h-6 w-6 sm:h-7 sm:w-7 fill-white" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom control bar */}
                <div
                  className={`absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 transition-opacity duration-300 ${
                    expanded || playing ? "opacity-100" : "opacity-0"
                  } ${expanded ? "" : "group-hover:opacity-100"}`}
                >
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={playing ? "Pause video" : "Resume video"}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (playing) pause();
                        else if (expanded) play();
                        else open();
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                    >
                      {playing ? (
                        <Pause className="h-4 w-4 fill-white" />
                      ) : (
                        <Play className="ml-0.5 h-4 w-4 fill-white" />
                      )}
                    </button>
                    <button
                      type="button"
                      aria-label={muted ? "Unmute" : "Mute"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                    >
                      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>

                  {!expanded && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        open();
                      }}
                      className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                    >
                      Watch with sound
                    </button>
                  )}
                </div>

                {/* Minimise + close buttons when expanded (both stop the video) */}
                {expanded && (
                  <div className="absolute right-3 top-3 flex gap-2 sm:right-4 sm:top-4">
                    <button
                      type="button"
                      aria-label="Minimise video"
                      title="Minimise"
                      onClick={(e) => {
                        e.stopPropagation();
                        close();
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/70"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Close video"
                      title="Close"
                      onClick={(e) => {
                        e.stopPropagation();
                        close();
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/70"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroVideoShowcase;
