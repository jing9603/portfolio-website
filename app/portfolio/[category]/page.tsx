import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryTabs } from "@/components/category-tabs";
import { CtaPanel } from "@/components/cta-panel";
import { ProjectCard } from "@/components/project-card";
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
      description:
        "Everything in one place — case studies, experiments, builds, and community work. Unfiltered."
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
          title: "All Work",
          blurb:
            "Everything in one place — case studies, experiments, builds, and community work. Unfiltered."
        }
      : portfolioCategoryMeta[currentCategory];

  return (
    <div className="mx-auto max-w-[1220px] px-6 pb-24 pt-12 lg:px-10 lg:pb-32">
      <section className="space-y-6">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Browse by category
          </p>
          <div className="rounded-[26px] border border-line bg-[#f4eee4] p-4 shadow-soft">
            <CategoryTabs
              activeCategory={currentCategory}
              availableCategories={availableCategories}
            />
          </div>
        </div>
        <p className="max-w-3xl text-[1.02rem] leading-8 text-ink/68">{current.blurb}</p>
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
