import { bookshelf } from "@/content/bookshelf"
import { builds } from "@/content/builds"
import { stack } from "@/content/stack"
import { talks } from "@/content/talks"
import { writings } from "@/content/writings"

function Heading({ id, children, className = "mb-6" }: { id: string; children: string; className?: string }) {
  return (
    <h2 id={`${id}-heading`} className={`label ${className}`}>
      {children}
    </h2>
  )
}

export function Builds() {
  return (
    <section id="builds" aria-labelledby="builds-heading" className="wrap pt-6 pb-12">
      <Heading id="builds">Builds</Heading>
      <ul className="flex flex-col border-t border-line">
        {builds.map((b) => {
          const inner = (
            <>
              <div className="flex flex-col gap-1">
                <span className="font-medium">{b.name}</span>
                <span className="text-sm text-muted">{b.body}</span>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted">
                {b.tags}
                {b.href && " ↗"}
              </span>
            </>
          )
          const row = "flex items-start justify-between gap-4 border-b border-line py-[18px]"
          return (
            <li key={b.name}>
              {b.href ? (
                <a href={b.href} target="_blank" rel="noopener noreferrer" className={`${row} group hover:text-accent`}>
                  {inner}
                </a>
              ) : (
                <div className={row}>{inner}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function Writings() {
  return (
    <section id="writings" aria-labelledby="writings-heading" className="wrap pt-6 pb-12">
      <Heading id="writings">Writings</Heading>
      <ul className="flex flex-col border-t border-line">
        {writings.map((w, i) => (
          <li key={i} className="flex justify-between gap-4 border-b border-line py-4">
            <span>{w.title}</span>
            <span className="shrink-0 font-mono text-xs text-muted">{w.date}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Talks() {
  return (
    <section id="talks" aria-labelledby="talks-heading" className="wrap pt-6 pb-12">
      <Heading id="talks">Talks</Heading>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {talks.map((t, i) => (
          <li key={i} className="flex flex-col gap-2.5 rounded-[14px] border border-line bg-surface p-3.5">
            <div className="flex h-[130px] items-center justify-center rounded-lg bg-well font-mono text-xs text-muted">
              {t.cover}
            </div>
            <span className="font-medium">{t.title}</span>
            <span className="text-[13px] text-muted">{t.event}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Stack() {
  return (
    <section aria-labelledby="stack-heading" className="wrap pt-6 pb-12">
      <Heading id="stack" className="mb-5">
        Stack
      </Heading>
      <ul className="flex flex-wrap gap-2 text-sm">
        {stack.map((s) => (
          <li key={s} className="rounded-lg border border-chip bg-surface px-3 py-1.5">
            {s}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Bookshelf() {
  return (
    <section id="bookshelf" aria-labelledby="bookshelf-heading" className="wrap pt-6 pb-12">
      <Heading id="bookshelf" className="mb-5">
        Bookshelf
      </Heading>
      <div className="flex h-[150px] items-end gap-1.5 border-b-[3px] border-ink px-3">
        {bookshelf.spines.map((s, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="shrink-0 rounded-t-[3px]"
            style={{ width: s.width, height: s.height, background: s.color }}
          />
        ))}
        <span className="ml-4 self-center font-mono text-xs text-muted">{bookshelf.placeholder}</span>
      </div>
    </section>
  )
}
