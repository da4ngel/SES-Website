import { ImageResponse } from "next/og";
import { arc } from "@/components/layout/logo-paths";

// iOS home-screen icon: the teal arc on brand navy. Generated at build time.
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#142941" }}>
        <svg viewBox="45 -1 63 37" width={132} height={78}>
          {arc.map((d, i) => (
            <path key={i} d={d} fill="#1ab3b3" />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
