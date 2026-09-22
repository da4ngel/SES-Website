"use client";

import * as m from "motion/react-m";
import { reveal, staggerDelay } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Position among siblings: staggers by 50ms, capped (see lib/motion.ts) */
  index?: number;
  /** Explicit delay in seconds (overrides index) */
  delay?: number;
  as?: "div" | "li";
};

/**
 * Scroll reveal: short fade + small rise, once (never on every scroll).
 * Under prefers-reduced-motion, MotionConfig drops the rise so it's a cross-fade only.
 */
export function Reveal({ children, className, index = 0, delay, as = "div" }: Props) {
  const Cmp = as === "li" ? m.li : m.div;
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y: reveal.rise }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: reveal.amount }}
      transition={{ ...reveal.transition, delay: delay ?? staggerDelay(index) }}
    >
      {children}
    </Cmp>
  );
}
