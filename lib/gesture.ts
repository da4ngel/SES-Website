/**
 * Gesture math from Apple's "Designing Fluid Interfaces" (apple-design §5, §6, §9).
 */

/** Distance a flick would travel under scroll-style deceleration (Apple's projection). */
export function project(velocity: number, decelerationRate = 0.998): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Progressive resistance past a boundary. The further past, the less it follows. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Movement (px) before a drag commits to an axis. */
export const HYSTERESIS = 10;

/** Keeps the last ~100ms of pointer samples so release velocity is accurate. */
export class VelocityTracker {
  private samples: { v: number; t: number }[] = [];

  constructor(private windowMs = 100) {}

  reset() {
    this.samples = [];
  }

  add(value: number, time = performance.now()) {
    this.samples.push({ v: value, t: time });
    const cutoff = time - this.windowMs;
    while (this.samples.length > 2 && this.samples[0].t < cutoff) this.samples.shift();
  }

  /** px per second */
  velocity(): number {
    if (this.samples.length < 2) return 0;
    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    // Finger stopped before lifting: no momentum.
    if (performance.now() - last.t > 60) return 0;
    const dt = (last.t - first.t) / 1000;
    return dt > 0 ? (last.v - first.v) / dt : 0;
  }
}
