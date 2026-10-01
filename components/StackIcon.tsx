import { Cloud, Sparkles } from "lucide-react"
import {
  siAngular,
  siGraphql,
  siKubernetes,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siOpensearch,
  siPostgresql,
  siPython,
  siRabbitmq,
  siReact,
  siRedis,
  siTerraform,
  siTypescript,
  siVuedotjs,
} from "simple-icons"

// Monochrome marks from Simple Icons; they inherit currentColor so the grid stays on-palette.
// Simple Icons has no AWS mark, so AWS and LLMs fall back to Lucide glyphs.
const BRAND_PATHS = {
  typescript: siTypescript.path,
  python: siPython.path,
  nodejs: siNodedotjs.path,
  nestjs: siNestjs.path,
  nextjs: siNextdotjs.path,
  react: siReact.path,
  vue: siVuedotjs.path,
  nuxt: siNuxt.path,
  angular: siAngular.path,
  graphql: siGraphql.path,
  postgresql: siPostgresql.path,
  redis: siRedis.path,
  opensearch: siOpensearch.path,
  rabbitmq: siRabbitmq.path,
  kubernetes: siKubernetes.path,
  terraform: siTerraform.path,
}

const GLYPHS = { aws: Cloud, llm: Sparkles }

export type StackIconName = keyof typeof BRAND_PATHS | keyof typeof GLYPHS

export function StackIcon({ name, size = 22 }: { name: StackIconName; size?: number }) {
  if (name in GLYPHS) {
    const Glyph = GLYPHS[name as keyof typeof GLYPHS]
    return <Glyph size={size} strokeWidth={1.75} aria-hidden="true" />
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={BRAND_PATHS[name as keyof typeof BRAND_PATHS]} />
    </svg>
  )
}
