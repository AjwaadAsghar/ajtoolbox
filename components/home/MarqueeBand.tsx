import { Marquee } from "@/components/ui/Marquee";

const TOP = ["No sign-up", "Runs in your browser", "Free forever", "Zero uploads", "Built for fun"];
const BOTTOM = ["Webcam", "PDF", "Memes", "Images", "Utilities", "Chaos"];

/** Two counter-rotated marquee bands. Pure CSS animation. */
export function MarqueeBand() {
  return (
    <section aria-label="What AJ Toolbox is about" className="relative -mt-[8svh] overflow-hidden py-16 motion-reduce:mt-0">
      <div className="relative -rotate-2 bg-accent py-4 text-accent-ink shadow-[0_20px_80px_-20px_rgb(212_255_58/0.5)] sm:py-5">
        <Marquee items={TOP} starClassName="text-accent-ink" />
      </div>
      <div className="relative mt-3 rotate-1 border-y border-line bg-ink-2/90 py-4 text-fg/80 sm:py-5">
        <div className="[&_.animate-marquee]:[animation-direction:reverse] [&_.animate-marquee]:[animation-duration:46s]">
          <Marquee items={BOTTOM} />
        </div>
      </div>
    </section>
  );
}
