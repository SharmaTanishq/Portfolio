// Employers (with their role write-ups) and impact stats.
// Facts come from design-handoff/resumes/*.pdf. Anything in [SQUARE BRACKETS] is a placeholder waiting on Tanishq.

export type YearMonth = { year: number; month: number } // month is 1–12

export type Employer = {
  name: string
  role: string
  logo: string // square mark for the timeline tile, in public/logos/
  start: YearMonth
  end: YearMonth | null // null = present
  points: { lead?: string; text: string }[] // `lead` renders as a bold inline prefix
}

export const employment: Employer[] = [
 
  {
    name: "Skillnet Solutions, USA",
    role: "Senior Full Stack Engineer",
    logo: "/logos/skillnet-mark.png",
    start: { year: 2023, month: 1 },
    end: null,
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
    name: "Stealth",
    role: "Full Stack Engineer",
    logo: "/logos/stealth-mark.svg",
    start: { year: 2025, month: 10 },
    end: { year: 2026, month: 8 },
    points: [
      {
        
        text: "Led the agent-assisted call-center flow, embedding the authenticated mms.com storefront in an agent wireframe so agents work in the customer session.",
      },
      {
        text: "Shipped the storefront and agent UI in Next.js and React, with Node.js APIs for auth, session and storefront context.",
      },
      {
        text: "Owned production issues across the agent shell and storefront: auth handoff, embed boundaries, API errors and session continuity.",
      },
      {
        text: "Event-driven pipelines with retries and idempotency for partner and storefront traffic, plus OpenAI calls for classification and summarization.",
      },
    ],
  },
  {
    name: "Maharshi Tech Solutions",
    role: "Software Engineer",
    logo: "/logos/marici-mark.svg",
    start: { year: 2022, month: 1 },
    end: { year: 2022, month: 12 },
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
    name: "DMI, India",
    role: "Software Engineer",
    logo: "/logos/dmi-mark.svg",
    start: { year: 2021, month: 1 },
    end: { year: 2021, month: 12 },
    points: [
      {
        text: "Backend services and data-sync pipelines for high-volume systems, built around performance, retries and consistent error handling.",
      },
    ],
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
