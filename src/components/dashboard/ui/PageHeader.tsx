import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { display } from "@/components/about/shared";
import { Tag } from "./Tag";

/** Top of every dashboard page: eyebrow tag, big display title, description, actions. */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="min-w-0">
        {eyebrow && <Tag className="mb-3">{eyebrow}</Tag>}
        <h1
          className={cn(
            display.className,
            "text-[28px] uppercase leading-[1.05] tracking-[-0.01em] text-white sm:text-4xl",
          )}
        >
          {title}
        </h1>
        {description && <p className="mt-3 max-w-xl text-base text-zinc-400">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

/** Section title between blocks on a page. */
export function SectionTitle({
  title,
  action,
  className,
}: {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-center justify-between gap-3", className)}>
      <h2 className={cn(display.className, "text-base uppercase tracking-[-0.01em] text-white sm:text-lg")}>
        {title}
      </h2>
      {action}
    </div>
  );
}
