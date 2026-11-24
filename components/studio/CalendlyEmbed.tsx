"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CALENDLY_URL = "https://calendly.com/ajwaadasghar/consultation";

/**
 * Inline Calendly booking. UTM tags mark every booking as coming from this site
 * (and which page), so it can be told apart from the same link used elsewhere.
 * They show under "Tracking" on the booking in Calendly and in its exports/webhooks.
 */
export function CalendlyEmbed() {
  const pathname = usePathname();
  const [host, setHost] = useState<string | null>(null);
  useEffect(() => setHost(window.location.hostname), []);

  const params = new URLSearchParams({
    embed_type: "Inline",
    embed_domain: host ?? "",
    hide_gdpr_banner: "1",
    hide_event_type_details: "0",
    utm_source: "ajtoolbox-website",
    utm_medium: "website",
    utm_campaign: "consultation-embed",
    utm_content: pathname === "/" ? "home" : pathname.replace(/^\//, ""),
  });

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      {host ? (
        <iframe
          src={`${CALENDLY_URL}?${params}`}
          title="Book a free consultation with AJ Toolbox"
          loading="lazy"
          className="block h-[680px] w-full"
        />
      ) : (
        <div className="h-[680px]" />
      )}
    </div>
  );
}
