import { PageHeader } from "@/components/layout/PageHeader";
import { BriefForm } from "@/components/studio/BriefForm";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Start a project with AJ Toolbox: websites, custom software and AI automation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a project."
        intro="Tell us a little about what you need. You'll hear back within one working day."
      />
      <div className="container-x mt-20 grid gap-16 lg:grid-cols-[minmax(0,40rem)_1fr]">
        <BriefForm email={site.email} />
        <aside className="h-fit space-y-8 rounded-xl border border-line p-8 lg:sticky lg:top-28">
          <div>
            <p className="eyebrow mb-2">Email</p>
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
              <li>1. We reply with a few questions or a call link.</li>
              <li>2. A 30-minute call to understand the project.</li>
              <li>3. A written scope and fixed quote within a few days.</li>
            </ol>
          </div>
        </aside>
      </div>
    </>
  );
}
