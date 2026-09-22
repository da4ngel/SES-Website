import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href?: string;
  /** Hover lift + press scale. On by default for linked cards. */
  interactive?: boolean;
  radius?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const radii = { sm: "rounded-sm-card", md: "rounded-card", lg: "rounded-panel" };

/** Surface card. With `href` the whole card is one link (hover lifts, press scales to 0.97). */
export function Card({ href, interactive = !!href, radius = "md", className, children }: Props) {
  const classes = cn(
    "block bg-surface ring-1 ring-inset ring-hairline",
    radii[radius],
    interactive && "lift",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
