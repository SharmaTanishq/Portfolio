import { employment } from "@/content/experience"
import { site, socials } from "@/content/site"
import { stack } from "@/content/stack"
import { siteUrl } from "@/lib/site-url"

// schema.org Person + WebSite, so search engines tie this page to the name and the linked profiles.
export function JsonLd() {
  const current = employment.find((e) => e.end === null)
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: site.name,
        url: siteUrl,
        image: `${siteUrl}/opengraph-image`,
        email: `mailto:${site.email}`,
        jobTitle: site.role,
        description: site.description,
        ...(current && { worksFor: { "@type": "Organization", name: current.name } }),
        knowsAbout: stack.map((s) => s.name),
        sameAs: socials.flatMap((s) => (s.href?.startsWith("http") ? [s.href] : [])),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        description: site.description,
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "en",
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string in the data can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
