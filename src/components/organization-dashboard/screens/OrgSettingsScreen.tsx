"use client";

import { useState, useCallback, memo } from "react";
import { Check, Copy, Crown, Info, Lock, Shield } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { OrgRole } from "@/types/account";
import {
  Badge,
  BlobCard,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  PageHeader,
  Select,
} from "@/components/dashboard/ui";

const SEAT_OPTIONS = [
  { value: "10", label: "10 seats · Starter team" },
  { value: "25", label: "25 seats · Recommended" },
  { value: "50", label: "50 seats · Growing team" },
  { value: "100+", label: "100+ seats · Large organization" },
];

const LICENSE_KEY = "RL-ORG-2026-PILOT-8F923-KEY-ENCRYPTED";

export const OrgSettingsScreen = memo(function OrgSettingsScreen() {
  const { session, loginAsOrganization } = useAccount();
  const currentOrgRole: OrgRole = session.orgRole || "owner";
  const isOwner = currentOrgRole === "owner";

  const [orgName, setOrgName] = useState(session.orgName || "Acme Corp");
  const [email, setEmail] = useState(session.email || "admin@acmecorp.com");
  const [seats, setSeats] = useState(session.seats || "25");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loginAsOrganization({ orgName, email, seats, orgRole: currentOrgRole });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
    [loginAsOrganization, orgName, email, seats, currentOrgRole],
  );

  const copyKey = useCallback(() => {
    navigator.clipboard?.writeText(LICENSE_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const savedBadge = saved && (
    <Badge tone="green">
      <Check className="h-3.5 w-3.5" />
      Changes saved
    </Badge>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Workspace settings"
        description={
          isOwner
            ? "Manage your organization details, seats and invite key."
            : "View your workspace details. Seats and billing are managed by the owner."
        }
        actions={
          <>
            {savedBadge}
            <Badge tone={isOwner ? "amber" : "blue"}>
              {isOwner ? <Crown className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
              {isOwner ? "Owner" : "Admin"}
            </Badge>
          </>
        }
      />

      {!isOwner && (
        <div className="flex gap-3 rounded-2xl border border-sky-500/20 bg-sky-500/[0.08] p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
          <p className="text-sm leading-relaxed text-zinc-300">
            <span className="font-medium text-white">You&apos;re an admin.</span> You can invite members, assign
            simulations and review progress. Changing seats, billing and ownership is up to the owner.
          </p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-3">
        <Card>
          <CardHeader title="Workspace details" description="Your organization name and main contact." />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Organization name">
              <Input
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                disabled={!isOwner}
                placeholder="e.g. Acme Corporation"
                autoComplete="organization"
                className="disabled:cursor-not-allowed disabled:text-zinc-500"
              />
            </Field>
            <Field label="Admin email">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isOwner}
                placeholder="admin@company.com"
                autoComplete="email"
                className="disabled:cursor-not-allowed disabled:text-zinc-500"
              />
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Seats"
            description="How many people can practice in this workspace."
            action={
              !isOwner && (
                <Badge>
                  <Lock className="h-3.5 w-3.5" />
                  Owner only
                </Badge>
              )
            }
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <BlobCard tone="orange" className="p-5 sm:p-6">
              <p className="text-sm text-white/80">Current plan</p>
              <p className="mt-1 text-4xl font-semibold tracking-[-0.02em] tabular-nums">{seats} seats</p>
            </BlobCard>
            <div className="flex flex-col justify-center">
              {isOwner ? (
                <Field label="Change seats">
                  <Select value={seats} onChange={(e) => setSeats(e.target.value)}>
                    {SEAT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              ) : (
                <p className="text-sm text-zinc-500">Ask your workspace owner to add or remove seats.</p>
              )}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Invite key"
            description="Share this key with new learners when they join your workspace."
            action={<Badge tone="green">Active</Badge>}
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <code className="min-w-0 flex-1 select-all truncate rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 text-sm text-zinc-200">
              {LICENSE_KEY}
            </code>
            <Button variant="outline" onClick={copyKey} className="h-auto py-3">
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy key"}
            </Button>
          </div>
        </Card>

        {isOwner && (
          <div className="flex items-center justify-end gap-3 pt-3">
            {savedBadge}
            <Button type="submit" size="lg">
              Save changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
});
