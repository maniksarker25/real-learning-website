"use client";

import React, { memo, useState, useCallback } from "react";
import { X, Crown, AlertTriangle, CheckCircle2 } from "lucide-react";
import { UserItem } from "./types";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Transfer Ownership
            </h3>
            <p className="text-xs text-stone-500">
              Grant primary organization control to an admin.
            </p>
          </div>
        </div>

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <div className="text-sm font-bold text-stone-900">
              Ownership Transferred!
            </div>
            <p className="text-xs text-stone-600">
              {targetUser.name} is now the Organization Owner.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                You are transferring primary ownership to{" "}
                <span className="font-bold text-stone-900">
                  {targetUser.name} ({targetUser.email})
                </span>
                . Your role will be converted to <strong>Admin</strong>.
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Crown className="w-4 h-4" />
                <span>Confirm Transfer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
