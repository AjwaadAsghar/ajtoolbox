import Link from "next/link";
import { services } from "@/data/work";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-32 overflow-hidden border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="text-sm leading-relaxed text-muted">{site.description}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block text-sm underline decoration-line underline-offset-4 hover:decoration-accent-deep"
          >
            {site.email}
          </a>
        </div>
        <nav aria-label="Services">
          <p className="eyebrow mb-4">Services</p>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`} className="text-muted transition-colors hover:text-fg">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Studio</p>
          <ul className="space-y-2.5 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-dim sm:flex-row sm:justify-between">
        <p>© 2026 AJ Toolbox. All rights reserved.</p>
        <p>Founded by {site.author.name}</p>
      </div>
    </footer>
  );
}
