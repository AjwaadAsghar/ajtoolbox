"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  /** How far (0–1) the button follows the pointer. */
  strength?: number;
};

const MLink = m.create(Link);

/** A link-button that gently pulls toward the cursor. Inert on touch and for reduced motion. */
export function MagneticButton({ href, children, variant = "primary", className = "", strength = 0.35 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles =
    variant === "primary"
      ? "bg-accent text-accent-ink shadow-[0_10px_40px_-10px_var(--color-accent)] hover:shadow-[0_14px_60px_-8px_var(--color-accent)]"
      : "border border-line bg-white/[0.04] text-fg hover:bg-white/[0.08]";

  return (
    <MLink
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-full px-7 text-[0.95rem] font-semibold transition-[box-shadow,background-color] duration-500 ${styles} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </MLink>
  );
}
