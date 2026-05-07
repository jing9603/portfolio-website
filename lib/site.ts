export const siteConfig = {
  name: "Jessie Li",
  title: "Product Manager",
  email: "jessie.li6@outlook.com",
  linkedin: "https://www.linkedin.com/in/jessie-jing-li",
  location: "Helsinki, Finland",
  domain: "jessie.com",
  description:
    "Product Manager with 6+ years in regulated SaaS, healthcare technology, and AI-powered products."
};

export const portfolioCategoryMeta = {
  ux: {
    title: "UX",
    shortTitle: "UX",
    blurb:
      "Workflow redesign, research-led decision making, usability engineering, and product experiences shaped around real users."
  },
  pm: {
    title: "PM",
    shortTitle: "PM",
    blurb:
      "Product direction, prioritization, strategy, evidence-led roadmaps, and cross-functional execution in regulated settings."
  },
  leadership: {
    title: "Leadership & Activity",
    shortTitle: "Leadership",
    blurb:
      "Team alignment, operating models, facilitation, community leadership, and the practical work of moving complex systems forward."
  },
  "ai-data": {
    title: "AI & Data",
    shortTitle: "AI & Data",
    blurb:
      "AI-enabled concepts, analytics-informed product decisions, and complex data work that supports trustworthy product outcomes."
  }
} as const;

export type PortfolioCategoryKey = keyof typeof portfolioCategoryMeta;
