import { IAchievementMemberTier } from './achievement-member-tier'

/**
 * Model definition for achievement-member
 */
export interface IAchievementMember {
  id: number
  type?: EnumAchievementMemberType
  interval?: EnumAchievementMemberInterval
  tiers: IAchievementMemberTier[]
  created_at?: string | null
}

export enum EnumAchievementMemberType {
  STREAK = 'STREAK'
}

export enum EnumAchievementMemberInterval {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}
