"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { process } from "@/data/work";

/** Vertical timeline; the accent line fills as you scroll through it. */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      <span className="absolute left-[11px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
      <m.span
        className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-accent"
        style={{ scaleY: fill }}
        aria-hidden="true"
      />
      {process.map((p, i) => (
        <m.li
          key={p.title}
          initial={{ opacity: 0.25 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px" }}
          transition={{ duration: 0.5 }}
          className="relative grid gap-2 pb-14 pl-12 last:pb-0 sm:grid-cols-[14rem_1fr] sm:gap-10"
        >
          <span className="absolute left-0 top-0.5 grid size-[23px] place-items-center rounded-full border border-line bg-ink" aria-hidden="true">
            <span className="size-[7px] rounded-full bg-accent" />
          </span>
          <div>
            <span className="font-mono text-xs text-dim">Step {String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-1 text-2xl font-medium">{p.title}</h3>
          </div>
          <p className="max-w-lg leading-relaxed text-muted sm:pt-5">{p.text}</p>
        </m.li>
      ))}
    </ol>
  );
}
