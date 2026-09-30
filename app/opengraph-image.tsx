import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { site } from "@/content/site"

export const alt = `${site.name}, ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const [png, satoshi] = await Promise.all([
    readFile(join(process.cwd(), "assets/avatar-r0c0.png")),
    readFile(join(process.cwd(), "assets/Satoshi-Medium.ttf")),
  ])
  const avatar = `data:image/png;base64,${png.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 110px",
          background: "#F7F6F2",
          color: "#1A1A18",
          fontFamily: "Satoshi",
        }}
      >
        <img src={avatar} width={256} height={320} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 120, lineHeight: 1, letterSpacing: "-0.04em" }}>{site.handle}</div>
          <div style={{ fontSize: 34, color: "#5F5E58" }}>{`/ ${site.name} / noun`}</div>
          <div style={{ fontSize: 30, color: "#2F5D50", marginTop: 12 }}>{site.role}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Satoshi", data: satoshi, style: "normal", weight: 500 }] },
  )
}
