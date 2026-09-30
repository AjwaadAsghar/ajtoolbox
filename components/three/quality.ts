export type QualityTier = "high" | "low" | "off";

type NavigatorExtras = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/**
 * Decide how much 3D this device gets.
 *  off  → static fallback (reduced motion, no WebGL, Save-Data, very weak hardware)
 *  low  → fewer objects, cheaper materials, capped DPR (phones, tablets, ≤4 cores)
 *  high → the full scene
 */
export function detectQualityTier(): QualityTier {
  if (typeof window === "undefined") return "off";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";

  const nav = navigator as NavigatorExtras;
  if (nav.connection?.saveData) return "off";
  if (nav.connection?.effectiveType && /(^|-)2g$/.test(nav.connection.effectiveType)) return "off";

  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    if (!gl) return "off";
  } catch {
    return "off";
  }

  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  if (cores <= 2 || memory <= 2) return "off";

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 768;
  if (coarse || small || cores <= 4 || memory <= 4) return "low";

  return "high";
}
