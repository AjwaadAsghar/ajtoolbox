"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/components/layout/SmoothScroll";
import { Logo } from "@/components/layout/Logo";
import { onLoadProgress, setLoadProgress } from "@/components/three/heroState";

const MIN_VISIBLE_MS = 700; // avoid a flash on fast connections
const MAX_WAIT_MS = 9000; // never hold the page longer than this

/**
 * Homepage loading screen: logo + progress bar, shown until the 3D hero has rendered.
 * Server-rendered so it covers the page from the first paint. The page content underneath
 * is fully rendered HTML the whole time (Google reads it normally).
 * CSS failsafe in globals.css hides it even if JavaScript never runs.
 */
export function Preloader() {
  const [progress, setProgress] = useState(0.12);
  const [state, setState] = useState<"loading" | "leaving" | "done">("loading");
  const start = useRef(0);

  useEffect(() => {
    start.current = performance.now();
    setLoadProgress(0.3); // hydrated
    document.fonts?.ready.then(() => setLoadProgress(0.42));

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start.current));
      window.setTimeout(() => {
        setState("leaving");
        getLenis()?.start();
        window.setTimeout(() => setState("done"), 550);
      }, wait + 180); // let the bar visibly reach 100%
    };

    const unsubscribe = onLoadProgress((p) => {
      setProgress(Math.max(0.12, p));
      if (p >= 1) finish();
    });
    const failsafe = window.setTimeout(() => setLoadProgress(1), MAX_WAIT_MS);

    // Hold smooth scroll while loading (native scroll is locked via CSS)
    const stopLenis = () => getLenis()?.stop();
    stopLenis();
    window.addEventListener("lenis:ready", stopLenis, { once: true });

    return () => {
      unsubscribe();
      clearTimeout(failsafe);
      window.removeEventListener("lenis:ready", stopLenis);
    };
  }, []);

  if (state === "done") return null;

  return (
    <div
      id="preloader"
      data-state={state}
      role="status"
      aria-live="polite"
      aria-label="Loading AJ Toolbox"
      className="fixed inset-0 z-[150] grid place-items-center bg-ink transition-[opacity,visibility] duration-500 ease-out-expo data-[state=leaving]:invisible data-[state=leaving]:opacity-0"
    >
      <div className="flex flex-col items-center gap-9 transition-transform duration-500 ease-out-expo [[data-state=leaving]_&]:scale-110">
        <Logo className="h-16 w-auto animate-[preloader-float_2.4s_ease-in-out_infinite] sm:h-20" />
        <div className="h-[2px] w-36 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full origin-left rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)] transition-transform duration-500 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </div>
  );
}
