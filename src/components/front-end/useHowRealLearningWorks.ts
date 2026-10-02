"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SHOWCASE_STEPS } from "./learning-steps";

interface UseHowRealLearningWorksOptions {
  totalSteps?: number;
}

export interface HowRealLearningWorksState {
  activeIndex: number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  scrollToIndex: (index: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function useHowRealLearningWorks({
  totalSteps = SHOWCASE_STEPS.length,
}: UseHowRealLearningWorksOptions = {}): HowRealLearningWorksState {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback(
    (index: number) => {
      const nextIdx = Math.max(0, Math.min(totalSteps - 1, index));
      setActiveIndex(nextIdx);

      const container = scrollContainerRef.current;
      if (!container) return;

      const firstChild = container.firstElementChild as HTMLElement | null;
      const targetCard = container.children[nextIdx] as HTMLElement | null;

      if (firstChild && targetCard) {
        const baseOffset = firstChild.offsetLeft;
        const targetScroll = targetCard.offsetLeft - baseOffset;

        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: "smooth",
        });
      }
    },
    [totalSteps],
  );

  const handleNext = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  const handlePrev = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const firstChild = container.firstElementChild as HTMLElement | null;
        const baseOffset = firstChild ? firstChild.offsetLeft : 0;
        const children = Array.from(container.children) as HTMLElement[];

        let closestIdx = 0;
        let minDiff = Infinity;

        children.forEach((child, i) => {
          const childScrollPos = child.offsetLeft - baseOffset;
          const diff = Math.abs(childScrollPos - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });

        setActiveIndex(closestIdx);
      }, 60);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    activeIndex,
    scrollContainerRef,
    scrollToIndex,
    handleNext,
    handlePrev,
    isFirstStep: activeIndex === 0,
    isLastStep: activeIndex === totalSteps - 1,
  };
}
