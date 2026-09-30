"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { heroState, setLoadProgress } from "./heroState";
import { detectQualityTier, type QualityTier } from "./quality";

// three.js + R3F live in their own chunk, never rendered on the server.
const loadScene = () => import("./HeroScene");
const HeroScene = dynamic(loadScene, { ssr: false });

/**
 * Client shell around the 3D hero:
 *  - starts loading the WebGL scene immediately and reports progress to the homepage preloader
 *  - reduced-motion / low-power devices skip 3D entirely (text-only hero) and release the preloader
 *  - pauses rendering when the hero is off-screen
 */
export function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<QualityTier | null>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const t = detectQualityTier();
    setTier(t);
    if (t === "off") {
      setLoadProgress(1);
      return;
    }
    setLoadProgress(0.5);
    loadScene()
      .then(() => setLoadProgress(0.8))
      .catch(() => setLoadProgress(1));
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

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      {tier !== null && tier !== "off" && (
        <div
          data-hero-canvas={ready ? "ready" : "loading"}
          className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <HeroScene
            tier={tier}
            active={inView}
            onReady={() => {
              setReady(true);
              setLoadProgress(1);
            }}
            onLost={() => {
              setReady(false);
              setTier("off");
              setLoadProgress(1);
            }}
          />
        </div>
      )}
    </div>
  );
}
