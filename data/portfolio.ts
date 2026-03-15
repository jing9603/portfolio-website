import "server-only";

import { cache } from "react";

import type { PortfolioCategoryKey } from "@/lib/site";
import { notionFetch } from "@/lib/notion";

export type ProjectSection = {
  id: string;
  title: string;
  content: string[];
};

export type PortfolioProject = {
  id: string;
  notionUrl: string;
  slug: string;
  title: string;
  category: PortfolioCategoryKey;
  type: string;
  organization: string;
  timespan: string;
  teamSize: string;
  description: string;
  impact: string;
  skills: string[];
  tools: string[];
  featured: boolean;
  heroLabel: string;
  sections: ProjectSection[];
};

type NotionListPage = {
  id: string;
  url: string;
  properties: Record<string, unknown>;
};

type NotionBlock = {
  id: string;
  type: string;
  has_children?: boolean;
  [key: string]: unknown;
};

const fallbackPortfolioProjects: PortfolioProject[] = [
  {
    id: "fallback-evoya",
    notionUrl: "",
    slug: "evoya-experience-evolving-journey",
    title: "EVOYA - Experience Evolving Journey",
    category: "pm",
    type: "Project",
    organization: "Revvity",
    timespan: "07/2020 - 2023",
    teamSize: "50",
    description:
      "Modernizing legacy diagnostics workflows within a laboratory information management system used across 20+ countries and approximately 7 million specimens annually.",
    impact:
      "Helped shape a complex healthcare platform into a more coherent product direction with stronger evidence, usability, and delivery alignment.",
    skills: [
      "Product Discovery",
      "UI Design",
      "Prototype",
      "UX Research",
      "Data Analysis",
      "DesignOps"
    ],
    tools: ["Jira", "Figma", "Aha", "Confluence", "Miro", "Airtable", "Tableau"],
    featured: true,
    heroLabel: "Healthcare SaaS | Product strategy | Workflow modernization",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          "This work centered on a diagnostics platform serving laboratories in a highly regulated environment.",
          "Jessie contributed across product thinking, UX research, and design-led framing to help move the platform toward a stronger operational experience."
        ]
      }
    ]
  },
  {
    id: "fallback-tissot",
    notionUrl: "",
    slug: "tissot-t-touch-connect-localisation",
    title: "Tissot T-Touch Connect",
    category: "ux",
    type: "Project",
    organization: "Huawei",
    timespan: "Apr 2020 - Nov 2020",
    teamSize: "10",
    description:
      "Localization, health, and wearable experience design for Tissot's first semi-smartwatch across APAC markets under strict hardware constraints.",
    impact:
      "Balanced global product intent with local user expectations to support launch readiness in a constrained product environment.",
    skills: ["Localisation", "GTM", "UX Research", "UI Design", "Prototype"],
    tools: ["Jira", "Sketch", "Confluence", "MS Office", "Adobe Photoshop"],
    featured: true,
    heroLabel: "Wearables | Localization | Product experience",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          "This project involved shaping the user experience for a connected wearable product where physical limitations, launch timing, and regional expectations all mattered."
        ]
      }
    ]
  },
  {
    id: "fallback-smart-symptom",
    notionUrl: "",
    slug: "smart-symptom-check-strategic-ux",
    title: "Smart Symptom Check",
    category: "ux",
    type: "Project",
    organization: "JST Healthcare Solutions",
    timespan: "Mar 2024 - Present",
    teamSize: "6",
    description:
      "Strategic UX work for an MDR-certified symptom assessment platform serving healthcare organizations across Europe.",
    impact:
      "Helped align product decisions and workflow redesign around clinical value, usability, and regulatory realities.",
    skills: [
      "Product Discovery",
      "Prototype",
      "UI Design",
      "UX Research",
      "Usability engineering (ISO)"
    ],
    tools: ["Confluence", "Figma", "Airtable", "MS Office", "Jira"],
    featured: true,
    heroLabel: "Digital health | Regulated UX | Clinical workflows",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          "This project focused on improving a symptom assessment platform while maintaining trust, usability, and regulatory alignment."
        ]
      }
    ]
  },
  {
    id: "fallback-dearpaw",
    notionUrl: "",
    slug: "dearpaw-from-concept-to-trusted-pet-care-ai",
    title: "DearPaw",
    category: "ai-data",
    type: "Case study",
    organization: "DearPaw",
    timespan: "Mar 2025 - Present",
    teamSize: "4",
    description:
      "An AI-powered preventive pet care assistant shaped from early concept into a mobile MVP in six months.",
    impact:
      "Combined product positioning, evidence-based iteration, and practical AI application into an end-to-end startup build.",
    skills: [
      "Product Discovery",
      "Product Strategy",
      "UI Design",
      "Prototype",
      "UX Research"
    ],
    tools: ["Figma", "FigJam", "Airtable"],
    featured: true,
    heroLabel: "AI-enabled startup | MVP | Product strategy",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          "DearPaw began as a concept for AI-assisted preventive pet care and became a real mobile MVP within six months."
        ]
      }
    ]
  },
  {
    id: "fallback-esc",
    notionUrl: "",
    slug: "esc-empowering-user-through-adaptive-keyword",
    title: "Exploratory Search Caption",
    category: "ai-data",
    type: "Project",
    organization: "Academic Research Project",
    timespan: "Sep 2019 - Jan 2020",
    teamSize: "2",
    description:
      "A dynamic support tool that reduces user uncertainty and enhances exploratory search efficiency in academic literature discovery.",
    impact:
      "Connected front-end implementation, adaptive keyword support, and user research into a focused search experience improvement.",
    skills: ["Front-end Dev", "UX Research", "Prototype", "Data Analysis"],
    tools: ["Sketch", "Angular", "Bootstrap"],
    featured: true,
    heroLabel: "Search systems | Research | Front-end implementation",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          "This project explored how adaptive keyword support could help users navigate uncertainty during literature search."
        ]
      }
    ]
  }
];

