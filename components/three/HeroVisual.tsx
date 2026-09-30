"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { HeroPoster } from "./HeroPoster";
import { heroState } from "./heroState";
import { detectQualityTier, type QualityTier } from "./quality";

// three.js + R3F live in their own chunk, never rendered on the server.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Client shell around the 3D hero:
 *  - paints a pre-rendered poster of the real scene instantly (and keeps it for reduced motion / weak devices)
 *  - loads the WebGL scene on the first interaction, then cross-fades once it has rendered
 *  - pauses rendering when the hero is off-screen
 */
export function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<QualityTier | null>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  // The poster already looks identical, so hand over to live WebGL on the first interaction
  // (mouse move, touch, scroll, key). Keeps three.js entirely off the critical path.
  useEffect(() => {
    const t = detectQualityTier();
    setTier(t);
    if (t === "off") return;

    const events = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, go));
    const go = () => {
      cleanup();
      setLoad(true);
    };
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
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

  const showCanvas = load && tier !== null && tier !== "off";

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>
        <HeroPoster />
      </div>
      {showCanvas && (
        <div
          data-hero-canvas={ready ? "ready" : "loading"}
          className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        >
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
