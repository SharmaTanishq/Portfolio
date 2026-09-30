import { Icon } from "@/components/Icon"
import { interests } from "@/content/interests"
import { socials } from "@/content/site"

export function Interests() {
  return (
    <section aria-label="Interests" className="wrap pt-4 pb-10">
      <ul className="flex list-disc flex-col gap-1.5 pl-5 text-ink-2">
        {interests.map((i) => (
          <li key={i.label}>
            <span className="text-muted">{i.label}:</span> {i.value}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Socials() {
  return (
    <section aria-label="Elsewhere" className="wrap pb-14">
      <ul className="flex flex-wrap gap-2.5 text-sm">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              {...(s.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-chip bg-surface px-4 transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name={s.icon} />
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
