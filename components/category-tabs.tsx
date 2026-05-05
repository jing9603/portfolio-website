import Link from "next/link";

import { portfolioCategoryMeta, type PortfolioCategoryKey } from "@/lib/site";
import { cn } from "@/lib/utils";

type CategoryTabsProps = {
  activeCategory: PortfolioCategoryKey;
};

export function CategoryTabs({ activeCategory }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {Object.entries(portfolioCategoryMeta).map(([key, value]) => {
        const category = key as PortfolioCategoryKey;

        return (
          <Link
            key={key}
            href={`/portfolio/${key}`}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition",
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
