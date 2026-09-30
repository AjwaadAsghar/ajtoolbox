/**
 * ======================================================================
 *  COOKIE CONSENT BANNER: PLACEHOLDER
 * ======================================================================
 *  Once AdSense is live, Google requires a Google-certified CMP
 *  (Consent Management Platform) for visitors in the EEA, UK and Switzerland.
 *
 *  Options:
 *   1. Easiest: turn on Google's own CMP in AdSense → Privacy & messaging →
 *      "European regulations". It injects itself via the AdSense script; you
 *      can delete this component entirely.
 *   2. A third-party certified CMP (Cookiebot, Funding Choices, CookieYes,
 *      Usercentrics…). Paste their <Script> tag here, and make sure it loads
 *      BEFORE <AdSenseScript /> (it's mounted above it in app/layout.tsx).
 *
 *  If you use Google Consent Mode v2, set the defaults here as well, e.g.:
 *    <Script id="consent-default" strategy="beforeInteractive">{`
 *      window.dataLayer = window.dataLayer || [];
 *      function gtag(){dataLayer.push(arguments);}
 *      gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',
 *        ad_personalization:'denied',analytics_storage:'denied',
 *        region:['EEA','GB','CH']});
 *    `}</Script>
 * ======================================================================
 */
export function ConsentBanner() {
  return null;
}
