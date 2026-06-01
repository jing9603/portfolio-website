import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryTabs } from "@/components/category-tabs";
import { CtaPanel } from "@/components/cta-panel";
import { FilterableProjectGrid } from "@/components/filterable-project-grid";
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
        .filter(
          (value): value is PortfolioCategoryKey =>
            value !== undefined && value in portfolioCategoryMeta
        )
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
        <CategoryTabs
          activeCategory={currentCategory}
          availableCategories={availableCategories}
        />
        <p className="max-w-3xl text-[1.02rem] leading-8 text-ink/68">{current.blurb}</p>
      </section>

      <FilterableProjectGrid projects={projects} />

      <div className="mt-20">
        <CtaPanel />
      </div>
    </div>
  );
}
