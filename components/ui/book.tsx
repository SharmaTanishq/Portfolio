import Image from "next/image"

// 3D book: the cover sits on the front face, a page block on the right edge and a dark back board.
// Hovering the surrounding `group` turns it 30deg to show the pages. Size comes from two CSS vars,
// --book-w (cover width) and --book-d (thickness), so the grid can resize it per breakpoint.
export function Book({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="[perspective:800px]">
      <div className="relative aspect-[2/3] w-[var(--book-w)] [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:[transform:rotateY(-30deg)]">
        <div
          className="absolute inset-0 overflow-hidden rounded-r-[4px] rounded-l-[2px] bg-well"
          style={{
            transform: "translateZ(calc(var(--book-d) / 2))",
            boxShadow: "5px 5px 20px rgba(26, 26, 24, 0.18)",
          }}
        >
          <Image src={src} alt={alt} fill sizes="(min-width: 640px) 168px, 132px" className="object-cover" />
          {/* Hinge highlight where the cover folds into the spine. */}
          <div
            className="absolute inset-y-0 left-0 w-[8.2%] opacity-20"
            style={{
              background:
                "linear-gradient(90deg, hsla(0,0%,100%,0), hsla(0,0%,100%,0) 12%, hsla(0,0%,100%,.25) 29.25%, hsla(0,0%,100%,0) 50.5%, hsla(0,0%,100%,0) 75.25%, hsla(0,0%,100%,.25) 91%, hsla(0,0%,100%,0)), linear-gradient(90deg, rgba(0,0,0,.03), rgba(0,0,0,.1) 12%, transparent 30%, rgba(0,0,0,.02) 50%, rgba(0,0,0,.2) 73.5%, rgba(0,0,0,.5) 75.25%, rgba(0,0,0,.15) 85.25%, transparent)",
            }}
          />
        </div>

        {/* Page block. Rotated about its own centre, so it lands just inside the right edge. */}
        <div
          className="absolute top-[3px] bottom-[3px] left-0 w-[var(--book-d)]"
          style={{
            transform: "translateX(calc(var(--book-w) - var(--book-d) / 2 - 3px)) rotateY(90deg)",
            background: "repeating-linear-gradient(90deg, #fbfaf6 0 2px, #ebe8df 2px 3px)",
          }}
        />

        <div
          className="absolute inset-0 rounded-r-[4px] rounded-l-[2px] bg-ink"
          style={{
            transform: "translateZ(calc(var(--book-d) / -2))",
            boxShadow: "-6px 4px 18px rgba(26, 26, 24, 0.12)",
          }}
        />
      </div>
    </div>
  )
}
