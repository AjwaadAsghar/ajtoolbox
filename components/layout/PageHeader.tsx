import type { ReactNode } from "react";

/** Simple, lightweight header for content pages (about, contact, privacy). CSS animation only. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <header className="container-x pt-36 sm:pt-44">
      <p className="eyebrow mb-5 animate-fade">{eyebrow}</p>
      <h1 className="max-w-5xl font-display text-[clamp(2.8rem,8vw,7rem)] font-extrabold uppercase">
        <span className="reveal-line">
          <span>{title}</span>
        </span>
      </h1>
      {intro && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted animate-fade [animation-delay:0.2s] sm:text-xl">
          {intro}
        </p>
      )}
    </header>
  );
}
