"use client"

import { useMemo, useState } from "react"
import { emptyActivityYear, GitHubActivityGrid } from "@/components/ui/github-activity-grid"
import type { ContributionYear } from "@/lib/contributions"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export type ContributionSource = {
  id: string
  title: string
  detail?: string
  /** First month of activity. Earlier years get a note instead of an empty grid. */
  since?: { year: number; month: number }
  data: ContributionYear[] | null
  /** Shown in the empty-state placeholder, e.g. "SET GITHUB_TOKEN". */
  missing: string
}

type Props = {
  years: number[] // newest first
  sources: ContributionSource[]
}

export function Contributions({ years, sources }: Props) {
  const [year, setYear] = useState(years[0])
  const blank = useMemo(() => emptyActivityYear(year), [year])

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

      <div className="flex flex-col gap-10">
        {sources.map((source) => {
          const match = source.data?.find((d) => d.year === year) ?? null
          // GitLab is fetched for the current year only, so keep that grid up while the tabs move GitHub.
          const current = match ?? (source.data?.length === 1 ? source.data[0] : null)
          const shownYear = current?.year ?? year
          const beforeStart = match !== null && source.since !== undefined && year < source.since.year
          return (
            <div key={source.id}>
              <h3 className="mb-3 text-[15px] font-medium text-ink">
                {source.title}
                {source.detail ? <span className="font-normal text-muted"> · {source.detail}</span> : null}
              </h3>
              {beforeStart && source.since ? (
                <p className="rounded-2xl border border-line bg-surface px-5 py-4 text-[15px] text-muted">
                  Joined {source.detail ?? source.title} in {MONTHS[source.since.month - 1]} {source.since.year}.
                </p>
              ) : (
                <GitHubActivityGrid
                  source={source.title}
                  days={current?.days ?? blank}
                  caption={`in ${shownYear}`}
                  placeholder={
                    current ? undefined : (
                      <span className="rounded-lg border border-dashed border-dash bg-surface px-3 py-1.5 text-center font-mono text-xs text-muted">
                        [{source.title.toUpperCase()} CONTRIBUTIONS FOR {shownYear}: {source.missing}]
                      </span>
                    )
                  }
                />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
