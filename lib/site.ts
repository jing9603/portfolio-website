export const siteConfig = {
  name: "Jessie Li",
  title: "Product Manager",
  email: "jessie.li6@outlook.com",
  linkedin: "https://www.linkedin.com/in/jessie-jing-li",
  github: "https://github.com/jing9603",
  location: "Helsinki, Finland",
  domain: "jessie.com",
  description:
    "Six years shipping products in regulated SaaS, healthcare, wearables, and AI-powered tools. Started from Helsinki, working globally."
};

export const portfolioCategoryMeta = {
  ux: {
    title: "Product & UX",
    shortTitle: "Product & UX",
    blurb:
      "User research, workflow analysis, and experience design. The foundation that makes my product work sharper."
  },
  pm: {
    title: "Product Strategy & Management",
    shortTitle: "PM",
    blurb:
      "Product decisions, roadmaps, and delivery. How I define direction, align teams, and ship in complex environments."
  },
  leadership: {
    title: "Community & Leadership",
    shortTitle: "Leadership",
    blurb:
      "Events, partnerships, and community building. How I show up beyond the day job."
  },
  "ai-data": {
    title: "Built with AI & Data",
    shortTitle: "AI & Data",
    blurb:
      "AI experiments, data projects, and things I built to solve real problems. Hands-on, not theoretical."
  }
} as const;

export type PortfolioCategoryKey = keyof typeof portfolioCategoryMeta;
