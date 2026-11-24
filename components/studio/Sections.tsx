import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/work";
import { site } from "@/lib/site";

export function SectionHead({ index, eyebrow, title, aside }: { index: string; eyebrow: string; title: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <Reveal className="mb-12 grid gap-5 md:grid-cols-[12rem_1fr_auto] md:items-end">
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent-deep">{index}</span>
        <span className="h-px w-6 bg-line" />
        {eyebrow}
      </p>
      <h2 className="max-w-3xl text-[clamp(2.4rem,4.6vw,4rem)]">{title}</h2>
      {aside}
    </Reveal>
  );
}

/** Long-form service list for /services. */
export function ServiceList() {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {services.map((s, i) => (
        <li key={s.id} id={s.id} className="scroll-mt-28">
          <Reveal className="grid gap-4 py-10 md:grid-cols-[12rem_1fr_1fr] md:gap-8">
            <span className="font-mono text-sm text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{s.summary}</p>
            </div>
            <ul className="space-y-2.5 text-sm">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 border-b border-line pb-2.5 last:border-0">
                  <span className="size-1 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

const STACK = ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel", "Claude API", "Three.js", "Stripe", "Resend", "Node.js"];

export function TechMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {STACK.map((t) => (
        <li key={t} className="flex items-center gap-10 pr-10 text-sm text-muted">
          {t}
          <span className="size-1 rounded-full bg-dim" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="border-y border-line py-5">
      <div className="container-x flex items-center gap-8">
        <p className="eyebrow hidden shrink-0 sm:block">Built with</p>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max animate-marquee">
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactCta() {
  return (
    <section className="container-x mt-32">
      <Reveal className="cta-panel relative overflow-hidden rounded-3xl bg-fg text-ink px-7 py-16 sm:px-14 sm:py-24">
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow !text-ink/60">Next step</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]">Have a project in mind? <em className="opacity-60">Let&apos;s talk.</em></h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">
              Tell us what you&apos;re building and where you&apos;re stuck. You&apos;ll get a reply within one working day.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link href="/contact" className="btn-primary">
              Start a project <span aria-hidden="true">→</span>
            </Link>
            <a href={`mailto:${site.email}`} className="text-sm opacity-70 underline underline-offset-4 transition-opacity hover:opacity-100">
              {site.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
