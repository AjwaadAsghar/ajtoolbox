import { PageHeader } from "@/components/layout/PageHeader";
import { WorkGrid } from "@/components/studio/Motion";
import { ContactCta } from "@/components/studio/Sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Websites, software and products designed and built by AJ Toolbox, including Stealth Performance Co, the Chembridge LMS and the Chembridge website.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Selected projects."
        intro="Client websites and software, plus the products we build in-house. Each one is live, or being built right now."
      />
      <div className="container-x mt-16">
        <WorkGrid detail />
      </div>
      <ContactCta />
    </>
  );
}
