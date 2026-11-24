import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactCta } from "@/components/studio/Sections";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About",
  description: `AJ Toolbox is an independent studio founded by ${site.author.name}, building websites, software and AI automation.`,
  path: "/about",
});

const PRINCIPLES = [
  { title: "Small on purpose", text: "You work directly with the person building your project. No account managers, no hand-offs." },
  { title: "Plain answers", text: "Fixed quotes, honest timelines, and a straight answer when something isn't worth building." },
  { title: "Built to last", text: "Modern, documented code you own outright, on infrastructure that's cheap to run." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A small studio that ships."
        intro={`AJ Toolbox started as a place for ${site.author.name} to publish small web tools. It's now a studio building websites, software and automation for other businesses.`}
      />
      <div className="container-x mt-20 grid gap-16 lg:grid-cols-[minmax(0,42rem)_1fr]">
        <div className="prose-aj">
          <p>
            The tools are still here. <a href="/cursed-hamster">Cursed Hamster</a> is one of them, and it shows how we
            work: fast, careful about performance, and finished.
          </p>
          <p>
            Most of our time now goes to client work. That includes the website for Stealth Performance Co, a tuning shop
            in Orlando, and both the public website and the full learning management system for Chembridge, a chemistry
            academy. The LMS has student, admin and parent portals, past papers, tests, live classes and attendance.
          </p>
          <p>
            If you need a site, an internal tool or an automation that saves your team hours every week,{" "}
            <Link href="/contact">get in touch</Link>.
          </p>
        </div>
        <ul className="h-fit space-y-px overflow-hidden rounded-xl border border-line bg-line">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="bg-ink p-7">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <ContactCta />
    </>
  );
}
