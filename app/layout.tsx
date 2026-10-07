import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Geist_Mono } from "next/font/google"
import { preload } from "react-dom"
import { Analytics } from "@vercel/analytics/next"
import { CalEmbed } from "@/components/CalEmbed"
import { JsonLd } from "@/components/JsonLd"
import { site, socials } from "@/content/site"
import { siteUrl } from "@/lib/site-url"
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

const xHandle = socials.find((s) => s.icon === "x")?.href?.split("/").pop()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    url: "/",
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    firstName: site.name.split(" ")[0],
    lastName: site.name.split(" ").slice(1).join(" "),
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    ...(xHandle && { creator: `@${xHandle}` }),
  },
  // Paste the content value from Search Console / Bing Webmaster Tools into these env vars to verify ownership.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
}

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Every avatar frame comes from this one sheet; fetch it early so the first swap doesn't flash.
  preload("/sprites/tanishq-sprites.webp", { as: "image", type: "image/webp", fetchPriority: "high" })

  return (
    <html lang="en" className={`${satoshi.variable} ${geistMono.variable}`}>
      <body>
        <JsonLd />
        <CalEmbed />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
