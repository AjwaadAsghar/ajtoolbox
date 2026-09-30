import { MoreSoonCard } from "@/components/ui/MoreSoonCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ToolCard } from "@/components/ui/ToolCard";
import { getLiveTools } from "@/data/tools";

export function ToolGrid() {
  const tools = getLiveTools();
  const live = tools.length;

  return (
    <section id="tools" aria-labelledby="tools-title" className="container-x scroll-mt-24 pt-20 sm:pt-28">
      <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="eyebrow mb-4">The toolbox</p>
          <h2 id="tools-title" className="font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold uppercase">
            Pick your <span className="text-accent">poison.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="max-w-sm text-muted">
          <p>
            <span className="font-mono text-fg">{String(live).padStart(2, "0")}</span> live, more on the way. Every tool
            is free and runs entirely on your device.
          </p>
        </Reveal>
      </div>

      <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {tools.map((tool, i) => (
          // The first tool gets a wide card while the toolbox is small
          <StaggerItem key={tool.slug} className={i === 0 && tools.length < 3 ? "sm:col-span-2" : ""}>
            <ToolCard tool={tool} priority={i === 0} featured={i === 0 && tools.length < 3} />
          </StaggerItem>
        ))}
        <StaggerItem>
          <MoreSoonCard />
        </StaggerItem>
      </Stagger>
    </section>
  );
}
