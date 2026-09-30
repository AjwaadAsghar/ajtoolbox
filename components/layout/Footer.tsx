import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-ink/40">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <Link href="/" prefetch={false} className="flex w-fit items-center gap-2.5" aria-label={`${site.name} home`}>
              <Logo className="h-10 w-auto" />
              <span className="font-display text-xl font-bold">AJ Toolbox</span>
            </Link>
            <p className="mt-4 text-sm text-muted">
              Free, fun web tools that run in your browser. No sign-ups, no uploads, no nonsense.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} prefetch={item.href === "/" ? false : undefined} className="text-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 AJ Toolbox. Built by{" "}
            <a
              href={site.author.url}
              target="_blank"
              rel="noopener"
              className="text-muted underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
            >
              AJ Studios
            </a>
          </p>
          <p className="font-mono uppercase tracking-[0.18em]">Runs in your browser. Always.</p>
        </div>
      </div>
    </footer>
  );
}
