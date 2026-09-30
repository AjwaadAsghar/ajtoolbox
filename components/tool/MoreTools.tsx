import Link from "next/link";
import { ToolCard } from "@/components/ui/ToolCard";
import { getRelatedTools } from "@/data/tools";

/** Internal links to other tools (good for users and for crawl depth). CSS-only reveal, no Framer. */
export function MoreTools({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedTools(currentSlug, 3);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="more-tools-title" className="container-x mt-28">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-4">Keep exploring</p>
          <h2 id="more-tools-title" className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold">
            More tools
          </h2>
        </div>
        <Link href="/#tools" prefetch={false} className="shrink-0 text-sm text-muted transition-colors hover:text-fg">
          See all →
        </Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {related.map((tool) => (
          <li key={tool.slug} className="scroll-reveal">
            <ToolCard tool={tool} />
          </li>
        ))}
      </ul>
    </section>
  );
}
