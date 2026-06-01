import Link from "next/link";

import { portfolioCategoryMeta, type PortfolioCategoryKey } from "@/lib/site";
import { cn } from "@/lib/utils";

type CategoryTabsProps = {
  activeCategory: PortfolioCategoryKey | "all";
  availableCategories: PortfolioCategoryKey[];
};

export function CategoryTabs({ activeCategory, availableCategories }: CategoryTabsProps) {
  const items = [
    { key: "all" as const, label: "All Work", href: "/portfolio/all" },
    ...availableCategories.map((key) => ({
      key,
      label: portfolioCategoryMeta[key as PortfolioCategoryKey].title,
      href: `/portfolio/${key}`,
    })),
  ];

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-line">
      {items.map(({ key, label, href }) => {
        const isActive = activeCategory === key;
        return (
          <Link
            key={key}
            href={href}
            className={cn(
              "-mb-px border-b-2 pb-3 text-[0.95rem] font-semibold transition",
              isActive
                ? "border-ink text-ink"
                : "border-transparent text-ink/40 hover:text-ink/70"
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
