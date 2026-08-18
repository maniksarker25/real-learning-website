"use client";

import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, X, CheckCircle2 } from "lucide-react";

interface OrgAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrgAccessModal = memo(function OrgAccessModal({
  isOpen,
  onClose,
}: OrgAccessModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-[#0e0f17] border border-orange-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-400/30 flex items-center justify-center text-orange-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Get Organization Access
                </h3>
                <p className="text-xs text-white/60">
                  Request an enterprise workspace for your team or school.
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">
                  Access Request Received!
                </div>
                <p className="text-xs text-white/60">
                  An Enterprise Account Executive will contact your organization
                  within 12 hours with your onboarding key.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Organization / University Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Acme University / Corp"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="admin@acme.org"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Expected Seats
                    </label>
                    <select className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-400">
                      <option value="50-100">50 - 250 Learners</option>
                      <option value="250-1000">250 - 1,000 Learners</option>
                      <option value="1000+">1,000+ Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Special Requirements / Message
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your learning objectives..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:opacity-95 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Request Organization Access</span>
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-white/10 text-[11px] text-white/50 flex items-center justify-between">
              <span>Includes Org Dashboard & Instant Analytics</span>
              <span className="text-orange-400 font-mono font-semibold">
                Instant Setup
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
