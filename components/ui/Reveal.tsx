"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

/** Fades/slides children in once they enter the viewport. Content is server-rendered; only the motion is client-side. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/** Staggered reveal for lists/grids. Wrap each child in <StaggerItem>. */
export function Stagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <m.ul
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </m.ul>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <m.li className={className} variants={item}>
      {children}
    </m.li>
  );
}
