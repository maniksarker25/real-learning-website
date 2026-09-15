"use client";

import React, { RefObject } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogueSimulationCardProps {
  cardRef: RefObject<HTMLDivElement | null>;
  inputContainerRef: RefObject<HTMLDivElement | null>;
  sendButtonRef: RefObject<HTMLButtonElement | null>;
  cursorPos: { x: number; y: number };
  cursorDuration: number;
  isClicking: boolean;
  isCustomerTyping: boolean;
  isInputFocused: boolean;
  isSendPressed: boolean;
  displayedSpeaker: "Customer" | "Learner";
  displayedRole: string;
  displayedMessage: string;
  typedText: string;
  suggestedReplyPlaceholder: string;
}

export function DialogueSimulationCard({
  cardRef,
  inputContainerRef,
  sendButtonRef,
  cursorPos,
  cursorDuration,
  isClicking,
  isCustomerTyping,
  isInputFocused,
  isSendPressed,
  displayedSpeaker,
  displayedRole,
  displayedMessage,
  typedText,
  suggestedReplyPlaceholder,
}: DialogueSimulationCardProps) {
  return (
    <div
      ref={cardRef}
      className="flex-1 h-[240px] max-h-[240px] relative rounded-[30px] bg-[#121318] text-white p-4 sm:p-5 border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden"
    >
      {/* Virtual Mouse Pointer Cursor that glides, clicks, types and sends */}
      <motion.div
        animate={{
          x: cursorPos.x,
          y: cursorPos.y,
        }}
        transition={{
          duration: cursorDuration,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="absolute top-0 left-0 pointer-events-none z-30 transform -translate-x-1 -translate-y-1"
      >
        {/* Click Ripple Pulse */}
        {isClicking && (
          <motion.span
            initial={{ scale: 0.3, opacity: 0.9 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-400/40 border border-emerald-300 pointer-events-none"
          />
        )}

        {/* Clean OS-style Mouse Pointer SVG */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
        >
          <path
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.86a.5.5 0 0 0-.35.35z"
            fill="#ffffff"
            stroke="#0d0e12"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <div className="relative z-10">
        {/* Header with Simulation Status */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
              Simulation Dialogue
            </span>
          </div>

          {isCustomerTyping ? (
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-orange-300">
              <span>Customer responding</span>
              <span className="flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-orange-400 animate-bounce" />
                <span className="w-1 h-1 rounded-full bg-orange-400 animate-bounce [animation-delay:0.15s]" />
                <span className="w-1 h-1 rounded-full bg-orange-400 animate-bounce [animation-delay:0.3s]" />
              </span>
            </div>
          ) : (
            <span className="text-[9px] font-mono text-emerald-400/90">
              {displayedSpeaker === "Learner"
                ? "Response Evaluated"
                : "Awaiting Specialist"}
            </span>
          )}
        </div>

        {/* Active Dialogue Bubble (Fixed Height: 74px) */}
        <div className="relative rounded-2xl p-3 my-0.5 backdrop-blur-sm overflow-hidden h-[74px] flex flex-col justify-start">
          <div className="flex items-center gap-2 mb-1 shrink-0">
            <span
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0",
                displayedSpeaker === "Customer"
                  ? "bg-orange-500/20 border border-orange-400/40 text-orange-300"
                  : "bg-emerald-500/20 border border-emerald-400/40 text-emerald-300",
              )}
            >
              {displayedSpeaker === "Customer" ? "C" : "S"}
            </span>
            <span className="text-[11px] font-mono font-bold text-white/90">
              {displayedSpeaker}
            </span>
            <span className="text-[10px] font-mono text-white/40">
              • {displayedRole}
            </span>
          </div>

          <p className="text-xs line-clamp-1 sm:text-sm text-white/95 italic font-medium leading-snug pl-7">
            {displayedMessage}
          </p>
        </div>
      </div>

      {/* Simulated Clickable Input Field & Send Button (Cursor enters, clicks, types, and sends) */}
      <div
        ref={inputContainerRef}
        className={cn(
          "relative z-10 flex items-center gap-2 bg-white/[0.06] border rounded-2xl p-1 sm:p-1.5 transition-all duration-200 h-[46px]",
          isInputFocused
            ? "border-emerald-400/80 bg-white/[0.1] ring-2 ring-emerald-500/20 shadow-lg"
            : "border-white/15",
        )}
      >
        <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[10px] font-mono font-bold text-emerald-300 shrink-0 ml-1">
          S
        </span>

        <div className="flex-1 text-xs sm:text-sm text-white font-medium px-1.5 flex items-center min-h-[22px] overflow-hidden whitespace-nowrap">
          {typedText ? (
            <>
              <span className="truncate">{typedText}</span>
              <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-emerald-400 animate-pulse shrink-0" />
            </>
          ) : (
            <span className="text-white/35 truncate">
              {suggestedReplyPlaceholder}
            </span>
          )}
        </div>

        <button
          ref={sendButtonRef}
          type="button"
          tabIndex={-1}
          className={cn(
            "shrink-0 px-3 py-1.5 rounded-xl text-white flex items-center gap-1.5 shadow-md text-xs font-bold transition-all duration-150 transform",
            isSendPressed
              ? "scale-95 bg-emerald-600 ring-2 ring-emerald-400/50"
              : "bg-emerald-500",
          )}
        >
          <span>Send</span>
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
