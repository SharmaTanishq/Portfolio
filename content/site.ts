// Profile, navigation, links and footer copy.
// Facts come from design-handoff/resumes/*.pdf. Anything in [SQUARE BRACKETS] is a placeholder waiting on Tanishq.

export const site = {
  name: "Tanishq Sharma",
  handle: "tanishq",
  role: "Senior Full Stack Engineer",
  title: "Tanishq Sharma · Software Engineer",
  tagline:
    "Full stack engineer who keeps production boring. Integration-heavy by trade, curious about AI agents by habit.",
  email: "sxtanishq@gmail.com",
  githubUser: "SharmaTanishq",
  contributionsFrom: 2021,
}

export const nav = [
  { id: "writings", label: "Writings" },
  { id: "builds", label: "Builds" },
  { id: "talks", label: "Talks" },
  { id: "experience", label: "Experiences" },
  { id: "bookshelf", label: "Bookshelf" },
]

export const socials = [
  { label: "GitHub", href: "https://github.com/SharmaTanishq", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/tanishqxsharma", icon: "linkedin" },
  { label: "Bridgeflow", href: "https://bridgeflow.app", icon: "bridge" },
  { label: "Email", href: "mailto:sxtanishq@gmail.com", icon: "mail" },
] as const

export const footer = {
  heading: "Got an integration that keeps breaking at 2am?",
  body: "Open to full-time roles in Dublin and remote work that overlaps with EU or MENA hours.",
  artwork: "[FOOTER ARTWORK: A PLACE THAT FEELS LIKE YOURS]",
  signoff: "Built minimal, on purpose.",
}
