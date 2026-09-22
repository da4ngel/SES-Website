"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

// useLayoutEffect warns during static prerender; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Counts up once when scrolled into view. The final value is always in the HTML
 * (for SEO / no-JS) and in the accessible label, so screen readers never hear the count.
 * Reduced motion: shows the final value, no count.
 */
export function StatNumber({ value, prefix = "", suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const started = useRef(false);

  // Before first paint: reset to 0 if it will animate (stats sit below the fold).
  useIsoLayoutEffect(() => {
    if (!reduced && numRef.current && !started.current) numRef.current.textContent = "0";
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      ...spring.calm,
      onUpdate: (v) => {
        if (numRef.current) numRef.current.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        <span ref={numRef}>{value}</span>
        {suffix}
      </span>
    </span>
  );
}
