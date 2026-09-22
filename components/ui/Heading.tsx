import { cn } from "@/lib/cn";

type Size = "hero" | "display" | "headline" | "title";

const sizeClass: Record<Size, string> = {
  hero: "text-hero",
  display: "text-display",
  headline: "text-headline",
  title: "text-title",
};

type Props = {
  /** Semantic level, independent of visual size */
  as?: "h1" | "h2" | "h3";
  size?: Size;
  eyebrow?: string;
  title: React.ReactNode;
  subhead?: React.ReactNode;
  align?: "center" | "left";
  id?: string;
  className?: string;
};

/** Eyebrow + heading + one-sentence subhead, as a single unit. */
export function Heading({
  as: Tag = "h2",
  size = "display",
  eyebrow,
  title,
  subhead,
  align = "center",
  id,
  className,
}: Props) {
  return (
    <div className={cn(align === "center" ? "mx-auto text-center" : "text-left", "max-w-[48rem]", className)}>
      {eyebrow && <p className="text-eyebrow mb-3 text-accent">{eyebrow}</p>}
      <Tag id={id} className={cn(sizeClass[size], "text-text")}>
        {title}
      </Tag>
      {subhead && (
        <p className={cn("text-subhead mt-4 text-text-2", align === "center" && "mx-auto", "max-w-[36rem]")}>
          {subhead}
        </p>
      )}
    </div>
  );
}
