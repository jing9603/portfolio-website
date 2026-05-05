import type { ProjectSection } from "@/data/portfolio";

type ProjectTocProps = {
  sections: ProjectSection[];
};

export function ProjectToc({ sections }: ProjectTocProps) {
  return (
    <aside className="top-24 hidden self-start rounded-[24px] border border-line bg-white p-5 shadow-soft lg:sticky lg:block">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        On this page
      </p>
      <nav>
        <ul className="space-y-2 text-sm text-ink/65">
          {sections.map((section) => (
            <li
              key={section.id}
              className={section.level === 2 ? "ml-4 border-l border-line pl-3" : ""}
            >
              <a
                href={`#${section.id}`}
                className={
                  section.level === 2
                    ? "block text-[13px] text-ink/58 transition hover:text-ink"
                    : "block font-medium transition hover:text-ink"
                }
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
