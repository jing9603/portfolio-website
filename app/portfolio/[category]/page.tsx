import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryTabs } from "@/components/category-tabs";
import { CtaPanel } from "@/components/cta-panel";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getProjectsByCategory } from "@/data/portfolio";
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

  if (!(category in portfolioCategoryMeta)) {
    return {};
  }

  const current = portfolioCategoryMeta[category as PortfolioCategoryKey];

  return {
    title: `${current.title} Portfolio`,
    description: current.blurb
  };
}

export function generateStaticParams() {
  return Object.keys(portfolioCategoryMeta).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!(category in portfolioCategoryMeta)) {
    notFound();
  }

  const currentCategory = category as PortfolioCategoryKey;
  const projects = await getProjectsByCategory(currentCategory);
  const current = portfolioCategoryMeta[currentCategory];

  return (
    <div className="mx-auto max-w-[1220px] px-6 pb-24 pt-12 lg:px-10 lg:pb-32">
      <section className="space-y-8">
        <SectionHeading
          eyebrow="Portfolio"
          title={current.title}
          description={current.blurb}
        />
        <CategoryTabs activeCategory={currentCategory} />
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={`${currentCategory}-${project.slug}`} project={project} />
        ))}
      </section>

      <div className="mt-20">
        <CtaPanel
          title="Looking for a product leader who can move from ambiguity to execution?"
          description="This portfolio is designed to be easy to browse by discipline while still showing how the work connects across product, UX, AI, and leadership."
          primaryLabel="Get in touch"
          primaryHref="/contact"
          secondaryLabel="See About"
          secondaryHref="/about"
        />
      </div>
    </div>
  );
}
