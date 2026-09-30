/**
 * Global site config. Fill in the [PLACEHOLDERS] before launch.
 */
export const site = {
  name: "AJ Toolbox",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ajtoolbox.com").replace(/\/$/, ""),
  tagline: "Free web tools. Built different.",
  description:
    "AJ Toolbox is a growing collection of free, fast, slightly unhinged web tools that run right in your browser. No sign-ups, no uploads, no nonsense.",
  author: {
    name: "Ajwaad Asghar",
    studio: "AJ Studios",
    url: "https://ajwaadasghar.com",
  },
  // TODO: replace with your real contact address.
  email: "[YOUR_EMAIL]",
  twitterHandle: undefined as string | undefined, // e.g. "@ajwaad"
  locale: "en_US",
  // Bump when you edit /privacy.
  privacyLastUpdated: "2026-10-01",
} as const;

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

export const mainNav = [
  { href: "/#tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
] as const;
