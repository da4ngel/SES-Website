"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

/**
 * Sticky translucent header. Instead of a hard border, a soft fade appears
 * under it only once content is actually scrolling beneath (scroll edge effect).
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu closes itself on link tap (MobileMenu) or outside tap / Esc.

  const isActive = (href: string) => pathname?.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-50">
      <div className="glass relative pt-[env(safe-area-inset-top)]">
        <nav aria-label="Main" className="container-page flex h-14 items-center justify-between gap-6">
          <Link href="/" className="pressable -ml-1 rounded-lg px-1" aria-label="Save Energy Systems home">
            <Logo className="h-10" />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "text-caption transition-colors hover:text-text",
                    isActive(l.href) ? "text-text font-medium" : "text-text-2",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={nav.login.href}
              className="hidden text-caption text-text-2 transition-colors hover:text-text sm:inline"
            >
              {nav.login.label}
            </a>
            <span className="hidden sm:contents">
              <Button href={nav.cta.href}>{nav.cta.label}</Button>
            </span>
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="pressable -mr-2 grid size-11 place-items-center rounded-full lg:hidden"
            >
              <MenuGlyph open={open} />
            </button>
          </div>
        </nav>
      </div>

      {/* Scroll edge fade (replaces a 1px border) */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-full h-6 bg-gradient-to-b from-bg/70 to-transparent transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <MobileMenu open={open} onClose={() => setOpen(false)} triggerRef={menuButtonRef} />
    </header>
  );
}

/** Two lines that rotate into an X: transform only. */
function MenuGlyph({ open }: { open: boolean }) {
  const line = "absolute left-0 block h-[1.5px] w-[18px] rounded-full bg-text transition-transform duration-300 [transition-timing-function:var(--ease-spring)]";
  return (
    <span className="relative block h-3 w-[18px]" aria-hidden="true">
      <span className={cn(line, "top-[2px]", open && "translate-y-[4px] rotate-45")} />
      <span className={cn(line, "top-[10px]", open && "-translate-y-[4px] -rotate-45")} />
    </span>
  );
}
