import { Timeline, type TimelineRow } from "@/components/Timeline"
import { employment, impact } from "@/content/experience"
import { formatTenure } from "@/lib/tenure"

export function Experiences() {
  // Tenure is worked out on the server so it reflects the build date and the client never recomputes it.
  const rows: TimelineRow[] = employment.map((job) => ({
    id: job.name,
    name: job.name,
    role: job.role,
    logo: job.logo,
    points: job.points,
    tenure: formatTenure(job.start, job.end),
  }))

  return (
    <section id="experience" aria-labelledby="experience-heading" className="wrap pt-6 pb-12">
      <h2 id="experience-heading" className="label mb-6">
        Experiences
      </h2>

      <ul className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {impact.map((item) => (
          <li key={item.title} className="flex flex-col gap-1.5 rounded-2xl border border-line bg-surface p-[22px]">
            <span className="text-[40px] leading-none font-medium tracking-[-0.03em] text-accent">{item.stat}</span>
            <span className="font-medium">{item.title}</span>
            <span className="text-sm text-muted">{item.body}</span>
          </li>
        ))}
      </ul>

      <Timeline rows={rows} defaultOpen={rows[0]?.id} />
    </section>
  )
}
