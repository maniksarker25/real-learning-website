"use client";

import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, Sparkles, ShieldCheck } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal = memo(function AboutModal({
  isOpen,
  onClose,
}: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-xl bg-[#0e0f17] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-400/30 flex items-center justify-center text-orange-400">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">About Real Learning</h3>
                <p className="text-xs text-white/60">
                  Bridging the gap between education and workplace execution.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-white/80 leading-relaxed">
              <p>
                <strong className="text-white">Real Learning</strong> is an AI-powered simulation platform designed to give students, job seekers, and employees hands-on experience in real workplace situations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-black/50 p-3.5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-orange-300">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                    <span>Realistic Scenarios</span>
                  </div>
                  <p className="text-[11px] text-white/60">
                    No static reading. Engage in dynamic, real-time AI workplace challenges.
                  </p>
                </div>

                <div className="bg-black/50 p-3.5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                    <span>Actionable Feedback</span>
                  </div>
                  <p className="text-[11px] text-white/60">
                    Receive instant skill mastery scores and personalized guidance after every run.
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-white/60 pt-2">
                Our mission is to ensure every individual can experience their career before they enter it, building confidence, mastery, and verified credentials.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-white/50">Founded for Next-Gen Skill Mastery</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-white/90 cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
