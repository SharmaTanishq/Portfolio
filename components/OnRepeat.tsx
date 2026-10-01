"use client"

import { Pause, Play } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

import { onRepeat as song } from "@/content/interests"

// Inline song: the album art toggles a 30s preview.
// While the preview plays, an accent underline fills under the title as progress.
export function OnRepeat() {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState({ current: 0, total: 30 })

  function toggle() {
    const a = audio.current
    if (!a) return
    if (a.paused) a.play().catch(() => setPlaying(false))
    else a.pause()
  }

  const progress = time.total ? time.current / time.total : 0

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} a preview of ${song.title}`}
        aria-pressed={playing}
        className="group relative mr-1.5 inline-block size-[22px] -translate-y-px overflow-hidden rounded-[5px] align-middle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Image src={song.art} alt="" width={22} height={22} className="size-full object-cover" />
        <span
          className={`absolute inset-0 flex items-center justify-center bg-ink/45 text-white transition-opacity duration-200 ${
            playing ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          }`}
        >
          {playing ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" />}
        </span>
      </button>
      <span
        className="bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(var(--color-accent), var(--color-accent))",
          backgroundPosition: "0 100%",
          backgroundSize: `${progress * 100}% 1.5px`,
        }}
      >
        {song.title} <span className="text-muted">- {song.artist}</span>
      </span>
      <audio
        ref={audio}
        src={song.preview}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setTime((t) => ({ ...t, current: 0 }))}
        onLoadedMetadata={(e) => {
          const total = e.currentTarget.duration
          if (total) setTime((t) => ({ ...t, total }))
        }}
        onTimeUpdate={(e) => {
          const current = e.currentTarget.currentTime
          setTime((t) => ({ ...t, current }))
        }}
      />
    </>
  )
}
