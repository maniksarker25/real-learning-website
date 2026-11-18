"use client";

import { memo } from "react";
import { Clock, Maximize2, MessageSquare, Minimize2, RefreshCw, X, type LucideIcon } from "lucide-react";
import { SimulationScenario } from "@/types/individual";
import { Badge, PatriciaFace } from "@/components/dashboard/ui";

interface SimulationPlayerHeaderProps {
  scenario: SimulationScenario;
  formattedTime: string;
  turnCount: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onReset: () => void;
  onClose: () => void;
}

function IconButton({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export const SimulationPlayerHeader = memo(function SimulationPlayerHeader({
  scenario,
  formattedTime,
  turnCount,
  isFullscreen,
  onToggleFullscreen,
  onReset,
  onClose,
}: SimulationPlayerHeaderProps) {
  return (
    <div className="shrink-0 border-b border-white/[0.06]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative">
            <PatriciaFace face="normal" size={40} />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#181818] bg-emerald-500" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-semibold text-white">{scenario.characterName}</h3>
              <Badge className="hidden sm:inline-flex">{scenario.characterRole}</Badge>
            </div>
            <p className="truncate text-sm text-zinc-500">{scenario.title}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <div className="mr-2 hidden items-center gap-4 text-sm text-zinc-400 md:flex">
            <span className="flex items-center gap-1.5 tabular-nums">
              <Clock className="h-4 w-4 text-zinc-500" />
              {formattedTime}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-zinc-500" />
              {turnCount} {turnCount === 1 ? "reply" : "replies"}
            </span>
          </div>
          <IconButton
            icon={isFullscreen ? Minimize2 : Maximize2}
            label={isFullscreen ? "Exit full screen" : "Full screen"}
            onClick={onToggleFullscreen}
          />
          <IconButton icon={RefreshCw} label="Restart simulation" onClick={onReset} />
          <IconButton icon={X} label="Close" onClick={onClose} />
        </div>
      </div>

      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-4 pb-3 sm:px-6">
        <span className="shrink-0 text-sm text-zinc-500">Skills tested</span>
        <Badge tone="neutral" className="shrink-0">
          {scenario.difficulty}
        </Badge>
        {scenario.expectedSkills.map((sk) => (
          <Badge key={sk} tone="orange" className="shrink-0">
            {sk}
          </Badge>
        ))}
      </div>
    </div>
  );
});
