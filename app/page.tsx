import { AdSlot } from "@/components/ads/AdSlot";
import { AboutStrip } from "@/components/home/AboutStrip";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { Preloader } from "@/components/home/Preloader";
import { Principles } from "@/components/home/Principles";
import { ToolGrid } from "@/components/home/ToolGrid";
import { JsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: `${site.name}: Free Web Tools, Built Different`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Preloader />
      <noscript>
        <style>{"#preloader{display:none!important}html{overflow:auto!important}"}</style>
      </noscript>
      <JsonLd data={websiteJsonLd()} />
      <Hero />
      <MarqueeBand />
      <ToolGrid />
      <Manifesto />
      <Principles />
      {/* The one homepage ad: between content sections, never near the hero CTAs or tool cards */}
      <div className="container-x py-12">
        <AdSlot placement="home" minHeight={250} format="horizontal" />
      </div>
      <AboutStrip />
    </>
  );
}
