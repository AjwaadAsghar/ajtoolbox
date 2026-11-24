/**
 * Services and portfolio content. Edit copy here; the pages read from it.
 */

export type Service = {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "websites",
    title: "Websites",
    summary:
      "Fast, well-built marketing sites and web apps that look the part and are easy to update. Designed around what you sell and who you sell it to.",
    deliverables: ["Design and development", "Next.js and headless CMS", "SEO and performance", "Hosting and care plans"],
  },
  {
    id: "software",
    title: "Software",
    summary:
      "Custom internal tools, dashboards and platforms that replace spreadsheets and stitched-together apps with one system your team actually wants to use.",
    deliverables: ["Admin panels and portals", "Databases and APIs", "Role-based access", "Integrations"],
  },
  {
    id: "ai-automation",
    title: "AI automation",
    summary:
      "Practical automation for repetitive work: lead research, document handling, support replies and reporting, with people kept in control of the output.",
    deliverables: ["Workflow automation", "LLM-powered assistants", "Data extraction", "CRM and email pipelines"],
  },
  {
    id: "products",
    title: "Products",
    summary:
      "Our own small products, built and shipped in-house. The same standards we apply to client work, tested in public.",
    deliverables: ["Browser apps", "On-device ML", "Rapid prototyping"],
  },
];

export type Project = {
  slug: string;
  client: string;
  title: string;
  category: "Website" | "Software" | "Product";
  year: string;
  status?: "In progress" | "Live";
  summary: string;
  scope: string[];
  /** Colour for the abstract cover. */
  tint: string;
  image: { src: string; alt: string };
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "stealth-performance-co",
    client: "Stealth Performance Co",
    title: "Website for an Orlando performance and tuning shop",
    category: "Website",
    year: "2026",
    status: "In progress",
    summary:
      "A full website for a performance tuning, repair, PPF and wrap shop serving European, exotic and American vehicles. Video-led hero, service packages, a build configurator, comparisons and online booking.",
    scope: ["Design and build", "Booking flow", "Packages and build pages", "Local SEO"],
    tint: "#1f8a4c",
    image: { src: "/work/stealth-performance.png", alt: "Stealth Performance Co homepage: a dark workshop full of performance cars with the headline Stealth by name, fast by nature" },
    href: "https://stealthperformanceco.com",
  },
  {
    slug: "chembridge-lms",
    client: "Chembridge",
    title: "A learning management system for a chemistry academy",
    category: "Software",
    year: "2026",
    status: "Live",
    summary:
      "A custom LMS for O Level, IGCSE, AS and A2 chemistry students. Courses, notes, books, recordings, live classes, topical and yearly past papers, MCQs, quizzes and assignments, plus attendance, doubts and a guardian portal for parents.",
    scope: ["Student, admin and guardian portals", "Tests and past papers", "Attendance and analytics", "Orders and enrolment"],
    tint: "#0d5e3c",
    image: { src: "/work/chembridge-lms.jpg", alt: "Chembridge LMS: Your chemistry classroom, online" },
    href: "https://lms.chembridge.org",
  },
  {
    slug: "chembridge-website",
    client: "Chembridge",
    title: "Website for a chemistry academy",
    category: "Website",
    year: "2026",
    status: "Live",
    summary:
      "The public face of Chembridge: course pages, resources, a forum and blog, with an interactive periodic-table hero and a direct path into the LMS for enrolled students.",
    scope: ["Brand and design system", "Course and resource pages", "Interactive 3D hero", "LMS integration"],
    tint: "#e8c547",
    image: { src: "/work/chembridge.png", alt: "Chembridge homepage: Chemistry you can see, with a sphere of periodic table elements" },
    href: "https://chembridge.org",
  },
  {
    slug: "cursed-hamster",
    client: "AJ Toolbox",
    title: "Cursed Hamster",
    category: "Product",
    year: "2026",
    status: "Live",
    summary:
      "Our own product: a webcam toy that reads your hand gestures and answers with a hamster meme in real time. Hand tracking runs entirely on-device, in the browser.",
    scope: ["Product design", "On-device ML", "Real-time video"],
    tint: "#ff6fb0",
    image: { src: "/thumbnails/cursed-hamster.webp", alt: "Cursed Hamster: hamster meme pictures on a pink background" },
    href: "/cursed-hamster",
  },
];

export const process = [
  { title: "Discover", text: "A short call to understand the business, the goal and the constraints. You get a written scope and a fixed quote." },
  { title: "Design", text: "Structure and visuals agreed before code. You see real screens, not mood boards." },
  { title: "Build", text: "Weekly progress on a live preview link. Changes are cheap here, so we make them here." },
  { title: "Launch and support", text: "Deployment, handover and training, then ongoing care if you want it." },
];
