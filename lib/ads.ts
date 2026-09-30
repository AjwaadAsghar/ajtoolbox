/**
 * AdSense config, driven entirely by env vars so nothing ships until you're approved.
 * See .env.example.
 */
export const adsense = {
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || "",
  slots: {
    home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME?.trim() || "",
    toolBelow: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BELOW?.trim() || "",
    toolContent: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_CONTENT?.trim() || "",
  },
  showPlaceholders:
    process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true",
} as const;

export const adsEnabled = adsense.clientId.startsWith("ca-pub-");

export type AdPlacement = keyof typeof adsense.slots;
