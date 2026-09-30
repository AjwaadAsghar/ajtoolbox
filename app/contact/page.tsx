import { PageHeader } from "@/components/layout/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with AJ Toolbox: tool ideas, bug reports, feedback or business enquiries.",
  path: "/contact",
});

const REASONS = [
  { title: "Tool ideas", body: "Wish a tool existed? Describe it. If it's fun or useful, it might end up here." },
  { title: "Bug reports", body: "Something broken? Tell me the tool, your browser and device, and what happened." },
  { title: "Everything else", body: "Feedback, collabs, press or business stuff. The inbox is open." },
];

export default function ContactPage() {
  const email = site.email;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Say <span className="text-accent">hi.</span>
          </>
        }
        intro="No forms, no ticket numbers. Just email me and a real human (me) will read it."
      />

      <div className="container-x mt-16">
        <a
          href={`mailto:${email}`}
          className="group flex flex-col gap-4 rounded-[2rem] border border-line bg-surface/60 p-8 transition-colors duration-500 hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between sm:p-12"
        >
          <span>
            <span className="eyebrow block">Email</span>
            <span className="mt-3 block break-all font-display text-[clamp(1.6rem,4.5vw,3.6rem)] font-extrabold transition-colors group-hover:text-accent">
              {email}
            </span>
          </span>
          <span
            className="grid size-16 shrink-0 place-items-center rounded-full bg-accent text-2xl text-accent-ink transition-transform duration-500 ease-out-expo group-hover:-rotate-45"
            aria-hidden="true"
          >
            →
          </span>
        </a>

        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {REASONS.map((r) => (
            <li key={r.title} className="rounded-3xl border border-line bg-surface/40 p-7">
              <h2 className="font-display text-2xl font-bold">{r.title}</h2>
              <p className="mt-3 text-muted">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
