import { Tooltip } from "@/components/motion/tooltip"
import { employment } from "@/content/experience"
import { formatTenure } from "@/lib/tenure"

// "I've worked for:" logo row. Each tile names the company, role and tenure on hover or focus.
// Tenure is worked out here, on the server, so it reflects the build date.
export function Employment() {
  return (
    <section aria-label="Employment" className="wrap pt-6 pb-10">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-line py-4">
        <span className="text-sm text-muted">I&apos;ve worked for:</span>
        <ul className="flex flex-wrap gap-2">
          {employment.map((job) => (
            <li key={job.name} className="flex">
              <Tooltip
                className="px-3 py-2"
                content={
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-ink">{job.name}</span>
                    <span className="font-normal text-muted">{job.role}</span>
                    <span className="font-normal text-muted">{formatTenure(job.start, job.end)}</span>
                  </span>
                }
              >
                <span
                  tabIndex={0}
                  role="img"
                  aria-label={job.name}
                  className="flex size-7 items-center justify-center rounded-[7px] border border-line bg-surface p-[5px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- tiny static marks, nothing for next/image to optimise */}
                  <img src={job.logo} alt="" width={16} height={16} className="size-full object-contain" />
                </span>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
