"use client";

import { useEffect } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * - LazyMotion keeps the Motion bundle small (only DOM animation features).
 * - reducedMotion="user": under prefers-reduced-motion, transforms are skipped and
 *   only opacity animates, so every reveal becomes a cross-fade.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  // iOS Safari only applies :active (our press state) when a touch listener exists.
  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
