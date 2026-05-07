import "server-only";

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import type { PortfolioCategoryKey } from "@/lib/site";

export type ProjectSection = {
  id: string;
  title: string;
  level: 1 | 2;
  content: string[];
};

export type RichTextSpan = {
  plain_text: string;
  href?: string | null;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
};

export type RenderBlock = {
  id: string;
  type:
    | "paragraph"
    | "heading_1"
    | "heading_2"
    | "heading_3"
    | "bulleted_list_item"
    | "numbered_list_item"
    | "quote"
    | "callout"
    | "divider"
    | "image"
    | "toggle"
    | "column_list"
    | "column";
  richText?: RichTextSpan[];
  caption?: RichTextSpan[];
  imageUrl?: string;
  calloutIcon?: string;
  children?: RenderBlock[];
};

export type PortfolioProject = {
  id: string;
  notionUrl: string;
  publicUrl?: string;
  slug: string;
  title: string;
  coverImage?: string;
  category?: PortfolioCategoryKey;
  type: string;
  organization: string;
  role?: string;
  domain?: string;
  timespan: string;
  teamSize: string;
  description: string;
  impact: string;
  skills: string[];
  tools: string[];
  featured: boolean;
  heroLabel: string;
  sections: ProjectSection[];
  blocks?: RenderBlock[];
  lastPublished?: string;
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
    role: "UX Researcher, DesignOps Lead",
    domain: "Healthcare, Biotech, Information Management Systems",
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
        level: 1,
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
    role: "UX Designer",
    domain: "Sports and Health Wearables",
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
        level: 1,
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
    role: "Product Strategy and UX Consultant",
    domain: "Digital Health, Symptom Assessment, Regulated Healthcare",
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
        level: 1,
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
    role: "CEO and Product Lead",
    domain: "AI-powered Preventive Pet Care",
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
        level: 1,
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
    role: "Researcher, UX Designer, Front-end Developer",
    domain: "Information Retrieval, Search Engine, Recommendation System",
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
        level: 1,
        content: [
          "This project explored how adaptive keyword support could help users navigate uncertainty during literature search."
        ]
      }
    ]
  }
];

const PUBLISHED_PORTFOLIO_PATH = path.join(
  process.cwd(),
  "data",
  "published-portfolio.json"
);

function normalizeProject(project: PortfolioProject): PortfolioProject {
  return {
    ...project,
    publicUrl: project.publicUrl ?? undefined,
    coverImage: project.coverImage ?? undefined,
    role: project.role ?? undefined,
    domain: project.domain ?? undefined,
    blocks: project.blocks ?? undefined,
    lastPublished: project.lastPublished ?? undefined
  };
}

const getPublishedProjects = cache(async () => {
  try {
    await access(PUBLISHED_PORTFOLIO_PATH);
    const file = await readFile(PUBLISHED_PORTFOLIO_PATH, "utf8");
    const parsed = JSON.parse(file) as PortfolioProject[];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return fallbackPortfolioProjects;
    }

    return parsed.map(normalizeProject);
  } catch {
    return fallbackPortfolioProjects;
  }
});

export async function getAllProjects() {
  return getPublishedProjects();
}

export async function getFeaturedProjects() {
  const projects = await getPublishedProjects();
  return projects.filter((project) => project.featured).slice(0, 4);
}

export async function getProjectsByCategory(category: PortfolioCategoryKey) {
  const projects = await getPublishedProjects();
  return projects.filter((project) => project.category === category);
}

export async function getProject(category: PortfolioCategoryKey | "all", slug: string) {
  const projects = await getPublishedProjects();
  if (category === "all") {
    return projects.find((item) => !item.category && item.slug === slug) ?? null;
  }

  return projects.find((item) => item.category === category && item.slug === slug) ?? null;
}
