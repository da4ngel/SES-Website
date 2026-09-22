"use client";

import { useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export type StoryItem = {
  key: string;
  eyebrow: React.ReactNode;
  title: string;
  line: string;
  /** Pinned visual for this item (any server-rendered JSX) */
  visual: React.ReactNode;
};

type Props = {
  items: StoryItem[];
  /** "swap" = one visual at a time (cross-fade). "build" = visuals stack up as you scroll. */
  mode?: "swap" | "build";
  /** Height of the pinned visual panel */
  visualClassName?: string;
  /** Mobile card visual box. Default keeps a fixed aspect; use auto height for tall visuals. */
  mobileVisualClassName?: string;
};

/**
 * Desktop (lg+): sticky scroll story. The visual is pinned on the left; items on the right
 * advance as each crosses the middle of the screen. Mobile: stacked cards.
 * Swaps are masked with a 2px blur so the cross-fade reads as one change, not two overlapping states.
 */
export function ScrollStory({
  items,
  mode = "swap",
  visualClassName = "h-[30rem]",
  mobileVisualClassName = "aspect-[10/9]",
}: Props) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      // A thin band across the middle of the viewport decides the active item.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const shown = (i: number) => (mode === "build" ? i <= active : i === active);

  return (
    <>
      <div className="hidden gap-16 lg:grid lg:grid-cols-2">
        <div className={cn("sticky top-[calc(50vh-15rem)] self-start", visualClassName)}>
          <div className="relative h-full overflow-hidden rounded-panel bg-surface-2 ring-1 ring-inset ring-hairline">
            {items.map((it, i) => (
              <m.div
                key={it.key}
                className="absolute inset-0 p-8"
                initial={false}
                animate={{
                  opacity: shown(i) ? 1 : 0,
                  scale: shown(i) ? 1 : 0.96,
                  filter: shown(i) ? "blur(0px)" : "blur(2px)",
                }}
                transition={spring.ui}
                aria-hidden={!shown(i)}
              >
                {it.visual}
              </m.div>
            ))}
          </div>
        </div>

        <ol>
          {items.map((it, i) => (
            <li
              key={it.key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className="flex min-h-[70vh] flex-col justify-center first:min-h-[50vh] last:min-h-[50vh]"
            >
              <div className={cn("transition-opacity duration-300", i === active ? "opacity-100" : "opacity-30")}>
                <span className="text-eyebrow text-accent">{it.eyebrow}</span>
                <h3 className="text-headline mt-2 text-text">{it.title}</h3>
                <p className="text-subhead mt-3 max-w-[26rem] text-text-2">{it.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <ol className="grid gap-4 lg:hidden">
        {items.map((it) => (
          <Reveal as="li" key={it.key} className="overflow-hidden rounded-panel bg-surface-2 ring-1 ring-inset ring-hairline">
            <div className={cn("px-6 pt-6", mobileVisualClassName)}>{it.visual}</div>
            <div className="p-6 pt-2">
              <span className="text-eyebrow inline-flex items-center gap-2 text-accent">{it.eyebrow}</span>
              <h3 className="text-title mt-2 text-text">{it.title}</h3>
              <p className="text-body mt-2 text-text-2">{it.line}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </>
  );
}
