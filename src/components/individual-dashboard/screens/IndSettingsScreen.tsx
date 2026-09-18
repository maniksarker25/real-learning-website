"use client";

import React, { useState, useCallback, useRef, memo } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Upload,
  Trash2,
  Sparkles,
  Settings,
  Bell,
  Volume2,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";
import {
  VictorianCornerFlourish,
  EngravedSeal,
  StarburstRosette,
} from "@/components/ui/DecorativeAssets";

// Curated avatar presets for quick selection
const AVATAR_PRESETS = [
  {
    id: "preset-1",
    name: "Customer Specialist",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "preset-2",
    name: "Tech Support Lead",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "preset-3",
    name: "IT Systems Specialist",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "preset-4",
    name: "Healthcare Care Specialist",
    url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
];

export const IndSettingsScreen = memo(function IndSettingsScreen() {
  const { session, loginAsIndividual } = useAccount();

  const [name, setName] = useState(session.name || "Hosain Ali");
  const [email, setEmail] = useState(session.email || "hosain@reallearning.ai");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    session.avatarUrl
  );
  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Simulation & App Preferences
  const [voiceAudioEnabled, setVoiceAudioEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [simulationSubtitles, setSimulationSubtitles] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local image file selection
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setUploadError("Please select a valid image file (PNG, JPG, WEBP).");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image size must be smaller than 5MB.");
        return;
      }

      setUploadError(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setAvatarUrl(result);
        }
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleSelectPreset = useCallback((presetUrl: string) => {
    setAvatarUrl(presetUrl);
    setUploadError(null);
  }, []);

  const handleRemovePhoto = useCallback(() => {
    setAvatarUrl("");
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loginAsIndividual({
        name,
        email,
        avatarUrl: avatarUrl || "",
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
    [loginAsIndividual, name, email, avatarUrl]
  );

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 relative overflow-hidden shadow-sm">
        <VictorianCornerFlourish
          position="top-right"
          className="absolute top-2 right-2 text-stone-300/60 hidden sm:block pointer-events-none"
        />
        <EngravedSeal
          size={90}
          className="absolute -right-6 -bottom-6 text-stone-900/5 pointer-events-none hidden sm:block"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                  Profile & Preferences
                </h1>
                <StarburstRosette size={14} className="text-orange-500/70" />
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Manage your learner credentials, display avatar, audio preferences, and workspace settings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saved && (
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Changes Saved!</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Profile Picture & Avatar Section */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-orange-600" />
              <h2 className="text-xs sm:text-sm font-bold text-stone-900">
                Display Avatar & Profile Picture
              </h2>
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              PNG, JPG or WEBP (Max 5MB)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar Preview */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-0.5 shadow-sm">
                <div className="w-full h-full rounded-[14px] bg-[#FAF8F5] overflow-hidden flex items-center justify-center relative">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-stone-400 space-y-1">
                      <User className="w-8 h-8 text-stone-300" />
                      <span className="text-[9px] font-mono text-stone-400">
                        No Photo
                      </span>
                    </div>
                  )}

                  {/* Overlay trigger */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1 cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-orange-300" />
                    <span className="text-[10px] font-bold">Change</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Upload & Action Controls */}
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                  Custom Picture
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Your picture appears in interactive AI simulations, feedback scorecards, and certificates.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                </button>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-red-50 hover:text-red-700 text-stone-600 border border-stone-200 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-stone-400" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              {uploadError && (
                <p className="text-xs text-red-600 font-medium">
                  {uploadError}
                </p>
              )}

              {/* Preset Avatar Selection */}
              <div className="pt-2.5 space-y-1.5 border-t border-stone-100">
                <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold block">
                  Or select a preset avatar:
                </span>
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  {AVATAR_PRESETS.map((preset) => {
                    const isSelected = avatarUrl === preset.url;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        title={preset.name}
                        className={cn(
                          "w-9 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer p-0.5 relative group",
                          isSelected
                            ? "border-orange-500 scale-105 shadow-sm"
                            : "border-stone-200 hover:border-stone-300 hover:scale-105"
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account & Profile Details */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-orange-600" />
              <h2 className="text-xs sm:text-sm font-bold text-stone-900">
                Personal Credentials & Identity
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Full Display Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-900 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-900 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Simulation & Experience Preferences */}
        {/* <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-orange-600" />
              <h2 className="text-xs sm:text-sm font-bold text-stone-900">
                Simulation & Audio Experience
              </h2>
            </div>
            <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">
              Live Engine
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
              <div>
                <span className="text-xs font-semibold text-stone-900 block">
                  AI Voice Dialogue & Speech
                </span>
                <span className="text-[11px] text-stone-500">
                  Hear natural AI speech responses during interactive workplace scenarios.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setVoiceAudioEnabled(!voiceAudioEnabled)}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
                  voiceAudioEnabled ? "bg-stone-900" : "bg-stone-300"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform absolute top-1",
                    voiceAudioEnabled ? "right-1" : "left-1"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
              <div>
                <span className="text-xs font-semibold text-stone-900 block">
                  Real-time Captions & Subtitles
                </span>
                <span className="text-[11px] text-stone-500">
                  Display real-time transcription subtitles alongside voice audio.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSimulationSubtitles(!simulationSubtitles)}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
                  simulationSubtitles ? "bg-stone-900" : "bg-stone-300"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform absolute top-1",
                    simulationSubtitles ? "right-1" : "left-1"
                  )}
                />
              </button>
            </div>
          </div>
        </div> */}

        {/* Notifications & Reminders */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-orange-600" />
              <h2 className="text-xs sm:text-sm font-bold text-stone-900">
                Notifications & Practice Alerts
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
              <div>
                <span className="text-xs font-semibold text-stone-900 block">
                  Simulation Feedback & Score Reports
                </span>
                <span className="text-[11px] text-stone-500">
                  Receive summary breakdown and coaching tips after completing assessments.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
                  emailNotifications ? "bg-stone-900" : "bg-stone-300"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform absolute top-1",
                    emailNotifications ? "right-1" : "left-1"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
              <div>
                <span className="text-xs font-semibold text-stone-900 block">
                  Daily Streak Reminders
                </span>
                <span className="text-[11px] text-stone-500">
                  Gentle nudge to maintain your consistency streak and weekly practice goal.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStreakReminders(!streakReminders)}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
                  streakReminders ? "bg-stone-900" : "bg-stone-300"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform absolute top-1",
                    streakReminders ? "right-1" : "left-1"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Submit & Save Footer */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span>Save Profile Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
});
