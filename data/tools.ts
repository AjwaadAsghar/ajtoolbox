/**
 * THE tools registry. Single source of truth for:
 *   - homepage grid
 *   - /[slug] routes (generateStaticParams)
 *   - sitemap.xml
 *   - page metadata, OG images, JSON-LD
 *
 * Adding a tool = add an entry here + register its component in /tools/index.ts.
 */

export type ToolStatus = "live" | "coming-soon";

export type ToolTag =
  | "Webcam"
  | "Meme"
  | "PDF"
  | "Image"
  | "Utility"
  | "AI"
  | "Fun";

export type ToolFaq = { question: string; answer: string };
export type ToolStep = { title: string; text: string };

export type Tool = {
  /** Lowercase, hyphenated. Becomes the URL: ajtoolbox.com/{slug} */
  slug: string;
  name: string;
  /** One-liner for cards and the page intro. */
  shortDescription: string;
  /** 1–3 sentences. Used on the page and in JSON-LD. */
  longDescription: string;
  tags: ToolTag[];
  thumbnail: { src: string; alt: string };
  status: ToolStatus;
  seo: { title: string; description: string; keywords?: string[] };
  /** Card/OG glow colour. Falls back to the site accent. */
  accent?: string;
  /** schema.org applicationCategory */
  category?: "MultimediaApplication" | "UtilitiesApplication" | "EntertainmentApplication" | "DesignApplication";
  dateAdded: string;
  /** Below-the-tool SEO content. Required for live tools (AdSense wants real content). */
  howTo?: ToolStep[];
  explainer?: { heading: string; paragraphs: string[] };
  faq?: ToolFaq[];
};

export const tools: Tool[] = [
  {
    slug: "hamster",
    name: "Cursed Hamster Cam",
    shortDescription: "Make hand gestures on your webcam and a cursed hamster reacts in real time.",
    longDescription:
      "A free webcam meme tool that tracks your hand gestures and answers them with a very cursed hamster. Everything runs locally in your browser, so your camera feed never leaves your device.",
    tags: ["Webcam", "Meme"],
    thumbnail: { src: "/thumbnails/hamster.svg", alt: "Cursed hamster reacting to a hand gesture on a webcam feed" },
    status: "live",
    accent: "#ff8a3d",
    category: "EntertainmentApplication",
    dateAdded: "2026-10-01",
    seo: {
      title: "Cursed Hamster Webcam — Free Gesture Meme Tool",
      description:
        "Wave, point or thumbs-up at your webcam and a cursed hamster reacts instantly. Free, no sign-up, runs 100% in your browser. Record the chaos and share the meme.",
      keywords: ["hamster meme", "webcam meme generator", "hand gesture webcam", "cursed hamster"],
    },
    howTo: [
      { title: "Allow camera access", text: "Hit “Start camera” and let your browser use the webcam. The video is processed on your device and is never uploaded." },
      { title: "Get in frame", text: "Sit roughly an arm's length from the camera with decent lighting so your hands are easy to spot." },
      { title: "Throw a gesture", text: "Try a wave, a thumbs-up, a point or an open palm. The hamster picks up each gesture and reacts in real time." },
      { title: "Save the chaos", text: "Grab a screenshot or screen recording and send it to the group chat. Yes, they will judge you." },
    ],
    explainer: {
      heading: "What is the cursed hamster webcam?",
      paragraphs: [
        "It's a tiny browser toy built around one of the internet's most unhinged reaction memes. Instead of scrolling for the right hamster GIF, you just do the gesture yourself and the hamster answers back live.",
        "Under the hood, a lightweight hand-tracking model runs directly in your browser to find the key points of your hand on every frame. Those points are turned into gestures, and each gesture is mapped to a hamster reaction. Because everything happens on your device there's no server round-trip, which is why it feels instant, and why your video stays private.",
        "It works in current versions of Chrome, Edge, Safari and Firefox on desktop and most modern phones. No app, no account, no watermark.",
      ],
    },
    faq: [
      { question: "Is the cursed hamster webcam tool free?", answer: "Yes. It's completely free to use with no sign-up, no watermark and no usage limits." },
      { question: "Is my webcam video uploaded anywhere?", answer: "No. All video processing and gesture detection happens locally in your browser. Your camera feed is never sent to a server or stored." },
      { question: "Why isn't it detecting my gestures?", answer: "Make sure your hand is fully in frame, the room is reasonably bright, and nothing behind you is the same colour as your skin. Moving a little further from the camera often helps." },
      { question: "Does it work on phones?", answer: "Yes, on most modern iPhones and Android phones. Use the front camera, and allow camera access when your browser asks." },
      { question: "Can I record a video of it?", answer: "Use your device's built-in screen recorder (on iPhone, Android, Windows Game Bar or macOS Screenshot toolbar) to capture the hamster in action." },
    ],
  },
];

/* ---------- helpers ---------- */

export const getAllTools = () => tools;
export const getLiveTools = () => tools.filter((t) => t.status === "live");
export const getToolBySlug = (slug: string) => tools.find((t) => t.slug === slug);

/** Other tools to cross-link: live ones first, then those sharing tags, then the rest. */
export function getRelatedTools(slug: string, limit = 3): Tool[] {
  const current = getToolBySlug(slug);
  return tools
    .filter((t) => t.slug !== slug)
    .map((t) => ({
      t,
      score:
        (t.status === "live" ? 10 : 0) +
        (current ? t.tags.filter((tag) => current.tags.includes(tag)).length : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ t }) => t);
}

export const allTags = Array.from(new Set(tools.flatMap((t) => t.tags)));
