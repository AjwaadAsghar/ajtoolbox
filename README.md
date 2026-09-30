# AJ Toolbox

Free web tools, built different. Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · React Three Fiber · GSAP · Lenis · Framer Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploy: push to GitHub → import in Vercel → set env vars from `.env.example` → done.

---

## Project structure

```
app/
  layout.tsx              Root layout: fonts, header/footer, background, Lenis, cursor, CMP + AdSense slots
  page.tsx                Homepage (3D hero → marquee → tool grid → manifesto → rules → ad → about)
  [slug]/page.tsx         Every tool page (static, generated from the registry)
  [slug]/opengraph-image  Auto OG image per tool
  about/ contact/ privacy/ not-found.tsx
  sitemap.ts robots.ts opengraph-image.tsx icon.svg
components/
  three/                  ALL 3D code (homepage only): HeroScene, HeroVisual (loader), HeroFallback, geometries, quality tiers
  home/                   Homepage sections (GSAP lives only here)
  tool/                   ToolLayout, ToolHowTo, ToolFaq, MoreTools, ToolLoading
  ui/                     ToolCard (tilt + shine), MagneticButton, Reveal, Marquee, TagPill
  layout/                 Header, Footer, Background (CSS only), SmoothScroll, Cursor, PageHeader
  ads/                    AdSlot, AdSenseScript
  consent/                ConsentBanner (placeholder for a Google-certified CMP)
  seo/JsonLd.tsx          WebSite / WebApplication / FAQPage / BreadcrumbList
data/tools.ts             THE registry: single source of truth
tools/                    Tool UIs. tools/index.ts maps slug → component
lib/                      site config, SEO helper, ads config, GSAP setup, OG renderer
public/                   ads.txt, thumbnails/, noise.png
```

## Adding a new tool

1. **Registry**: add an entry to `data/tools.ts` (slug, name, descriptions, tags, thumbnail, SEO, `howTo`, `explainer`, `faq`). Keep `status: "coming-soon"` while you build: it shows as a locked card and gets **no page and no sitemap entry**.
2. **UI**: create `tools/<slug>/index.tsx` (mount wrapper) + `tools/<slug>/<Name>Tool.tsx` (copy the hamster folder as a template).
3. **Register**: add `"<slug>": YourTool` to `tools/index.ts`.
4. **Thumbnail**: drop an image in `public/thumbnails/` (1600×1000 WebP/PNG recommended).
5. Flip `status` to `"live"`. The route, homepage card, sitemap, metadata, OG image and JSON-LD all appear automatically.

## Integrating the hamster tool

Everything goes in `tools/hamster/`. The page, SEO text, ads and layout are already wired to `/hamster`.

**If your tool is React:**
1. Replace `tools/hamster/HamsterTool.tsx` with your component (keep `"use client"` and a default export).
2. Move assets (hamster images/GIFs, sounds, MediaPipe `.task` / `.tflite` / wasm files) into `public/tools/hamster/` and reference them as `/tools/hamster/...`.
3. `npm install` any libraries it uses (e.g. `@mediapipe/tasks-vision`).
4. **Keep the idle screen light** (the "Start camera" state). It's server-rendered and is the page's LCP. Load the heavy stuff *on click*:
   ```ts
   const start = async () => {
     const { HandLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision");
     // ...getUserMedia, model init, render loop
   };
   ```
5. Don't touch `window`/`navigator` at module top level or during render; do it in effects/handlers. If that's impossible, use the `ssr: false` variant documented in `tools/hamster/index.tsx`.
6. Stop the camera on unmount (`stream.getTracks().forEach(t => t.stop())`). The placeholder shows how.
7. Size: the frame is full width. Give your root element a stable height (e.g. `aspect-video` on desktop, a `min-h` on mobile) so nothing jumps when the camera starts.

**If it's plain HTML/JS:** either port the script into a `useEffect` in `HamsterTool.tsx` (best for SEO and speed), or as a quick path put the built files in `public/tools/hamster/app/` and render
`<iframe src="/tools/hamster/app/index.html" allow="camera" className="aspect-video w-full rounded-2xl" />`.
(The site's `Permissions-Policy` already allows the camera on its own origin.)

Then update the hamster entry's `howTo` / `faq` in `data/tools.ts` so they describe the real gestures.

## Performance notes

- The homepage shows a **preloader** (logo + progress bar, `components/home/Preloader.tsx`) while three.js loads, then reveals the page once the 3D scene has rendered. It waits at most 9s, has a CSS failsafe, and is skipped for visitors without JavaScript. Tool pages never show it.
- Tiers: `high` / `low` (phones, ≤4 cores: cheaper materials) / `off` (reduced motion, Save-Data, no WebGL, weak hardware: text-only hero, preloader releases immediately). Phone-width screens show 5 objects, larger screens 8. The canvas pauses off-screen and hides itself if the WebGL context is lost.
- Tool pages ship no three.js and no GSAP; they use CSS scroll-driven reveals.
- Links pointing to `/` use `prefetch={false}` so tool pages don't download homepage JS.
- `prefers-reduced-motion`: no Lenis, no pinning, no 3D, no scrubbed animations.
- Avoid `backdrop-filter` over the animated background (only the header uses it); it forces a re-blur every frame.

## AdSense

1. Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-…` and the three `NEXT_PUBLIC_ADSENSE_SLOT_*` IDs in Vercel.
2. Uncomment and fill in `public/ads.txt`.
3. Set up a certified CMP for EEA/UK (see `components/consent/ConsentBanner.tsx`; Google's built-in CMP in AdSense → Privacy & messaging is the easiest).
Placeholders show in dev only (or set `NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true`).
