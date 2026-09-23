"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { spring } from "@/lib/motion";

const units = [170, 320, 470]; // x-centers of the three rooftop units

/**
 * Building + rooftop units (RTUs), each with an SES controller linked to the cloud.
 * On load, energy "powers up" once: glow blooms, controller LEDs light in sequence,
 * links to the cloud appear. Plays once, no loop (apple-design §14: avoid slow oscillation).
 * Opacity + transform only. Timeline is kept short (~1s total) so the teal/accent
 * highlighting reads quickly rather than leaving the illustration looking empty.
 * Under reduced motion, every element jumps straight to its resting state.
 */
export function HeroVisual({ alt }: { alt: string }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-[48rem]">
      {/* Soft energy glow behind the roof */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] h-[70%] w-[90%] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(closest-side, var(--accent-glow), transparent)",
          filter: "blur(8px)",
        }}
        initial={reduced ? { opacity: 0.55, scale: 1 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={reduced ? { duration: 0 } : { ...spring.calm, delay: 0.2 }}
      />

      <svg viewBox="0 0 640 400" role="img" aria-label={alt} className="relative w-full">
        {/* Cloud */}
        <g transform="translate(320 48)">
          <path
            d="M-38 16h76a20 20 0 0 0 0-40 28 28 0 0 0-54-6 22 22 0 0 0-22 46Z"
            className="fill-surface stroke-text-2/30"
            strokeWidth="1.5"
            transform="translate(0 -4)"
          />
          <m.path
            d="M-38 16h76a20 20 0 0 0 0-40 28 28 0 0 0-54-6 22 22 0 0 0-22 46Z"
            fill="none"
            className="stroke-accent"
            strokeWidth="1.5"
            transform="translate(0 -4)"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.4, delay: 0.7 }}
          />
        </g>

        {/* Links from each controller to the cloud */}
        {units.map((x, i) => {
          const d = `M${x + 38} 150 C ${x + 38} 110, 320 110, 320 70`;
          return (
            <g key={x}>
              <path d={d} fill="none" className="stroke-text-2/30" strokeWidth="1.5" strokeDasharray="3 5" />
              <m.path
                d={d}
                fill="none"
                className="stroke-accent"
                strokeWidth="1.5"
                strokeDasharray="3 5"
                initial={reduced ? { opacity: 0.9 } : { opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={reduced ? { duration: 0 } : { duration: 0.4, delay: 0.4 + i * 0.12 }}
              />
            </g>
          );
        })}

        {/* Building */}
        <rect x="60" y="234" width="520" height="180" rx="14" className="fill-surface-2 stroke-text-2/30" strokeWidth="1.5" />
        <rect x="52" y="226" width="536" height="12" rx="6" className="fill-surface stroke-text-2/30" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((c) =>
          [0, 1].map((r) => (
            <rect
              key={`${c}-${r}`}
              x={96 + c * 78}
              y={266 + r * 60}
              width="56"
              height="36"
              rx="6"
              className="fill-surface stroke-text-2/30"
              strokeWidth="1.5"
            />
          )),
        )}

        {/* Rooftop units */}
        {units.map((x, i) => (
          <g key={x}>
            <rect x={x - 60} y="166" width="120" height="60" rx="10" className="fill-surface stroke-text-2/30" strokeWidth="1.5" />
            {/* grille */}
            {[0, 1, 2, 3, 4].map((g) => (
              <line
                key={g}
                x1={x - 46 + g * 9}
                x2={x - 46 + g * 9}
                y1="180"
                y2="212"
                className="stroke-text-2/30"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
            {/* fan */}
            <circle cx={x + 26} cy="196" r="18" className="fill-surface-2 stroke-text-2/30" strokeWidth="1.5" />
            <circle cx={x + 26} cy="196" r="4" className="fill-text-2/40" />
            {/* SES controller (DLC) */}
            <rect x={x + 28} y="150" width="20" height="16" rx="4" className="fill-surface stroke-text-2/50" strokeWidth="1.5" />
            <circle cx={x + 38} cy="158" r="2.5" className="fill-text-2/30" />
            <m.circle
              cx={x + 38}
              cy="158"
              r="2.5"
              className="fill-accent"
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduced ? { duration: 0 } : { duration: 0.25, delay: 0.3 + i * 0.12 }}
            />
            {/* LED halo: blooms once, then settles */}
            <m.circle
              cx={x + 38}
              cy="158"
              r="9"
              className="fill-accent"
              initial={reduced ? { opacity: 0.12 } : { opacity: 0 }}
              animate={reduced ? { opacity: 0.12 } : { opacity: [0, 0.35, 0.12] }}
              transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 0.3 + i * 0.12, times: [0, 0.3, 1] }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
