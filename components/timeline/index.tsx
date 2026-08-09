"use client"

import { useState } from "react"
import { timelineData } from "@/data/timeline"
import { OrgView } from "./org-view"
import { FacetsView } from "./facets-view"

type View = "org" | "facets"

const TABS: { id: View; label: string }[] = [
  { id: "org", label: "By Organisation" },
  { id: "facets", label: "By Track" },
]

export function Timeline() {
  const [view, setView] = useState<View>("org")

  return (
    <div>
      {/* Tab toggle */}
      <div className="mb-10 flex w-fit gap-1 rounded-lg border border-line bg-mist p-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`rounded px-4 py-2 text-sm font-semibold transition ${
              view === tab.id
                ? "bg-white text-ink shadow-sm"
                : "text-ink/45 hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {view === "org" ? (
        <OrgView entries={timelineData.entries} />
      ) : (
        <FacetsView entries={timelineData.entries} tracks={timelineData.tracks} />
      )}
    </div>
  )
}
