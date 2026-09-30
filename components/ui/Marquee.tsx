/** Infinite CSS marquee (no JS). Content is duplicated once; the second copy is aria-hidden. */
export function Marquee({
  items,
  className = "",
  starClassName = "text-accent",
}: {
  items: string[];
  className?: string;
  starClassName?: string;
}) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((text, i) => (
        <li key={i} className="flex items-center">
          <span className="px-6 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight sm:px-10">
            {text}
          </span>
          <span className={`${starClassName} text-[clamp(1.2rem,3vw,2.2rem)]`} aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] ${className}`}
    >
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
