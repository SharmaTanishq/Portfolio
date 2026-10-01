import type { MetadataRoute } from "next"
import { site } from "@/content/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#F7F6F2",
    theme_color: "#F7F6F2",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  }
}
