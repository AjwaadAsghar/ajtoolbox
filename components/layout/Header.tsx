import Link from "next/link";
import { mainNav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x pt-3 sm:pt-4">
        <nav
          aria-label="Main"
          className="flex h-14 items-center justify-between rounded-2xl border border-line bg-ink/70 pl-3 pr-2 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/40"
        >
          <Link href="/" prefetch={false} className="group flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <Logo className="h-8 w-auto transition-transform duration-500 ease-out-expo group-hover:-translate-x-0.5 group-hover:-rotate-3" />
            <span className="hidden font-display text-lg font-bold tracking-tight sm:inline">
              AJ<span className="text-muted"> Toolbox</span>
            </span>
          </Link>
          <ul className="flex items-center gap-0.5 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={item.href.startsWith("/#") ? false : undefined}
                  className="rounded-xl px-2.5 py-2 text-muted transition-colors hover:bg-white/5 hover:text-fg sm:px-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
