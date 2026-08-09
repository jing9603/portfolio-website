export type TrackId = "strategist" | "builder" | "connector"
export type EntryType = "full-time" | "part-time" | "volunteer"

export interface TimelineEntry {
  id: string
  org: string
  url?: string
  role: string
  type: EntryType
  start: string   // "YYYY-MM"
  end: string | null
  tracks: TrackId[]
  tooltip: string
}

export interface Track {
  id: TrackId
  label: string
  description: string
  color: "blue" | "teal" | "amber"
}

export const timelineData: { entries: TimelineEntry[]; tracks: Track[] } = {
  entries: [
    {
      id: "firemind",
      org: "Firemind",
      url: "https://www.firemind.com/",
      role: "Product Manager",
      type: "full-time",
      start: "2026-06",
      end: null,
      tracks: ["strategist"],
      tooltip: "Helsinki, Finland",
    },
    {
      id: "revvity-pm",
      org: "Revvity Health Science",
      url: "https://www.revvity.com/",
      role: "Product Manager",
      type: "full-time",
      start: "2023-11",
      end: "2025-12",
      tracks: ["strategist"],
      tooltip: "Neonatal screening SaaS · 20+ countries · Product Manager 2023–25",
    },
    {
      id: "revvity-uxr",
      org: "Revvity Health Science",
      url: "https://www.revvity.com/",
      role: "Senior UX Researcher",
      type: "full-time",
      start: "2022-07",
      end: "2023-11",
      tracks: ["strategist"],
      tooltip: "Neonatal screening SaaS · 20+ countries · Senior UX Researcher 2022–23",
    },
    {
      id: "jst",
      org: "JST Healthcare Solutions",
      url: "https://www.smartsymptomcheck.com/about",
      role: "Product & UX Consultant",
      type: "part-time",
      start: "2024-03",
      end: "2026-06",
      tracks: ["strategist"],
      tooltip: "MDR-certified healthcare solution · delivered in 2 months · zero negative feedback",
    },
    {
      id: "dearpaw",
      org: "DearPaw",
      url: "https://www.mydearpaw.com",
      role: "Co-Founder & Product Lead",
      type: "part-time",
      start: "2025-01",
      end: null,
      tracks: ["builder"],
      tooltip: "AI pet care startup · 0 to 1 in 6 months · Helsinki Incubator · multi-agent system in progress",
    },
    {
      id: "huawei",
      org: "Huawei Technologies Finland",
      url: "https://www.huawei.com",
      role: "UX Designer, Sports & Health Wearables",
      type: "full-time",
      start: "2020-04",
      end: "2022-07",
      tracks: ["builder"],
      tooltip: "Tissot T-Touch Connect · smartwatch UX · APAC launches",
    },
    {
      id: "uoh-research",
      org: "University of Helsinki",
      url: "https://www.helsinki.fi",
      role: "Research Assistant",
      type: "full-time",
      start: "2019-06",
      end: "2020-03",
      tracks: ["builder"],
      tooltip: "HCI research · user studies · published at ACM CHIIR 2021, UMAP 2022",
    },
    {
      id: "uoh-course",
      org: "University of Helsinki",
      url: "https://www.helsinki.fi",
      role: "Course Assistant · Interactive Data Visualisation",
      type: "part-time",
      start: "2020-01",
      end: "2021-05",
      tracks: ["connector"],
      tooltip: "Teaching support · data visualisation course",
    },
    {
      id: "figma",
      org: "Friends of Figma Helsinki",
      url: "https://friends.figma.com/helsinki/",
      role: "Community Lead",
      type: "volunteer",
      start: "2025-10",
      end: null,
      tracks: ["connector"],
      tooltip: "200+ members · 2 events · 80+ attendees each · Futurice, Accenture Song, Qvik",
    },
    {
      id: "slush",
      org: "Slush",
      url: "https://slush.org/",
      role: "Customer Success Group Lead",
      type: "volunteer",
      start: "2023-08",
      end: "2023-11",
      tracks: ["connector"],
      tooltip: "Team of 10 · 10,000+ attendees",
    },
  ],

  tracks: [
    {
      id: "strategist",
      label: "Strategist",
      description: "Shaping direction through research, product decisions, and evidence.",
      color: "blue",
    },
    {
      id: "builder",
      label: "Builder",
      description: "Making things: products, tools, research, with hands on the work.",
      color: "teal",
    },
    {
      id: "connector",
      label: "Connector",
      description: "Creating space for others: communities, teaching, events.",
      color: "amber",
    },
  ],
}
