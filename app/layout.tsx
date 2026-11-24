import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { Background } from "@/components/layout/Background";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

// next/font self-hosts, preloads and size-adjusts fallbacks, so no layout shift on swap.
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Websites, Software and AI Automation`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author.name, url: site.author.url }],
  creator: site.author.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  // Add after verifying in Google Search Console:
  // verification: { google: "YOUR_SEARCH_CONSOLE_TOKEN" },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Apply the saved or system theme before first paint (no flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t!=="light")t="dark";document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Background />
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <SmoothScroll />

        {/* ===== COOKIE CONSENT (CMP) GOES HERE, must load before ads. See ConsentBanner.tsx ===== */}
        <ConsentBanner />
        <AdSenseScript />
      </body>
    </html>
  );
}
