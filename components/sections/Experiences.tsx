import { impact, roles } from "@/content/experience"

export function Experiences() {
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

      <div className="flex flex-col gap-9">
        {roles.map((role) => (
          <article key={role.company} className="flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-[26px] leading-tight font-medium tracking-[-0.02em]">{role.company}</h3>
              <span className="font-mono text-[13px] text-muted">{role.meta}</span>
            </div>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-ink-2">
              {role.points.map((p) => (
                <li key={p.text}>
                  {p.lead && <strong className="font-medium text-ink">{p.lead}</strong>} {p.text}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
