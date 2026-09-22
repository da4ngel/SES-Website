import { cn } from "@/lib/cn";

type Props = {
  /** Bigger surfaces read thicker: stronger blur + deeper shadow */
  thickness?: "regular" | "thick";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Translucent material. Falls back to a solid surface under
 * prefers-reduced-transparency and prefers-contrast: more (see globals.css).
 * Never nest a GlassPanel inside another one.
 */
export function GlassPanel({ thickness = "regular", className, children, ...rest }: Props) {
  return (
    <div className={cn(thickness === "thick" ? "glass-thick" : "glass", "rounded-card", className)} {...rest}>
      {children}
    </div>
  );
}
