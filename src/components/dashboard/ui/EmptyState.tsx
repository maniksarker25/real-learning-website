import type { ReactNode } from "react";
import { PatriciaPose, type PatriciaPoseName } from "./Patricia";

/** Friendly empty / zero state with Patricia. */
export function EmptyState({
  title,
  description,
  action,
  pose = "thinking",
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  pose?: PatriciaPoseName;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <PatriciaPose pose={pose} className="h-28 w-20" sizes="80px" />
      <p className="mt-4 text-base font-medium text-white">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-zinc-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
