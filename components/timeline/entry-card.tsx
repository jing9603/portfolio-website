"use client"

import { useState } from "react"
import type { TimelineEntry } from "@/data/timeline"
import { TRACK_COLORS, TYPE_LABELS, formatDateRange } from "./utils"

interface EntryCardProps {
  entry: TimelineEntry
  showTrack?: boolean
}

export function EntryCard({ entry, showTrack = true }: EntryCardProps) {
  const [tip, setTip] = useState(false)
  const trackColor = TRACK_COLORS[entry.tracks[0]]

  return (
    <div
      className="group relative"
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      <div className="rounded-lg border border-line bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
        {/* Badges */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          <span className="rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] bg-ink/[0.06] text-ink/50">
            {TYPE_LABELS[entry.type]}
          </span>
          {showTrack && (
            <span className={`rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${trackColor.badge}`}>
              {entry.tracks[0]}
            </span>
          )}
        </div>

        {/* Role */}
        <h3 className="font-semibold text-[0.95rem] leading-snug text-ink">
          {entry.role}
        </h3>

        {/* Org */}
        <p className="mt-1 text-sm text-ink/55">
          {entry.url ? (
            <a
              href={entry.url}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-accent"
              onClick={e => e.stopPropagation()}
            >
              {entry.org}
            </a>
          ) : (
            entry.org
          )}
        </p>

        {/* Date range */}
        <p className="mt-2.5 text-[10px] uppercase tracking-[0.18em] text-ink/35">
          {formatDateRange(entry.start, entry.end)}
        </p>
      </div>

      {/* Tooltip */}
      {tip && (
        <div className="pointer-events-none absolute bottom-full left-2 z-30 mb-2">
          <div className="max-w-[260px] rounded-md bg-[#1a1a1a] px-3 py-2 text-[11px] leading-5 text-white shadow-lg">
            {entry.tooltip}
          </div>
          <div className="ml-3 h-0 w-0 border-4 border-transparent border-t-[#1a1a1a]" />
        </div>
      )}
    </div>
  )
}
