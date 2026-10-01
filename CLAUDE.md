# Tanishq Sharma · Portfolio

Personal portfolio site for Tanishq Sharma (Senior Full Stack Engineer). Modelled on the structure and feel of https://kothariji.in/: a narrow single column, lots of whitespace, a dictionary-style hero, an employment timeline, and an interactive cartoon avatar.

The repo was cleared to start fresh. Build it from scratch with the stack below.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Static content only for now (no CMS, no DB). All copy lives in `content/`, one `.ts` file per section (`site.ts` for profile/nav/socials/footer, `experience.ts`, `interests.ts`, `work.ts`, `builds.ts`, `writings.ts`, `talks.ts`, `stack.ts`, `bookshelf.ts`). Components import from the file for their section; add new sections the same way.
- Deploy target: Vercel
- Fonts: **Satoshi** for display, body and the italic tagline (Tanishq asked for it over the reference's Newsreader + Geist). Self-hosted from Fontshare in `app/fonts/*.woff2` via `next/font/local`; `assets/Satoshi-Medium.ttf` is for the OG image. Geist Mono (`next/font/google`) stays for labels and dates.

## Source of truth

| File | What it is |
|---|---|
| `design-handoff/reference.html` | The approved design as one working HTML page. Open it in a browser. Match it pixel-for-pixel at 1280px, then make it good at 390px. |
| `design-handoff/assets/tanishq-sprites.webp` | Avatar sprite sheet: 6 cols x 6 rows, each cell 128x160, transparent background. |
| `design-handoff/assets/frames/` | Same 36 frames as individual PNGs, named `r{row}c{col}[-expression].png`. |
| `design-handoff/assets/sprite-sheet-original.png` | Original artwork (white background). Don't use it directly. |
| `design-handoff/resumes/*.pdf` | Where every fact on the site comes from. Don't invent metrics, employers, dates or projects. |

## Design tokens (from the reference)

- Background `#F7F6F2`, surface `#FFFFFF`, text `#1A1A18`, secondary text `#3D3C38`, muted `#5F5E58`
- Borders `#E6E4DD` (dividers), `#DAD8D0` (chips/pills)
- Accent `#2F5D50` (deep green), accent tint `#E3E8E2`
- Content column: `max-width: 720px`, 24px side padding
- Radii: pills 999px, cards 16px, logo tiles 9px
- Section labels: Geist Mono 13px, uppercase, letter-spacing 0.08em, muted
- Mobile breakpoint in the reference: 640px

## Page sections (in order)

1. **Sticky nav**: "ts." wordmark (Newsreader italic), links Writings / Builds / Talks / Experiences / Bookshelf (hidden on mobile), "Work with me" pill that opens `mailto:sxtanishq@gmail.com`
2. **Hero**: avatar on the LEFT, name on the RIGHT. "tanishq" in big Newsreader, then `/ Tanishq Sharma / noun`, then the italic tagline. On mobile the avatar stacks above the name.
3. **Employment timeline**: Skillnet (with Wilco and Fleet Farm as sub-rows), Maharshi, DMI. Tenure is shown like "Jan 2023 – Present · 3 yrs 10 mos". **Work tenure out from the current date at build time; don't hardcode it.**
4. **Interests list** (placeholders marked `[LIKE THIS]`)
5. **Social pills**: GitHub, LinkedIn, Shortico, Email
6. **Contributions**: year tabs 2021 to 2026 plus a GitHub-style heatmap. Currently an empty placeholder grid.
7. **Experiences**: 4 impact stat cards, then role write-ups
8. **Work**: featured case study card (Wilco kiosk search, 5s to 1.5s)
9. **Builds**: Shortico, Personal Assistant Agent, Calling & SRE Ops Agents
10. **Writings**, 11. **Talks**, 12. **Stack** chips, 13. **Bookshelf**
14. **Footer**: CTA card with waving sprite + peeking sprite on hover, artwork slot, © line

## Avatar behaviour (component: `components/Avatar.tsx`)

The sprite is one image. Show a frame via `background-size: 600% 600%` and `background-position: (col*20)% (row*20)%`.

- Default: `r0c0`
- Blinks every ~4.2s: swap to `r5c4` for 160ms (only while idle on the default frame)
- Hover: `r5c0` (wave)
- Click: cycle through `[[0,0],[1,1],[1,5],[2,0],[3,3],[5,1],[5,2],[1,4],[4,1],[3,5],[2,2],[4,5]]`
- Must be a real `<button>` with an aria-label. Respect `prefers-reduced-motion` (no blink, no hover lift).
- Footer uses `r5c0` (wave) static, plus `r5c3` (peek) sliding in from the card's right edge on hover
- Preload the sheet so there's no flash on first swap

## Tasks

1. Scaffold Next.js + Tailwind + TS in this repo. Move the sprites into `public/sprites/`.
2. Port `reference.html` into components. Keep all copy in `content/`.
3. Build `Avatar` as specced above.
4. Mobile fixes the reference does NOT yet handle well at 390px:
   - Contributions heatmap is ~640px wide and gets clipped. Make it scroll horizontally inside its card, or show only the last ~26 weeks on mobile.
   - Footer CTA squeezes the sprite next to the text. Stack it vertically on mobile.
   - Year tabs wrap onto two lines. Make them a horizontally scrollable row.
5. Contributions: fetch real data at build time from the GitHub GraphQL API (`contributionsCollection`, user `SharmaTanishq`, token in `GITHUB_TOKEN` env var), and revalidate daily. Colour ramp: 5 steps of the accent green, level 0 = `#EDEBE5`.
6. Make the nav links scroll to their sections (`#writings`, `#builds`, etc.) and highlight the active one.
7. SEO: metadata, Open Graph image (avatar + name on `#F7F6F2`), favicon from the `r0c0` frame.
8. Lighthouse: aim for 95+ on performance and accessibility (text contrast is already 4.5:1 or better).

## Placeholders waiting on Tanishq (leave them visible, don't make them up)

- Interests: song, book, offline hobby
- Writings: post titles and dates
- Talks: titles, events, slide covers
- Case study: thumbnail image and the real year (2024 is a guess)
- Footer artwork (the reference site ends with a watercolour; this one is open)

## Copy rules

- No em dashes anywhere in the site copy. Use en dashes only for date ranges.
- Keep the voice dry and specific. Numbers only when they come from the resumes.

## Contact

- Email: sxtanishq@gmail.com
- LinkedIn: https://linkedin.com/in/tanishqxsharma
- GitHub: https://github.com/SharmaTanishq
- Shortico: https://shortico-three.vercel.app
