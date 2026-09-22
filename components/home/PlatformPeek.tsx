import { platformPeek } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A mock dashboard built in HTML/CSS (not a screenshot). Glass tiles float over a
 * soft accent backdrop. Values are illustrative and labeled as such.
 * Tiles are one level of glass over a solid backdrop: never glass on glass.
 */
export function PlatformPeek() {
  const { tiles, alerts } = platformPeek;
  return (
    <Section aria-labelledby="platform-title">
      <Reveal>
        <Heading
          id="platform-title"
          eyebrow={platformPeek.eyebrow}
          title={platformPeek.headline}
          subhead={platformPeek.subhead}
        />
      </Reveal>

      <Reveal className="mt-14 md:mt-20">
        <div
          className="relative overflow-hidden rounded-panel p-4 ring-1 ring-inset ring-hairline sm:p-6 md:p-10"
          style={{
            background:
              "radial-gradient(60% 80% at 15% 10%, var(--accent-glow), transparent 70%), radial-gradient(50% 70% at 90% 100%, var(--accent-soft), transparent 70%), var(--surface-2)",
          }}
        >
          {/* Window chrome */}
          <div className="mb-4 flex items-center justify-between px-1">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-text/15" />
              <span className="size-2.5 rounded-full bg-text/15" />
              <span className="size-2.5 rounded-full bg-text/15" />
            </div>
            <span className="text-caption rounded-full bg-surface/70 px-3 py-1 font-medium text-text-2">
              {platformPeek.disclaimer}
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            <Tile label={tiles.saved.label} value={tiles.saved.value} note={tiles.saved.note}>
              <Sparkline />
            </Tile>
            <Tile label={tiles.sites.label} value={tiles.sites.value} note={tiles.sites.note}>
              <SiteDots />
            </Tile>
            <Tile label={tiles.faults.label} value={tiles.faults.value} note={tiles.faults.note}>
              <FaultBars />
            </Tile>

            <GlassPanel className="p-5 md:col-span-3 md:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-body font-semibold text-text">Recent alerts</h3>
                <span className="text-caption inline-flex items-center gap-2 text-text-2">
                  <span className="relative inline-flex size-2">
                    <span className="absolute inset-0 rounded-full bg-accent" />
                  </span>
                  Live
                </span>
              </div>
              <ul className="mt-4 divide-y divide-hairline">
                {alerts.map((a) => (
                  <li key={a.unit} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
                    <div>
                      <p className="text-body font-medium text-text">{a.issue}</p>
                      <p className="text-caption text-text-2">{a.unit}</p>
                    </div>
                    <span className="text-caption rounded-full bg-accent-soft px-3 py-1 font-medium text-accent">
                      {a.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Tile({
  label,
  value,
  note,
  children,
}: {
  label: string;
  value: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <GlassPanel className="flex flex-col p-5 md:p-6">
      <p className="text-caption font-medium text-text-2">{label}</p>
      <p className="text-display mt-1 tabular-nums text-text">{value}</p>
      <p className="text-caption text-text-2">{note}</p>
      <div className="mt-5 h-12">{children}</div>
    </GlassPanel>
  );
}

function Sparkline() {
  return (
    <svg viewBox="0 0 200 48" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <path
        d="M0 40 L20 36 L40 38 L60 30 L80 32 L100 24 L120 26 L140 18 L160 16 L180 10 L200 8"
        fill="none"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function SiteDots() {
  return (
    <div className="grid h-full grid-cols-[repeat(16,1fr)] content-center gap-1.5" aria-hidden="true">
      {Array.from({ length: 32 }, (_, i) => (
        <span key={i} className="aspect-square rounded-full bg-accent" style={{ opacity: 0.35 + ((i * 7) % 10) / 16 }} />
      ))}
    </div>
  );
}

function FaultBars() {
  const h = [30, 50, 20, 70, 40, 90, 60];
  return (
    <div className="flex h-full items-end gap-1.5" aria-hidden="true">
      {h.map((v, i) => (
        <span
          key={i}
          className="flex-1 rounded-sm bg-text-2/40"
          style={{ height: `${v}%`, ...(i === h.length - 2 ? { background: "var(--accent)" } : {}) }}
        />
      ))}
    </div>
  );
}
