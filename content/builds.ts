// Side projects. Add `href` to make a row a link.
// Facts come from design-handoff/resumes/*.pdf. Anything in [SQUARE BRACKETS] is a placeholder waiting on Tanishq.

export const builds = [
  {
    name: "Bridgeflow",
    body: "Visual drag-and-drop platform for migrating products, orders and customers between commerce platforms.",
    tags: "Next.js · TS",
    href: "https://bridgeflow.app",
  },
  {
    name: "Personal Assistant Agent",
    body: "Tool use, memory and RAG over notes and docs with Pinecone and pgvector.",
    tags: "LangGraph",
  },
  {
    name: "Calling & SRE Ops Agents",
    body: "Real-time voice and ops agents with streaming responses, tool use and automatic recovery when upstream calls fail.",
    tags: "SSE · WebSockets",
  },
] as { name: string; body: string; tags: string; href?: string }[]
