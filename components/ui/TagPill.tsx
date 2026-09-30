import type { ToolTag } from "@/data/tools";

export function TagPill({ tag }: { tag: ToolTag }) {
  return (
    <span className="rounded-full border border-line bg-white/[0.04] px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted">
      {tag}
    </span>
  );
}
