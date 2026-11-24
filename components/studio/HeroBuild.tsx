"use client";

import { useEffect, useState } from "react";

/** Each step reveals one part of the mock site and logs a line. */
const STEPS = [
  { log: "Scope agreed, fixed quote sent", t: "0.0s" },
  { log: "Design system: type, colour, grid", t: "0.4s" },
  { log: "Hero and navigation", t: "1.1s" },
  { log: "Service pages and booking flow", t: "2.3s" },
  { log: "CMS, SEO and analytics wired up", t: "3.0s" },
  { log: "AI assistant answering enquiries", t: "3.6s" },
  { log: "Deployed to production", t: "4.2s" },
];

const STEP_MS = 1100;
const HOLD_STEPS = 4; // pause on the finished build before looping

export function HeroBuild() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(STEPS.length);
      return;
    }
    const id = setInterval(() => setStep((s) => (s + 1) % (STEPS.length + HOLD_STEPS)), STEP_MS);
    return () => clearInterval(id);
  }, []);

  const on = (n: number) => (step >= n ? "hb-on" : "");
  const done = step >= STEPS.length;

  return (
    <div className="hero-build relative" aria-hidden="true">
      <div className="hb-glow" />

      {/* Browser */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="ml-3 flex-1 truncate rounded-full bg-fg/[0.06] px-3 py-1 font-mono text-[11px] text-muted">
            {done ? "yourbusiness.com" : "preview.yourbusiness.dev"}
          </span>
          <span className={`hb-badge font-mono text-[10px] ${done ? "bg-accent text-black" : "bg-fg/10 text-muted"}`}>
            {done ? "LIVE" : "BUILDING"}
          </span>
        </div>

        <div className="space-y-3 p-4">
          {/* nav */}
          <div className={`hb-piece flex items-center justify-between ${on(2)}`}>
            <span className="h-2.5 w-14 rounded-full bg-accent" />
            <span className="flex gap-2">
              <span className="h-2 w-8 rounded-full bg-fg/20" />
              <span className="h-2 w-8 rounded-full bg-fg/20" />
              <span className="h-2 w-8 rounded-full bg-fg/20" />
            </span>
          </div>
          {/* hero block */}
          <div className={`hb-piece grid grid-cols-[1.3fr_1fr] gap-3 rounded-xl bg-fg/[0.05] p-4 ${on(2)}`}>
            <div className="space-y-2">
              <span className="block h-4 w-11/12 rounded bg-fg/70" />
              <span className="block h-4 w-2/3 rounded bg-fg/70" />
              <span className="block h-2 w-5/6 rounded bg-fg/20" />
              <span className="mt-3 block h-5 w-20 rounded-full bg-accent" />
            </div>
            <div className={`hb-swatch rounded-lg ${on(1)}`} />
          </div>
          {/* cards */}
          <div className={`hb-piece grid grid-cols-3 gap-2 ${on(3)}`}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1.5 rounded-lg border border-line p-2.5">
                <span className="block size-4 rounded bg-accent/70" />
                <span className="block h-1.5 w-full rounded bg-fg/25" />
                <span className="block h-1.5 w-2/3 rounded bg-fg/15" />
              </div>
            ))}
          </div>
          {/* stats row */}
          <div className={`hb-piece flex items-end gap-1.5 rounded-lg border border-line p-3 ${on(4)}`}>
            {[40, 65, 50, 80, 60, 95, 75, 100].map((h, i) => (
              <span key={i} className="hb-bar flex-1 rounded-sm bg-fg/25 last:bg-accent" style={{ height: `${h * 0.32}px`, transitionDelay: `${i * 60}ms` }} />
            ))}
          </div>
        </div>

        {/* AI chat bubble */}
        <div className={`hb-chat absolute bottom-4 right-4 max-w-[11rem] rounded-2xl rounded-br-sm bg-fg px-3 py-2 text-[11px] leading-snug text-ink shadow-xl ${on(5)}`}>
          Hi! Want to book a slot this week?
        </div>
      </div>

      {/* Build log */}
      <div className="hb-log relative -mt-6 ml-6 mr-[-0.5rem] rounded-2xl border border-line bg-ink/90 p-4 font-mono text-[11px] shadow-2xl shadow-black/40 backdrop-blur-xl sm:ml-10">
        <ul className="space-y-1.5">
          {STEPS.map((s, i) => {
            const state = step > i ? "done" : step === i ? "run" : "todo";
            return (
              <li key={s.log} className={`flex items-center gap-2.5 transition-opacity duration-500 ${state === "todo" ? "opacity-25" : ""}`}>
                <span className={`grid size-3.5 shrink-0 place-items-center rounded-full text-[8px] ${state === "done" ? "bg-accent text-black" : "border border-line"}`}>
                  {state === "done" ? "✓" : state === "run" ? <span className="hb-spin size-2 rounded-full border border-accent border-t-transparent" /> : null}
                </span>
                <span className={`truncate ${state === "done" ? "text-fg" : "text-muted"}`}>{s.log}</span>
                <span className="ml-auto text-dim">{state === "done" ? s.t : ""}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
