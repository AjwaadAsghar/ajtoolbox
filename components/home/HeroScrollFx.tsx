"use client";

import { useGSAP } from "@gsap/react";
import { heroState } from "@/components/three/heroState";
import { setupGsap } from "@/lib/gsap";

/** Scroll choreography for the hero. Renders nothing; only wires GSAP to the server-rendered markup. */
export function HeroScrollFx() {
  useGSAP(() => {
    const { gsap, ScrollTrigger } = setupGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          heroState.progress = self.progress;
        },
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.to("[data-hero-copy]", { yPercent: -18, opacity: 0, filter: "blur(8px)", duration: 0.3 }, 0.08)
        .to("[data-hero-hint]", { opacity: 0, duration: 0.1 }, 0)
        .fromTo("[data-hero-second]", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.2 }, 0.5)
        .to("[data-hero-second]", { opacity: 0, yPercent: -30, duration: 0.15 }, 0.85);

      return () => {
        st.kill();
        heroState.progress = 0;
      };
    });

    return () => mm.revert();
  });

  return null;
}
