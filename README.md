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
2. **UI**: create `tools/<slug>/index.tsx` (mount wrapper) + `tools/<slug>/<Name>Tool.tsx` (copy `tools/hamster/` as a template; it's an unused placeholder).
3. **Register**: add `"<slug>": YourTool` to `tools/index.ts`.
4. **Thumbnail**: drop an image in `public/thumbnails/` (1600×1000 WebP/PNG recommended).
5. Flip `status` to `"live"`. The route, homepage card, sitemap, metadata, OG image and JSON-LD all appear automatically.

## Cursed Hamster (separate app)

`/cursed-hamster` is not built here. It's its own Next.js app ([Cursed-Hamster-public](https://github.com/AjwaadAsghar/Cursed-Hamster-public), `web/`, `basePath: "/cursed-hamster"`) deployed to Vercel, and `next.config.ts` rewrites `/cursed-hamster/*` to that deployment (override with `CURSED_HAMSTER_ORIGIN`). Its registry entry has `separateApp: true`, so it gets a card, a sitemap entry and links, but no `/[slug]` page. Links to it use a plain `<a>` (a full page load), because it isn't a route in this app.

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
