import Script from "next/script";
import { adsEnabled, adsense } from "@/lib/ads";

/**
 * Loads the AdSense library only when NEXT_PUBLIC_ADSENSE_CLIENT_ID is set.
 * `lazyOnload` keeps it off the critical path so it doesn't hurt LCP/INP.
 */
export function AdSenseScript() {
  if (!adsEnabled) return null;
  return (
    <Script
      id="adsense"
      async
      strategy="lazyOnload"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.clientId}`}
    />
  );
}
