import type { ContributionDay, ContributionYear } from "./contributions"

// Skillnet's GitLab has no public contribution calendar. The events API is the
// supported way to read one user's activity, including private projects the
// token can see. Each event counts once, which is how GitLab's own calendar
// counts a push, merge request, review or comment.
//
// Only the daily totals are returned. Event payloads carry project names and
// commit titles, and those never leave the server.

const PER_PAGE = 100
const MAX_PAGES = 50
const REVALIDATE_SECONDS = 86400

type GitlabEvent = { created_at: string }

export function gitlabLevel(count: number): ContributionDay["level"] {
  if (count <= 0) return 0
  if (count < 10) return 1
  if (count < 20) return 2
  if (count < 30) return 3
  return 4
}

/** `after` is exclusive through the end of that day, so Dec 31 includes Jan 1. */
export function gitlabRange(year: number, today: string): { after: string; before: string } {
  const current = Number(today.slice(0, 4))
  const before = year < current ? `${year + 1}-01-01` : addUtcDays(today, 1)
  return { after: `${year - 1}-12-31`, before }
}

export function yearFromCounts(year: number, counts: ReadonlyMap<string, number>, today: string): ContributionYear {
  const end = year < Number(today.slice(0, 4)) ? `${year}-12-31` : today
  const start = Date.parse(`${year}-01-01T00:00:00Z`)
  const endMs = Date.parse(`${end}T00:00:00Z`)
  const days: ContributionDay[] = []
  let total = 0

  for (let t = start; t <= endMs; t += 86_400_000) {
    const date = new Date(t).toISOString().slice(0, 10)
    const count = counts.get(date) ?? 0
    total += count
    days.push({ date, count, level: gitlabLevel(count) })
  }

  return { year, total, days }
}

export function isGitlabConfigured(): boolean {
  return Boolean(process.env.GITLAB_URL?.trim() && process.env.GITLAB_TOKEN?.trim())
}

// Kill switch. Unset shows the heatmap. GITLAB_CONTRIBUTIONS=false hides it
// and skips the API, including on Vercel after the next deploy.
const GITLAB_OFF = new Set(["0", "false", "off", "no"])

export function isGitlabEnabled(): boolean {
  const flag = process.env.GITLAB_CONTRIBUTIONS?.trim().toLowerCase()
  return !flag || !GITLAB_OFF.has(flag)
}

export async function getGitlabContributions(years: number[]): Promise<ContributionYear[] | null> {
  const token = process.env.GITLAB_TOKEN?.trim()
  const base = gitlabBase(process.env.GITLAB_URL)
  const year = years.length > 0 ? Math.max(...years) : null
  if (!isGitlabEnabled() || !token || !base || year === null) return null

  const today = new Date().toISOString().slice(0, 10)

  try {
    // Numeric id. A username like "tanishq.sharma" 404s: GitLab reads the dot as a format.
    const userId = await gitlabUserId(base, token)
    return [await contributionsForYear(base, token, userId, year, today)]
  } catch (err) {
    const reason = err instanceof Error ? err.message : "request failed"
    console.warn("[gitlab] falling back to placeholder:", reason)
    return null
  }
}

async function contributionsForYear(
  base: string,
  token: string,
  userId: number,
  year: number,
  today: string,
): Promise<ContributionYear> {
  const counts = new Map<string, number>()
  const { after, before } = gitlabRange(year, today)

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const url = new URL(`${base}/api/v4/users/${userId}/events`)
    url.searchParams.set("after", after)
    url.searchParams.set("before", before)
    url.searchParams.set("per_page", String(PER_PAGE))
    url.searchParams.set("page", String(page))
    url.searchParams.set("sort", "desc")

    const res = await gitlabFetch(url, token)
    // Offset pagination gives up past the instance cap. Keep the newer days we already have.
    if ((res.status === 400 || res.status === 405) && page > 1) {
      console.warn(`[gitlab] stopped ${year} at page ${page}: GitLab refused further pages`)
      break
    }
    if (!res.ok) throw new Error(`GitLab responded ${res.status} for ${year}`)

    const contentType = res.headers.get("content-type") ?? ""
    if (!contentType.includes("application/json")) throw new Error(`GitLab responded ${res.status} with a non-JSON body`)

    const json: unknown = await res.json()
    if (!Array.isArray(json)) throw new Error(`GitLab events for ${year} were not a list`)

    for (const event of json) {
      if (!isEvent(event)) continue
      const date = event.created_at.slice(0, 10)
      if (!date.startsWith(String(year))) continue
      counts.set(date, (counts.get(date) ?? 0) + 1)
    }

    const next = res.headers.get("x-next-page")
    if (!next) break
    if (page === MAX_PAGES) {
      console.warn(`[gitlab] stopped ${year} after ${MAX_PAGES} pages`)
      break
    }
  }

  return yearFromCounts(year, counts, today)
}

async function gitlabUserId(base: string, token: string): Promise<number> {
  const fromEnv = process.env.GITLAB_USERNAME?.trim()
  const url = new URL(fromEnv ? `${base}/api/v4/users` : `${base}/api/v4/user`)
  if (fromEnv) url.searchParams.set("username", fromEnv)

  const res = await gitlabFetch(url, token)
  if (!res.ok) throw new Error(`GitLab user responded ${res.status}`)
  const json: unknown = await res.json()
  const record = fromEnv && Array.isArray(json) ? json[0] : json
  if (!record || typeof record !== "object" || !("id" in record) || typeof record.id !== "number") {
    throw new Error("GitLab user was not found")
  }
  return record.id
}

function gitlabFetch(url: URL, token: string): Promise<Response> {
  return fetch(url, {
    headers: { "PRIVATE-TOKEN": token, Accept: "application/json" },
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
    next: { revalidate: REVALIDATE_SECONDS },
  })
}

function gitlabBase(raw: string | undefined): string | null {
  const trimmed = raw?.trim()
  if (!trimmed) return null
  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    return null
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null
  const path = url.pathname.replace(/\/+$/, "").replace(/\/api\/v4$/, "")
  return `${url.origin}${path === "/" ? "" : path}`
}

function addUtcDays(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

function isEvent(value: unknown): value is GitlabEvent {
  return (
    typeof value === "object" &&
    value !== null &&
    "created_at" in value &&
    typeof value.created_at === "string" &&
    /^\d{4}-\d{2}-\d{2}/.test(value.created_at)
  )
}
