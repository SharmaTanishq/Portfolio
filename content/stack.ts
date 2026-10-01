import type { StackIconName } from "@/components/StackIcon"

// Stack grid, in display order. 18 items fill 6 columns on desktop and 3 on mobile.
export const stack: { name: string; icon: StackIconName }[] = [
  { name: "TypeScript", icon: "typescript" },
  { name: "Python", icon: "python" },
  { name: "Node.js", icon: "nodejs" },
  { name: "NestJS", icon: "nestjs" },
  { name: "Next.js", icon: "nextjs" },
  { name: "React", icon: "react" },
  { name: "Vue", icon: "vue" },
  { name: "Nuxt", icon: "nuxt" },
  { name: "Angular", icon: "angular" },
  { name: "GraphQL", icon: "graphql" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Redis", icon: "redis" },
  { name: "OpenSearch", icon: "opensearch" },
  { name: "RabbitMQ", icon: "rabbitmq" },
  { name: "AWS", icon: "aws" },
  { name: "Kubernetes", icon: "kubernetes" },
  { name: "Terraform", icon: "terraform" },
  { name: "LLMs · Agents", icon: "llm" },
]
