import { IAchievementBadge } from './achievement-badge'
import { IAchievementCelebration } from './achievement-celebration'
import { IAchievementCoin } from './achievement-coin'

/**
 * Model definition for achievement-referral-tier
 */
export interface IAchievementReferralTier {
  id: number
  value?: number
  celebration?: IAchievementCelebration
  coin?: IAchievementCoin
  badge?: IAchievementBadge
  created_at?: string | null
}
