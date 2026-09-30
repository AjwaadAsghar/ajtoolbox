"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { setupGsap } from "@/lib/gsap";

const PRINCIPLES = [
  { n: "01", title: "Free. Like, actually free.", body: "No trials, no “premium” tier, no credit card. A few ads keep the lights on. That's the whole business model." },
  { n: "02", title: "Your stuff stays yours.", body: "Tools run in your browser. Webcam feeds, PDFs and images are processed on your device and never uploaded." },
  { n: "03", title: "No sign-up. Ever.", body: "Open the page, use the tool, leave. We genuinely do not want your email address." },
  { n: "04", title: "Fast as heck.", body: "Lightweight pages that load instantly, even on hotel Wi-Fi. Tools start working the moment you land." },
  { n: "05", title: "Slightly unhinged.", body: "Some tools are useful. Some are cursed hamsters. We think the internet needs both." },
];

/**
 * Desktop + motion allowed: pinned section that scrolls horizontally.
 * Mobile / reduced motion: a native swipeable row with scroll-snap (no pinning).
 */
export function Principles() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const { gsap } = setupGsap();
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const vp = viewport.current!;
        const tr = track.current!;
        vp.dataset.pinned = "true";
        const distance = () => tr.scrollWidth - vp.clientWidth;

        gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-principle-num]").forEach((el) => {
          gsap.fromTo(el, { yPercent: 40 }, { yPercent: -40, ease: "none", scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
        });
        return () => {
          delete vp.dataset.pinned;
        };
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} aria-labelledby="principles-title" className="relative overflow-hidden py-20 md:flex md:h-svh md:flex-col md:justify-center md:py-0">
      <div className="container-x mb-10 md:mb-12">
        <p className="eyebrow mb-4">House rules</p>
        <h2 id="principles-title" className="font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold uppercase">
          Five rules. <span className="text-muted">No exceptions.</span>
        </h2>
      </div>

      <div
        ref={viewport}
        className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] data-[pinned=true]:snap-none data-[pinned=true]:overflow-visible [&::-webkit-scrollbar]:hidden"
        data-lenis-prevent-touch
      >
        <ul ref={track} className="flex w-max gap-4 px-4 sm:gap-5 sm:px-8 lg:px-12">
          {PRINCIPLES.map((p) => (
            <li
              key={p.n}
              className="relative flex h-[22rem] w-[78vw] max-w-[26rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface/95 p-7 sm:h-[26rem] md:w-[30rem] md:max-w-none"
            >
              <span
                data-principle-num
                className="pointer-events-none absolute -right-4 -top-10 font-display text-[11rem] font-extrabold leading-none text-white/[0.04]"
                aria-hidden="true"
              >
                {p.n}
              </span>
              <span className="font-mono text-sm text-accent">{p.n}</span>
              <div>
                <h3 className="font-display text-3xl font-bold sm:text-4xl">{p.title}</h3>
                <p className="mt-4 text-muted">{p.body}</p>
              </div>
            </li>
          ))}
          <li className="w-1 shrink-0" aria-hidden="true" />
        </ul>
      </div>
    </section>
  );
}
