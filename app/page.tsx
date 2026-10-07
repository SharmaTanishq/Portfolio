import { Contributions } from "@/components/Contributions"
import { Nav } from "@/components/Nav"
import { Employment } from "@/components/sections/Employment"
import { Experiences } from "@/components/sections/Experiences"
import { Footer } from "@/components/sections/Footer"
import { Hero } from "@/components/sections/Hero"
import { Interests, Socials } from "@/components/sections/Intro"
import { Bookshelf, Builds, Stack, Talks, Writings } from "@/components/sections/Lists"
import { Work } from "@/components/sections/Work"
import { employment } from "@/content/experience"
import { site } from "@/content/site"
import { getContributions } from "@/lib/github"
import { getGitlabContributions, isGitlabConfigured, isGitlabEnabled } from "@/lib/gitlab"

// Rebuild daily: refreshes GitHub and GitLab contributions, and the tenure on each role.
export const revalidate = 86400

export default async function Home() {
  const thisYear = new Date().getUTCFullYear()
  const years = Array.from({ length: thisYear - site.contributionsFrom + 1 }, (_, i) => thisYear - i)
  const skillnet = employment.find((job) => job.name.startsWith("Skillnet"))
  const showGitlab = isGitlabEnabled()
  const gitlabConfigured = isGitlabConfigured()
  const [github, gitlab] = await Promise.all([
    getContributions(site.githubUser, years),
    showGitlab ? getGitlabContributions([thisYear]) : Promise.resolve(null),
  ])

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Employment />
        <Interests />
        <Socials />
        <Contributions
          years={years}
          sources={[
            { id: "github", title: "GitHub", data: github, missing: "SET GITHUB_TOKEN" },
            ...(showGitlab
              ? [
                  {
                    id: "gitlab",
                    title: site.gitlab.label,
                    detail: site.gitlab.place,
                    since: skillnet?.start,
                    data: gitlab,
                    missing: gitlabConfigured ? "COULD NOT REACH GITLAB" : "SET GITLAB_URL AND GITLAB_TOKEN",
                  },
                ]
              : []),
          ]}
        />
        <Experiences />
        <Work />
        <Builds />
        {/* <Writings /> */}
        {/* <Talks /> */}
        <Stack />
        <Bookshelf />
      </main>
      <Footer />
    </>
  )
}