const projectEnrichment: Record<
  string,
  {
    organization: string;
    impact: string;
    heroLabel: string;
  }
> = {
  "evoya-experience-evolving-journey": {
    organization: "Revvity",
    impact:
      "Helped shape a complex healthcare platform into a more coherent product direction with stronger evidence, usability, and delivery alignment.",
    heroLabel: "Healthcare SaaS | Product strategy | Workflow modernization"
  },
  "tissot-t-touch-connect-localisation-fitness-wearable-design": {
    organization: "Huawei",
    impact:
      "Balanced global product intent with local user expectations to support launch readiness in a constrained product environment.",
    heroLabel: "Wearables | Localization | Product experience"
  },
  "smart-symptom-check-strategic-ux-regulated-healthcare": {
    organization: "JST Healthcare Solutions",
    impact:
      "Helped align product decisions and workflow redesign around clinical value, usability, and regulatory realities.",
    heroLabel: "Digital health | Regulated UX | Clinical workflows"
  },
  "dearpaw-from-concept-to-trusted-pet-care-ai": {
    organization: "DearPaw",
    impact:
      "Combined product positioning, evidence-based iteration, and practical AI application into an end-to-end startup build.",
    heroLabel: "AI-enabled startup | MVP | Product strategy"
  },
  "esc-empowering-user-through-adaptive-keyword": {
    organization: "Academic Research Project",
    impact:
      "Connected front-end implementation, adaptive keyword support, and user research into a focused search experience improvement.",
    heroLabel: "Search systems | Research | Front-end implementation"
  }
};

function getPlainText(items: Array<{ plain_text?: string }> | undefined) {
  if (!items?.length) {
    return "";
  }

  return items.map((item) => item.plain_text ?? "").join("").trim();
}

function getPropertyText(property: any) {
  if (!property) {
    return "";
  }

  if (property.type === "title") {
    return getPlainText(property.title);
  }

  if (property.type === "rich_text") {
    return getPlainText(property.rich_text);
  }

  return "";
}

function getPropertyMultiSelect(property: any) {
  if (!property || property.type !== "multi_select") {
    return [];
  }

  return property.multi_select.map((item: { name: string }) => item.name);
}

