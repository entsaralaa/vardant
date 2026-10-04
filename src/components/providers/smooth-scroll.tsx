"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useRouter } from "./router";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function SmoothScroll() {
  const { route } = useRouter();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisInstance = lenis;

    let animationFrame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);

      lenis.stop();
      lenis.destroy();

      if (lenisInstance === lenis) {
        lenisInstance = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleTransitionStart = () => {
      lenisInstance?.stop();
    };

    const handleTransitionComplete = () => {
      lenisInstance?.start();
    };

    window.addEventListener(
      "verdant:transition:start",
      handleTransitionStart
    );

    window.addEventListener(
      "verdant:transition:complete",
      handleTransitionComplete
    );

    return () => {
      window.removeEventListener(
        "verdant:transition:start",
        handleTransitionStart
      );

      window.removeEventListener(
        "verdant:transition:complete",
        handleTransitionComplete
      );
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    lenisInstance?.scrollTo(0, {
      immediate: true,
    });
  }, [route]);

  return null;
}