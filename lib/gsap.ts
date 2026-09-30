"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/components/layout/SmoothScroll";

let registered = false;

/** Register GSAP plugins once and keep ScrollTrigger in sync with Lenis. Homepage only. */
export function setupGsap() {
  if (registered || typeof window === "undefined") return { gsap, ScrollTrigger };
  gsap.registerPlugin(ScrollTrigger);
  registered = true;

  const sync = () => getLenis()?.on("scroll", ScrollTrigger.update);
  if (getLenis()) sync();
  else window.addEventListener("lenis:ready", sync, { once: true });

  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
