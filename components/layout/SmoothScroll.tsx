"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let lenisInstance: Lenis | null = null;
/** The global Lenis instance (null when disabled, e.g. reduced motion). */
export const getLenis = () => lenisInstance;

/**
 * Lenis smooth scrolling. Disabled for prefers-reduced-motion users.
 * Touch devices keep native scrolling (Lenis default), which feels best on mobile.
 * Add `data-lenis-prevent` to any element (e.g. a scrollable tool panel) to opt it out.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 }, lerp: 0.1 });
    lenisInstance = lenis;
    window.dispatchEvent(new Event("lenis:ready"));

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
