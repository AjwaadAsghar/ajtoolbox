import Link from "next/link";
import { JsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import { ImageRail, ScrollStatement, WorkGrid } from "@/components/studio/Motion";
import { ProcessTimeline } from "@/components/studio/ProcessTimeline";
import { ContactCta, SectionHead, TechMarquee } from "@/components/studio/Sections";
import { ServiceGrid } from "@/components/studio/ServiceGrid";
import { projects } from "@/data/work";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: `${site.name}: Websites, Software and AI Automation`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const line = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      {/* Hero */}
      <section className="container-x pt-32 pb-14 sm:pt-40">
        <h1 className="text-[clamp(3.2rem,9vw,9.5rem)] leading-[0.92] tracking-[-0.035em]">
          <span className="reveal-line" style={line(0)}>
            <span>Websites, software</span>
          </span>
          <span className="reveal-line" style={line(1)}>
            <span>
              &amp; AI automation, <em className="text-muted">built</em>
            </span>
          </span>
          <span className="reveal-line" style={line(2)}>
            <span>
              <em className="text-muted">properly.</em>
            </span>
          </span>
        </h1>

        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_minmax(0,26rem)] md:items-end">
          <ul className="flex flex-wrap gap-2 animate-fade [animation-delay:0.5s]" aria-label="Recent projects">
            {projects.map((p) => (
              <li key={p.slug}>
                <a
                  href={p.href}
                  {...(p.href?.startsWith("http") && { target: "_blank", rel: "noopener" })}
                  className="inline-flex rounded-full bg-surface-2/70 px-3.5 py-1.5 text-sm transition-colors hover:bg-fg hover:text-ink"
                >
                  {p.client === "AJ Toolbox" ? p.title : p.client}
                  {p.category === "Software" && " LMS"}
                </a>
              </li>
            ))}
          </ul>
          <div className="animate-fade [animation-delay:0.6s]">
            <p className="text-lg leading-relaxed text-muted">
              We design and build the digital side of a business, from the website customers see to the systems your team
              runs on.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Start a project <span aria-hidden="true">→</span>
              </Link>
              <Link href="/work" className="btn-ghost">
                See our work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="animate-fade [animation-delay:0.7s]">
        <ImageRail />
      </div>

      {/* Statement */}
      <section className="container-x mt-32">
        <p className="eyebrow mb-8">The studio</p>
        <ScrollStatement text="We're a small, hands-on studio. We take a few projects at a time and handle all of it: the design, the engineering, and the automation that keeps a business running after launch." />
      </section>

      {/* Selected work */}
      <section id="work" className="container-x mt-32 scroll-mt-24">
        <SectionHead
          index="01"
          eyebrow="Selected work"
          title="Recent projects."
          aside={
            <Link href="/work" className="link-arrow text-sm text-muted hover:text-fg">
              All work <span className="arrow" aria-hidden="true">→</span>
            </Link>
          }
        />
        <WorkGrid />
      </section>

      {/* Services */}
      <section id="services" className="container-x mt-32">
        <SectionHead index="02" eyebrow="Services" title="The website, the software behind it, and the automation around it." />
        <ServiceGrid />
      </section>

      <div className="mt-24">
        <TechMarquee />
      </div>

      {/* Process */}
      <section className="container-x mt-28">
        <SectionHead index="03" eyebrow="Process" title="Clear scope, fixed quotes, weekly progress." />
        <ProcessTimeline />
      </section>

      <ContactCta />
    </>
  );
}
