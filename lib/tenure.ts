import type { YearMonth } from "@/content/experience"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function currentYearMonth(now = new Date()): YearMonth {
  return { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1 }
}

// Counts both the start and end month, like LinkedIn: Jan–Dec of one year is "1 yr".
export function monthsBetween(start: YearMonth, end: YearMonth) {
  return (end.year - start.year) * 12 + (end.month - start.month) + 1
}

export function formatDuration(months: number) {
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = []
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`)
  if (rest) parts.push(`${rest} ${rest === 1 ? "mo" : "mos"}`)
  return parts.join(" ")
}

export function formatTenure(start: YearMonth, end: YearMonth | null, now = new Date()) {
  const label = (d: YearMonth) => `${MONTHS[d.month - 1]} ${d.year}`
  const to = end ?? currentYearMonth(now)
  return `${label(start)} – ${end ? label(end) : "Present"} · ${formatDuration(monthsBetween(start, to))}`
}
