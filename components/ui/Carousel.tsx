"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import * as m from "motion/react-m";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { spring } from "@/lib/motion";
import { HYSTERESIS, VelocityTracker, clamp, project, rubberband } from "@/lib/gesture";
import { cn } from "@/lib/cn";

/** px/s. Emil Kowalski's momentum rule: ~0.11 px/ms counts as a deliberate flick. */
const FLICK_VELOCITY = 110;

type Props = {
  label: string;
  slides: React.ReactNode[];
  /** ms between auto-advances. 0 = off. Always off under reduced motion. */
  autoplay?: number;
  className?: string;
};

/**
 * Swipeable carousel built on the apple-design gesture rules:
 * - 1:1 tracking with pointer capture, respecting the grab point
 * - 10px hysteresis + axis lock, so vertical scrolling still works (touch-action: pan-y)
 * - rubber-banding past the first/last slide
 * - on release: project momentum, snap to the nearest slide, hand off release velocity
 * - interruptible: grabbing mid-flight stops the spring at its live value
 */
export function Carousel({ label, slides, autoplay = 7000, className }: Props) {
  const count = slides.length;
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userTookOver, setUserTookOver] = useState(false);
  // Explicit, discoverable pause — distinct from the implicit hover/focus pause below
  // (WCAG 2.2.2 requires a visible mechanism, not just "stops if you happen to hover it").
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const reduced = useReducedMotion();
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const widthRef = useRef(0);
  const indexRef = useRef(0);
  const fade = useMotionValue(1);

  const drag = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startValue: 0,
    startIndex: 0,
    state: "idle" as "idle" | "pending" | "dragging",
    tracker: new VelocityTracker(),
  });

  const goTo = useCallback(
    (next: number, velocity = 0, fromGesture = false) => {
      const i = clamp(next, 0, count - 1);
      indexRef.current = i;
      setIndex(i);
      const target = -i * widthRef.current;
      anim.current?.stop();
      if (reduced) {
        // Reduced motion: jump, then cross-fade in. No sliding.
        x.set(target);
        fade.set(0);
        anim.current = animate(fade, 1, { duration: 0.2, ease: "easeOut" });
        return;
      }
      // Bounce only when a drag/flick carried momentum into the release.
      anim.current = animate(x, target, fromGesture ? { ...spring.momentum, velocity } : spring.ui);
    },
    [count, reduced, x, fade],
  );

  // Keep position correct on resize.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      widthRef.current = el.clientWidth;
      anim.current?.stop();
      x.set(-indexRef.current * widthRef.current);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [x]);

  // Gentle auto-rotation. Pauses on hover/focus, stops for good once the user interacts
  // (drag, arrow, dot) or presses the explicit pause button below.
  useEffect(() => {
    if (!autoplay || reduced || paused || userTookOver || manuallyPaused || count < 2) return;
    const id = window.setInterval(() => goTo((indexRef.current + 1) % count), autoplay);
    return () => window.clearInterval(id);
  }, [autoplay, reduced, paused, userTookOver, manuallyPaused, count, goTo]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const d = drag.current;
    // Multi-touch protection: a second finger mid-drag must not make the slide jump.
    if (d.state !== "idle") return;
    // Interrupt: stop wherever the slide is right now and start from there.
    anim.current?.stop();
    d.pointerId = e.pointerId;
    d.startX = e.clientX;
    d.startY = e.clientY;
    d.startValue = x.get();
    d.startIndex = indexRef.current;
    d.state = "pending";
    d.tracker.reset();
    d.tracker.add(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (e.pointerId !== d.pointerId || d.state === "idle") return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;

    if (d.state === "pending") {
      if (Math.abs(dy) > HYSTERESIS && Math.abs(dy) > Math.abs(dx)) {
        d.state = "idle"; // vertical intent: let the page scroll
        return;
      }
      if (Math.abs(dx) < HYSTERESIS) return;
      d.state = "dragging";
      // Rebase so the slide doesn't jump by the threshold distance.
      d.startX = e.clientX;
      viewportRef.current?.setPointerCapture(e.pointerId);
      setUserTookOver(true);
    }

    d.tracker.add(e.clientX);
    const w = widthRef.current;
    const min = -(count - 1) * w;
    let next = d.startValue + (e.clientX - d.startX);
    if (next > 0) next = rubberband(next, w);
    else if (next < min) next = min + rubberband(next - min, w);
    x.set(next);
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (e.pointerId !== d.pointerId) return;
    const wasDragging = d.state === "dragging";
    d.state = "idle";
    d.pointerId = -1;
    if (!wasDragging) {
      // A tap that interrupted a moving slide: settle to the nearest one.
      if (anim.current && x.get() !== -indexRef.current * widthRef.current) {
        goTo(Math.round(-x.get() / widthRef.current));
      }
      return;
    }
    const v = d.tracker.velocity();
    let next: number;
    if (Math.abs(v) > FLICK_VELOCITY) {
      // A quick flick is enough on its own, however short the drag was.
      next = d.startIndex + (v < 0 ? 1 : -1);
    } else {
      // Otherwise snap to the slide nearest where the gesture is heading.
      next = Math.round(-(x.get() + project(v)) / widthRef.current);
    }
    goTo(clamp(next, d.startIndex - 1, d.startIndex + 1), v, true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setUserTookOver(true);
      goTo(indexRef.current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setUserTookOver(true);
      goTo(indexRef.current - 1);
    }
  };

  const liveMode = userTookOver || !autoplay || reduced ? "polite" : "off";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={viewportRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing rounded-panel"
        aria-live={liveMode}
      >
        <m.div className="flex will-change-transform" style={{ x, opacity: fade }}>
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              className="w-full shrink-0"
            >
              {slide}
            </div>
          ))}
        </m.div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => {
            setUserTookOver(true);
            goTo(index - 1);
          }}
          disabled={index === 0}
          aria-label="Previous testimonial"
          className="pressable grid size-11 place-items-center rounded-full bg-surface-2 text-text ring-1 ring-inset ring-hairline disabled:opacity-40"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </button>

        <div className="flex gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setUserTookOver(true);
                goTo(i);
              }}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              className="grid min-h-11 min-w-11 place-items-center"
            >
              <span
                className={cn(
                  "block size-2 rounded-full bg-text transition-opacity duration-300",
                  i === index ? "opacity-100" : "opacity-25",
                )}
              />
            </button>
          ))}
        </div>

        {!!autoplay && !reduced && count >= 2 && (
          <button
            type="button"
            onClick={() => setManuallyPaused((p) => !p)}
            aria-label={manuallyPaused ? "Resume automatic slides" : "Pause automatic slides"}
            className="pressable grid size-11 place-items-center rounded-full bg-surface-2 text-text ring-1 ring-inset ring-hairline"
          >
            {manuallyPaused ? (
              <Play className="size-4" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Pause className="size-4" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setUserTookOver(true);
            goTo(index + 1);
          }}
          disabled={index === count - 1}
          aria-label="Next testimonial"
          className="pressable grid size-11 place-items-center rounded-full bg-surface-2 text-text ring-1 ring-inset ring-hairline disabled:opacity-40"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
