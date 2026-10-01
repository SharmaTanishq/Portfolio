import { Icon } from "@/components/Icon"
import { caseStudy } from "@/content/work"

export function Work() {
  const body = (
    <>
      {/* Thumbnail hidden until there's a real case study to show.
      <div className="flex h-[200px] items-center justify-center bg-accent-tint font-mono text-[13px] text-accent sm:h-[240px]">
        {caseStudy.thumbnail}
      </div>
      */}
      <div className="flex flex-col gap-2.5 p-[22px]">
        <div className="flex items-center gap-2.5 text-sm text-muted">
          <span
            aria-hidden="true"
            className="flex size-6 items-center justify-center rounded-md bg-ink text-[11px] font-bold text-bg"
          >
            {caseStudy.initial}
          </span>
          <span>
            {caseStudy.client} · {caseStudy.role} · {caseStudy.year}
          </span>
        </div>
        <h3 className="text-[26px] leading-[1.2] font-medium tracking-[-0.02em]">{caseStudy.title}</h3>
        <p className="text-muted">{caseStudy.summary}</p>
        <span className="inline-flex items-center gap-1.5 font-medium text-accent">
          {caseStudy.href ? "Read case study" : ""}
          {caseStudy.href && <Icon name="arrow" size={14} strokeWidth={2} />}
        </span>
      </div>
    </>
  )

  const card = "flex flex-col overflow-hidden rounded-[18px] border border-line bg-surface"

  return (
    <section aria-labelledby="work-heading" className="wrap pt-6 pb-12">
      <h2 id="work-heading" className="label mb-6">
        Work
      </h2>
      {caseStudy.href ? (
        <a href={caseStudy.href} className={`${card} transition-colors hover:border-accent`}>
          {body}
        </a>
      ) : (
        <article className={card}>{body}</article>
      )}
    </section>
  )
}
