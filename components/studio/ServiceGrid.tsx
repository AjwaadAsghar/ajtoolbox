"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { services } from "@/data/work";

/** Simple line icons, drawn in when the card enters view. */
const ICONS: Record<string, string[]> = {
  websites: ["M3 5h18v14H3z", "M3 9h18", "M6 7h.01M8.5 7h.01"],
  software: ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 16.5h7M16.5 13v7"],
  "ai-automation": ["M12 3v3M12 18v3M3 12h3M18 12h3", "M7 7h10v10H7z", "M10 10h4v4h-4z"],
  products: ["M12 3l8 4.5v9L12 21l-8-4.5v-9z", "M4 7.5l8 4.5 8-4.5", "M12 12v9"],
};

function onMove(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function ServiceGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
      {services.map((s, i) => (
        <m.li
          key={s.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="bg-surface"
        >
          <Link href={`/services#${s.id}`} onMouseMove={onMove} className="spotlight group relative flex h-full flex-col p-8 sm:p-10">
            <div className="flex items-start justify-between">
              <svg viewBox="0 0 24 24" className="size-9 text-accent-deep" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[s.id]?.map((d, j) => (
                  <m.path
                    key={j}
                    d={d}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + j * 0.15, ease: "easeInOut" }}
                  />
                ))}
              </svg>
              <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-10 text-2xl font-semibold">{s.title}</h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{s.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {s.deliverables.map((d) => (
                <li key={d} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                  {d}
                </li>
              ))}
            </ul>
            <span className="mt-auto pt-8 text-sm text-muted transition-colors group-hover:text-fg">
              Learn more <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </m.li>
      ))}
    </ul>
  );
}
