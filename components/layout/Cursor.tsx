"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = 'a, button, [role="button"], [data-cursor="hover"], summary, input, select, textarea, label';

/**
 * A soft follower ring that grows over interactive elements.
 * Only on fine pointers (mouse/trackpad) and when motion is allowed. The native cursor stays visible.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current;
    if (!fine || reduced || !ring) return;

    let x = 0, y = 0, tx = 0, ty = 0, scale = 1, tScale = 1, press = 1;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        x = tx;
        y = ty;
        ring.style.opacity = "1";
      }
      tScale = (e.target as Element | null)?.closest?.(INTERACTIVE) ? 1.9 : 1;
    };
    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
    };
    const onDown = () => (press = 0.75);
    const onUp = () => (press = 1);

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      scale += (tScale * press - scale) * 0.18;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] size-8 rounded-full border border-white/80 opacity-0 mix-blend-difference transition-opacity duration-300"
    />
  );
}
