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
  Target,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";

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
  const [goal, setGoal] = useState(session.goal || "Customer Service");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    session.avatarUrl,
  );
  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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
    [],
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
        goal,
        email,
        avatarUrl: avatarUrl || "",
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
    [loginAsIndividual, name, goal, email, avatarUrl],
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-xs text-orange-300 font-medium mb-2">
            <User className="w-3.5 h-3.5 text-orange-400" />
            <span>PERSONAL PROFILE SETTINGS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Profile & Avatar Settings
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Update your display picture, learner credentials, and target growth
            track.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
          <span>Profile and profile picture updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Picture Upload Section */}
        <div className="bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-orange-400" />
              <span>Profile Picture</span>
            </h3>
            <span className="text-[10px] font-mono text-white/40">
              PNG, JPG or WEBP up to 5MB
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar Preview */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 p-0.5 shadow-xl">
                <div className="w-full h-full rounded-[14px] bg-[#0d0e15] overflow-hidden flex items-center justify-center relative">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/50 space-y-1">
                      <User className="w-10 h-10 text-white/40" />
                      <span className="text-[9px] font-mono text-white/30">
                        No Photo
                      </span>
                    </div>
                  )}

                  {/* Overlay trigger */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1 cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-orange-300" />
                    <span className="text-[10px] font-bold">Change</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Upload & Action Controls */}
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">
                  Upload Custom Avatar
                </h4>
                <p className="text-xs text-white/60">
                  Your picture will be displayed across your learner dashboard,
                  simulations, and workspace memberships.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
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
                  className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New Photo</span>
                </button>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 text-white/60 border border-white/10 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>

              {uploadError && (
                <p className="text-xs text-rose-400 font-medium">
                  {uploadError}
                </p>
              )}

              {/* Preset Avatar Selection */}
              <div className="pt-3 space-y-2 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase text-white/40 block">
                  Or select a avatar preset:
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
                          "w-10 h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer p-0.5 relative group",
                          isSelected
                            ? "border-orange-400 scale-105 shadow-md shadow-orange-500/20"
                            : "border-white/10 hover:border-white/30 hover:scale-105",
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-orange-400" />
            <span>Account & Learning Details</span>
          </h3>

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
                  placeholder="Enter your name"
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
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
                  placeholder="Enter your email"
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2">
              Primary Career Growth Track
            </label>
            <div className="relative">
              <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-orange-400 transition-colors appearance-none cursor-pointer"
              >
                <option value="Customer Service">
                  Customer service and communication
                </option>
                <option value="Tech Support">Tech Support Specialist</option>
                <option value="IT Specialist">
                  IT Infrastructure Specialist
                </option>
                <option value="Healthcare Support">
                  Healthcare Patient Support
                </option>
              </select>
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
        </div>
      </form>
    </div>
  );
});
