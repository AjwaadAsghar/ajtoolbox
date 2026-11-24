import Image from "next/image";
import type { Project } from "@/data/work";

/** Compact project tile: small cover, meta underneath. */
export function WorkCard({ project, priority = false, detail = false }: { project: Project; priority?: boolean; detail?: boolean }) {
  const external = project.href?.startsWith("http");
  return (
    <a
      href={project.href ?? "/contact"}
      {...(external && { target: "_blank", rel: "noopener" })}
      className="work-card group block"
    >
      <div
        className="work-cover relative aspect-[4/3] overflow-hidden rounded-2xl border border-line"
        style={{ backgroundColor: project.tint }}
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
        <span className="work-card__cta absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-fg text-ink" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
        <span>
          {project.client} <span className="text-dim">·</span> {project.category}
        </span>
        {project.status && (
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
            <span className={`size-1.5 rounded-full ${project.status === "Live" ? "bg-accent" : "bg-amber-400"}`} />
            {project.status}
          </span>
        )}
      </div>
      <h3 className="mt-1.5 text-base font-medium leading-snug transition-colors group-hover:text-accent-deep">{project.title}</h3>
      {detail && (
        <>
          <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.scope.map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                {s}
              </li>
            ))}
          </ul>
        </>
      )}
    </a>
  );
}
