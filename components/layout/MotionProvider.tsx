"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Animation features load in a separate chunk after hydration, keeping them off the critical path.
const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

/** LazyMotion keeps Framer's bundle small. Use `m.div` (not `motion.div`) in components. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
