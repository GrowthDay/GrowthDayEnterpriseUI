import { IAchievementBadge } from './achievement-badge'
import { IAchievementCelebration } from './achievement-celebration'
import { IAchievementCertificate } from './achievement-certificate'
import { IAchievementCoin } from './achievement-coin'

/**
 * Model definition for achievement-member-tier
 */
export interface IAchievementMemberTier {
  id: number
  value?: number
  celebration?: IAchievementCelebration
  certificate?: IAchievementCertificate
  coin?: IAchievementCoin
  badge?: IAchievementBadge
  created_at?: string | null
}
