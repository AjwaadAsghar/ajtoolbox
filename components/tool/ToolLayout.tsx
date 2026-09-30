import Link from "next/link";
import type { ReactNode } from "react";
import { AdSlot } from "@/components/ads/AdSlot";
import { TagPill } from "@/components/ui/TagPill";
import type { Tool } from "@/data/tools";
import { ToolFaq } from "./ToolFaq";
import { ToolHowTo } from "./ToolHowTo";
import { MoreTools } from "./MoreTools";

/**
 * Shared layout for every /[slug] tool page. Lightweight on purpose:
 * server-rendered text + CSS animation only. No three.js, no GSAP.
 */
export function ToolLayout({ tool, children }: { tool: Tool; children: ReactNode }) {
  const accent = tool.accent ?? "var(--color-accent)";
  const local = tool.tags.some((t) => t === "Webcam" || t === "PDF" || t === "Image");

  return (
    <article style={{ ["--tool-accent" as string]: accent }} className="relative pt-28 sm:pt-32">
      {/* Accent glow behind the header */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60svh]"
        style={{ background: `radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, ${accent} 18%, transparent), transparent 70%)` }}
        aria-hidden="true"
      />

      <header className="container-x">
        <nav aria-label="Breadcrumb" className="mb-6 animate-fade">
          <ol className="flex h-5 items-center gap-2 overflow-hidden whitespace-nowrap font-mono text-xs uppercase leading-5 tracking-[0.14em] text-dim">
            <li>
              <Link href="/" prefetch={false} className="transition-colors hover:text-fg">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#tools" prefetch={false} className="transition-colors hover:text-fg">
                Tools
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="truncate text-muted">
              {tool.name}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold">
              <span className="reveal-line">
                <span>{tool.name}</span>
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted animate-fade [animation-delay:0.15s] sm:text-xl">
              {tool.shortDescription}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 animate-fade [animation-delay:0.25s]">
            {tool.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
            {local && (
              <span className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-accent">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> Runs locally
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ===== THE TOOL ===== no ads inside or adjacent to this frame */}
      <section aria-label={tool.name} className="container-x mt-10">
        <div
          className="rounded-[1.6rem] border border-line bg-surface p-2 shadow-[0_40px_120px_-50px_var(--tool-accent)] sm:p-3"
        >
          {children}
        </div>
        <p className="mt-4 text-center text-xs text-dim">{tool.longDescription}</p>
      </section>

      {/* Ad #1: below the tool with generous spacing, well clear of its controls */}
      <div className="container-x mt-20">
        <AdSlot placement="toolBelow" minHeight={280} />
      </div>

      <div className="container-x mt-20 grid gap-20 lg:grid-cols-[1fr_minmax(0,46rem)_1fr]">
        <div className="flex flex-col gap-24 lg:col-start-2">
          {tool.howTo && <ToolHowTo steps={tool.howTo} toolName={tool.name} />}

          {tool.explainer && (
            <section aria-labelledby="explainer-title">
              <p className="eyebrow mb-4">The lowdown</p>
              <h2 id="explainer-title" className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold">
                {tool.explainer.heading}
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
                {tool.explainer.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {tool.faq && tool.faq.length > 0 && <ToolFaq faq={tool.faq} />}
        </div>
      </div>

      {/* Ad #2: after the FAQ content */}
      <div className="container-x mt-20">
        <AdSlot placement="toolContent" minHeight={280} />
      </div>

      <MoreTools currentSlug={tool.slug} />
    </article>
  );
}
