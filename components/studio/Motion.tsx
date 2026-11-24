"use client";

import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { projects, type Project } from "@/data/work";
import { WorkCard } from "./WorkCard";

/** Endless strip of project shots under the hero. Pauses on hover. */
export function ImageRail() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 gap-4 pr-4" aria-hidden={hidden || undefined}>
      {projects.map((p) => (
        <li key={p.slug} className="relative aspect-[16/10] w-[22rem] shrink-0 overflow-hidden rounded-2xl sm:w-[30rem]" style={{ backgroundColor: p.tint }}>
          <Image src={p.image.src} alt={hidden ? "" : p.image.alt} fill sizes="30rem" className="object-cover object-top" />
          <span className="absolute bottom-3 left-3 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-fg backdrop-blur">
            {p.client}
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="image-rail flex overflow-hidden">
      <div className="flex w-max animate-[marquee_60s_linear_infinite]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <m.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{" "}
    </m.span>
  );
}

/** Large statement whose words fill in as it scrolls through the viewport. */
export function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="max-w-5xl text-[clamp(1.7rem,3.4vw,3rem)] font-medium leading-[1.18] tracking-[-0.02em]" aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

const FILTERS = ["All", "Website", "Software", "Product"] as const;

/** Instrument-style filterable grid of compact tiles. */
export function WorkGrid({ items = projects, detail = false }: { items?: Project[]; detail?: boolean }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = filter === "All" ? items : items.filter((p) => p.category === filter);
  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="toolbar" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const count = f === "All" ? items.length : items.filter((p) => p.category === f).length;
          if (!count) return null;
          const on = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${on ? "bg-fg text-ink" : "bg-surface-2/70 text-muted hover:text-fg"}`}
            >
              {f} <sup className="ml-0.5 text-[0.65em] opacity-60">{count}</sup>
            </button>
          );
        })}
      </div>
      <ul className={`grid gap-x-5 gap-y-10 sm:grid-cols-2 ${detail ? "" : "lg:grid-cols-4"}`}>
        {shown.map((p, i) => (
          <m.li
            key={`${filter}-${p.slug}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <WorkCard project={p} detail={detail} priority={i < 2} />
          </m.li>
        ))}
      </ul>
    </div>
  );
}
