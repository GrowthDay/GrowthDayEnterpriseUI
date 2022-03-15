import { IAchievementReferralTier } from './achievement-referral-tier'

/**
 * Model definition for achievement-referral
 */
export interface IAchievementReferral {
  id: number
  type?: EnumAchievementReferralType
  tiers: IAchievementReferralTier[]
  created_at?: string | null
}

export enum EnumAchievementReferralType {
  COUNT = 'COUNT'
}
