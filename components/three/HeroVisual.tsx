"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { HeroFallback } from "./HeroFallback";
import { heroState } from "./heroState";
import { detectQualityTier, type QualityTier } from "./quality";

// three.js + R3F live in their own chunk, fetched only on capable devices, never on the server.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Client shell around the 3D hero:
 *  - renders a static CSS fallback immediately (and forever on low-power / reduced-motion)
 *  - loads the WebGL scene after the browser is idle so it never competes with LCP
 *  - pauses rendering when the hero is off-screen
 */
export function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<QualityTier | null>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  // Pick quality tier, then load the scene on the first interaction (touch, scroll, mouse, key).
  // High-tier devices also get it after a short idle period. Keeps three.js off the critical
  // path entirely, which protects LCP/TBT/INP, and the static fallback covers the gap.
  useEffect(() => {
    const t = detectQualityTier();
    setTier(t);
    if (t === "off") return;

    const events = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timer: number | undefined;

    const go = () => {
      cleanup();
      setLoad(true);
    };
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, go));
      if (timer !== undefined) clearTimeout(timer);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
    };

    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    if (t === "high") {
      timer = window.setTimeout(() => {
        if (w.requestIdleCallback) idleId = w.requestIdleCallback(go, { timeout: 2500 });
        else go();
      }, 2500);
    }
    return cleanup;
  }, []);

  // Pause when off-screen
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pointer → normalised coords for parallax/tilt
  useEffect(() => {
    if (tier === "off" || tier === null) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      heroState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      heroState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [tier]);

  const showCanvas = load && tier && tier !== "off";

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}>
        <HeroFallback />
      </div>
      {showCanvas && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene
            tier={tier}
            active={inView}
            onReady={() => setReady(true)}
            onLost={() => {
              setReady(false);
              setTier("off");
            }}
          />
        </div>
      )}
    </div>
  );
}
