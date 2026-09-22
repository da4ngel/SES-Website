import { architecture } from "@/content/technology";
import { cn } from "@/lib/cn";

/**
 * The six layers as a stack (outcomes on top, building systems at the base).
 * `active` highlights one layer; the layers below it read as "already built".
 */
export function ArchitectureVisual({ active }: { active: number }) {
  const layers = architecture.layers;
  return (
    <div className="flex h-full flex-col justify-center gap-2.5" aria-hidden="true">
      {[...layers].reverse().map((l) => {
        const i = layers.indexOf(l);
        const isActive = i === active;
        const built = i < active;
        return (
          <div
            key={l.key}
            className={cn(
              "flex items-center justify-between rounded-sm-card px-5 py-3.5 ring-1 ring-inset",
              isActive
                ? "bg-accent-fill text-on-accent ring-transparent shadow-lg"
                : built
                  ? "bg-accent-soft text-text ring-transparent"
                  : "bg-surface text-text-2 ring-hairline",
            )}
            style={{ marginInline: `${i * 3.5}%` }} // base widest, outcomes narrowest
          >
            <span className="text-body font-semibold">{l.title}</span>
            <span className={cn("text-caption tabular-nums", isActive ? "opacity-80" : "opacity-60")}>{i + 1}</span>
          </div>
        );
      })}
    </div>
  );
}
