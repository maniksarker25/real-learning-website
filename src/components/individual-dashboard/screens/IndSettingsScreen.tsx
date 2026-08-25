"use client";

import React, { useState, useCallback, memo } from "react";
import { User, Mail, ShieldCheck, CheckCircle2, Award } from "lucide-react";
import { useAccount } from "@/context/AccountContext";

export const IndSettingsScreen = memo(function IndSettingsScreen() {
  const { session, loginAsIndividual } = useAccount();
  const [name, setName] = useState(session.name || "Hosain Ali");
  const [email, setEmail] = useState(session.email || "hosain@reallearning.ai");
  const [saved, setSaved] = useState(false);

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loginAsIndividual({ name, goal: session.goal });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
    [loginAsIndividual, name, session.goal]
  );

  return (
    <div className="space-y-6">
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-orange-400" />
          <span>Learner Profile & Account Settings</span>
        </h2>
        <p className="text-xs text-white/60">
          Manage your display name, personal learning email, and goal settings.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-lg space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2">
              Display Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-white text-black hover:bg-white/90 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Save Profile Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
});
