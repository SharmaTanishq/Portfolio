import { FRAMES, framePosition } from "@/components/sprite"
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
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 max-w-full items-center rounded-full bg-ink px-5 font-medium break-all text-bg transition-colors hover:bg-accent"
          >
            {site.email}
          </a>
        </div>
        {/* Peeks from the right edge, leaning further in on hover. Hidden on mobile, where there is no hover. */}
        <div
          aria-hidden="true"
          className="sprite absolute right-[-22px] bottom-0 hidden h-[100px] w-[80px] sm:block motion-safe:transition-transform motion-safe:duration-[350ms] motion-safe:ease-out group-hover:-translate-x-[18px]"
          style={{ backgroundPosition: framePosition(FRAMES.peek) }}
        />
      </div>

      <div className="mt-7 flex h-[120px] items-center justify-center rounded-2xl border border-dashed border-dash px-4 text-center font-mono text-xs text-muted">
        {footer.artwork}
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
