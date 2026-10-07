"use client"

import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

// Adapted from the github-activity-grid registry component: site tokens instead of
// emerald/glass, Satoshi + Geist Mono, UTC dates (server and browser can sit in
// different time zones), and a horizontal scroll instead of shrinking cells to dust
// on narrow screens.

export type ActivityLevel = 0 | 1 | 2 | 3 | 4

export interface ActivityDay {
  /** ISO date (YYYY-MM-DD). */
  date: string
  count: number
  /** GitHub's own quartile. When missing, the level is bucketed from `count`. */
  level?: ActivityLevel
}

export interface GitHubActivityGridProps {
  /** Days, oldest first. */
  days: ActivityDay[]
  /** Count treated as the top level when bucketing. Defaults to the busiest day. */
  maxCount?: number
  /** Words after "N contributions", e.g. "in 2026". */
  caption?: React.ReactNode
  /** Named in the grid's accessible label, e.g. "GitHub" or "GitLab". */
  source?: string
  /** Shown over a blank grid in place of the total and legend (e.g. while data is missing). */
  placeholder?: React.ReactNode
  /** Largest cell size in px. Cells shrink to fit the card, down to `minCellSize`. */
  cellSize?: number
  /** Below this the grid stops shrinking and scrolls sideways instead. */
  minCellSize?: number
  cellGap?: number
  className?: string
}

const LEVEL_BG = ["bg-well", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"] as const
const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""] as const
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const WEEKDAY_LABEL_WIDTH = 24
const WEEKDAY_LABEL_GAP = 6
const TOOLTIP_FALLBACK_WIDTH = 180

type Cell = { day: ActivityDay; index: number } | null

