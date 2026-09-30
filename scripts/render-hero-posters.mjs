/**
 * Renders the live 3D hero in headless Chrome and saves transparent WebP posters to public/hero/.
 * The posters are the hero's first paint, so re-run this whenever you change the 3D scene.
 *
 *   npm run build && npm start        (in one terminal)
 *   npm run posters                   (in another)
 *
 * Env: BASE_URL (default http://localhost:3000), CHROME_PATH (defaults to the usual Chrome/Edge install paths).
 */
import { existsSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const chromePath =
  process.env.CHROME_PATH ??
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].find(existsSync);

if (!chromePath) throw new Error("Chrome not found. Set CHROME_PATH.");

const targets = [
  // Desktop: force the high tier so it matches what capable desktops render
  { name: "desktop", viewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 }, forceHigh: true },
  // Mobile: phone emulation picks the low tier + phone object set, as real phones do
  { name: "mobile", viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } },
];

// Hide everything except the WebGL canvas, on a transparent page
const ISOLATE_CSS = `
  html, body { background: transparent !important; }
  .bg-aurora, header, #hero .container-x, #hero [class*="bg-gradient-to"], [data-hero-hint],
  div:has(> [data-hero-canvas]) > div:not([data-hero-canvas]) { visibility: hidden !important; }
  [data-hero-canvas] { opacity: 1 !important; transition: none !important; }
`;

mkdirSync("public/hero", { recursive: true });
const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader", "--hide-scrollbars"],
});

for (const t of targets) {
  const page = await browser.newPage();
  await page.setViewport(t.viewport);
  if (t.forceHigh) {
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 8 });
      Object.defineProperty(navigator, "deviceMemory", { get: () => 8 });
    });
  }
  await page.goto(BASE + "/", { waitUntil: "load", timeout: 60000 });
  // The live scene loads on first interaction; a Shift key press triggers it without moving anything
  await page.keyboard.press("Shift");
  await page.waitForSelector('[data-hero-canvas="ready"]', { timeout: 60000 });
  // Match the moment real visitors see the cross-fade
  await new Promise((r) => setTimeout(r, 350));
  await page.addStyleTag({ content: ISOLATE_CSS });
  await new Promise((r) => setTimeout(r, 100));
  const png = await page.screenshot({ omitBackground: true, type: "png" });
  const out = `public/hero/poster-${t.name}.webp`;
  const info = await sharp(png).webp({ quality: 80, alphaQuality: 85, effort: 6 }).toFile(out);
  console.log(`${out}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  await page.close();
}

await browser.close();
