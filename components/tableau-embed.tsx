"use client"

import { useEffect } from "react"
import type { RichTextSpan } from "@/data/portfolio"
import { NotionRichText } from "./notion-rich-text"

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tableau-viz": React.HTMLAttributes<HTMLElement> & {
        src?: string
        toolbar?: string
        "hide-tabs"?: string
        width?: string
        height?: string
      }
    }
  }
}

export function TableauEmbed({ url, caption }: { url: string; caption?: RichTextSpan[] }) {
  useEffect(() => {
    if (document.querySelector('script[src*="tableau.embedding"]')) return
    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
    document.head.appendChild(script)
  }, [])

  return (
    <figure className="space-y-3 py-2">
      <div className="overflow-hidden rounded-lg border border-line">
        <tableau-viz
          src={url}
          toolbar="bottom"
          hide-tabs="true"
          width="100%"
          height="600"
        />
      </div>
      {caption?.length ? (
        <figcaption className="text-center text-sm leading-6 text-ink/56">
          <NotionRichText richText={caption} />
        </figcaption>
      ) : null}
    </figure>
  )
}
