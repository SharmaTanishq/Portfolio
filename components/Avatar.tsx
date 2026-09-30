"use client"

import { useEffect, useState } from "react"
import { FRAMES, HERO_AVATAR_ID, framePosition, type Frame } from "./sprite"

const FACES: Frame[] = [
  [0, 0], [1, 1], [1, 5], [2, 0], [3, 3], [5, 1],
  [5, 2], [1, 4], [4, 1], [3, 5], [2, 2], [4, 5],
]
const BLINK_EVERY = 4200
const BLINK_FOR = 160

export function Avatar() {
  const [face, setFace] = useState(0)
  const [hover, setHover] = useState(false)
  const [blink, setBlink] = useState(false)

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

  // Wave and blink only apply on the resting face, so clicked expressions stay put.
  let frame = FACES[face]
  if (face === 0 && hover) frame = FRAMES.wave
  else if (face === 0 && blink) frame = FRAMES.blink

  return (
    <button
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
