import { ImageResponse } from "next/og";
import { LOGO_VIEWBOX, arc, systems, wordmark } from "@/components/layout/logo-paths";

// A raster logo for schema.org Organization.logo (lib/jsonld.ts) — Google's
// structured-data guidelines don't accept SVG there. Generated at build time,
// same mechanism as apple-icon.tsx/opengraph-image.tsx.
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#142941",
        }}
      >
        <svg viewBox={LOGO_VIEWBOX} width={440} height={275}>
          {[...arc, ...systems].map((d, i) => (
            <path key={`t${i}`} d={d} fill="#1ab3b3" />
          ))}
          {wordmark.map((d, i) => (
            <path key={`w${i}`} d={d} fill="#f6f6f6" />
          ))}
        </svg>
      </div>
    ),
    { width: 600, height: 600 },
  );
}
