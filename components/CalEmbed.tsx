"use client"

import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

import { site } from "@/content/site"

async function calApi() {
  const cal = await getCalApi({ namespace: site.cal.namespace })
  cal("ui", {
    theme: "light",
    hideEventTypeDetails: false,
    layout: "month_view",
    styles: { branding: { brandColor: "#2F5D50" } },
  })
  return cal
}

export async function openBooking() {
  const cal = await calApi()
  cal("modal", {
    calLink: site.cal.link,
    config: { layout: "month_view", theme: "light" },
  })
}

// Preloads the embed so the first "Book a call" click opens without a script fetch.
export function CalEmbed() {
  useEffect(() => {
    let cancelled = false

    void (async () => {
      const cal = await calApi()
      if (cancelled) return
      cal("preload", { calLink: site.cal.link })
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
