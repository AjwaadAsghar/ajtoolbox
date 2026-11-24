import { PageHeader } from "@/components/layout/PageHeader";
import { ProcessTimeline } from "@/components/studio/ProcessTimeline";
import { ContactCta, SectionHead, ServiceList } from "@/components/studio/Sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: "Website design and development, custom software and AI automation from AJ Toolbox.",
  path: "/services",
});

const FAQ = [
  {
    q: "How much does a project cost?",
    a: "Every project gets a fixed quote after a short discovery call, so you know the full cost before work starts. Smaller websites and automations take weeks; larger software takes months.",
  },
  {
    q: "Do you work with clients abroad?",
    a: "Yes. We work remotely with clients in different countries and time zones, and keep calls inside your working hours.",
  },
  {
    q: "What happens after launch?",
    a: "You own the code and the accounts. We can hand everything over, or look after hosting, updates and new features on a monthly care plan.",
  },
  {
    q: "Can you take over an existing site or system?",
    a: "Usually, yes. We start with a short audit and tell you plainly whether to improve what you have or rebuild.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we do."
        intro="We take on a small number of projects at a time and see each one through from scope to launch."
      />
      <section className="container-x mt-20">
        <ServiceList />
      </section>
      <section className="container-x mt-32">
        <SectionHead index="01" eyebrow="Process" title="How a project runs." />
        <ProcessTimeline />
      </section>
      <section className="container-x mt-32">
        <SectionHead index="02" eyebrow="Questions" title="Common questions." />
        <div className="faq divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary className="flex items-center justify-between gap-6 py-6 text-lg font-medium">
                {f.q}
                <span className="faq__icon text-2xl font-light text-muted" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
