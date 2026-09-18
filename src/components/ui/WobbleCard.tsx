"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface WobbleCardProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  scale?: number;
  rotationIntensity?: number;
}

export function WobbleCard({
  children,
  containerClassName,
  className,
  style,
  scale = 1.015,
  rotationIntensity = 12,
}: WobbleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.6 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${rotationIntensity}deg`, `-${rotationIntensity}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${rotationIntensity}deg`, `${rotationIntensity}deg`]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    },
    [x, y]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style,
      }}
      animate={{
        scale: isHovered ? scale : 1,
      }}
      transition={{
        scale: { duration: 0.25, ease: "easeOut" },
      }}
      className={cn(
        "relative rounded-2xl transition-shadow duration-300 will-change-transform",
        containerClassName
      )}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "w-full h-full relative rounded-2xl overflow-hidden",
          className
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
