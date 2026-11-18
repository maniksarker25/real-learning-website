"use client";

import { memo, useCallback, useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { Button, Field, Input, Modal, Select } from "@/components/dashboard/ui";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (member: { name: string; email: string; track: string }) => void;
}

const TRACKS = ["Customer Service", "Tech Support", "IT Specialist", "Healthcare Support"];

export const InviteMemberModal = memo(function InviteMemberModal({ isOpen, onClose, onInvite }: InviteMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState("Customer Service");
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onInvite({ name, email, track });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setEmail("");
        onClose();
      }, 1500);
    },
    [name, email, track, onInvite, onClose],
  );

  return (
    <Modal open={isOpen} onClose={onClose} title="Invite a team member" className="max-w-md">
      {success ? (
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
          <p className="mt-4 text-lg font-medium text-white">Invite sent</p>
          <p className="mt-1 text-sm text-zinc-400">
            {name} will start on the {track} track.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="-mt-2 text-sm text-zinc-400">Pick the career track they&apos;ll practice first.</p>
          <Field label="Full name">
            <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah Jenkins" />
          </Field>
          <Field label="Work email">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@company.com"
            />
          </Field>
          <Field label="Career track">
            <span className="relative block">
              <Select value={track} onChange={(e) => setTrack(e.target.value)}>
                {TRACKS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            </span>
          </Field>
          <Button type="submit" size="lg" className="w-full">
            Send invite
          </Button>
        </form>
      )}
    </Modal>
  );
});
