import Link from "next/link";

/** Generic "more tools on the way" teaser. Not a registry entry, so no page and no sitemap URL. */
export function MoreSoonCard() {
  return (
    <div className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-white/15 bg-surface/40 p-7 transition-colors duration-500 hover:border-accent/40">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(closest-side,rgb(212_255_58/0.18),transparent)] transition-transform duration-700 ease-out-expo group-hover:scale-125"
        aria-hidden="true"
      />
      <span className="relative flex w-fit items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
        </span>
        In the workshop
      </span>
      <div className="relative">
        <h3 className="font-display text-3xl font-bold">More tools on the way.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          New free tools are being built right now. Got an idea for one?
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
        >
          Suggest a tool
          <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
