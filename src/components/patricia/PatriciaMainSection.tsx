"use client";

import React, { useRef, useState, useCallback } from "react";
import { PatriciaOpeningHero } from "./PatriciaOpeningHero";
import { PatriciaChatExperience } from "./PatriciaChatExperience";

export function PatriciaMainSection() {
  const patriciaSectionRef = useRef<HTMLDivElement>(null);
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);

  const handleSlideUpToPatricia = useCallback((prompt?: string) => {
    if (prompt) {
      setInitialPrompt(prompt);
    }
    if (patriciaSectionRef.current) {
      patriciaSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleClearInitialPrompt = useCallback(() => {
    setInitialPrompt(null);
  }, []);

  return (
    <>
      <PatriciaOpeningHero onSlideUp={handleSlideUpToPatricia} />

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
    </>
  );
}
