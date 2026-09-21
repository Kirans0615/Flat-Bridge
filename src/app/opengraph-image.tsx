import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Fully static (no params) — required by `output: 'export'` for the
// GitHub Pages mockup build; harmless and correct for the normal build too.
export const dynamic = "force-static";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05121A",
          color: "#F2F3F1",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, color: "#6FB53A", display: "flex" }}>{site.displayName}</div>
        <div style={{ fontSize: 64, fontWeight: 600, display: "flex", maxWidth: 900 }}>
          {site.tagline}
        </div>
        <div style={{ width: "100%", height: 4, background: "#457C22", display: "flex" }} />
      </div>
    ),
    size
  );
}
