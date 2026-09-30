"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { setupGsap } from "@/lib/gsap";

const TEXT =
  "Most of the internet wants your email, your card and your patience. AJ Toolbox wants nothing. Open a tool, do the thing, get on with your day.";
const HIGHLIGHT = new Set(["nothing.", "Open", "tool,"]);

/**
 * Words light up one by one as you scroll. Text is fully visible without JS
 * and for reduced-motion users; GSAP only dims it once motion is allowed.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const { gsap } = setupGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 45%", scrub: 0.5 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="Why AJ Toolbox exists" className="container-x py-28 sm:py-40">
      <p className="eyebrow mb-8">The deal</p>
      <p className="max-w-6xl font-display text-[clamp(2rem,5.2vw,4.8rem)] font-bold leading-[1.02] tracking-[-0.03em]">
        {TEXT.split(" ").map((word, i) => (
          <span key={i} data-word className={HIGHLIGHT.has(word) ? "text-accent" : undefined}>
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
