import React from "react";

export function RenderHeadline({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  highlights.forEach((hl) => {
    const idx = text.indexOf(hl, lastIndex);
    if (idx !== -1) {
      if (idx > lastIndex) {
        parts.push(text.substring(lastIndex, idx));
      }
      parts.push(
        <span
          key={idx}
          className="font-extrabold text-white underline decoration-white/40 decoration-2 underline-offset-4"
        >
          {hl}
        </span>,
      );
      lastIndex = idx + hl.length;
    }
  });

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts.length > 0 ? parts : text}</>;
}
