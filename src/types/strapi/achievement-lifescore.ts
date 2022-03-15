import { IAchievementLifescoreTier } from './achievement-lifescore-tier'

/**
 * Model definition for achievement-lifescore
 */
export interface IAchievementLifescore {
  id: number
  type?: EnumAchievementLifescoreType
  interval?: EnumAchievementLifescoreInterval
  recurring?: boolean
  tiers: IAchievementLifescoreTier[]
  created_at?: string | null
}

export enum EnumAchievementLifescoreType {
  STREAK = 'STREAK'
}

export enum EnumAchievementLifescoreInterval {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}