export function GitHubActivityGrid({
  days,
  maxCount,
  caption,
  source = "GitHub",
  placeholder,
  cellSize = 10,
  minCellSize = 8,
  cellGap = 3,
  className,
}: GitHubActivityGridProps) {
  const reduce = useReducedMotion()

  const max = React.useMemo(() => {
    if (typeof maxCount === "number" && maxCount > 0) return maxCount
    return Math.max(1, ...days.map((d) => d.count))
  }, [days, maxCount])

  const levelOf = React.useCallback(
    (day: ActivityDay): ActivityLevel => {
      if (day.level !== undefined) return day.level
      if (day.count <= 0) return 0
      return Math.min(4, Math.ceil((day.count / max) * 4)) as ActivityLevel
    },
    [max],
  )

  // Columns are weeks (Sunday first), padded at both ends so every column has 7 rows.
  const grid = React.useMemo(() => {
    if (days.length === 0) return { weeks: [] as Cell[][], monthLabels: [] as { col: number; label: string }[] }
    const startWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay()
    const flat: Cell[] = [
      ...Array.from({ length: startWeekday }, () => null),
      ...days.map((day, index) => ({ day, index })),
    ]
    while (flat.length % 7 !== 0) flat.push(null)

    const weeks: Cell[][] = []
    for (let i = 0; i < flat.length; i += 7) weeks.push(flat.slice(i, i + 7))

    // A label sits over the first week of each month, skipped if it would crowd the previous one.
    const monthLabels: { col: number; label: string }[] = []
    let lastMonth = -1
    weeks.forEach((week, col) => {
      const first = week.find(Boolean)
      if (!first) return
      const m = new Date(`${first.day.date}T00:00:00Z`).getUTCMonth()
      if (m === lastMonth) return
      lastMonth = m
      const prev = monthLabels[monthLabels.length - 1]
      if (prev && col - prev.col < 3) return
      monthLabels.push({ col, label: MONTHS[m] })
    })
    return { weeks, monthLabels }
  }, [days])

  /* Fit the grid to the card, until cells would get too small to read. */
  const viewportRef = React.useRef<HTMLDivElement | null>(null)
  const [viewportWidth, setViewportWidth] = React.useState(0)

  React.useEffect(() => {
    const node = viewportRef.current
    if (!node) return
    const measure = () => setViewportWidth(node.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const weekCount = grid.weeks.length
  const baseWidth = weekCount * cellSize + Math.max(0, weekCount - 1) * cellGap
  const available = Math.max(0, viewportWidth - WEEKDAY_LABEL_WIDTH - WEEKDAY_LABEL_GAP)
  const scale =
    viewportWidth > 0 && baseWidth > available ? Math.max(available / baseWidth, minCellSize / cellSize) : 1
  const size = cellSize * scale
  const gap = cellGap * scale
  const gridWidth = weekCount * size + Math.max(0, weekCount - 1) * gap

  // When it does have to scroll, start at the most recent week.
  React.useEffect(() => {
    const node = viewportRef.current
    if (node) node.scrollLeft = node.scrollWidth
  }, [days, size])

  /* One tooltip for the whole grid, springing from cell to cell. */
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const tooltipRef = React.useRef<HTMLDivElement | null>(null)
  const tooltipX = useMotionValue(0)
  const tooltipY = useMotionValue(0)
  const springX = useSpring(tooltipX, { stiffness: 480, damping: 40, mass: 0.5 })
  const springY = useSpring(tooltipY, { stiffness: 480, damping: 40, mass: 0.5 })
  const [hover, setHover] = React.useState<ActivityDay | null>(null)

  function onCellEnter(target: Element, day: ActivityDay) {
    const container = containerRef.current
    if (!container) return
    const r = target.getBoundingClientRect()
    const cr = container.getBoundingClientRect()
    // Keep the label inside the card near its left and right edges.
    const half = (tooltipRef.current?.offsetWidth || TOOLTIP_FALLBACK_WIDTH) / 2
    const x = Math.min(Math.max(r.left - cr.left + r.width / 2, half), cr.width - half)
    const y = r.top - cr.top - 6
    tooltipX.set(x)
    tooltipY.set(y)
    // Appear in place the first time rather than flying in from the corner.
    if (!hover) {
      springX.jump(x)
      springY.jump(y)
    }
    setHover(day)
  }

  const total = React.useMemo(() => days.reduce((s, d) => s + d.count, 0), [days])

  return (
    <div
      ref={containerRef}
      onPointerLeave={() => setHover(null)}
      className={cn("relative rounded-2xl border border-line bg-surface p-4 sm:p-5", className)}
    >
      <div
        className={cn(
          "mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2",
          placeholder && "invisible",
        )}
      >
        <p className="text-[15px] font-medium text-ink">
          <span className="tabular-nums">{total.toLocaleString("en-US")}</span>
          <span className="ml-1 font-normal text-muted">contributions{caption ? <> {caption}</> : null}</span>
        </p>
        <Legend />
      </div>

      <div ref={viewportRef} className="no-scrollbar overflow-x-auto pb-1">
        <div
          role="img"
          aria-label={
            placeholder ? "Contribution grid, no data yet" : `${total} ${source} contributions${caption ? ` ${caption}` : ""}`
          }
          className="flex w-max flex-col"
        >
          <div
            aria-hidden="true"
            className="relative mb-1.5 h-3"
            style={{ marginLeft: WEEKDAY_LABEL_WIDTH + WEEKDAY_LABEL_GAP, width: gridWidth }}
          >
            {grid.monthLabels.map((m) => (
              <span
                key={`${m.col}-${m.label}`}
                className="absolute top-0 font-mono text-[10px] leading-3 tracking-[0.04em] text-muted uppercase"
                style={{ left: m.col * (size + gap) }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div aria-hidden="true" className="flex">
            <div className="flex flex-col" style={{ gap, marginRight: WEEKDAY_LABEL_GAP }}>
              {WEEKDAYS.map((wd, i) => (
                <span
                  key={i}
                  className="flex items-center font-mono text-[10px] text-muted"
                  style={{ height: size, width: WEEKDAY_LABEL_WIDTH }}
                >
                  {wd}
                </span>
              ))}
            </div>

            <div className="flex" style={{ gap }}>
              {grid.weeks.map((week, w) => (
                <div key={w} className="flex flex-col" style={{ gap }}>
                  {week.map((cell, d) => {
                    if (!cell) return <span key={`pad-${w}-${d}`} style={{ width: size, height: size }} />
                    const { day, index } = cell
                    // Most recent day pops in first.
                    const delay = (days.length - 1 - index) * 0.002
                    return (
                      <motion.span
                        key={day.date}
                        initial={reduce ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={
                          reduce ? { duration: 0 } : { delay, type: "spring", stiffness: 420, damping: 28, mass: 0.6 }
                        }
                        onPointerEnter={placeholder ? undefined : (e) => onCellEnter(e.currentTarget, day)}
                        className={cn("block rounded-[2px]", LEVEL_BG[levelOf(day)])}
                        style={{ width: size, height: size }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {placeholder ? <div className="absolute inset-0 flex items-center justify-center p-4">{placeholder}</div> : null}

      <motion.div
        ref={tooltipRef}
        aria-hidden="true"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-100%",
          opacity: hover ? 1 : 0,
        }}
        className="pointer-events-none absolute top-0 left-0 z-20 rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] whitespace-nowrap text-ink shadow-[0_6px_20px_-8px_rgba(26,26,24,0.25)] transition-opacity duration-100"
      >
        {hover ? (
          <>
            <span className="tabular-nums">{hover.count}</span> {hover.count === 1 ? "contribution" : "contributions"}
            <span className="ml-1.5 text-muted">· {formatDate(hover.date)}</span>
          </>
        ) : null}
      </motion.div>
    </div>
  )
}

function Legend() {
  return (
    <div aria-hidden="true" className="flex items-center gap-1 font-mono text-[11px] text-muted">
      <span className="mr-0.5">Less</span>
      {LEVEL_BG.map((bg) => (
        <span key={bg} className={cn("size-[10px] rounded-[2px]", bg)} />
      ))}
      <span className="ml-0.5">More</span>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

/** Every day of `year` with no activity, for the empty state. */
export function emptyActivityYear(year: number): ActivityDay[] {
  const days: ActivityDay[] = []
  for (let d = new Date(Date.UTC(year, 0, 1)); d.getUTCFullYear() === year; d.setUTCDate(d.getUTCDate() + 1)) {
    days.push({ date: d.toISOString().slice(0, 10), count: 0, level: 0 })
  }
  return days
}
