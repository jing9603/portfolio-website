import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

import type { PortfolioProject } from "@/data/portfolio";
import { portfolioCategoryMeta } from "@/lib/site";

type ProjectCardProps = {
  project: PortfolioProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const category = portfolioCategoryMeta[project.category];

  return (
    <Link
      href={`/portfolio/${project.category}/${project.slug}`}
      className="group block h-full rounded-[28px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[#d4c8bb] bg-white shadow-soft transition hover:-translate-y-1 hover:border-accent/45 hover:shadow-panel">
        {project.coverImage ? (
          <div className="relative aspect-[1.28] overflow-hidden border-b border-[#ddd3c6] bg-[#ece4d8]">
            <img
              src={project.coverImage}
              alt={`${project.title} cover image`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="flex aspect-[1.35] items-end bg-[#e7ddd0] p-6">
            <p className="max-w-xs font-display text-3xl font-semibold leading-tight text-ink">
              {project.title}
            </p>
          </div>
        )}
        <div className="flex flex-1 flex-col gap-5 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/15 bg-[#f4eee5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {category.shortTitle}
            </span>
            <span className="rounded-full border border-[#ded4c7] bg-[#fffdfa] px-3 py-1 text-xs uppercase tracking-[0.16em] text-ink/48">
              {project.type}
            </span>
          </div>
          <div className="space-y-3">
            <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
              {project.title}
            </h3>
            <p className="text-[0.98rem] leading-7 text-ink/68">{project.description}</p>
          </div>
          <div className="mt-auto grid gap-3 border-t border-line/80 pt-5 text-sm text-ink/62">
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
      </article>
    </Link>
  );
}
