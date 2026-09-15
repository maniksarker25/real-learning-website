"use client";

import React, { useState, useEffect } from "react";
import { useSpring } from "framer-motion";

/** Smooth physical spring number counter for Framer Motion */
export function AnimatedScore({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const spring = useSpring(value, { stiffness: 60, damping: 15, mass: 0.8 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
  }, [spring]);

  return <span className={className}>{display}%</span>;
}
