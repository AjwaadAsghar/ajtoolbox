import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, faqJsonLd, JsonLd, toolJsonLd } from "@/components/seo/JsonLd";
import { ToolLayout } from "@/components/tool/ToolLayout";
import { getPageTools, getToolBySlug } from "@/data/tools";
import { buildMetadata } from "@/lib/seo";
import { toolComponents } from "@/tools";

type Props = { params: Promise<{ slug: string }> };

// Only live tools get pages; everything else 404s (no thin "coming soon" pages for Google to judge).
export const dynamicParams = false;

export function generateStaticParams() {
  return getPageTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool || tool.status !== "live" || tool.separateApp) return {};
  return {
    ...buildMetadata({
      title: tool.seo.title,
      description: tool.seo.description,
      path: `/${tool.slug}`,
      image: `/${tool.slug}/opengraph-image`,
    }),
    keywords: tool.seo.keywords,
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const ToolUI = toolComponents[slug];
  if (!tool || tool.status !== "live" || tool.separateApp || !ToolUI) notFound();

  const jsonLd = [
    toolJsonLd(tool),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: tool.name, path: `/${tool.slug}` },
    ]),
    ...(tool.faq?.length ? [faqJsonLd(tool.faq)] : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ToolLayout tool={tool}>
        <ToolUI />
      </ToolLayout>
    </>
  );
}
