"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { nav } from "@/content/site";
import { ease, spring } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

type Props = {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * Opens out of the menu button (transform-origin top-right, where the button is)
 * and closes back into it, along the same path (apple-design §7).
 * Focus is trapped while open; Esc or an outside tap closes and returns focus.
 */
export function MobileMenu({ open, onClose, triggerRef }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
      if (e.key === "Tab") {
        const items = focusables();
        const trigger = triggerRef.current;
        const all = trigger ? [trigger, ...items] : items;
        const first = all[0];
        const last = all[all.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel?.contains(t) && !triggerRef.current?.contains(t)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panelRef}
          key="menu"
          // Grows out of the menu button (origin below), starting near full size.
          // Exit is faster than enter: the system responding should snap.
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, transition: spring.ui }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: ease.out } }}
          style={{ transformOrigin: "calc(100% - 1.5rem) -0.5rem" }}
          className="glass-thick absolute right-3 top-[calc(100%+0.5rem)] w-[min(20rem,calc(100vw-1.5rem))] rounded-panel p-3 lg:hidden"
        >
          <ul className="flex flex-col">
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="pressable block rounded-sm-card px-4 py-3 text-title font-medium text-text hover:bg-surface-2"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-col gap-2 border-t border-hairline px-1 pt-3">
            <Button href={nav.cta.href} size="lg" onClick={onClose}>
              {nav.cta.label}
            </Button>
            <Button href={nav.login.href} variant="secondary" size="lg">
              {nav.login.label}
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
