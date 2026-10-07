import type { ContributionDay, ContributionYear } from "@/lib/contributions"

export type { ContributionDay, ContributionYear }

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

type CalendarResponse = {
  data?: {
    user: Record<
      string,
      {
        contributionCalendar: {
          totalContributions: number
          weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[]
        }
      }
    > | null
  }
  errors?: { message: string }[]
}

// One GraphQL request for every year (contributionsCollection spans at most one year).
// Returns null without a token or on any failure, so the section falls back to its placeholder.
export async function getContributions(login: string, years: number[]): Promise<ContributionYear[] | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  const now = new Date().toISOString()
  const fields = years
    .map((y) => {
      const to = y === new Date().getUTCFullYear() ? now : `${y}-12-31T23:59:59Z`
      return `y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${to}") {
        contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } }
      }`
    })
    .join("\n")

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: `query($login: String!) { user(login: $login) { ${fields} } }`, variables: { login } }),
      next: { revalidate: 86400 },
    })
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`)
    const json = (await res.json()) as CalendarResponse
    if (json.errors?.length || !json.data?.user) throw new Error(json.errors?.[0]?.message ?? "user not found")
    const user = json.data.user

    return years.map((year) => {
      const cal = user[`y${year}`].contributionCalendar
      return {
        year,
        total: cal.totalContributions,
        days: cal.weeks.flatMap((w) =>
          w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVELS[d.contributionLevel] ?? 0 })),
        ),
      }
    })
  } catch (err) {
    console.warn("[contributions] falling back to placeholder:", err)
    return null
  }
}
