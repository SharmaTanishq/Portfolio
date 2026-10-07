"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useState, type MouseEvent, type ReactNode } from "react";
import { EASE_OUT, SPRING_MOUSE } from "@/lib/ease";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  /** Mono line under the shot. Falls back to the host when a shot fails. */
  caption?: string;
  /**
   * Pages that answer a scraper with a signup wall have nothing worth shooting.
   * The card then shows `caption` on its own.
   */
  screenshot?: boolean;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

function previewSrc(url: string, width: number, height: number) {
  const params = encode({
    url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "light",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1,
    "viewport.width": width * 3,
    "viewport.height": height * 3,
  });
  return `https://api.microlink.io/?${params}`;
}

export function LinkPreview({
  children,
  url,
  className,
  width = 200,
  height = 125,
  caption,
  screenshot = true,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) {
  const src = !screenshot ? "" : isStatic ? imageSrc : previewSrc(url, width, height);
  const external = url.startsWith("http");
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const translateX = useSpring(x, SPRING_MOUSE);

  const onMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offset = (event.clientX - rect.left - rect.width / 2) / 2;
    x.set(offset);
  };

  return (
    <>
      {src ? (
        <div className="hidden" aria-hidden>
          {/* Warm the shot before the card opens. Low priority so it stays off the critical path. */}
          <img src={src} alt="" width={width} height={height} fetchPriority="low" />
        </div>
      ) : null}

      <HoverCardPrimitive.Root openDelay={120} closeDelay={80} onOpenChange={setOpen}>
        <HoverCardPrimitive.Trigger
          href={url}
          onMouseMove={onMouseMove}
          onMouseLeave={() => x.set(0)}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={cn(className)}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            forceMount
            side="top"
            align="center"
            sideOffset={8}
            collisionPadding={16}
            className="z-50"
            style={{ pointerEvents: open ? "auto" : "none" }}
          >
            <AnimatePresence>
              {open ? (
                <motion.div
                  key="preview"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.18, ease: EASE_OUT },
                  }}
                  exit={{
                    opacity: 0,
                    y: reduce ? 0 : 4,
                    scale: reduce ? 1 : 0.98,
                    transition: { duration: 0.12, ease: EASE_OUT },
                  }}
                  style={reduce ? undefined : { x: translateX }}
                >
                  {screenshot ? (
                    <a
                      href={url}
                      tabIndex={-1}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block overflow-hidden rounded-2xl border border-line bg-surface p-1 shadow-[0_8px_24px_-10px_rgba(26,26,24,0.28)]"
                    >
                      {failed ? (
                        <span
                          className="flex items-center justify-center rounded-xl bg-well px-3 text-center font-mono text-[11px] text-muted"
                          style={{ width, height }}
                        >
                          {caption ?? url.replace(/^https?:\/\//, "")}
                        </span>
                      ) : (
                        <img
                          src={src}
                          width={width}
                          height={height}
                          alt=""
                          onError={() => setFailed(true)}
                          className="block rounded-xl bg-well object-cover object-top"
                          style={{ width, height }}
                        />
                      )}
                      {caption && !failed ? (
                        <span
                          className="block truncate px-2.5 pt-1.5 pb-1 text-center font-mono text-[11px] text-muted"
                          style={{ width }}
                        >
                          {caption}
                        </span>
                      ) : null}
                    </a>
                  ) : (
                    <span className="block whitespace-nowrap rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink shadow-[0_6px_20px_-8px_rgba(26,26,24,0.25)]">
                      {caption ?? url.replace(/^https?:\/\//, "")}
                    </span>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
}
