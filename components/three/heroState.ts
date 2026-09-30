/**
 * Tiny mutable store shared between the DOM (GSAP ScrollTrigger, pointer listeners, preloader)
 * and the R3F scene. Mutated directly and read inside useFrame, so zero React re-renders.
 */
export const heroState = {
  /** 0 → 1 across the pinned hero. */
  progress: 0,
  /** Normalised pointer, -1 → 1. */
  pointer: { x: 0, y: 0 },
};

/* ---------- Load progress (drives the homepage preloader) ---------- */

type Listener = (progress: number) => void;
let loadProgress = 0;
const listeners = new Set<Listener>();

/** Report how far the hero has loaded (0 → 1). Only ever moves forward. 1 = ready to reveal. */
export function setLoadProgress(p: number) {
  if (p <= loadProgress) return;
  loadProgress = Math.min(1, p);
  listeners.forEach((l) => l(loadProgress));
}

/** Subscribe to load progress. Called immediately with the current value. */
export function onLoadProgress(listener: Listener) {
  listeners.add(listener);
  listener(loadProgress);
  return () => {
    listeners.delete(listener);
  };
}
