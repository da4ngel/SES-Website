"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import type { CaseStudy, Industry } from "@/content/caseStudies";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";

type Filter = "All" | Industry;

/**
 * Case-study cards filtered by industry.
 * The filter is a set of toggle buttons (aria-pressed). Changing it cross-fades the grid
 * (out 120ms, in 200ms, ease-out). No layout animation: nothing shuffles around.
 */
export function ResultsGrid({ items, industries }: { items: CaseStudy[]; industries: Industry[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const available = industries.filter((ind) => items.some((c) => c.industry === ind));
  const shown = filter === "All" ? items : items.filter((c) => c.industry === filter);

  return (
    <div>
      <div role="group" aria-label="Filter by industry" className="flex flex-wrap justify-center gap-2">
        {(["All", ...available] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "pressable rounded-full px-4 py-2 text-caption font-medium ring-1 ring-inset",
              filter === f ? "bg-text text-bg ring-text" : "bg-surface text-text ring-hairline hover:bg-surface-2",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} case {shown.length === 1 ? "study" : "studies"} shown
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={filter}
          className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2, ease: ease.out } }}
          exit={{ opacity: 0, transition: { duration: 0.12, ease: ease.out } }}
        >
          {shown.map((c) => (
            <li key={c.slug}>
              <Card href={`/results/${c.slug}/`} radius="lg" className="h-full">
                <div className="flex h-full flex-col p-7 md:p-8">
                  <p className="text-caption font-medium text-accent">
                    {c.client}
                    {c.location && <span className="font-normal text-text-2"> · {c.location}</span>}
                  </p>
                  <h3 className="text-title mt-3 text-text">{c.headline}</h3>
                  <p className="text-body mt-2 text-text-2">{c.line}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <p>
                      <span className="text-headline block tabular-nums text-text">{c.stats[0].value}</span>
                      <span className="text-caption text-text-2">{c.stats[0].label}</span>
                    </p>
                    <span className="text-body shrink-0 font-medium text-accent" aria-hidden="true">
                      Read ›
                    </span>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </m.ul>
      </AnimatePresence>
    </div>
  );
}
