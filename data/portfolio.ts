import type { PortfolioCategoryKey } from "@/lib/site";

export type ProjectSection = {
  id: string;
  title: string;
  content: string[];
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: PortfolioCategoryKey;
  altCategories?: PortfolioCategoryKey[];
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

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "evoya-experience-evolving-journey",
    title: "EVOYA - Experience Evolving Journey",
    category: "pm",
    altCategories: ["ux", "ai-data"],
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
          "This work centered on a diagnostics platform serving laboratories in a highly regulated environment. The challenge was not just design quality or feature delivery. It was helping a legacy product evolve into something clearer, more scalable, and more aligned with the workflows people actually needed to complete.",
          "Jessie contributed across product thinking, UX research, and design-led framing to help move the platform toward a stronger operational experience."
        ]
      },
      {
        id: "context",
        title: "Context",
        content: [
          "The product supported neonatal screening workflows across a broad international footprint. Teams had to work within legacy constraints, compliance expectations, and varied stakeholder needs while still improving the day-to-day reality for laboratory users.",
          "That required careful translation between user evidence, technical constraints, and business direction."
        ]
      },
      {
        id: "approach",
        title: "Approach",
        content: [
          "Jessie worked across discovery, workflow analysis, prototyping, and prioritization support. The emphasis was on making complexity visible, helping teams align around what mattered most, and shaping solutions that were grounded in actual use rather than assumptions.",
          "Research inputs, interface concepts, and cross-functional collaboration were used to reframe conversations from feature-by-feature requests toward more coherent product improvements."
        ]
      },
      {
        id: "impact",
        title: "Impact",
        content: [
          "The outcome was a stronger foundation for product evolution in a system with major operational stakes. The work supported better alignment across teams and contributed to a more intentional path forward for user workflows, product structure, and decision making.",
          "It also reflects a recurring strength in Jessie’s work: making hard environments more navigable without oversimplifying what makes them hard."
        ]
      }
    ]
  },
  {
    slug: "tissot-t-touch-connect-localisation",
    title: "Tissot T-Touch Connect",
    category: "ux",
    altCategories: ["leadership"],
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
          "This project involved shaping the user experience for a connected wearable product where physical limitations, launch timing, and regional expectations all mattered.",
          "The work focused on ensuring the experience felt relevant and usable for APAC audiences while still respecting the product’s broader constraints."
        ]
      },
      {
        id: "challenge",
        title: "Challenge",
        content: [
          "Wearable interfaces leave little room for error. Every decision had to account for hardware limitations, time pressure, and cultural fit across multiple launch contexts.",
          "That made localization more than translation. It became a product design problem."
        ]
      },
      {
        id: "process",
        title: "Process",
        content: [
          "Jessie worked through research inputs, interaction decisions, and launch-supporting experience design to ensure the product worked not only in principle but in practice for the people using it.",
          "Close collaboration with product and engineering helped maintain momentum without losing sight of quality."
        ]
      },
      {
        id: "outcome",
        title: "Outcome",
        content: [
          "The result was a localized wearable experience that supported launch goals while respecting the realities of the device and the expectations of the target market.",
          "It demonstrated Jessie’s ability to adapt product thinking to constrained environments without sacrificing clarity."
        ]
      }
    ]
  },
  {
    slug: "smart-symptom-check-strategic-ux",
    title: "Smart Symptom Check",
    category: "ux",
    altCategories: ["pm"],
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
          "In regulated healthcare settings, UX decisions carry operational and compliance consequences. This project focused on improving a symptom assessment platform while maintaining trust, usability, and regulatory alignment.",
          "Jessie brought a strategic UX lens to help connect workflow redesign with clinical value."
        ]
      },
      {
        id: "problem",
        title: "Problem / Opportunity",
        content: [
          "Healthcare organizations needed a product experience that felt reliable and efficient in real-world use, not just in abstract product planning.",
          "The opportunity was to improve clarity, reduce friction, and support better decision making inside a regulated context."
        ]
      },
      {
        id: "approach",
        title: "Approach",
        content: [
          "Jessie led discovery and workflow framing, using research and prototypes to surface what users actually needed and where current patterns slowed them down.",
          "The work balanced product possibility with compliance-aware product judgment."
        ]
      },
      {
        id: "impact",
        title: "Impact",
        content: [
          "The project created a more grounded basis for product prioritization and solution design. It also reinforced a practical approach to UX in healthcare: useful, explainable, and tightly connected to how people work."
        ]
      }
    ]
  },
  {
    slug: "dearpaw-from-concept-to-trusted-pet-care-ai",
    title: "DearPaw",
    category: "ai-data",
    altCategories: ["pm"],
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
          "DearPaw began as a concept for AI-assisted preventive pet care and became a real mobile MVP within six months. The project pushed Jessie deeper into early-stage product work, from positioning and monetization to feature tradeoffs and practical AI use.",
          "It is a strong example of product leadership that is both strategic and hands-on."
        ]
      },
      {
        id: "context",
        title: "Context",
        content: [
          "Early-stage products need conviction, but they also need humility. Many of the initial assumptions had to be tested, challenged, and in some cases discarded as the team learned from market signals.",
          "The product had to become credible and useful, not just novel."
        ]
      },
      {
        id: "process",
        title: "Process",
        content: [
          "Jessie defined the MVP scope, product direction, and monetization logic while staying close to actual user value. The work included validating demand, reframing the proposition, and making practical choices about where AI was genuinely helpful.",
          "Governance and legal review were also built into decision making early, rather than treated as an afterthought."
        ]
      },
      {
        id: "learnings",
        title: "Key Learnings",
        content: [
          "The project deepened Jessie’s perspective on startup execution, especially around evidence-led pivots and the difference between AI as a marketing story and AI as a useful product capability.",
          "It also reinforced a broader theme in her work: trustworthy products need both ambition and restraint."
        ]
      }
    ]
  },
  {
    slug: "exploratory-search-caption",
    title: "Exploratory Search Caption",
    category: "ai-data",
    altCategories: ["ux"],
    type: "Project",
    organization: "Academic Research Project",
    timespan: "Sep 2019 - Jan 2020",
    teamSize: "2",
    description:
      "A dynamic support tool designed to reduce uncertainty and improve exploratory search in academic literature discovery.",
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
          "This project explored how adaptive keyword support could help users navigate uncertainty during literature search. It combined research thinking with working implementation, showing Jessie’s comfort in both conceptual and practical problem solving.",
          "The focus was on giving users better support in moments where search is exploratory rather than exact."
        ]
      },
      {
        id: "problem",
        title: "Problem / Opportunity",
        content: [
          "Traditional search experiences often assume the user already knows what they are looking for. In exploratory search, that assumption breaks down.",
          "The challenge was to support discovery without overwhelming the user or derailing the search task."
        ]
      },
      {
        id: "approach",
        title: "Approach",
        content: [
          "Jessie worked across research, prototyping, and front-end development to shape a tool that could dynamically support user exploration.",
          "The implementation grounded the concept in a usable interaction model rather than leaving it at theory."
        ]
      },
      {
        id: "outcome",
        title: "Outcome",
        content: [
          "The result was a more supportive exploratory search experience that demonstrated clear crossover between user understanding, interface thinking, and implementation capability."
        ]
      }
    ]
  },
  {
    slug: "community-and-cross-functional-leadership",
    title: "Community and Cross-Functional Leadership",
    category: "leadership",
    type: "Leadership",
    organization: "Friends of Figma Helsinki and Slush",
    timespan: "2023 - Present",
    teamSize: "10+",
    description:
      "A selection of community leadership, facilitation, and team coordination work across professional communities and high-volume event operations.",
    impact:
      "Shows Jessie’s ability to create alignment, momentum, and strong collaborative environments beyond formal product titles.",
    skills: ["Facilitation", "Community", "Leadership"],
    tools: ["Notion", "Figma", "Workshop design"],
    featured: false,
    heroLabel: "Leadership | Facilitation | Community building",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          "Leadership in Jessie’s work is not limited to title or org chart position. It shows up in how she creates clarity, brings people together, and helps groups move from scattered activity toward coordinated progress."
        ]
      },
      {
        id: "examples",
        title: "Examples",
        content: [
          "As a Friends of Figma Helsinki community lead, Jessie organized events that connected practitioners across product, design, and engineering.",
          "At Slush, she led a volunteer customer success group supporting a large international event, coordinating team effort under time pressure and high expectations."
        ]
      },
      {
        id: "takeaway",
        title: "Takeaway",
        content: [
          "These experiences reinforce the same qualities present in her product work: facilitation, situational judgment, and a practical instinct for helping teams operate well together."
        ]
      }
    ]
  }
];

export function getFeaturedProjects() {
  return portfolioProjects.filter((project) => project.featured).slice(0, 4);
}

export function getProjectsByCategory(category: PortfolioCategoryKey) {
  return portfolioProjects.filter(
    (project) =>
      project.category === category || project.altCategories?.includes(category)
  );
}

export function getProject(category: PortfolioCategoryKey, slug: string) {
  return getProjectsByCategory(category).find((project) => project.slug === slug);
}
