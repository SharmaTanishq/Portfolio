export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
export type ContributionYear = { year: number; total: number; days: ContributionDay[] }
