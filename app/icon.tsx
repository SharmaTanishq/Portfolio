import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

// The r0c0 frame is 128x160; show its top square (the face).
export default async function Icon() {
  const png = await readFile(join(process.cwd(), "assets/avatar-r0c0.png"))
  const src = `data:image/png;base64,${png.toString("base64")}`
  return new ImageResponse(
    (
      <div style={{ width: 64, height: 64, display: "flex", overflow: "hidden" }}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={src} width={64} height={80} />
      </div>
    ),
    size,
  )
}
