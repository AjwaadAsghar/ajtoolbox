import { HeroVisual } from "@/components/three/HeroVisual";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getLiveTools } from "@/data/tools";
import { HeroScrollFx } from "./HeroScrollFx";

/**
 * All hero text is server-rendered HTML (the LCP element is the H1, not the canvas).
 * The section is 210svh tall with a sticky viewport; scrolling through it drives the 3D scene.
 * No scroll-jacking: it's plain native scroll + position: sticky.
 */
export function Hero() {
  const liveCount = getLiveTools().length;

  return (
    <section id="hero" className="relative h-[210svh] motion-reduce:h-svh" aria-labelledby="hero-title">
      <div className="sticky top-0 h-svh overflow-hidden">
        <HeroVisual />

        {/* Legibility scrims */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent md:h-1/2" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-ink/80 to-transparent md:block" />

        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-[max(9svh,4.5rem)] md:justify-center md:pb-0">
          <div data-hero-copy className="max-w-4xl">
            <p className="eyebrow mb-5 flex items-center gap-3 [animation-delay:0.5s] animate-fade">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {liveCount} live · more cooking
            </p>

            <h1
              id="hero-title"
              className="font-display text-[clamp(3.3rem,11.5vw,10.5rem)] font-extrabold uppercase leading-[0.86]"
            >
              <span className="reveal-line">
                <span style={{ ["--i" as string]: 0 }}>Free tools.</span>
              </span>
              <span className="reveal-line">
                <span style={{ ["--i" as string]: 1 }} className="text-accent">
                  Built different.
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted opacity-0 animate-fade [animation-delay:0.45s] sm:text-lg">
              Tiny, fast, slightly unhinged web tools that run right in your browser. No sign-ups, no uploads, no
              nonsense. Just open one and go.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 opacity-0 animate-fade [animation-delay:0.6s]">
              <MagneticButton href="/#tools">
                Browse the tools <span aria-hidden="true">↓</span>
              </MagneticButton>
              <MagneticButton href="/about" variant="ghost">
                What is this?
              </MagneticButton>
            </div>
          </div>

          {/* Second beat, revealed mid-scroll by HeroScrollFx */}
          <div
            data-hero-second
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 text-center opacity-0 motion-safe:block"
            aria-hidden="true"
          >
            <p className="font-display text-[clamp(2.4rem,8vw,7rem)] font-extrabold uppercase leading-[0.9]">
              Pick one.
              <br />
              <span className="text-gradient">Break it.</span>
              <br />
              It&apos;s free.
            </p>
          </div>

          <div
            data-hero-hint
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
            aria-hidden="true"
          >
            <span className="flex flex-col items-center gap-2 animate-fade [animation-delay:1.1s]">
              <span className="eyebrow !text-[0.6rem]">Scroll</span>
              <span className="relative h-10 w-px overflow-hidden bg-white/10">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollhint_1.8s_ease-in-out_infinite] bg-accent" />
              </span>
            </span>
          </div>
        </div>
      </div>
      <HeroScrollFx />
    </section>
  );
}
