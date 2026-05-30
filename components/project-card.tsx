import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

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
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex flex-wrap items-center gap-2">
            {category ? (
              <span className="rounded border border-accent/20 bg-accentSoft px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                {category.shortTitle}
              </span>
            ) : null}
            <span className="rounded border border-line px-2.5 py-0.5 text-xs uppercase tracking-[0.13em] text-ink/45">
              {project.type}
            </span>
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
              {project.title}
            </h3>
            <p className="text-[0.96rem] leading-7 text-ink/65">{project.description}</p>
          </div>
          <div className="mt-auto space-y-2.5 border-t border-line/70 pt-5 text-sm text-ink/58">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faLayerGroup} className="mt-1 h-3.5 w-3.5 text-accent" />
              <span>{project.impact}</span>
            </div>
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faPeopleGroup} className="mt-1 h-3.5 w-3.5 text-accent" />
              <span>
                {project.organization} | Team size {project.teamSize} | {project.timespan}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
