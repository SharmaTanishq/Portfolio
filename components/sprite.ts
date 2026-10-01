export type Frame = readonly [row: number, col: number]

export const FRAMES = {
  default: [0, 0],
  wave: [5, 0],
  peek: [5, 3],
  blink: [5, 4],
  // Gaze frames for following the pointer, named from the viewer's side.
  lookLeft: [0, 3],
  lookRight: [0, 4],
  lookUp: [0, 1],
  lookDown: [0, 2],
} as const satisfies Record<string, Frame>

export function framePosition([row, col]: Frame) {
  return `${col * 20}% ${row * 20}%`
}

// The nav swaps its wordmark for the sprite once this element scrolls out of view.
export const HERO_AVATAR_ID = "hero-avatar"
