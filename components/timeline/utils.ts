import type { TimelineEntry } from "@/data/timeline"

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export function ymToNum(ym: string): number {
  const [y, m] = ym.split("-").map(Number)
  return y * 12 + m
}

export function formatDate(ym: string | null): string {
  if (!ym) return "present"
  const [year, month] = ym.split("-")
  return `${MONTHS[parseInt(month) - 1]} ${year}`
}

export function formatDateRange(start: string, end: string | null): string {
  return `${formatDate(start)} – ${formatDate(end)}`
}

function doOverlap(a: TimelineEntry, b: TimelineEntry): boolean {
  const FAR = "9999-12"
  const aS = ymToNum(a.start), aE = ymToNum(a.end ?? FAR)
  const bS = ymToNum(b.start), bE = ymToNum(b.end ?? FAR)
  return aS < bE && bS < aE
}

export function groupByOverlap(entries: TimelineEntry[]): TimelineEntry[][] {
  const sorted = [...entries].sort((a, b) => ymToNum(b.start) - ymToNum(a.start))
  const rows: TimelineEntry[][] = []

  for (const entry of sorted) {
    let placed = false
    for (const row of rows) {
      if (row.some(e => doOverlap(e, entry)) && row.length < 2) {
        row.push(entry)
        placed = true
        break
      }
    }
    if (!placed) rows.push([entry])
  }

  return rows
}

export function getRowYear(row: TimelineEntry[]): string {
  return [...row].sort((a, b) => ymToNum(b.start) - ymToNum(a.start))[0].start.split("-")[0]
}

export const TRACK_COLORS = {
  strategist: {
    badge: "bg-[#185FA5]/[0.1] text-[#185FA5] dark:bg-[#85B7EB]/[0.15] dark:text-[#85B7EB]",
    light: "#185FA5",
    dark: "#85B7EB",
  },
  builder: {
    badge: "bg-[#0F6E56]/[0.1] text-[#0F6E56] dark:bg-[#5DCAA5]/[0.15] dark:text-[#5DCAA5]",
    light: "#0F6E56",
    dark: "#5DCAA5",
  },
  connector: {
    badge: "bg-[#854F0B]/[0.1] text-[#854F0B] dark:bg-[#EF9F27]/[0.15] dark:text-[#EF9F27]",
    light: "#854F0B",
    dark: "#EF9F27",
  },
} as const

export const TYPE_LABELS: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "volunteer": "Volunteer",
}
