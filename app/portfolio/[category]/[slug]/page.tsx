import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTurnUp,
  faClock,
  faCompassDrafting,
  faLayerGroup,
  faPeopleGroup,
  faUserTie
} from "@fortawesome/free-solid-svg-icons";

import { CtaPanel } from "@/components/cta-panel";
import { anchorId, NotionBlocks } from "@/components/notion-blocks";
import { ProjectToc } from "@/components/project-toc";
import { getAllProjects, getProject, type ProjectSection, type RenderBlock } from "@/data/portfolio";
import { portfolioCategoryMeta, type PortfolioCategoryKey } from "@/lib/site";

function tocFromBlocks(blocks: RenderBlock[]): ProjectSection[] {
  return blocks
    .filter((b) => b.type === "heading_1" || b.type === "heading_2")
    .map((b) => ({
      id: anchorId(b),
      title: b.richText?.map((r) => r.plain_text).join("") ?? "",
      level: (b.type === "heading_1" ? 1 : 2) as 1 | 2,
      content: []
    }));
}

type ProjectPageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { category, slug } = await params;

  if (category !== "all" && !(category in portfolioCategoryMeta)) {
    return {};
  }

  const project = await getProject(
    category === "all" ? "all" : (category as PortfolioCategoryKey),
    slug
  );

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project) => ({
    category: project.category ?? "all",
    slug: project.slug
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { category, slug } = await params;

  if (category !== "all" && !(category in portfolioCategoryMeta)) {
    notFound();
  }

  const currentCategory = category === "all" ? "all" : (category as PortfolioCategoryKey);
  const project = await getProject(currentCategory, slug);

  if (!project) {
    notFound();
  }

  const categoryMeta = project.category ? portfolioCategoryMeta[project.category] : null;
  const backHref = `/portfolio/${project.category ?? "all"}`;

  return (
    <div id="top" className="mx-auto max-w-[1280px] px-6 pb-24 pt-10 lg:px-10 lg:pb-32">
      <div className="rounded-xl border border-line bg-white p-8 shadow-panel lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-7">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink/62 transition hover:text-ink"
            >
              <FontAwesomeIcon icon={faArrowTurnUp} className="h-3.5 w-3.5" rotation={270} />
              Back to works
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              {categoryMeta ? (
                <span className="rounded bg-accentSoft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {categoryMeta.shortTitle}
                </span>
              ) : null}
              <span className="text-xs uppercase tracking-[0.2em] text-ink/48">
                {project.type}
              </span>
            </div>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.03] text-ink lg:text-[4.35rem]">
              {project.title}
            </h1>
            <p className="max-w-3xl text-[1.14rem] leading-9 text-ink/70">
              {project.description}
            </p>
          </div>

          <aside className="rounded-lg border border-line bg-mist p-6 shadow-soft lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Project dossier
            </p>
            <div className="mt-5 space-y-5 text-sm leading-7 text-ink/74">
              {project.role ? (
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faUserTie} className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-ink/48">Role</p>
                    <p className="mt-1">{project.role}</p>
                  </div>
                </div>
              ) : null}
              {project.domain ? (
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCompassDrafting} className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-ink/48">Domain</p>
                    <p className="mt-1">{project.domain}</p>
                  </div>
                </div>
              ) : null}
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLayerGroup} className="mt-1 h-4 w-4 text-accent" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ink/48">
                    Organization
                  </p>
                  <p className="mt-1">{project.organization}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faClock} className="mt-1 h-4 w-4 text-accent" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ink/48">Timespan</p>
                  <p className="mt-1">{project.timespan}</p>
                </div>
              </div>
              {project.teamSize ? (
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faPeopleGroup} className="mt-1 h-4 w-4 text-accent" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-ink/48">Team size</p>
                    <p className="mt-1">{project.teamSize}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </div>

        {project.coverImage ? (
          <div className="mt-12 overflow-hidden rounded-lg border border-line bg-mist shadow-soft">
            <img
              src={project.coverImage}
              alt={`${project.title} cover image`}
              className="max-h-[560px] w-full object-cover"
            />
          </div>
        ) : null}

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="max-w-[760px]">
            {project.blocks?.length ? (
              <div className="space-y-4">
                <NotionBlocks blocks={project.blocks} />
              </div>
            ) : (
              <div className="space-y-16">
                {project.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="font-display text-3xl text-ink lg:text-4xl">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-5 text-base leading-8 text-ink/72">
                      {section.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
            <section id="tools-methods" className="mt-16 scroll-mt-28">
              <div className="space-y-5 border-t border-line pt-10">
                <h2 className="font-display text-3xl text-ink lg:text-4xl">Tools & Methods</h2>
                <div className="flex flex-wrap gap-3">
                  {[...project.skills, ...project.tools].map((item) => (
                    <span
                      key={item}
                      className="rounded border border-line bg-mist px-4 py-2 text-sm text-ink/65"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </section>
            <div className="mt-8 pt-4">
              <a
                href="#top"
                className="inline-flex items-center gap-2 rounded border border-line px-4 py-2 text-sm font-semibold text-ink/65 transition hover:border-ink hover:text-ink"
              >
                Back to top
              </a>
            </div>
          </div>
          <ProjectToc
            sections={[
              ...(project.blocks?.length
                ? tocFromBlocks(project.blocks)
                : project.sections),
              { id: "tools-methods", title: "Tools & Methods", level: 1, content: [] }
            ]}
          />
        </div>
      </div>

      <div className="mt-16">
        <CtaPanel
          title="Interested in work like this?"
          description="Jessie brings the same combination of product judgment, user-centered thinking, and delivery focus to regulated systems, startup products, and complex cross-functional work."
          primaryLabel="Contact Jessie"
          primaryHref="/contact"
          secondaryLabel="More portfolio"
          secondaryHref={backHref}
        />
      </div>
    </div>
  );
}
