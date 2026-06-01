"use client";

import { useCallback, useMemo, useState } from "react";

import type { PortfolioProject } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

type Props = {
  projects: PortfolioProject[];
};

export function FilterableProjectGrid({ projects }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(false);

  const { uniqueSkills, uniqueTools } = useMemo(() => {
    const skills = new Set<string>();
    const tools = new Set<string>();
    for (const p of projects) {
      p.skills.forEach((s) => skills.add(s));
      p.tools.forEach((t) => tools.add(t));
    }
    return {
      uniqueSkills: Array.from(skills).sort(),
      uniqueTools: Array.from(tools).sort(),
    };
  }, [projects]);

  const toggle = useCallback((tag: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    if (selected.size === 0) return projects;
    return projects.filter((p) =>
      [...p.skills, ...p.tools].some((tag) => selected.has(tag))
    );
  }, [projects, selected]);

  const hasFilters = uniqueSkills.length > 0 || uniqueTools.length > 0;

  return (
    <>
      {hasFilters && (
        <div className="mt-8 rounded-lg border border-line bg-white/60 px-5 py-4">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
              Filter by
            </span>
            <div className="flex items-center gap-4">
              {selected.size > 0 && (
                <button
                  onClick={() => setSelected(new Set())}
                  className="text-[10px] text-ink/30 transition hover:text-ink/60"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setExpanded((e) => !e)}
                className="flex items-center gap-1 text-[10px] text-ink/30 transition hover:text-ink/60"
              >
                {expanded ? "Show Less" : "Show All"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn("transition-transform duration-300", expanded ? "rotate-180" : "")}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chips — clipped to one row when collapsed */}
          <div
            className={cn(
              "overflow-hidden transition-[max-height] duration-300 ease-in-out",
              expanded ? "max-h-[600px]" : "max-h-[44px]"
            )}
          >
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
              {uniqueSkills.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/38">
                    Skills
                  </span>
                  {uniqueSkills.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      active={selected.has(tag)}
                      onClick={() => toggle(tag)}
                    />
                  ))}
                </div>
              )}
              {uniqueTools.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/38">
                    Tools
                  </span>
                  {uniqueTools.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      active={selected.has(tag)}
                      onClick={() => toggle(tag)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {filtered.length > 0 ? (
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={`${project.category}-${project.slug}`} project={project} />
          ))}
        </section>
      ) : (
        <div className="mt-12 text-center text-[0.97rem] text-ink/45">
          No projects match the selected filters.
        </div>
      )}
    </>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded px-3 py-1 text-xs font-medium transition",
        active
          ? "bg-accent text-white"
          : "border border-line bg-mist text-ink/60 hover:border-accent/40 hover:text-ink"
      )}
    >
      {label}
    </button>
  );
}
