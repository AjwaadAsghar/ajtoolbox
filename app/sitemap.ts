import type { MetadataRoute } from "next";
import { getLiveTools } from "@/data/tools";
import { absoluteUrl, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/privacy"), lastModified: new Date(site.privacyLastUpdated), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Only live tools: "coming soon" tools have no page yet.
  const tools: MetadataRoute.Sitemap = getLiveTools().map((t) => ({
    url: absoluteUrl(`/${t.slug}`),
    lastModified: new Date(t.dateAdded),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...pages, ...tools];
}
