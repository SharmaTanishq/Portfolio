import { employment, type Employer } from "@/content/experience"
import { formatTenure } from "@/lib/tenure"

const TILES: Record<Employer["tile"], string> = {
  ink: "bg-ink text-bg",
  green: "bg-accent-tint text-accent",
  sand: "bg-[#ECE7DC] text-[#6B5A3A]",
}

export function Employment() {
  return (
    <section aria-label="Employment" className="wrap pt-6 pb-10">
      <ol className="flex flex-col border-t border-line">
        {employment.map((job) => (
          <li key={job.name} className="flex flex-col gap-2.5 border-b border-line py-5">
            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  className={`flex size-9 shrink-0 items-center justify-center rounded-[9px] text-sm font-bold ${TILES[job.tile]}`}
                >
                  {job.initial}
                </span>
                <div className="flex flex-col">
                  <span className="font-medium">{job.name}</span>
                  <span className="text-sm text-muted">{job.role}</span>
                </div>
              </div>
              <span className="font-mono text-[13px] text-muted">{formatTenure(job.start, job.end)}</span>
            </div>
            {job.clients && (
              <ul className="ml-[50px] flex flex-col gap-1 border-l border-dashed border-[#D3D1C8] pl-3.5 text-sm text-muted">
                {job.clients.map((c) => (
                  <li key={c.name}>
                    <span className="text-ink">{c.name}</span> · {c.note}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
