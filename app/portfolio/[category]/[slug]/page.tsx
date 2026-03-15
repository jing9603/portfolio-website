import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTurnUp,
  faClock,
  faLayerGroup,
  faPeopleGroup
} from "@fortawesome/free-solid-svg-icons";

import { CtaPanel } from "@/components/cta-panel";
import { NotionBlocks } from "@/components/notion-blocks";
import { ProjectToc } from "@/components/project-toc";
import { getAllProjects, getProject } from "@/data/portfolio";
import { portfolioCategoryMeta, type PortfolioCategoryKey } from "@/lib/site";

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

  if (!(category in portfolioCategoryMeta)) {
    return {};
  }

  const project = await getProject(category as PortfolioCategoryKey, slug);

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
    category: project.category,
    slug: project.slug
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { category, slug } = await params;

  if (!(category in portfolioCategoryMeta)) {
    notFound();
  }

  const currentCategory = category as PortfolioCategoryKey;
  const project = await getProject(currentCategory, slug);

  if (!project) {
    notFound();
  }

  return (
    <div id="top" className="mx-auto max-w-[1240px] px-6 pb-24 pt-10 lg:px-10 lg:pb-32">
      <div className="rounded-[34px] border border-line bg-white p-8 shadow-panel lg:p-10">
        <div className="space-y-6">
          <Link
            href={`/portfolio/${currentCategory}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/62 transition hover:text-ink"
          >
            <FontAwesomeIcon icon={faArrowTurnUp} className="h-3.5 w-3.5" rotation={270} />
            Back to {portfolioCategoryMeta[currentCategory].title}
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {project.heroLabel}
          </p>
          <h1 className="max-w-4xl font-display text-5xl leading-tight text-ink lg:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-ink/72">{project.description}</p>
        </div>

        <div className="mt-10 grid gap-4 rounded-[28px] border border-line bg-[#f7f3ea] p-6 lg:grid-cols-3">
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faLayerGroup} className="mt-1 h-4 w-4 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/48">Organization</p>
              <p className="mt-2 text-sm leading-6 text-ink/74">{project.organization}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faClock} className="mt-1 h-4 w-4 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/48">Timespan</p>
              <p className="mt-2 text-sm leading-6 text-ink/74">{project.timespan}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faPeopleGroup} className="mt-1 h-4 w-4 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/48">Team size</p>
              <p className="mt-2 text-sm leading-6 text-ink/74">{project.teamSize}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-12">
            {project.blocks?.length ? (
              <NotionBlocks blocks={project.blocks} />
            ) : (
              project.sections.map((section) => (
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
              ))
            )}
            <section id="tools-methods" className="scroll-mt-28">
              <h2 className="font-display text-3xl text-ink lg:text-4xl">Tools & Methods</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {[...project.skills, ...project.tools].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-[#f6f1e8] px-4 py-2 text-sm text-ink/72"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
            <div className="pt-4">
              <a
                href="#top"
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink/72 transition hover:border-ink hover:text-ink"
              >
                Back to top
              </a>
            </div>
          </div>
          <ProjectToc
            sections={[
              ...project.sections,
              { id: "tools-methods", title: "Tools & Methods", content: [] }
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
          secondaryHref={`/portfolio/${currentCategory}`}
        />
      </div>
    </div>
  );
}
