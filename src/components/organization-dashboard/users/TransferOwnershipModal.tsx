"use client";

import { memo, useCallback, useState } from "react";
import { AlertTriangle, CheckCircle2, Crown } from "lucide-react";
import { Button, Modal } from "@/components/dashboard/ui";
import type { UserItem } from "./types";

interface TransferOwnershipModalProps {
  targetUser: UserItem | null;
  onClose: () => void;
  onConfirm: (target: UserItem) => void;
}

export const TransferOwnershipModal = memo(function TransferOwnershipModal({
  targetUser,
  onClose,
  onConfirm,
}: TransferOwnershipModalProps) {
  const [success, setSuccess] = useState(false);

  const handleConfirm = useCallback(() => {
    if (!targetUser) return;
    onConfirm(targetUser);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  }, [targetUser, onConfirm, onClose]);

  if (!targetUser) return null;

  return (
    <Modal open onClose={onClose} title="Transfer ownership" className="max-w-lg">
      {success ? (
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
          <p className="mt-3 text-lg font-medium text-white">Ownership transferred</p>
          <p className="mt-1 text-sm text-zinc-400">{targetUser.name} is now the organization owner.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex gap-3 rounded-2xl bg-amber-500/10 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <p className="text-sm leading-relaxed text-zinc-300">
              You&apos;re making <span className="font-medium text-white">{targetUser.name}</span> ({targetUser.email}) the
              owner. Your role will change to <span className="font-medium text-white">Admin</span>.
            </p>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <Button variant="outline" size="lg" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button size="lg" onClick={handleConfirm} className="flex-1">
              <Crown className="h-4 w-4" />
              Confirm transfer
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
});
