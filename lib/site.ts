/**
 * Global site config.
 */
export const site = {
  name: "AJ Toolbox",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ajtoolbox.com").replace(/\/$/, ""),
  tagline: "Websites, software and AI automation.",
  description:
    "AJ Toolbox is an independent studio that designs and builds websites, custom software and AI automations for businesses, from first sketch to launch and beyond.",
  author: {
    name: "Ajwaad Asghar",
    studio: "AJ Toolbox",
    url: "https://ajwaadasghar.com",
  },
  email: "ajwaadasghar@gmail.com",
  twitterHandle: undefined as string | undefined,
  locale: "en_US",
  // Bump when you edit /privacy.
  privacyLastUpdated: "2026-10-01",
} as const;

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/cursed-hamster", label: "Products" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;
