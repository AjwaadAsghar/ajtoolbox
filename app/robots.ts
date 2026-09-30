import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // Separate apps publish their own sitemap under their path.
    sitemap: [absoluteUrl("/sitemap.xml"), absoluteUrl("/cursed-hamster/sitemap.xml")],
    host: site.url,
  };
}
