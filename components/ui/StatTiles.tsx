import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Stat = { value: string; label: string };

/** A row of real numbers. Big value, one-line label. Tabular figures so digits line up. */
export function StatTiles({ stats, className, tone = "surface" }: { stats: Stat[]; className?: string; tone?: "surface" | "plain" }) {
  const cols = stats.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : stats.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <dl className={cn("grid gap-4", cols, className)}>
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          index={i}
          className={cn(
            "flex flex-col-reverse justify-end p-6 md:p-7",
            tone === "surface" && "rounded-card bg-surface ring-1 ring-inset ring-hairline",
          )}
        >
          <dt className="text-body mt-2 text-text-2">{s.label}</dt>
          <dd className="text-display tabular-nums text-text">{s.value}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
