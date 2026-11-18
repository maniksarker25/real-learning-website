import { CheckCircle2 } from "lucide-react";

/** Small confirmation toast, top-right. Render it only while there is a message. */
export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="fixed right-4 top-20 z-[110] flex max-w-[calc(100vw-2rem)] items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-[#1c1c1c] px-4 py-3 text-sm text-white shadow-2xl shadow-black/50 sm:right-6"
    >
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
      {message}
    </div>
  );
}
