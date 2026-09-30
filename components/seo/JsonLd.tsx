import type { Tool } from "@/data/tools";
import { absoluteUrl, site } from "@/lib/site";

type Json = Record<string, unknown>;

/** Server-rendered JSON-LD. `<` is escaped so content can't break out of the script tag. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const websiteJsonLd = (): Json => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: site.author.studio,
    url: site.author.url,
    founder: { "@type": "Person", name: site.author.name },
  },
});

export const toolJsonLd = (tool: Tool): Json => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: tool.name,
  url: absoluteUrl(`/${tool.slug}`),
  description: tool.longDescription,
  applicationCategory: tool.category ?? "UtilitiesApplication",
  operatingSystem: "Any (web browser)",
  browserRequirements: "Requires a modern browser with JavaScript enabled.",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  image: absoluteUrl(`/${tool.slug}/opengraph-image`),
  datePublished: tool.dateAdded,
  author: { "@type": "Person", name: site.author.name, url: site.author.url },
});

export const faqJsonLd = (faq: NonNullable<Tool["faq"]>): Json => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
