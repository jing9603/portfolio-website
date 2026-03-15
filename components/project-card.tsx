import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faLayerGroup,
  faPeopleGroup
} from "@fortawesome/free-solid-svg-icons";

import type { PortfolioProject } from "@/data/portfolio";
import { portfolioCategoryMeta } from "@/lib/site";

type ProjectCardProps = {
  project: PortfolioProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const category = portfolioCategoryMeta[project.category];

  return (
    <article className="group flex h-full flex-col justify-between rounded-[28px] border border-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-panel">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {category.shortTitle}
          </span>
          <span className="text-xs uppercase tracking-[0.16em] text-ink/45">
            {project.type}
          </span>
        </div>
        <div className="space-y-3">
          <h3 className="font-display text-2xl leading-tight text-ink">
            {project.title}
          </h3>
          <p className="text-sm leading-7 text-ink/68">{project.description}</p>
        </div>
        <div className="grid gap-3 text-sm text-ink/62">
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faLayerGroup} className="mt-1 h-4 w-4 text-accent" />
            <span>{project.impact}</span>
          </div>
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faPeopleGroup} className="mt-1 h-4 w-4 text-accent" />
            <span>
              {project.organization} | Team size {project.teamSize} | {project.timespan}
            </span>
          </div>
        </div>
      </div>
      <Link
        href={`/portfolio/${project.category}/${project.slug}`}
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition group-hover:text-accent"
      >
        View project
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
      </Link>
    </article>
  );
}
