import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared OG card renderer (1200×630). Used by app/opengraph-image and app/[slug]/opengraph-image. */
export function renderOg({
  eyebrow,
  title,
  subtitle,
  accent = "#d4ff3a",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  accent?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `radial-gradient(70% 90% at 85% 10%, ${accent}40, transparent 60%), radial-gradient(60% 80% at 0% 100%, #7c5cff40, transparent 60%), #07070a`,
          color: "#f4f2ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#d4ff3a",
              color: "#0b0d02",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            AJ
          </div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>AJ Toolbox</div>
          <div style={{ marginLeft: "auto", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#9a98a6" }}>
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>{title}</div>
          <div style={{ fontSize: 34, color: "#9a98a6", maxWidth: 900, lineHeight: 1.3 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 22, color: accent }}>
          <span>Free</span>
          <span style={{ color: "#5f5d6b" }}>·</span>
          <span>No sign-up</span>
          <span style={{ color: "#5f5d6b" }}>·</span>
          <span>Runs in your browser</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
