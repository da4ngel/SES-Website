import type { Step } from "@/content/howItWorks";

/**
 * Simple, calm diagrams for each step. Pure SVG, token colors, no text baked
 * into images except short labels (kept here because they are part of the drawing).
 */
export function StepVisual({ kind }: { kind: Step["visual"] }) {
  switch (kind) {
    case "zones":
      return <Zones />;
    case "smartstart":
      return <SmartStart />;
    case "monitoring":
      return <Monitoring />;
    case "peak":
      return <Peak />;
  }
}

const frame = "h-full w-full";

function Zones() {
  const rooms = [
    { x: 40, y: 40, w: 180, h: 150, level: 0.9, label: "Lobby" },
    { x: 230, y: 40, w: 130, h: 150, level: 0.35, label: "Office" },
    { x: 40, y: 200, w: 120, h: 120, level: 0.15, label: "Storage" },
    { x: 170, y: 200, w: 190, h: 120, level: 0.6, label: "Floor" },
  ];
  return (
    <svg viewBox="0 0 400 360" className={frame} aria-hidden="true">
      {rooms.map((r) => (
        <g key={r.label}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="14" className="fill-surface stroke-hairline" strokeWidth="1.5" />
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="14" className="fill-accent" opacity={r.level * 0.35} />
          <text x={r.x + 14} y={r.y + 26} className="fill-text-2 text-[13px] font-medium">
            {r.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function SmartStart() {
  // Units start one after another instead of all at once.
  const rows = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 400 360" className={frame} aria-hidden="true">
      <line x1="40" x2="360" y1="300" y2="300" className="stroke-hairline" strokeWidth="1.5" />
      {rows.map((r) => (
        <g key={r}>
          <text x="40" y={70 + r * 56} className="fill-text-2 text-[12px]">
            {`RTU ${r + 1}`}
          </text>
          <rect x="90" y={58 + r * 56} width="270" height="16" rx="8" className="fill-surface-2" />
          <rect x={90 + r * 48} y={58 + r * 56} width={270 - r * 48} height="16" rx="8" className="fill-accent" opacity="0.85" />
        </g>
      ))}
      <text x="90" y="324" className="fill-text-2 text-[12px]">
        6:00
      </text>
      <text x="330" y="324" className="fill-text-2 text-[12px]">
        7:00
      </text>
    </svg>
  );
}

function Monitoring() {
  const pts = [
    [40, 200], [80, 190], [120, 196], [160, 184], [200, 192], [240, 170], [280, 150], [320, 118], [360, 96],
  ];
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <svg viewBox="0 0 400 360" className={frame} aria-hidden="true">
      <rect x="40" y="80" width="320" height="60" rx="10" className="fill-accent" opacity="0.08" />
      <text x="52" y="102" className="fill-accent text-[12px] font-semibold">
        Outside normal range
      </text>
      <path d={d} fill="none" className="stroke-text-2" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="280" cy="150" r="14" className="fill-accent" opacity="0.18" />
      <circle cx="280" cy="150" r="5" className="fill-accent" />
      <rect x="196" y="230" width="168" height="54" rx="14" className="fill-surface stroke-hairline" strokeWidth="1.5" />
      <text x="212" y="253" className="fill-text text-[13px] font-semibold">
        Fault flagged early
      </text>
      <text x="212" y="272" className="fill-text-2 text-[12px]">
        RTU 3 · Compressor
      </text>
    </svg>
  );
}

function Peak() {
  const bars = Array.from({ length: 12 }, (_, i) => i);
  const peak = (i: number) => i >= 6 && i <= 8;
  return (
    <svg viewBox="0 0 400 360" className={frame} aria-hidden="true">
      <rect x={40 + 6 * 27} y="60" width={27 * 3} height="240" rx="10" className="fill-accent" opacity="0.08" />
      <text x={46 + 6 * 27} y="84" className="fill-accent text-[12px] font-semibold">
        Peak rates
      </text>
      {bars.map((i) => {
        const h = peak(i) ? 50 : 90 + ((i * 37) % 70);
        return (
          <rect
            key={i}
            x={44 + i * 27}
            y={300 - h}
            width="19"
            height={h}
            rx="6"
            className={peak(i) ? "fill-accent" : "fill-text-2"}
            opacity={peak(i) ? 0.9 : 0.35}
          />
        );
      })}
      <line x1="40" x2="364" y1="300" y2="300" className="stroke-hairline" strokeWidth="1.5" />
    </svg>
  );
}
