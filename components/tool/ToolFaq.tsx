import type { ToolFaq as Faq } from "@/data/tools";

/**
 * FAQ accordion built on native <details>. Zero JS, keyboard accessible,
 * and every answer is in the server HTML so Google can read it (matches the FAQPage JSON-LD).
 */
export function ToolFaq({ faq }: { faq: Faq[] }) {
  return (
    <section aria-labelledby="faq-title" className="faq">
      <p className="eyebrow mb-4">FAQ</p>
      <h2 id="faq-title" className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold">
        Questions people ask
      </h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {faq.map((item, i) => (
          <details key={item.question} className="group" open={i === 0}>
            <summary className="flex items-center justify-between gap-6 py-5 text-left">
              <h3 className="font-sans text-base font-medium tracking-normal sm:text-lg">{item.question}</h3>
              <span
                className="faq__icon grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted group-open:border-[var(--tool-accent)] group-open:text-[var(--tool-accent)]"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="pb-6 pr-12 leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
