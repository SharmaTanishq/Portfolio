import { Avatar } from "@/components/Avatar"
import { KineticText } from "@/components/ui/kinetic-text"
import { site } from "@/content/site"

export function Hero() {
  return (
    <section className="wrap pt-14 pb-10 sm:pt-[88px]">
      <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center">
        <Avatar />
        <div className="flex flex-col gap-1.5">
          <KineticText
            text={site.handle}
            className="text-[52px] leading-none font-medium tracking-[-0.04em] sm:text-[68px]"
          />
          <span className="font-mono text-sm text-muted">
            / {site.name} / <em className="font-sans text-base">noun</em>
          </span>
          <p className="mt-1.5 text-[20px] leading-[1.4] text-ink-2 italic sm:text-[22px]">{site.tagline}</p>
        </div>
      </div>
    </section>
  )
}
