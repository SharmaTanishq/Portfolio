"use client"

import { openBooking } from "@/components/CalEmbed"
import { site } from "@/content/site"
import { Tooltip } from "@/components/motion/tooltip"

const button =
  "inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-sm font-medium text-bg transition-colors hover:bg-accent"

export function CtaButtons({ tooltipSide = "bottom" }: { tooltipSide?: "top" | "bottom" }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tooltip content={site.email} side={tooltipSide}>
        <a href={`mailto:${site.email}`} className={button}>
          Work with me
        </a>
      </Tooltip>
      <a
        href={`https://cal.com/${site.cal.link}`}
        className={button}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
          event.preventDefault()
          void openBooking().catch(() => {
            window.location.assign(`https://cal.com/${site.cal.link}`)
          })
        }}
      >
        Book a call
      </a>
    </div>
  )
}
