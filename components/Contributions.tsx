"use client"

import { useEffect, useRef, useState } from "react"
import type { ContributionDay, ContributionYear } from "@/lib/github"

// Five steps of the accent green; level 0 is the empty well.
const RAMP = ["#EDEBE5", "#C3D2CA", "#8DAB9E", "#5A8475", "#2F5D50"]
const EMPTY_WEEKS = 53

type Props = {
  years: number[] // newest first
  data: ContributionYear[] | null
}

export function Contributions({ years, data }: Props) {
  const [year, setYear] = useState(years[0])
  const scroller = useRef<HTMLDivElement>(null)
  const current = data?.find((d) => d.year === year) ?? null

  // On narrow screens the grid scrolls; start at the newest week.
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [year])

  return (
    <section aria-labelledby="contributions-heading" className="wrap pt-4 pb-14">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 id="contributions-heading" className="label">
          Contributions
        </h2>
        <div className="no-scrollbar -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          <div role="group" aria-label="Year" className="flex w-max gap-1 font-mono text-xs">
            {years.map((y) => {
              const on = y === year
              return (
                <button
                  key={y}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setYear(y)}
                  className={`min-h-8 cursor-pointer rounded-lg border px-2.5 transition-colors ${
                    on ? "border-ink bg-ink text-bg" : "border-chip bg-surface text-muted hover:text-ink"
                  }`}
                >
                  {y}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="relative rounded-[14px] border border-line bg-surface">
        <div ref={scroller} className="overflow-x-auto p-4">
          {current ? <Grid days={current.days} year={year} total={current.total} /> : <EmptyGrid />}
        </div>
        {!current && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span className="rounded-lg border border-dashed border-dash bg-surface px-3 py-1.5 text-center font-mono text-xs text-muted">
              [GITHUB CONTRIBUTIONS FOR {year}: SET GITHUB_TOKEN]
            </span>
          </div>
        )}
      </div>

      {current && (
        <div className="mt-3 flex items-center justify-between gap-3 font-mono text-xs text-muted">
          <span>
            {current.total.toLocaleString("en-US")} contributions in {year}
          </span>
          <span className="flex items-center gap-1" aria-hidden="true">
            Less
            {RAMP.map((c) => (
              <span key={c} className="size-[9px] rounded-[2px]" style={{ background: c }} />
            ))}
            More
          </span>
        </div>
      )}
    </section>
  )
}

const gridClass = "mx-auto grid w-max grid-flow-col grid-rows-[repeat(7,9px)] auto-cols-[9px] gap-[3px]"

function Grid({ days, year, total }: { days: ContributionDay[]; year: number; total: number }) {
  // Place each day explicitly: column = week of the year, row = weekday. Handles partial first/last weeks.
  const firstWeekday = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0
  return (
    <div role="img" aria-label={`${total} GitHub contributions in ${year}`} className={gridClass}>
      {days.map((d, i) => {
        const slot = i + firstWeekday
        return (
          <span
            key={d.date}
            title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
            className="rounded-[2px]"
            style={{ gridColumn: Math.floor(slot / 7) + 1, gridRow: (slot % 7) + 1, background: RAMP[d.level] }}
          />
        )
      })}
    </div>
  )
}

function EmptyGrid() {
  return (
    <div aria-hidden="true" className={gridClass}>
      {Array.from({ length: EMPTY_WEEKS * 7 }, (_, i) => (
        <span key={i} className="rounded-[2px] bg-well" />
      ))}
    </div>
  )
}
