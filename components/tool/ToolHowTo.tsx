import type { ToolStep } from "@/data/tools";

export function ToolHowTo({ steps, toolName }: { steps: ToolStep[]; toolName: string }) {
  return (
    <section aria-labelledby="howto-title">
      <p className="eyebrow mb-4">How to use</p>
      <h2 id="howto-title" className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold">
        How to use {toolName}
      </h2>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="scroll-reveal group relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-500 hover:border-[color-mix(in_srgb,var(--tool-accent)_40%,transparent)]"
          >
            <span className="font-mono text-xs text-[var(--tool-accent)]">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 font-display text-xl font-bold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
