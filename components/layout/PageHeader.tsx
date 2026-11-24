import type { ReactNode } from "react";

/** Header for content pages. CSS animation only. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <header className="container-x pt-36 sm:pt-44">
      <p className="eyebrow mb-6 animate-fade">{eyebrow}</p>
      <h1 className="max-w-5xl text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.03em]">
        <span className="reveal-line">
          <span>{title}</span>
        </span>
      </h1>
      {intro && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted animate-fade [animation-delay:0.2s]">{intro}</p>
      )}
    </header>
  );
}
