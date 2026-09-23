import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onNavy";
type Size = "md" | "lg";

const base =
  "pressable inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent-fill text-on-accent hover:brightness-110",
  secondary: "bg-surface-2 text-text ring-1 ring-inset ring-hairline hover:bg-surface",
  // py-2.5 -my-2.5: expands the tap target to ~44px tall (WCAG/Apple/Google guidance)
  // without pushing surrounding layout — the extra padding is cancelled by the negative margin.
  ghost: "text-accent hover:underline underline-offset-4 py-2.5 -my-2.5",
  /** Bright teal pill for navy brand bands (navy text on teal: 6.0:1) */
  onNavy: "bg-teal-on-navy text-brand-navy hover:brightness-110",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-[0.9375rem]",
  lg: "h-12 px-7 text-[1.0625rem]",
};

type Common ={ variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

type AsLink = Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
type AsButton = Common & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Pill button. Press feedback fires on pointer-down (CSS :active + spring easing).
 * Pass `href` for a link. External links open in the same tab unless target is set.
 */
export function Button({ variant = "primary", size = "md", className, children, ...props }: AsLink | AsButton) {
  const classes = cn(base, variants[variant], variant !== "ghost" && sizes[size], className);

  if (props.href !== undefined) {
    const { href, ...rest } = props as Omit<AsLink, keyof Common>;
    const external = /^https?:|^mailto:|^tel:/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as Omit<AsButton, keyof Common>;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
