import Link from "next/link";

import type { PortfolioProject } from "@/data/portfolio";
import { portfolioCategoryMeta } from "@/lib/site";

type ProjectCardProps = {
  project: PortfolioProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const category = project.category ? portfolioCategoryMeta[project.category] : null;

  return (
    <Link
      href={`/portfolio/${project.category ?? "all"}/${project.slug}`}
      className="group block h-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-soft">
        {project.coverImage ? (
          <div className="relative aspect-[1.28] overflow-hidden bg-mist">
            <img
              src={project.coverImage}
              alt={`${project.title} cover image`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="flex aspect-[1.35] items-end bg-mist p-6">
            <p className="max-w-xs font-display text-3xl font-semibold leading-tight text-ink">
              {project.title}
            </p>
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {category ? (
              <span className="rounded bg-accentSoft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {category.shortTitle}
              </span>
            ) : null}
            <span className="text-xs uppercase tracking-[0.2em] text-ink/48">
              {project.type}
            </span>
          </div>
          <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
            {project.title}
          </h3>
          <p className="text-[0.96rem] leading-7 text-ink/65">{project.description}</p>
        </div>
      </article>
    </Link>
  );
}
