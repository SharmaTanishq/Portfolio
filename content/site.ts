// Profile, navigation, links and footer copy.
// Facts come from design-handoff/resumes/*.pdf. Anything in [SQUARE BRACKETS] is a placeholder waiting on Tanishq.

export const site = {
  name: "Tanishq Sharma",
  handle: "tanishq",
  role: "Senior Full Stack Engineer",
  title: "Tanishq Sharma · Senior Full Stack Engineer",
  tagline:
    "Full stack engineer who keeps production boring. Integration-heavy by trade, curious about AI agents by habit.",
  // Search result snippet and social card text. Google shows roughly the first 155 characters.
  description:
    "Tanishq Sharma is a Senior Full Stack Engineer building integrations, APIs and CI/CD with TypeScript, Node.js, NestJS, Vue and AWS. Open to roles in Dublin and remote.",
  keywords: [
    "Tanishq Sharma",
    "Senior Full Stack Engineer",
    "Full Stack Developer",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Vue",
    "Nuxt",
    "AWS",
    "OpenSearch",
    "AI agents",
    "Dublin",
  ],
  email: "sxtanishq@gmail.com",
  githubUser: "SharmaTanishq",
  contributionsFrom: 2021,
}

// Writings and Talks stay off the nav until those sections are back on the page.
export const nav = [
  // { id: "writings", label: "Writings" },
  { id: "builds", label: "Builds" },
  // { id: "talks", label: "Talks" },
  { id: "experience", label: "Experiences" },
  { id: "bookshelf", label: "Bookshelf" },
]

// `hint` is the tooltip. An entry with no `href` is a placeholder and renders as a plain pill.
export const socials: { label: string; href: string | null; hint: string; icon: string }[] = [
  { label: "GitHub", href: "https://github.com/SharmaTanishq", hint: "github.com/SharmaTanishq", icon: "github" },
  { label: "X", href: "https://x.com/TanishqxShrma", hint: "https://x.com/TanishqxShrma", icon: "x" },
  { label: "LinkedIn", href: "https://linkedin.com/in/tanishqxsharma", hint: "linkedin.com/in/tanishqxsharma", icon: "linkedin" },
  { label: "Shortico", href: "https://shortico-three.vercel.app", hint: "shortico-three.vercel.app", icon: "reel" },
  { label: "Email", href: "mailto:sxtanishq@gmail.com", hint: "sxtanishq@gmail.com", icon: "mail" },
]

export const footer = {
  heading: "Got an integration that keeps breaking at 2am?",
  body: "Open to full-time roles in Dublin and remote work that overlaps with EU or MENA hours.",
  artwork: {
    src: "/desktop_setup.webp",
    width: 2172,
    height: 724,
    alt: "Watercolour of the desk: an ultrawide monitor full of code, a mechanical keyboard, a tablet and a pegboard under purple light.",
  },
  signoff: "Built minimal, on purpose.",
}
