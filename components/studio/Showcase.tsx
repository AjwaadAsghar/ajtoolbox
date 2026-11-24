import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { projects, type Project } from "@/data/work";

/** Large, alternating case-study rows: the main portfolio presentation. */
export function FeaturedWork({ items = projects }: { items?: Project[] }) {
  return (
    <ol className="space-y-24 sm:space-y-32">
      {items.map((p, i) => {
        const external = p.href?.startsWith("http");
        const flip = i % 2 === 1;
        return (
          <li key={p.slug}>
            <Reveal className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <a
                href={p.href ?? "/contact"}
                {...(external && { target: "_blank", rel: "noopener" })}
                className={`work-card group block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
                aria-label={`${p.client}: ${p.title}`}
              >
                <div className="work-cover relative aspect-[16/11] overflow-hidden rounded-3xl border border-line p-3 sm:p-5" style={{ backgroundColor: p.tint }}>
                  <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <span className="work-card__cta absolute bottom-6 right-6 grid size-12 place-items-center rounded-full bg-fg text-lg text-ink sm:bottom-8 sm:right-8" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </a>

              <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
                  <span className="text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-line" />
                  {p.category} · {p.year}
                  {p.status && (
                    <span className="ml-auto inline-flex items-center gap-1.5 normal-case tracking-normal">
                      <span className={`size-1.5 rounded-full ${p.status === "Live" ? "bg-accent" : "bg-amber-400"}`} />
                      {p.status}
                    </span>
                  )}
                </div>
                <p className="mt-6 text-sm text-muted">{p.client}</p>
                <h3 className="mt-2 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.05] tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-5 leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-7 grid grid-cols-2 gap-x-6 border-t border-line text-sm">
                  {p.scope.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 border-b border-line py-3">
                      <span className="size-1 shrink-0 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
                {p.href && (
                  <a
                    href={p.href}
                    {...(external && { target: "_blank", rel: "noopener" })}
                    className="link-arrow mt-7 text-sm font-medium hover:text-accent-deep"
                  >
                    {external ? "Visit live site" : "Try it"} <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

const PROMISES = [
  { big: "1 day", text: "Reply to every enquiry within one working day." },
  { big: "Fixed", text: "Written scope and a fixed quote before any work starts." },
  { big: "Weekly", text: "Progress you can click through on a live preview link." },
  { big: "End-to-end", text: "Design, engineering and automation under one roof." },
];

export function Promises() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {PROMISES.map((p, i) => (
        <li key={p.big} className="bg-ink">
          <Reveal delay={i * 0.08} className="flex h-full flex-col justify-between gap-10 p-7 sm:p-9">
            <span className="font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none tracking-[-0.03em]">{p.big}</span>
            <p className="max-w-[16rem] text-sm leading-relaxed text-muted">{p.text}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

const FAQ = [
  {
    q: "What kind of projects do you take on?",
    a: "Marketing websites, web apps, internal tools and platforms like learning systems, plus AI automation for repetitive work. If it runs in a browser or behind one, we can usually help.",
  },
  {
    q: "How is pricing worked out?",
    a: "After a short discovery call we write up the scope and give you a fixed quote. No hourly surprises: the price only changes if the scope does, and you agree to that first.",
  },
  {
    q: "How long does a project take?",
    a: "A focused marketing site is typically a few weeks; larger software builds run longer and ship in stages. You get a timeline with the quote and a live preview link from the first week.",
  },
  {
    q: "Can I update the site myself after launch?",
    a: "Yes. We set up an editor for the content you will want to change, walk you through it at handover, and offer ongoing care if you would rather we handle it.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. Our clients include businesses in the US, and we work remotely across time zones and time zones, with a weekly check-in that suits both sides.",
  },
];

export function Faq() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQ.map((f) => (
        <details key={f.q} className="faq group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium sm:text-xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-500 group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
