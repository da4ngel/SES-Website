"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { label: string; href: string };

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Sticky section nav (e.g. Technology). Lives in a route layout, so it persists across
 * its pages and the active pill can travel between them.
 *
 * Active pill = Emil Kowalski's clip-path tab technique: a second, "active"-styled copy of
 * the list sits on top and is clipped to the current item. Moving the clip gives a seamless
 * color change that per-item color transitions can't. Only the route changes it, so keyboard
 * focus never animates anything.
 */
export function LocalNav({ items, label }: { items: Item[]; label: string }) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const [clip, setClip] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);
  // Longest matching href wins, so "/technology/" doesn't claim every sub-page.
  const norm = (p: string) => p.replace(/\/$/, "");
  const path = norm(pathname ?? "");
  const activeIndex = items.reduce(
    (best, it, i) =>
      path.startsWith(norm(it.href)) && (best < 0 || norm(it.href).length > norm(items[best].href).length) ? i : best,
    -1,
  );

  useIsoLayoutEffect(() => {
    const list = listRef.current;
    const el = list?.querySelectorAll<HTMLElement>("[data-item]")[activeIndex];
    if (!list || !el) return;
    const update = () => {
      const left = el.offsetLeft;
      const right = list.offsetWidth - (el.offsetLeft + el.offsetWidth);
      setClip(`inset(0 ${right}px 0 ${left}px round 999px)`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(list);
    // Bring the active item into view on small screens (instant; this is not a gesture).
    el.scrollIntoView({ block: "nearest", inline: "center" });
    return () => ro.disconnect();
  }, [activeIndex]);

  // Enable the transition only after the first position is painted (no slide-in on load).
  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <nav aria-label={label} className="glass sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-40">
      <div className="container-page overflow-x-auto [scrollbar-width:none]">
        <div className="relative mx-auto w-max py-2.5">
          <ul ref={listRef} className="flex gap-1">
            {items.map((it, i) => (
              <li key={it.href} data-item>
                <Link
                  href={it.href}
                  aria-current={i === activeIndex ? "page" : undefined}
                  className="pressable block rounded-full px-4 py-1.5 text-caption font-medium whitespace-nowrap text-text-2 hover:text-text"
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Active copy, clipped to the current item */}
          {clip && (
            <ul
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-x-0 top-2.5 flex gap-1",
                animate && "transition-[clip-path] duration-300 [transition-timing-function:var(--ease-in-out)]",
              )}
              style={{ clipPath: clip }}
            >
              {items.map((it) => (
                <li key={it.href}>
                  <span className="block rounded-full bg-text px-4 py-1.5 text-caption font-medium whitespace-nowrap text-bg">
                    {it.label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
