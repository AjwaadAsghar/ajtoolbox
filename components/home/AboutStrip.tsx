"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { setupGsap } from "@/lib/gsap";
import { site } from "@/lib/site";

/** Short "who's behind this" strip with parallax background type. */
export function AboutStrip() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const { gsap } = setupGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo("[data-parallax-slow]", { xPercent: 8 }, { xPercent: -18, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo("[data-parallax-fast]", { xPercent: -20 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="about-title" className="relative overflow-hidden py-28 sm:py-36">
      {/* Parallax layers */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-2 select-none" aria-hidden="true">
        <span
          data-parallax-slow
          className="whitespace-nowrap font-display text-[22vw] font-extrabold uppercase leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.07)]"
        >
          AJ Studios AJ Studios
        </span>
        <span
          data-parallax-fast
          className="whitespace-nowrap font-display text-[14vw] font-extrabold uppercase leading-[0.8] text-white/[0.025]"
        >
          Toolbox Toolbox Toolbox
        </span>
      </div>

      <div className="container-x relative">
        <div className="grid gap-10 rounded-[2rem] border border-line bg-ink-2/90 p-8 sm:p-12 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16 lg:p-16">
          <Reveal>
            <p className="eyebrow mb-5">Who&apos;s behind this</p>
            <h2 id="about-title" className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold">
              One person, a lot of browser tabs, and <span className="text-accent">zero chill.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">
              AJ Toolbox is a collection of free, fun web tools built by {site.author.name}. Some solve real problems,
              some exist purely because they were funny at 2am. All of them are free.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="/about">More about AJ</MagneticButton>
              <MagneticButton href="/contact" variant="ghost">
                Suggest a tool
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
