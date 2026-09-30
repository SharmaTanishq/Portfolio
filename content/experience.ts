// Employment timeline, impact stats and role write-ups.
// Facts come from design-handoff/resumes/*.pdf. Anything in [SQUARE BRACKETS] is a placeholder waiting on Tanishq.

export type YearMonth = { year: number; month: number } // month is 1–12

export type Employer = {
  name: string
  role: string
  initial: string
  tile: "ink" | "green" | "sand"
  start: YearMonth
  end: YearMonth | null // null = present
  clients?: { name: string; note: string }[]
}

export const employment: Employer[] = [
  {
    name: "Skillnet Solutions, USA",
    role: "Senior Full Stack Engineer",
    initial: "S",
    tile: "ink",
    start: { year: 2023, month: 1 },
    end: null,
    clients: [
      { name: "Wilco", note: "search and in-store kiosks" },
      { name: "Fleet Farm", note: "checkout and order notifications" },
    ],
  },
  {
    name: "Maharshi Tech Solutions",
    role: "Software Engineer",
    initial: "M",
    tile: "green",
    start: { year: 2022, month: 1 },
    end: { year: 2022, month: 12 },
  },
  {
    name: "DMI, India",
    role: "Software Engineer",
    initial: "D",
    tile: "sand",
    start: { year: 2021, month: 1 },
    end: { year: 2021, month: 12 },
  },
]

export const impact = [
  {
    stat: "70%",
    title: "Faster kiosk search",
    body: "~5s to ~1.5s on Wilco by dropping unused facet aggregations and tightening query shape.",
  },
  {
    stat: "0",
    title: "Rollbacks at go-live",
    body: "Wrote the 40+ item readiness checklist (cutover, rollback, data validation, smoke tests) the team launched on.",
  },
  {
    stat: "~25%",
    title: "Fewer order-status tickets",
    body: "Transactional email integration for Fleet Farm covering 100% of online orders.",
  },
  {
    stat: "15 min",
    title: "P1 acknowledgment SLA",
    body: "Daily on-call for storefronts and in-store kiosks, resolving incidents within agreed SLAs.",
  },
]

// `lead` renders as a bold inline prefix on the bullet.
export const roles: { company: string; meta: string; points: { lead?: string; text: string }[] }[] = [
  {
    company: "Skillnet Solutions",
    meta: "Senior Full Stack Engineer · 2023 – now",
    points: [
      {
        text: "Own CI/CD for the platform monorepo end to end. Led the migration to a new CI provider, with automated checks and promotion across develop, staging and production.",
      },
      {
        text: "Take integrations from design to production without a dedicated ops team: NestJS/Node.js APIs, Vue/Nuxt and Angular UIs, GitLab CI/CD to AWS.",
      },
      {
        text: "Run event-driven workflows on RabbitMQ with PostgreSQL/MySQL (Aurora/RDS) and Redis, including production-safe schema changes via Knex migrations.",
      },
      {
        lead: "Wilco.",
        text: "Restored service in two production search outages (circuit-breaker errors, and a schema drift that broke every text filter), then added a guard that blocks unsafe schema changes. Enabled search by store item number, turning empty results into exact SKU matches.",
      },
      {
        lead: "Fleet Farm.",
        text: "Built order confirmation, shipping and pickup-ready emails, and integrated real-time sales tax into checkout, eliminating tax-related order corrections.",
      },
    ],
  },
  {
    company: "Maharshi Tech Solutions",
    meta: "Software Engineer · 2022",
    points: [
      {
        text: "TypeScript/Node.js services and async pipelines with retries and fault tolerance that kept data flowing when downstream partners failed.",
      },
      {
        text: "Added structured logging and monitoring that shortened production debugging, and coached junior engineers on code quality and operability.",
      },
    ],
  },
  {
    company: "DMI",
    meta: "Software Engineer · 2021",
    points: [
      {
        text: "Backend services and data-sync pipelines for high-volume systems, built around performance, retries and consistent error handling.",
      },
    ],
  },
]
