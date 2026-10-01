"use client"

import { useEffect, useRef, useState } from "react"
import { FRAMES, HERO_AVATAR_ID, framePosition, type Frame } from "./sprite"

const FACES: Frame[] = [
  [0, 0], [1, 1], [1, 5], [2, 0], [3, 3], [5, 1],
  [5, 2], [1, 4], [4, 1], [3, 5], [2, 2], [4, 5],
]
const BLINK_EVERY = 4200
const BLINK_FOR = 160
// Back to the resting face after the pointer has been still this long.
const GAZE_IDLE = 2500

type Gaze = "center" | "left" | "right" | "up" | "down"
const GAZE_FRAMES: Record<Exclude<Gaze, "center">, Frame> = {
  left: FRAMES.lookLeft,
  right: FRAMES.lookRight,
  up: FRAMES.lookUp,
  down: FRAMES.lookDown,
}

// Looks along whichever axis the pointer is further out on. Close to the avatar it looks straight ahead.
function gazeFor(rect: DOMRect, x: number, y: number): Gaze {
  const dx = x - (rect.left + rect.width / 2)
  const dy = y - (rect.top + rect.height / 2)
  if (Math.abs(dx) < rect.width * 0.6 && Math.abs(dy) < rect.height * 0.6) return "center"
  if (Math.abs(dx) >= Math.abs(dy)) return dx < 0 ? "left" : "right"
  return dy < 0 ? "up" : "down"
}

export function Avatar() {
  const [face, setFace] = useState(0)
  const [hover, setHover] = useState(false)
  const [blink, setBlink] = useState(false)
  const [gaze, setGaze] = useState<Gaze>("center")
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let timeout: number | undefined
    const interval = window.setInterval(() => {
      if (reduced.matches) return
      setBlink(true)
      timeout = window.setTimeout(() => setBlink(false), BLINK_FOR)
    }, BLINK_EVERY)
    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [])

  // Follow the pointer on devices that have one. Skipped for reduced motion, like the blink.
  useEffect(() => {
    const canFollow = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!canFollow || reduced) return

    let frame = 0
    let idle: number | undefined
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = button.current?.getBoundingClientRect()
        if (rect) setGaze(gazeFor(rect, e.clientX, e.clientY))
      })
      window.clearTimeout(idle)
      idle = window.setTimeout(() => setGaze("center"), GAZE_IDLE)
    }
    const onLeave = () => setGaze("center")

    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(idle)
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  // Wave, blink and gaze only apply on the resting face, so clicked expressions stay put.
  let frame = FACES[face]
  if (face === 0 && hover) frame = FRAMES.wave
  else if (face === 0 && gaze !== "center") frame = GAZE_FRAMES[gaze]
  else if (face === 0 && blink) frame = FRAMES.blink

  return (
    <button
      ref={button}
      id={HERO_AVATAR_ID}
      type="button"
      aria-label="Tap to change Tanishq's expression"
      title="Tap me"
      onClick={() => setFace((f) => (f + 1) % FACES.length)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="group h-[160px] w-[128px] shrink-0 cursor-pointer rounded-lg focus-visible:outline-offset-4"
    >
      <span
        aria-hidden="true"
        className="sprite block h-[160px] w-[128px] motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-[3px] motion-safe:group-hover:-rotate-2"
        style={{ backgroundPosition: framePosition(frame) }}
      />
    </button>
  )
}
