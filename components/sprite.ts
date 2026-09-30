export type Frame = readonly [row: number, col: number]

export const FRAMES = {
  default: [0, 0],
  wave: [5, 0],
  peek: [5, 3],
  blink: [5, 4],
} as const satisfies Record<string, Frame>

export function framePosition([row, col]: Frame) {
  return `${col * 20}% ${row * 20}%`
}

// The nav swaps its wordmark for the sprite once this element scrolls out of view.
export const HERO_AVATAR_ID = "hero-avatar"
