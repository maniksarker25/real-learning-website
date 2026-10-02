"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CAREER_TRACKS } from "./mockData";

interface OrgDashboardCareerTracksProps {
  selectedTrack: string;
  onSelectTrack: (trackName: string) => void;
}

export const OrgDashboardCareerTracks = memo(
  function OrgDashboardCareerTracks({
    selectedTrack,
    onSelectTrack,
  }: OrgDashboardCareerTracksProps) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="lg:col-span-4 bg-[#11121a] rounded-lg p-3.5 border border-white/10 space-y-3"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <h3 className="text-sm font-bold text-white">
            Career Track Participation
          </h3>
          <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-400/20 font-medium">
            4 Tracks
          </span>
        </div>

        <div className="space-y-2">
          {CAREER_TRACKS.map((track) => (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track.name)}
              className={cn(
                "bg-black/50 p-2.5 rounded-md border transition-colors cursor-pointer",
                selectedTrack === track.name
                  ? "border-orange-500/40 bg-white/[0.04]"
                  : "border-white/10 hover:bg-white/[0.03]"
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold text-white truncate">
                  {track.name}
                </span>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-white">
                    {track.count}
                  </span>
                  <span className="ml-1.5 text-xs font-mono text-orange-400 font-bold">
                    {track.percentage}%
                  </span>
                </div>
              </div>

              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${track.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
);
