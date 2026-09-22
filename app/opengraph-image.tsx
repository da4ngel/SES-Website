import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { hero } from "@/content/home";
import { LOGO_VIEWBOX, arc, systems, wordmark } from "@/components/layout/logo-paths";

// Generated once at build time (static export). Shared by every page.
export const dynamic = "force-static";
export const alt = `${site.name}: ${hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#142941";
const TEAL = "#069999";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(circle at 85% 15%, #0b5a63 0%, ${NAVY} 55%)`,
          color: "#f6f6f6",
          fontFamily: "sans-serif",
        }}
      >
        <svg viewBox={LOGO_VIEWBOX} width={214} height={134}>
          {[...arc, ...systems].map((d, i) => (
            <path key={`t${i}`} d={d} fill={TEAL} />
          ))}
          {wordmark.map((d, i) => (
            <path key={`w${i}`} d={d} fill="#f6f6f6" />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.04 }}>{hero.headline}</div>
          <div style={{ fontSize: 34, color: "#b8c2d0", marginTop: 24 }}>{hero.subhead}</div>
        </div>
      </div>
    ),
    size,
  );
}
