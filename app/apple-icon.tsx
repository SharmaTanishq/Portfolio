import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// iOS home-screen icon: the r0c0 face on the page background (iOS fills transparency with black).
export default async function AppleIcon() {
  const png = await readFile(join(process.cwd(), "assets/avatar-r0c0.png"))
  const src = `data:image/png;base64,${png.toString("base64")}`
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          background: "#F7F6F2",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={src} width={168} height={210} style={{ marginTop: 6 }} />
      </div>
    ),
    size,
  )
}
