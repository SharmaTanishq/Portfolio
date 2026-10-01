import clsx from "clsx"

import { StackIcon } from "@/components/StackIcon"
import { Book } from "@/components/ui/book"
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

// Checkerboard grid with "+" marks on interior intersections. Column counts are fixed
// per breakpoint so each cell's shade and mark can be worked out from its index.
const STACK_COLS = { mobile: 3, desktop: 6 }

function isLast(i: number, cols: number) {
  const lastRow = Math.ceil(stack.length / cols) - 1
  return { col: i % cols === cols - 1, row: Math.floor(i / cols) === lastRow }
}

export function Stack() {
  return (
    <section aria-labelledby="stack-heading" className="wrap pt-6 pb-12">
      <Heading id="stack" className="mb-5">
        Stack
      </Heading>
      <ul className="grid grid-cols-3 gap-px border border-line bg-line sm:grid-cols-6">
        {stack.map((s, i) => {
          const m = isLast(i, STACK_COLS.mobile)
          const d = isLast(i, STACK_COLS.desktop)
          const shadeM = i % 2 === 0
          const shadeD = (Math.floor(i / STACK_COLS.desktop) + i) % 2 === 0
          return (
            <li
              key={s.name}
              className={clsx(
                "group relative flex h-[92px] flex-col items-center justify-center gap-2 text-ink-2 transition-colors duration-200 hover:text-accent",
                shadeM ? "bg-bg" : "bg-surface",
                shadeD ? "sm:bg-bg" : "sm:bg-surface",
              )}
            >
              <StackIcon name={s.icon} />
              <span className="text-[13px] font-medium">{s.name}</span>
              <svg
                aria-hidden="true"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                className={clsx(
                  "absolute -right-[6px] -bottom-[6px] z-10 text-muted",
                  m.col || m.row ? "hidden" : "block",
                  d.col || d.row ? "sm:hidden" : "sm:block",
                )}
              >
                <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
              </svg>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function Bookshelf() {
  return (
    <section id="bookshelf" aria-labelledby="bookshelf-heading" className="wrap pt-6 pb-12">
      <Heading id="bookshelf" className="mb-8">
        Bookshelf
      </Heading>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 [--book-d:28px] [--book-w:132px] sm:grid-cols-3 sm:[--book-d:36px] sm:[--book-w:168px]">
        {bookshelf.map((b) => (
          <li key={b.title} className="group flex flex-col items-center text-center">
            <Book src={b.cover} alt={`Cover of ${b.title}`} />
            <span className="mt-5 max-w-[var(--book-w)] text-sm leading-snug font-medium text-balance">{b.title}</span>
            <span className="mt-0.5 text-[13px] text-muted">{b.author}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
