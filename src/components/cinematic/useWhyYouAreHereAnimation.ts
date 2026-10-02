"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface WhyYouAreHereAnimationRefs {
  containerRef: React.RefObject<HTMLElement | null>;
  pinWrapperRef: React.RefObject<HTMLDivElement | null>;
  titleBlockRef: React.RefObject<HTMLDivElement | null>;
  titleInnerRef: React.RefObject<HTMLDivElement | null>;
  underlineRef: React.RefObject<HTMLSpanElement | null>;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function useWhyYouAreHereAnimation(): WhyYouAreHereAnimationRefs {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !pinWrapperRef.current ||
      !titleBlockRef.current ||
      !titleInnerRef.current ||
      !chatContainerRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;
      const navbarHeight = isMobile ? 54 : 64;
      const initialPadTop = navbarHeight + (isMobile ? 6 : 14);
      const initialPadBottom = isMobile ? 8 : 16;
      const initialPadX = isMobile ? 10 : 24;
      const initialMarginBottom = isMobile ? 6 : 16;

      // Capture natural unconstrained title height
      const titleHeight =
        titleInnerRef.current?.offsetHeight || (isMobile ? 65 : 110);

      // Initial state
      gsap.set(pinWrapperRef.current, {
        backgroundColor: "#fdceb2",
        paddingTop: `${initialPadTop}px`,
        paddingBottom: `${initialPadBottom}px`,
        paddingLeft: `${initialPadX}px`,
        paddingRight: `${initialPadX}px`,
      });

      gsap.set(titleBlockRef.current, {
        height: titleHeight,
        marginBottom: `${initialMarginBottom}px`,
        marginTop: 0,
        opacity: 1,
      });

      gsap.set(titleInnerRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
      });

      if (underlineRef.current) {
        gsap.set(underlineRef.current, { scaleX: 0 });
      }

      gsap.set(chatContainerRef.current, {
        width: "100%",
        maxWidth: isMobile ? "100%" : "56rem", // max-w-4xl (896px)
        borderRadius: isMobile ? "14px" : "20px",
      });

      // Timeline configuration
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.3)}`,
          pin: pinWrapperRef.current,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Step A (0 -> 0.15): Underline on "outmoded" draws in
      if (underlineRef.current) {
        tl.to(
          underlineRef.current,
          {
            scaleX: 1,
            duration: 0.15,
            ease: "power2.out",
          },
          0,
        );
      }

      // Step B (0.05 -> 0.25): Title content fades out cleanly first
      tl.to(
        titleInnerRef.current,
        {
          y: -16,
          opacity: 0,
          scale: 0.97,
          duration: 0.2,
          ease: "power2.inOut",
        },
        0.05,
      );

      // Step C (0.18 -> 0.45): Smoothly collapse outer title container height
      tl.to(
        titleBlockRef.current,
        {
          height: 0,
          marginBottom: 0,
          marginTop: 0,
          duration: 0.27,
          ease: "power2.inOut",
        },
        0.18,
      );

      // Step D (0.15 -> 0.6): Pin wrapper background darkens and padding goes flush to navbar
      tl.to(
        pinWrapperRef.current,
        {
          backgroundColor: "#0c0b0a",
          paddingTop: `${navbarHeight}px`,
          paddingBottom: "0px",
          paddingLeft: "0px",
          paddingRight: "0px",
          duration: 0.45,
          ease: "power1.inOut",
        },
        0.15,
      );

      // Step E (0.15 -> 0.65): Chat container expands to full width & flush edges
      tl.to(
        chatContainerRef.current,
        {
          maxWidth: "100%",
          borderRadius: "0px",
          duration: 0.5,
          ease: "power2.inOut",
        },
        0.15,
      );

      // Step F: Hold at full-screen immersion before unpinning
      tl.to({}, { duration: 0.25 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return {
    containerRef,
    pinWrapperRef,
    titleBlockRef,
    titleInnerRef,
    underlineRef,
    chatContainerRef,
  };
}
