import Link from "next/link";
import { mainNav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const pill = "rounded-full px-4 py-2 text-sm transition-colors hover:bg-fg hover:text-ink";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav aria-label="Main" className="container-x flex h-20 items-center justify-between gap-4">
        <Link href="/" prefetch={false} className="flex items-center gap-2.5 rounded-full bg-ink/80 py-1.5 pl-2 pr-4 backdrop-blur-xl" aria-label={`${site.name} home`}>
          <Logo className="h-7 w-auto" />
          <span className="text-[15px] font-semibold tracking-tight">AJ Toolbox</span>
        </Link>
        <ul className="hidden items-center gap-1 rounded-full bg-surface-2/80 p-1 backdrop-blur-xl md:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              {item.href === "/cursed-hamster" ? (
                // Separate app behind a rewrite: needs a full page load.
                <a href={item.href} className={pill}>
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} className={pill}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className="inline-flex h-10 items-center rounded-full bg-fg px-5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-accent-ink">
            Start a project
          </Link>
        </div>
      </nav>
    </header>
  );
}
