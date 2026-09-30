/**
 * Tiny mutable store shared between the DOM (GSAP ScrollTrigger, pointer listeners)
 * and the R3F scene. Mutated directly and read inside useFrame, so zero React re-renders.
 */
export const heroState = {
  /** 0 → 1 across the pinned hero. */
  progress: 0,
  /** Normalised pointer, -1 → 1. */
  pointer: { x: 0, y: 0 },
};
