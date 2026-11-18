"use client";

import { memo, useCallback, useState } from "react";
import { Check, CheckCircle2, Shield, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, Field, Input, Modal, Select } from "@/components/dashboard/ui";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (user: { name: string; email: string; role: "admin" | "member"; track: string }) => void;
}

const ROLES = [
  { value: "member", label: "Member", desc: "Completes assigned classes and simulations.", icon: User },
  { value: "admin", label: "Admin", desc: "Invites members and views team progress.", icon: Shield },
] as const;

export const InviteUserModal = memo(function InviteUserModal({ isOpen, onClose, onInvite }: InviteUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "member">("member");
  const [track, setTrack] = useState("Customer Service");
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onInvite({ name, email, role, track });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setEmail("");
        setRole("member");
        onClose();
      }, 1500);
    },
    [name, email, role, track, onInvite, onClose],
  );

  return (
    <Modal open={isOpen} onClose={onClose} title="Invite a member" className="max-w-lg">
      {success ? (
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
          <p className="mt-3 text-lg font-medium text-white">Invite sent</p>
          <p className="mt-1 text-sm text-zinc-400">
            {name} was invited as {role === "admin" ? "an admin" : "a member"} on the {track} track.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Full name">
            <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex Morgan" />
          </Field>
          <Field label="Work email">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
            />
          </Field>

          <div>
            <p className="mb-2 text-sm font-medium text-white">Role</p>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Role">
              {ROLES.map((r) => {
                const active = role === r.value;
                const Icon = r.icon;
                return (
                  <button
                    key={r.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setRole(r.value)}
                    className={cn(
                      "relative rounded-xl border p-4 text-left transition-colors",
                      active ? "border-orange-500 bg-orange-500 text-black" : "border-white/[0.08] text-white hover:border-white/25",
                    )}
                  >
                    <span className="flex items-center gap-2 text-base font-semibold">
                      <Icon className="h-4 w-4" />
                      {r.label}
                    </span>
                    <span className={cn("mt-1 block text-sm", active ? "text-black/70" : "text-zinc-500")}>{r.desc}</span>
                    {active && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <Field label="Career track">
            <Select value={track} onChange={(e) => setTrack(e.target.value)}>
              <option value="Customer Service">Customer Service</option>
              <option value="Tech Support">Tech Support</option>
              <option value="IT Specialist">IT Specialist</option>
              <option value="Healthcare Support">Healthcare Support</option>
            </Select>
          </Field>

          <Button type="submit" variant="white" size="lg" className="w-full">
            Send invite
          </Button>
        </form>
      )}
    </Modal>
  );
});
