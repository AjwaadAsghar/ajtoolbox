import { PageHeader } from "@/components/layout/PageHeader";
import { CalendlyEmbed } from "@/components/studio/CalendlyEmbed";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Book a free consultation with AJ Toolbox: websites, custom software and AI automation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Book a call."
        intro="Pick a time for a free consultation. It goes straight into our calendar, no forms and no back-and-forth."
      />
      <div className="container-x mt-20 grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <CalendlyEmbed />
        <aside className="h-fit space-y-8 rounded-xl border border-line p-8 lg:sticky lg:top-28">
          <div>
            <p className="eyebrow mb-2">Prefer email?</p>
            <a
              href={`mailto:${site.email}`}
              className="break-all text-lg underline decoration-line underline-offset-4 hover:decoration-accent-deep"
            >
              {site.email}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-2">What happens next</p>
            <ol className="space-y-2 text-sm text-muted">
              <li>1. Pick a slot that suits you.</li>
              <li>2. We talk through the project on the call.</li>
              <li>3. A written scope and fixed quote within a few days.</li>
            </ol>
          </div>
        </aside>
      </div>
    </>
  );
}