function mapCategory(categoryName: string): PortfolioCategoryKey {
  switch (categoryName) {
    case "UX":
      return "ux";
    case "PM":
      return "pm";
    case "Leadership & Activity":
      return "leadership";
    case "AI & Data":
      return "ai-data";
    default:
      return "pm";
  }
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

function initialSections(project: {
  title: string;
  description: string;
  impact: string;
}): ProjectSection[] {
  return [
    {
      id: "overview",
      title: "Overview",
      content: [project.description]
    },
    {
      id: "impact",
      title: "Impact",
      content: [project.impact]
    }
  ];
}

function blockText(block: NotionBlock) {
  const value = block[block.type] as { rich_text?: Array<{ plain_text?: string }> } | undefined;
  return getPlainText(value?.rich_text);
}

function blocksToSections(blocks: NotionBlock[], fallbackDescription: string, fallbackImpact: string) {
  const sections: ProjectSection[] = [];
  let currentSection: ProjectSection | null = null;

  for (const block of blocks) {
    if (block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3") {
      const title = blockText(block);
      if (!title) {
        continue;
      }

      currentSection = {
        id: slugify(title),
        title,
        content: []
      };
      sections.push(currentSection);
      continue;
    }

    if (block.type === "paragraph" || block.type === "quote" || block.type === "callout") {
      const text = blockText(block);
      if (!text) {
        continue;
      }

      if (!currentSection) {
        currentSection = {
          id: "overview",
          title: "Overview",
          content: []
        };
        sections.push(currentSection);
      }

      currentSection.content.push(text);
      continue;
    }

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const text = blockText(block);
      if (!text) {
        continue;
      }

      if (!currentSection) {
        currentSection = {
          id: "overview",
          title: "Overview",
          content: []
        };
        sections.push(currentSection);
      }

      currentSection.content.push(`- ${text}`);
    }
  }

  const normalized = sections.filter((section) => section.content.length > 0);

  return normalized.length > 0
    ? normalized
    : initialSections({ title: "", description: fallbackDescription, impact: fallbackImpact });
}

async function listProjectsFromNotion(): Promise<PortfolioProject[]> {
  const response = await notionFetch<{
    results: NotionListPage[];
  }>(`/v1/data_sources/${process.env.NOTION_PROJECTS_DATA_SOURCE_ID}/query`, {
    method: "POST",
    body: JSON.stringify({})
  });

  return response.results
    .map((page) => {
      const properties = page.properties as Record<string, any>;
      const title = getPropertyText(properties.Name);
      const slug = getPropertyText(properties.Slug) || slugify(title);
      const enrichment = projectEnrichment[slug];
      const categoryName = properties.Category?.select?.name ?? "PM";
      const description = getPropertyText(properties.Description);

      return {
        id: page.id,
        notionUrl: page.url,
        slug,
        title,
        category: mapCategory(categoryName),
        type: properties.Type?.select?.name ?? "Project",
        organization: enrichment?.organization ?? titleFromSlug(slug),
        timespan: getPropertyText(properties["Timespan"]),
        teamSize: String(properties["Team size"]?.number ?? ""),
        description,
        impact: enrichment?.impact ?? description,
        skills: getPropertyMultiSelect(properties.Skill),
        tools: getPropertyMultiSelect(properties.Tool),
        featured: properties.Featured?.checkbox ?? false,
        heroLabel: enrichment?.heroLabel ?? `${categoryName} | ${properties.Type?.select?.name ?? "Project"}`,
        sections: initialSections({
          title,
          description,
          impact: enrichment?.impact ?? description
        })
      } satisfies PortfolioProject;
    })
    .filter((project) => project.slug);
}

async function getProjectBlocks(pageId: string) {
  const response = await notionFetch<{
    results: NotionBlock[];
    has_more: boolean;
    next_cursor: string | null;
  }>(`/v1/blocks/${pageId}/children?page_size=100`);

  return response.results;
}

const getLiveProjects = cache(async () => {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_PROJECTS_DATA_SOURCE_ID) {
    return fallbackPortfolioProjects;
  }

  try {
    return await listProjectsFromNotion();
  } catch {
    return fallbackPortfolioProjects;
  }
});

export async function getAllProjects() {
  return getLiveProjects();
}

export async function getFeaturedProjects() {
  const projects = await getLiveProjects();
  return projects.filter((project) => project.featured).slice(0, 4);
}

export async function getProjectsByCategory(category: PortfolioCategoryKey) {
  const projects = await getLiveProjects();
  return projects.filter((project) => project.category === category);
}

export async function getProject(category: PortfolioCategoryKey, slug: string) {
  const projects = await getLiveProjects();
  const project = projects.find(
    (item) => item.category === category && item.slug === slug
  );

  if (!project) {
    return null;
  }

  if (!process.env.NOTION_TOKEN || !process.env.NOTION_PROJECTS_DATA_SOURCE_ID) {
    return project;
  }

  try {
    const blocks = await getProjectBlocks(project.id);

    return {
      ...project,
      sections: blocksToSections(blocks, project.description, project.impact)
    };
  } catch {
    return project;
  }
}
