"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface RowActionMenuProps {
  items?: ActionMenuItem[];
  onSelect?: (actionId: string) => void;
  align?: "left" | "right";
  buttonAriaLabel?: string;
  className?: string;
  buttonClassName?: string;
  theme?: "dark" | "light" | "auto";
}

const DEFAULT_ITEMS: ActionMenuItem[] = [
  { id: "view", label: "View Profile" },
  { id: "edit-track", label: "Edit Track" },
  { id: "send-reminder", label: "Send Reminder" },
  { id: "export-report", label: "Export Report" },
];

export const RowActionMenu = memo(function RowActionMenu({
  items = DEFAULT_ITEMS,
  onSelect,
  align = "right",
  buttonAriaLabel = "Row actions",
  className,
  buttonClassName,
  theme = "auto",
}: RowActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto-detect theme from className if auto
  const isLight =
    theme === "light" ||
    (theme === "auto" &&
      Boolean(
        className &&
          (className.includes("stone") ||
            className.includes("gray") ||
            className.includes("text-black") ||
            className.includes("light")),
      ));

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const handleItemClick = useCallback(
    (item: ActionMenuItem, e: React.MouseEvent) => {
      e.stopPropagation();
      if (item.disabled) return;
      if (item.onClick) item.onClick();
      if (onSelect) onSelect(item.id);
      setIsOpen(false);
    },
    [onSelect],
  );

  return (
    <div ref={menuRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        aria-label={buttonAriaLabel}
        aria-expanded={isOpen}
        onClick={toggleMenu}
        className={cn(
          "w-7 h-7 rounded-md flex items-center justify-center transition-colors focus:outline-none",
          isLight
            ? "text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 border border-stone-200 focus:border-stone-400"
            : "text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 focus:border-white/25",
          isOpen &&
            (isLight
              ? "bg-stone-200 text-stone-950 border-stone-300"
              : "bg-white/15 text-white border-white/25"),
          buttonClassName,
        )}
      >
        <MoreHorizontal className="w-4 h-4 shrink-0" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 mt-1 min-w-[150px] rounded-lg py-1 select-none border shadow-sm",
            align === "right" ? "right-0" : "left-0",
            isLight
              ? "bg-white border-stone-200 text-stone-800"
              : "bg-[#141620] border-white/15 text-white/90",
          )}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={(e) => handleItemClick(item, e)}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-[12px] flex items-center gap-2 transition-colors",
                  isLight
                    ? item.danger
                      ? "text-rose-600 hover:bg-rose-50"
                      : "text-stone-700 hover:bg-stone-100"
                    : item.danger
                      ? "text-rose-400 hover:bg-rose-500/10"
                      : "text-white/85 hover:bg-white/[0.08]",
                  item.disabled && "opacity-40 cursor-not-allowed",
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5 shrink-0",
                      isLight ? "text-stone-500" : "text-white/60",
                    )}
                  />
                )}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});
