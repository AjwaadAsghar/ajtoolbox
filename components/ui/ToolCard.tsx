"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import type { Tool } from "@/data/tools";
import { TagPill } from "./TagPill";

const MAX_TILT = 8;

export function ToolCard({
  tool,
  priority = false,
  featured = false,
}: {
  tool: Tool;
  priority?: boolean;
  /** Wider thumbnail for a card spanning two columns. */
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const live = tool.status === "live";
  const raf = useRef(0);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;
      el.style.setProperty("--ry", `${(px - 0.5) * MAX_TILT * 2}deg`);
      el.style.setProperty("--rx", `${(0.5 - py) * MAX_TILT * 2}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    });
  };
  const onEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && ref.current) ref.current.dataset.active = "true";
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.dataset.active = "false";
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const body = (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      data-active="false"
      style={{ ["--card-accent" as string]: tool.accent ?? "var(--color-accent)" }}
      className={`tool-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/80 p-2.5 ${
        live ? "" : "opacity-90"
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`tool-card__depth-sm relative overflow-hidden rounded-[1.1rem] bg-ink-2 ${
          featured ? "aspect-[16/10] sm:aspect-[2/1] lg:aspect-[21/10]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={tool.thumbnail.src}
          alt={tool.thumbnail.alt}
          fill
          priority={priority}
          sizes={featured ? "(min-width: 1024px) 62vw, 92vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"}
          className={`object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] ${
            live ? "" : "blur-[2px] grayscale-[0.6]"
          }`}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 80% at 50% 120%, color-mix(in srgb, ${tool.accent ?? "#d4ff3a"} 35%, transparent), transparent 60%)`,
          }}
        />
        {!live && (
          <div className="absolute inset-0 grid place-items-center bg-ink/55">
            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg">
              <LockIcon /> Coming soon
            </span>
          </div>
        )}
      </div>

      {/* Copy */}
      <div className="tool-card__depth flex flex-1 flex-col gap-3 px-3 pb-3 pt-5">
        <div className="flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        <h3 className="font-display text-2xl font-bold sm:text-[1.65rem]">{tool.name}</h3>
        <p className="text-sm leading-relaxed text-muted">{tool.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-3 text-sm">
          {live ? (
            <span className="font-medium text-fg">
              Open tool
              <span className="ml-1.5 inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                →
              </span>
            </span>
          ) : (
            <span className="text-dim">In the workshop</span>
          )}
          <span
            className="size-2.5 rounded-full"
            style={{
              background: live ? tool.accent ?? "var(--color-accent)" : "var(--color-dim)",
              boxShadow: live ? `0 0 14px ${tool.accent ?? "var(--color-accent)"}` : "none",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="tool-card__shine" aria-hidden="true" />
      <div className="tool-card__sweep" aria-hidden="true" />
    </div>
  );

  if (!live) {
    return (
      <div aria-label={`${tool.name}, coming soon`} className="h-full cursor-not-allowed">
        {body}
      </div>
    );
  }

  const linkProps = { className: "block h-full rounded-3xl", "aria-label": `${tool.name}: ${tool.shortDescription}` };

  // A separate app isn't a route in this one, so it needs a full page load.
  if (tool.separateApp) {
    return (
      <a href={`/${tool.slug}`} {...linkProps}>
        {body}
      </a>
    );
  }

  return (
    <Link href={`/${tool.slug}`} {...linkProps}>
      {body}
    </Link>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3" fill="currentColor" aria-hidden="true">
      <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V6H4a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 15h8a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 12 6h-.5V4.5A3.5 3.5 0 0 0 8 1Zm2 5H6V4.5a2 2 0 1 1 4 0V6Z" />
    </svg>
  );
}
