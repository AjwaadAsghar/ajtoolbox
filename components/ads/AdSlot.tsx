"use client";

import { useEffect, useRef } from "react";
import { adsEnabled, adsense, type AdPlacement } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  placement: AdPlacement;
  /** Reserved height in px so the ad never shifts layout (CLS). */
  minHeight?: number;
  format?: "auto" | "horizontal" | "rectangle" | "fluid";
  className?: string;
};

/**
 * Reusable ad container.
 * - No publisher ID set  → grey placeholder (dev) or nothing (prod, unless NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true).
 * - Publisher + slot set → real AdSense <ins> unit.
 * RULE: never render this inside a tool or next to its buttons. Keep it ≥ 48px away from anything clickable.
 */
export function AdSlot({ placement, minHeight = 280, format = "auto", className = "" }: AdSlotProps) {
  const slotId = adsense.slots[placement];
  const live = adsEnabled && Boolean(slotId);
  const pushed = useRef(false);

  useEffect(() => {
    if (!live || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* AdSense not loaded yet or blocked, fail silently */
    }
  }, [live]);

  if (!live && !adsense.showPlaceholders) return null;

  return (
    <aside
      aria-label="Advertisement"
      className={`relative mx-auto w-full max-w-5xl ${className}`}
      style={{ minHeight }}
    >
      <p className="eyebrow mb-2 text-center !text-[0.62rem] !text-dim">Advertisement</p>
      {live ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block", minHeight: minHeight - 24 }}
          data-ad-client={adsense.clientId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className="grid place-items-center rounded-2xl border border-dashed border-line bg-white/[0.02] font-mono text-xs text-dim"
          style={{ minHeight: minHeight - 24 }}
        >
          Ad slot · {placement}
        </div>
      )}
    </aside>
  );
}
