import Link from "next/link";

import { portfolioCategoryMeta, type PortfolioCategoryKey } from "@/lib/site";
import { cn } from "@/lib/utils";

type CategoryTabsProps = {
  activeCategory: PortfolioCategoryKey | "all";
  availableCategories: PortfolioCategoryKey[];
};

export function CategoryTabs({ activeCategory, availableCategories }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/portfolio/all"
        className={cn(
          "rounded-full border px-4 py-2.5 text-sm transition",
          activeCategory === "all"
            ? "border-accent bg-accent text-white"
            : "border-[#d6cabd] bg-white text-ink/72 hover:border-accent hover:text-ink"
        )}
      >
        All Work
      </Link>
      {availableCategories.map((key) => {
        const category = key as PortfolioCategoryKey;
        const value = portfolioCategoryMeta[category];

        return (
          <Link
            key={key}
            href={`/portfolio/${key}`}
            className={cn(
              "rounded-full border px-4 py-2.5 text-sm transition",
              activeCategory === category
                ? "border-accent bg-accent text-white"
                : "border-[#d6cabd] bg-white text-ink/72 hover:border-accent hover:text-ink"
            )}
          >
            {value.title}
          </Link>
        );
      })}
    </div>
  );
}
