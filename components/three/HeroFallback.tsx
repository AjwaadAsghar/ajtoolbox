/**
 * Static stand-in for the 3D scene: pure CSS "glossy clay" shapes.
 * Shown instantly on first paint, while WebGL loads, and permanently on
 * low-power devices / reduced motion. Roughly mirrors the 3D composition.
 */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[34%] h-[min(80vw,640px)] w-[min(80vw,640px)] -translate-x-1/2 -translate-y-1/2 md:left-[68%] md:top-1/2">
        {/* glow */}
        <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.35),transparent)]" />
        {/* lime sphere (gear stand-in) */}
        <div
          className="absolute left-[38%] top-[30%] size-[28%] rounded-full"
          style={{
            background: "radial-gradient(circle at 32% 28%, #f6ffd0 0%, #d4ff3a 28%, #7a9a10 75%, #3a4a05 100%)",
            boxShadow: "0 30px 60px -20px rgb(212 255 58 / 0.45)",
          }}
        />
        {/* violet rounded cube */}
        <div
          className="absolute left-[62%] top-[56%] size-[20%] rotate-[18deg] rounded-[26%]"
          style={{
            background: "linear-gradient(145deg, #b3a2ff 0%, #7c5cff 45%, #3b24b0 100%)",
            boxShadow: "inset -8px -10px 20px rgb(0 0 0 / 0.3), 0 30px 50px -20px rgb(124 92 255 / 0.6)",
          }}
        />
        {/* orange capsule */}
        <div
          className="absolute left-[16%] top-[14%] h-[30%] w-[12%] -rotate-[40deg] rounded-full"
          style={{
            background: "linear-gradient(100deg, #ffd0ad 0%, #ff8a3d 40%, #b3470a 100%)",
            boxShadow: "0 24px 40px -18px rgb(255 138 61 / 0.6)",
          }}
        />
        {/* glass ring */}
        <div className="absolute left-[64%] top-[14%] size-[22%] rounded-full border-[10px] border-white/25 shadow-[inset_0_0_20px_rgb(255_255_255/0.25),0_0_30px_rgb(255_255_255/0.08)]" />
        {/* bone nut */}
        <div
          className="absolute left-[34%] top-[72%] size-[16%]"
          style={{
            background: "linear-gradient(160deg, #ffffff 0%, #efece4 40%, #9d998c 100%)",
            clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
          }}
        />
        {/* metal bar (wrench stand-in) */}
        <div
          className="absolute left-[8%] top-[58%] h-[6%] w-[34%] rotate-[30deg] rounded-full"
          style={{ background: "linear-gradient(180deg, #f2f2f7 0%, #9b9bab 50%, #55556a 100%)" }}
        />
      </div>
    </div>
  );
}
