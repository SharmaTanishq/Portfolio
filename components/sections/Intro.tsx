import { BrandIcon, isBrand } from "@/components/BrandIcon"
import { Icon, type IconName } from "@/components/Icon"
import { Tooltip } from "@/components/motion/tooltip"
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

const pill =
  "inline-flex h-10 items-center gap-2 rounded-full border border-chip bg-surface px-4 font-medium transition-colors"

export function Socials() {
  return (
    <section aria-label="Elsewhere" className="wrap pb-14">
      <ul className="flex flex-wrap gap-2.5 text-sm">
        {socials.map((s) => {
          const icon = isBrand(s.icon) ? (
            <BrandIcon name={s.icon} />
          ) : (
            <span className="text-accent">
              <Icon name={s.icon as IconName} size={15} />
            </span>
          )
          return (
            <li key={s.label}>
              <Tooltip content={s.hint}>
                {s.href ? (
                  <a
                    href={s.href}
                    {...(s.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    className={`${pill} hover:border-accent`}
                  >
                    {icon}
                    {s.label}
                  </a>
                ) : (
                  <span tabIndex={0} className={`${pill} border-dashed text-muted`}>
                    {icon}
                    {s.label}
                  </span>
                )}
              </Tooltip>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
