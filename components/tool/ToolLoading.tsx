/** Skeleton shown while a tool's client bundle loads. Same aspect as the tool frame to avoid CLS. */
export function ToolLoading({ label = "Loading tool…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="relative grid min-h-[26rem] w-full place-items-center overflow-hidden rounded-2xl bg-ink sm:aspect-video sm:min-h-0"
    >
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(60%_60%_at_50%_50%,rgb(255_255_255/0.04),transparent)]" />
      <div className="relative flex flex-col items-center gap-4">
        <span className="size-10 animate-spin rounded-full border-2 border-white/15 border-t-accent" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{label}</span>
      </div>
    </div>
  );
}
