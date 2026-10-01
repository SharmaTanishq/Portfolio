"use client"

import { useMemo, useState } from "react"
import { emptyActivityYear, GitHubActivityGrid } from "@/components/ui/github-activity-grid"
import type { ContributionYear } from "@/lib/github"

type Props = {
  years: number[] // newest first
  data: ContributionYear[] | null
}

export function Contributions({ years, data }: Props) {
  const [year, setYear] = useState(years[0])
  const current = data?.find((d) => d.year === year) ?? null
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

      <GitHubActivityGrid
        days={current?.days ?? blank}
        caption={`in ${year}`}
        placeholder={
          current ? undefined : (
            <span className="rounded-lg border border-dashed border-dash bg-surface px-3 py-1.5 text-center font-mono text-xs text-muted">
              [GITHUB CONTRIBUTIONS FOR {year}: SET GITHUB_TOKEN]
            </span>
          )
        }
      />
    </section>
  )
}
