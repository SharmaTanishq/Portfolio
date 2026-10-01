import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Geist_Mono } from "next/font/google"
import { preload } from "react-dom"
import { site } from "@/content/site"
import "./globals.css"

const satoshi = localFont({
  src: [
    // Variable upright (300-900) so KineticText can animate weight; italic is only used at 400.
    { path: "./fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "./fonts/Satoshi-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
})

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.tagline,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: site.title,
    description: site.tagline,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.tagline },
}

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Every avatar frame comes from this one sheet; fetch it early so the first swap doesn't flash.
  preload("/sprites/tanishq-sprites.webp", { as: "image", type: "image/webp", fetchPriority: "high" })

  return (
    <html lang="en" className={`${satoshi.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
