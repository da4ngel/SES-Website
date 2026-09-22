import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  /** "default" = page background, "alt" = soft gray band, "surface" = white/near-black */
  tone?: "default" | "alt" | "surface";
  /** Remove vertical padding (for full-bleed sections that manage their own) */
  flush?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
};

const tones = {
  default: "bg-bg",
  alt: "bg-surface-2",
  surface: "bg-surface",
};

/** Vertical rhythm (80/120/160px) + page container. */
export function Section({
  id,
  tone = "default",
  flush,
  className,
  containerClassName,
  children,
  ...rest
}: Props) {
  return (
    <section id={id} className={cn(tones[tone], !flush && "section-y", className)} {...rest}>
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}
