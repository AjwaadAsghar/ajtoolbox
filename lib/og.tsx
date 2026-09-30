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
          <svg width="101" height="56" viewBox="70 120 1310 730">
            <path fill="#d4ff3a" fillRule="evenodd" d="M666 282V225Q666 133 760 133H1060Q1148 133 1148 220V282ZM735 293V228Q735 197 767 197H1048Q1080 197 1080 228V293Z" />
            <path fill="#d4ff3a" d="M530 281H1283Q1365 281 1365 360V387Q1365 397 1355 397H450Q440 397 440 387V370Q440 281 530 281Z" />
            <path fill="#d4ff3a" d="M440 435L1350 433Q1362 433 1360 447L1340 745Q1335 838 1235 838H505Q415 838 416 760Z" />
            <path fill="#d4ff3a" d="M205 435H440L433 479H205Q182 479 182 457Q182 435 205 435ZM221 657H424L418 700H221Q199 700 199 678Q199 657 221 657ZM103 551H352Q374 551 374 572Q374 594 352 594H103Q81 594 81 572Q81 551 103 551ZM330 326H391Q406 326 406 341Q406 357 391 357H330Q315 357 315 341Q315 326 330 326Z" />
            <path fill="#07070a" d="M543 775L738 478H848L975 692H1000Q1034 692 1034 655V478H1148V655Q1148 775 1010 775H903L795 585L748 657H818L833 683L810 717H710L677 775Z" />
          </svg>
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
