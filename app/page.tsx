import Link from "next/link";
import { JsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import { HeroBuild } from "@/components/studio/HeroBuild";
import { ScrollStatement } from "@/components/studio/Motion";
import { Faq, FeaturedWork, Promises } from "@/components/studio/Showcase";
import { ProcessTimeline } from "@/components/studio/ProcessTimeline";
import { ContactCta, SectionHead, TechMarquee } from "@/components/studio/Sections";
import { ServiceGrid } from "@/components/studio/ServiceGrid";
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
      <section className="container-x grid min-h-[100svh] content-center items-center gap-14 pt-28 pb-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h1 className="text-[clamp(3rem,min(8vw,16svh),9rem)] leading-[0.92] tracking-[-0.035em]">
            <span className="reveal-line" style={line(0)}>
              <span>Websites, software</span>
            </span>
            <span className="reveal-line" style={line(1)}>
              <span>&amp; AI automation,</span>
            </span>
            <span className="reveal-line" style={line(2)}>
              <span className="whitespace-nowrap">
                <em className="text-muted">built properly.</em>
              </span>
            </span>
          </h1>

          <div className="mt-10 max-w-[30rem] animate-fade [animation-delay:0.6s]">
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

        <div className="animate-fade [animation-delay:0.8s] mx-auto w-full max-w-[34rem]">
          <HeroBuild />
        </div>
      </section>

      {/* Statement */}
      <section className="container-x mt-16">
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
        <FeaturedWork />
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

      {/* Promises */}
      <section className="container-x mt-32">
        <SectionHead index="04" eyebrow="Working with us" title="What you can count on." />
        <Promises />
      </section>

      {/* FAQ */}
      <section className="container-x mt-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent-deep">05</span>
              <span className="h-px w-6 bg-line" />
              FAQ
            </p>
            <h2 className="mt-5 text-[clamp(2.2rem,4vw,3.4rem)]">Questions, answered.</h2>
          </div>
          <Faq />
        </div>
      </section>

      <ContactCta />
    </>
  );
}
