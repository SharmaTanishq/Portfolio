"use client"

import { useEffect, useState } from "react"
import { FRAMES, HERO_AVATAR_ID, framePosition } from "./sprite"
import { nav, site } from "@/content/site"

// A section is active while it crosses a line 35% down the viewport.
// At the very bottom of the page, the last section wins, since it may never reach the line.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
        .sort((a, b) => a.offsetTop - b.offsetTop)

      let current: string | null = null
      for (const el of sections) {
        const r = el.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) current = el.id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom && sections.length) current = sections[sections.length - 1].id
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids])

  return active
}

const ids = nav.map((n) => n.id)

// True once the hero avatar has scrolled under the sticky nav.
function useHeroAvatarHidden() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const avatar = document.getElementById(HERO_AVATAR_ID)
    if (!avatar) return
    const observer = new IntersectionObserver(([entry]) => setHidden(!entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    })
    observer.observe(avatar)
    return () => observer.disconnect()
  }, [])

  return hidden
}

export function Nav() {
  const active = useActiveSection(ids)
  const showSprite = useHeroAvatarHidden()

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/92 backdrop-blur-md">
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between">
        {/* The wordmark hands over to the avatar once the hero one is out of view. */}
        <a href="#top" className="relative block h-[45px] w-[36px] hover:text-accent" aria-label="Back to top">
          <span
            aria-hidden="true"
            className={`absolute inset-0 flex items-center text-[22px] font-medium italic tracking-tight motion-safe:transition-[opacity,translate] motion-safe:duration-300 ${
              showSprite ? "-translate-y-2 opacity-0" : "opacity-100"
            }`}
          >
            ts.
          </span>
          <span
            aria-hidden="true"
            className={`sprite absolute inset-0 motion-safe:transition-[opacity,translate] motion-safe:duration-300 ${
              showSprite ? "opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ backgroundPosition: framePosition(FRAMES.default) }}
          />
        </a>
        <ul className="hidden gap-[22px] text-sm sm:flex">
          {nav.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`underline-offset-[6px] transition-colors hover:text-accent ${
                    isActive ? "text-ink underline decoration-accent decoration-[1.5px]" : "text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-sm font-medium text-bg transition-colors hover:bg-accent"
        >
          Work with me
        </a>
      </nav>
    </header>
  )
}
