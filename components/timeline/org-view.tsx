"use client"

import { motion } from "framer-motion"
import type { TimelineEntry } from "@/data/timeline"
import { groupByOverlap, getRowYear } from "./utils"
import { EntryCard } from "./entry-card"

export function OrgView({ entries }: { entries: TimelineEntry[] }) {
  const rows = groupByOverlap(entries)

  return (
    <div className="relative mt-2">
      {rows.map((row, rowIndex) => (
        <motion.div
          key={row.map(e => e.id).join("+")}
          className="flex gap-4"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.38, delay: rowIndex * 0.05, ease: "easeOut" as const }}
        >
          {/* Year label */}
          <div className="w-[58px] shrink-0 pt-[22px] text-right">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              {getRowYear(row)}
            </span>
          </div>

          {/* Connector: dot + line */}
          <div className="flex shrink-0 flex-col items-center">
            <div className="mt-[22px] h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-accent bg-white dark:bg-[#0d0d0d]" />
            {rowIndex < rows.length - 1 && (
              <div className="mt-1 min-h-[24px] w-px flex-1 bg-line" />
            )}
          </div>

          {/* Cards */}
          <div className={`flex-1 pb-6 ${row.length > 1 ? "grid grid-cols-1 gap-3 sm:grid-cols-2" : "max-w-xl"}`}>
            {row.map(entry => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
