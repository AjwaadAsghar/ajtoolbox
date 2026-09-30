import type { Metadata } from "next";
import Link from "next/link";
import { getLiveTools } from "@/data/tools";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const tools = getLiveTools().slice(0, 3);

  return (
    <section className="container-x relative flex min-h-[85svh] flex-col items-center justify-center pt-28 text-center">
      <p className="eyebrow mb-6 animate-fade">Error 404</p>
      <h1
        className="font-display text-[clamp(7rem,30vw,22rem)] font-extrabold leading-[0.8] text-gradient"
        aria-label="404: Page not found"
      >
        <span className="reveal-line">
          <span>404</span>
        </span>
      </h1>
      <p className="mt-8 max-w-md text-lg text-muted animate-fade [animation-delay:0.2s]">
        This page wandered off. Probably chasing the hamster. Let&apos;s get you somewhere useful.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3 animate-fade [animation-delay:0.3s]">
        <Link
          href="/"
          className="inline-flex h-13 items-center rounded-full bg-accent px-7 font-semibold text-accent-ink transition-transform active:scale-95"
        >
          Take me home
        </Link>
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            className="inline-flex h-13 items-center rounded-full border border-line bg-white/[0.04] px-7 font-semibold transition-colors hover:bg-white/[0.08]"
          >
            Try {t.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
