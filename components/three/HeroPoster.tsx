/**
 * Pre-rendered snapshot of the real 3D scene (transparent WebP), so the hero looks right
 * on the very first paint, before three.js loads, and forever on reduced-motion / low-power devices.
 *
 * Regenerate after changing the scene: see scripts/render-hero-posters.mjs.
 */
export function HeroPoster() {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet="/hero/poster-mobile.webp" type="image/webp" />
      <img
        src="/hero/poster-desktop.webp"
        alt=""
        fetchPriority="high"
        decoding="async"
        draggable={false}
        className="absolute inset-0 size-full select-none object-cover"
      />
    </picture>
  );
}
