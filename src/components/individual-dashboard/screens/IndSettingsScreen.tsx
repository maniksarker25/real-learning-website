"use client";

import { memo, useCallback, useRef, useState } from "react";
import { Camera, CheckCircle2, Trash2, Upload, User } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  PageHeader,
  SettingRow,
  Toggle,
} from "@/components/dashboard/ui";

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
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(session.avatarUrl);
  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file (PNG, JPG or WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be smaller than 5MB.");
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) setAvatarUrl(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSelectPreset = useCallback((presetUrl: string) => {
    setAvatarUrl(presetUrl);
    setUploadError(null);
  }, []);

  const handleRemovePhoto = useCallback(() => {
    setAvatarUrl("");
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loginAsIndividual({ name, email, avatarUrl: avatarUrl || "" });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
    [loginAsIndividual, name, email, avatarUrl],
  );

  const savedBadge = saved && (
    <Badge tone="green">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Changes saved
    </Badge>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Profile & preferences"
        description="Update your photo, your details and how we keep in touch."
        actions={savedBadge}
      />

      <form onSubmit={handleSave} className="space-y-4">
        {/* photo */}
        <Card>
          <CardHeader title="Profile photo" description="Shown on your feedback reports and certificates." />

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-white/[0.06]">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Your profile photo" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-zinc-500">
                  <User className="h-9 w-9" />
                </span>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change photo"
                className="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>

            <div className="w-full flex-1 text-center sm:text-left">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                <Button variant="white" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4" />
                  Upload photo
                </Button>
                {avatarUrl && (
                  <Button variant="danger" size="sm" onClick={handleRemovePhoto}>
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
              <p className="mt-2 text-sm text-zinc-500">PNG, JPG or WEBP, up to 5MB.</p>
              {uploadError && <p className="mt-2 text-sm text-rose-400">{uploadError}</p>}

              <div className="mt-5 border-t border-white/[0.06] pt-5">
                <p className="text-sm text-zinc-400">Or pick one of these</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {AVATAR_PRESETS.map((preset) => {
                    const selected = avatarUrl === preset.url;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        title={preset.name}
                        aria-pressed={selected}
                        className={cn(
                          "h-11 w-11 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-[#181818] transition-colors",
                          selected ? "ring-orange-500" : "ring-transparent hover:ring-white/30",
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={preset.url} alt={preset.name} className="h-full w-full object-cover" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* details */}
        <Card>
          <CardHeader title="Your details" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </Field>
          </div>
        </Card>

        {/* notifications */}
        <Card>
          <CardHeader title="Notifications" />
          <div className="divide-y divide-white/[0.06]">
            <SettingRow title="Feedback reports" description="Get your score and coaching tips by email after each session.">
              <Toggle checked={emailNotifications} onChange={setEmailNotifications} label="Feedback reports" />
            </SettingRow>
            <SettingRow title="Streak reminders" description="A gentle nudge to keep your daily practice going.">
              <Toggle checked={streakReminders} onChange={setStreakReminders} label="Streak reminders" />
            </SettingRow>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3">
          {savedBadge}
          <Button type="submit" variant="primary" size="lg">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
});
