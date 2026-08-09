"use client"

import { useEffect, useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import type { TimelineEntry, Track } from "@/data/timeline"
import { TRACK_COLORS, formatDateRange, TYPE_LABELS } from "./utils"
import { EntryCard } from "./entry-card"

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

type PanelPos = "center" | "left" | "right"

const VARIANTS: Variants = {
  center: {
    x: "0%",
    scale: 1,
    opacity: 1,
    rotateY: 0,
    filter: "blur(0px)",
    zIndex: 10,
  },
  left: {
    x: "-62%",
    scale: 0.82,
    opacity: 0.48,
    rotateY: 20,
    filter: "blur(1.5px)",
    zIndex: 1,
  },
  right: {
    x: "62%",
    scale: 0.82,
    opacity: 0.48,
    rotateY: -20,
    filter: "blur(1.5px)",
    zIndex: 1,
  },
}

function getPos(trackIndex: number, active: number): PanelPos {
  const diff = mod(trackIndex - active, 3)
  if (diff === 0) return "center"
  if (diff === 1) return "right"
  return "left"
}

interface FacetsViewProps {
  entries: TimelineEntry[]
  tracks: Track[]
}

export function FacetsView({ entries, tracks }: FacetsViewProps) {
  const [active, setActive] = useState(0)
  const dragStartX = useRef(0)

  function paginate(dir: 1 | -1) {
    setActive(a => mod(a + dir, 3))
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") paginate(-1)
      if (e.key === "ArrowRight") paginate(1)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <div className="select-none">
      {/* Carousel */}
      <div
        className="relative overflow-x-clip"
        style={{ perspective: "1400px" }}
        onPointerDown={e => { dragStartX.current = e.clientX }}
        onPointerUp={e => {
          const delta = e.clientX - dragStartX.current
          if (Math.abs(delta) > 60) paginate(delta < 0 ? 1 : -1)
        }}
      >
        <div className="relative h-[580px] sm:h-[540px]">
          {tracks.map((track, i) => {
            const pos = getPos(i, active)
            const tc = TRACK_COLORS[track.id]
            const trackEntries = entries.filter(e => e.tracks.includes(track.id))

            return (
              <motion.div
                key={track.id}
                variants={VARIANTS}
                animate={pos}
                transition={{ type: "spring", stiffness: 270, damping: 30 }}
                className="absolute inset-0 mx-auto w-[88%] cursor-pointer rounded-2xl border border-line bg-white shadow-panel"
                style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
                onClick={() => { if (pos !== "center") setActive(i) }}
              >
                {/* Coloured top bar */}
                <div className="h-1 w-full rounded-t-2xl" style={{ backgroundColor: tc.light }} />

                <div className="flex h-full flex-col p-6">
                  {/* Header */}
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <p
                        className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                        style={{ color: tc.light }}
                      >
                        Track
                      </p>
                      <h3 className="mt-1.5 font-display text-[1.65rem] font-semibold text-ink">
                        {track.label}
                      </h3>
                      <p className="mt-1 max-w-[34rem] text-sm leading-6 text-ink/50">
                        {track.description}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold"
                      style={{ backgroundColor: `${tc.light}18`, color: tc.light }}
                    >
                      {trackEntries.length} {trackEntries.length === 1 ? "role" : "roles"}
                    </span>
                  </div>

                  {/* Entries */}
                  <div className="flex-1 pr-1">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {trackEntries.map(entry => (
                        <EntryCard key={entry.id} entry={entry} showTrack={false} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous track"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink/50 transition hover:border-ink/30 hover:text-ink"
        >
          ←
        </button>

        <div className="flex gap-2">
          {tracks.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              aria-label={`View ${t.label} track`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: active === i ? 20 : 8,
                backgroundColor: active === i ? TRACK_COLORS[t.id].light : "var(--color-line, #e4e0da)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          aria-label="Next track"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink/50 transition hover:border-ink/30 hover:text-ink"
        >
          →
        </button>
      </div>

      <p className="mt-3 text-center text-[11px] text-ink/30">
        ← → arrow keys · click side panels · or drag
      </p>
    </div>
  )
}
