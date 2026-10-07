import Image from "next/image"

import { FRAMES, framePosition } from "@/components/sprite"
import { CtaButtons } from "@/components/CtaButtons"
import { footer, site } from "@/content/site"

export function Footer() {
  return (
    <footer className="wrap pt-14 pb-12">
      <div className="group relative flex flex-col items-start gap-5 overflow-hidden rounded-[20px] bg-accent-tint px-6 py-8 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-9">
        <div
          role="img"
          aria-label="Tanishq waving"
          className="sprite h-[120px] w-[96px] shrink-0"
          style={{ backgroundPosition: framePosition(FRAMES.wave) }}
        />
        <div className="flex flex-col items-start gap-3 sm:pr-[60px]">
          <h2 className="text-[28px] leading-[1.15] font-medium tracking-[-0.02em] sm:text-[32px]">{footer.heading}</h2>
          <p className="text-ink-2">{footer.body}</p>
          <CtaButtons tooltipSide="top" />
        </div>
        {/* Peeks from the right edge, leaning further in on hover. Hidden on mobile, where there is no hover. */}
        <div
          aria-hidden="true"
          className="sprite absolute right-[-22px] bottom-0 hidden h-[100px] w-[80px] sm:block motion-safe:transition-transform motion-safe:duration-[350ms] motion-safe:ease-out group-hover:-translate-x-[18px]"
          style={{ backgroundPosition: framePosition(FRAMES.peek) }}
        />
      </div>

      {/* Breaks out of the column. Multiply drops the paper white into the page background,
          and the mask feathers the painting's edges so it has no visible border. */}
      <div className="relative left-1/2 mt-8 w-[min(1000px,100vw)] -translate-x-1/2">
        <Image
          src={footer.artwork.src}
          width={footer.artwork.width}
          height={footer.artwork.height}
          alt={footer.artwork.alt}
          sizes="(min-width: 1000px) 1000px, 100vw"
          className="h-auto w-full mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_75%)]"
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-3 font-mono text-[13px] text-muted">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{footer.signoff}</span>
      </div>
    </footer>
  )
}
