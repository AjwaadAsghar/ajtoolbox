"use client";

import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <m.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{" "}
    </m.span>
  );
}

/** Large statement whose words fill in as it scrolls through the viewport. */
export function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="max-w-5xl text-[clamp(1.7rem,3.4vw,3rem)] font-medium leading-[1.18] tracking-[-0.02em]" aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}
