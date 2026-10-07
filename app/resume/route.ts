import { track } from "@vercel/analytics/server"
import { NextResponse } from "next/server"

const RESUME_PATH = "/Tanishq_Sharma_Product_Engineer.pdf"

// Each open is a request, so the count is not cached away.
export const dynamic = "force-dynamic"

// Counts a resume open in Vercel Web Analytics, then shows the PDF in the tab.
export async function GET(request: Request) {
  await track("Resume opened", undefined, { request })

  const destination = new URL(RESUME_PATH, request.url)
  const response = NextResponse.redirect(destination, 307)
  response.headers.set("Cache-Control", "private, no-store")
  return response
}
