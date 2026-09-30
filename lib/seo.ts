import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute or root-relative OG image. Defaults to the route's generated opengraph-image. */
  image?: string;
  /** Set true to use `title` verbatim instead of the "%s | AJ Toolbox" template. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  // Explicit so child pages don't lose the inherited image when they set their own openGraph.
  const images = [{ url: image ?? "/opengraph-image", width: 1200, height: 630, alt: title }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(site.twitterHandle && { creator: site.twitterHandle, site: site.twitterHandle }),
      images: images.map((i) => i.url),
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
