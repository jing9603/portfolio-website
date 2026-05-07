import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryTabs } from "@/components/category-tabs";
import { CtaPanel } from "@/components/cta-panel";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllProjects, getProjectsByCategory } from "@/data/portfolio";
import { portfolioCategoryMeta, type PortfolioCategoryKey } from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (category === "all") {
    return {
      title: "All Work",
      description: "A full view across product management, UX, leadership, AI, and emerging work."
    };
  }

  if (!(category in portfolioCategoryMeta)) {
    return {};
  }

  const current = portfolioCategoryMeta[category as PortfolioCategoryKey];

  return {
    title: `${current.title} Work`,
    description: current.blurb
  };
}

export function generateStaticParams() {
  return ["all", ...Object.keys(portfolioCategoryMeta)].map((category) => ({ category }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const allProjects = await getAllProjects();
  const availableCategories = Array.from(
    new Set(
      allProjects
        .map((project) => project.category)
        .filter((value): value is PortfolioCategoryKey => value in portfolioCategoryMeta)
    )
  );

  if (category !== "all" && !(category in portfolioCategoryMeta)) {
    notFound();
  }

  const currentCategory = category === "all" ? "all" : (category as PortfolioCategoryKey);
  const projects =
    currentCategory === "all"
      ? allProjects
      : await getProjectsByCategory(currentCategory);
  const current =
    currentCategory === "all"
      ? {
          title: "All work",
          blurb:
            "Everything in one place, including work across product management, UX, leadership, AI, and future projects that may not be categorized yet."
        }
      : portfolioCategoryMeta[currentCategory];

  return (
    <div className="mx-auto max-w-[1220px] px-6 pb-24 pt-12 lg:px-10 lg:pb-32">
      <section className="space-y-8">
        <SectionHeading
          eyebrow="Selected work"
          title={current.title}
          description={current.blurb}
        />
        <CategoryTabs
          activeCategory={currentCategory}
          availableCategories={availableCategories}
        />
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink/58">
          <span className="rounded-full border border-line bg-white px-4 py-2">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </span>
          {currentCategory === "all" ? (
            <span className="rounded-full border border-line bg-[#f4eee4] px-4 py-2">
              All categories in one view
            </span>
          ) : null}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={`${project.category}-${project.slug}`} project={project} />
        ))}
      </section>

      <div className="mt-20">
        <CtaPanel
          title="Looking for a product leader who can move from ambiguity to execution?"
          description="This portfolio is designed to be easy to browse by discipline while still showing how the work connects across product, UX, AI, and leadership."
          primaryLabel="Get in touch"
          primaryHref="/contact"
          secondaryLabel="Lean more about me"
          secondaryHref="/about"
        />
      </div>
    </div>
  );
}
