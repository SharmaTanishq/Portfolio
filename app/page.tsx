import { Contributions } from "@/components/Contributions"
import { Nav } from "@/components/Nav"
import { Employment } from "@/components/sections/Employment"
import { Experiences } from "@/components/sections/Experiences"
import { Footer } from "@/components/sections/Footer"
import { Hero } from "@/components/sections/Hero"
import { Interests, Socials } from "@/components/sections/Intro"
import { Bookshelf, Builds, Stack, Talks, Writings } from "@/components/sections/Lists"
import { Work } from "@/components/sections/Work"
import { site } from "@/content/site"
import { getContributions } from "@/lib/github"

// Rebuild daily: refreshes GitHub contributions and the tenure shown on each role.
export const revalidate = 86400

export default async function Home() {
  const thisYear = new Date().getUTCFullYear()
  const years = Array.from({ length: thisYear - site.contributionsFrom + 1 }, (_, i) => thisYear - i)
  const contributions = await getContributions(site.githubUser, years)

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Employment />
        <Interests />
        <Socials />
        <Contributions years={years} data={contributions} />
        <Experiences />
        <Work />
        <Builds />
        <Writings />
        <Talks />
        <Stack />
        <Bookshelf />
      </main>
      <Footer />
    </>
  )
}
