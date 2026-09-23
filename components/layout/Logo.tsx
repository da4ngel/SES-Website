import { cn } from "@/lib/cn";
import { LOGO_VIEWBOX, arc, systems, wordmark } from "./logo-paths";

type Props = {
  /** "full" = arc + "save energy" + "SYSTEMS"; "mark" = the dashed arc only */
  variant?: "full" | "mark";
  className?: string;
  /** Accessible name. Omit when a wrapping link already names it. */
  title?: string;
};

/**
 * Official SES logo, refined from the original vector (see scripts/build-logo.mjs).
 * - "save energy" uses currentColor, so it reads on light and dark backgrounds
 *   (the original was white-only, for a navy header).
 * - The arc and "SYSTEMS" use the brand teal (--brand-teal).
 */
export function Logo({ variant = "full", className, title }: Props) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true as const };
  if (variant === "mark") {
    return (
      <svg viewBox="45 -1 63 37" className={cn("h-6 w-auto", className)} {...a11y}>
        {arc.map((d, i) => (
          <path key={i} d={d} fill="var(--brand-teal)" />
        ))}
      </svg>
    );
  }
  return (
    // No default height here — every caller passes one, and cn() doesn't dedupe
    // conflicting Tailwind classes (it's a plain join, not tailwind-merge), so a
    // baked-in default plus a caller override would both land in the class list.
    <svg viewBox={LOGO_VIEWBOX} className={cn("w-auto", className)} {...a11y}>
      {arc.map((d, i) => (
        <path key={`a${i}`} d={d} fill="var(--brand-teal)" />
      ))}
      {systems.map((d, i) => (
        <path key={`s${i}`} d={d} fill="var(--brand-teal)" />
      ))}
      {wordmark.map((d, i) => (
        <path key={`w${i}`} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
