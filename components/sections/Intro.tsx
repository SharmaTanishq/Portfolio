import { BrandIcon, isBrand } from "@/components/BrandIcon"
import { Icon, type IconName } from "@/components/Icon"
import { OnRepeat } from "@/components/OnRepeat"
import { Tooltip } from "@/components/motion/tooltip"
import { LinkPreview } from "@/components/ui/link-preview"
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
         <li>
          <span className="text-muted">On repeat:</span> <OnRepeat />
        </li>
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
          const classes = `${pill} hover:border-accent`
          // Pages get a shot of the destination. A mailto has nothing to shoot, so it keeps the address tooltip.
          if (s.href?.startsWith("http")) {
            return (
              <li key={s.label}>
                <LinkPreview
                  url={s.href}
                  caption={s.hint}
                  className={classes}
                  {...(typeof s.preview === "string"
                    ? { isStatic: true as const, imageSrc: s.preview }
                    : { screenshot: s.preview !== false })}
                >
                  {icon}
                  {s.label}
                </LinkPreview>
              </li>
            )
          }
          return (
            <li key={s.label}>
              <Tooltip content={s.hint}>
                {s.href ? (
                  <a
                    href={s.href}
                    {...(s.newTab && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": `${s.label}, opens in a new tab`,
                    })}
                    className={classes}
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
