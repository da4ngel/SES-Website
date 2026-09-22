import type { Transition } from "motion/react";

/**
 * Spring presets (apple-design §4). Tune the feel of the whole site here.
 * `bounce` ≈ 1 − damping ratio. `visualDuration` ≈ Apple's "response".
 * Default is critically damped (bounce 0). Bounce is only for momentum (after a flick/drag).
 */
export const spring = {
  /** Default for reposition, menus, tile/state changes */
  ui: { type: "spring", bounce: 0, visualDuration: 0.4 },
  /** Hover lift and small state changes */
  snappy: { type: "spring", bounce: 0, visualDuration: 0.3 },
  /** Press feedback */
  press: { type: "spring", bounce: 0, visualDuration: 0.15 },
  /** Only after a drag/flick release: carries the gesture's momentum */
  momentum: { type: "spring", bounce: 0.2, visualDuration: 0.4 },
  /** Count-ups and one-shot reveals: slow, calm, no overshoot */
  calm: { type: "spring", bounce: 0, visualDuration: 1.2 },
} satisfies Record<string, Transition>;

/** Cubic-bezier curves, mirrored from the CSS tokens in app/globals.css */
export const ease = {
  /** Strong ease-out for UI enter/exit */
  out: [0.23, 1, 0.32, 1] as [number, number, number, number],
  /** Strong ease-in-out for on-screen movement */
  inOut: [0.77, 0, 0.175, 1] as [number, number, number, number],
};

/** Stagger between siblings in a group entrance (decorative, capped) */
export const STAGGER = 0.05;
export const staggerDelay = (i: number) => Math.min(i, 6) * STAGGER;

/** Scroll reveal: short fade + small rise, once (see components/ui/Reveal.tsx) */
export const reveal = {
  rise: 16,
  amount: 0.25,
  transition: { type: "spring", bounce: 0, visualDuration: 0.6 } satisfies Transition,
};
