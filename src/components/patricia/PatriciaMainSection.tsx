"use client";

import React, { useRef, useState, useCallback } from "react";
import { PatriciaChatExperience } from "./PatriciaChatExperience";
import { useLenis } from "lenis/react";

export function PatriciaMainSection() {
  const patriciaSectionRef = useRef<HTMLDivElement>(null);
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);
  const lenis = useLenis();

  const handleSlideUpToPatricia = useCallback(
    (prompt?: string) => {
      if (prompt) {
        setInitialPrompt(prompt);
      }
      if (patriciaSectionRef.current) {
        if (lenis) {
          lenis.scrollTo(patriciaSectionRef.current, {
            offset: -40,
            duration: 1.2,
          });
        } else {
          patriciaSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [lenis],
  );

  const handleClearInitialPrompt = useCallback(() => {
    setInitialPrompt(null);
  }, []);

  return (
    <div
      id="patricia-experience"
      ref={patriciaSectionRef}
      className="bg-orange-50"
    >
      <PatriciaChatExperience
        initialPrompt={initialPrompt}
        onClearInitialPrompt={handleClearInitialPrompt}
      />
    </div>
  );
}
