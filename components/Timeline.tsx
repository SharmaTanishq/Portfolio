"use client"

import { useState } from "react"
import { BouncyAccordion } from "@/components/motion/bouncy-accordion"
import type { Employer } from "@/content/experience"

export type TimelineRow = Pick<Employer, "name" | "role" | "logo" | "points"> & {
  id: string
  tenure: string
}

// Half of the dashed line joining two tiles. Each row draws its own halves so nothing crosses the
// accordion's clipped rows, and the halves next to an open row step aside for its card.
function Connector({ side }: { side: "top" | "bottom" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute left-1/2 border-l border-dashed border-dash ${
        side === "top" ? "top-0 bottom-[calc(50%+22px)]" : "top-[calc(50%+22px)] bottom-0"
      }`}
    />
  )
}

export function Timeline({ rows, defaultOpen = null }: { rows: TimelineRow[]; defaultOpen?: string | null }) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen)
  const openIndex = rows.findIndex((r) => r.id === openId)

  const items = rows.map((row, i) => {
    const touchesOpen = (j: number) => j === openIndex
    const top = i > 0 && !touchesOpen(i) && !touchesOpen(i - 1)
    const bottom = i < rows.length - 1 && !touchesOpen(i) && !touchesOpen(i + 1)

    return {
      id: row.id,
      icon: (
        <>
          {top && <Connector side="top" />}
          {/* Decorative: the company name is right beside it. */}
          <span className="flex size-9 items-center justify-center rounded-[9px] border border-line bg-surface p-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny static marks, nothing for next/image to optimise */}
            <img src={row.logo} alt="" width={20} height={20} className="size-full object-contain" />
          </span>
          {bottom && <Connector side="bottom" />}
        </>
      ),
      title: (
        <span className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="flex flex-col">
            <span className="text-base font-medium text-ink">{row.name}</span>
            <span className="text-sm font-normal text-muted">{row.role}</span>
          </span>
          <span className="shrink-0 text-sm font-normal text-muted">{row.tenure}</span>
        </span>
      ),
      description: (
        <ul className="flex list-disc sm:ml-[44px] flex-col gap-2 pl-5 marker:text-dash">
          {row.points.map((p) => (
            <li key={p.text}>
              {p.lead && <strong className="font-medium text-ink">{p.lead}</strong>} {p.text}
            </li>
          ))}
        </ul>
      ),
    }
  })

  return (
    <BouncyAccordion
      items={items}
      value={openId}
      onValueChange={setOpenId}
      className="-mx-3 w-auto"
      classNames={{
        item: "bg-transparent ring-1 ring-transparent transition-colors ring-inset data-[state=open]:bg-surface data-[state=open]:ring-line",
        trigger: "min-h-[76px] cursor-pointer gap-4 px-3 py-2 focus-visible:bg-transparent",
        icon: "relative -my-2 h-auto w-9 self-stretch text-inherit",
        title: "text-base",
        chevron: "text-muted",
        content: "",
        description: "text-base text-ink-2",
      }}
    />
  )
}
