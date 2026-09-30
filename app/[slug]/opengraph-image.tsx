import { getPageTools, getToolBySlug } from "@/data/tools";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "AJ Toolbox tool preview";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPageTools().map((t) => ({ slug: t.slug }));
}

export default async function ToolOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  return renderOg({
    eyebrow: tool?.tags.join(" · ") ?? "Tool",
    title: tool?.name ?? "AJ Toolbox",
    subtitle: tool?.shortDescription ?? "",
    accent: tool?.accent,
  });
}
