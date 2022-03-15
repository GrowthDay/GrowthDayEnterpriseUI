import { IAchievementBadge } from './achievement-badge'
import { IAchievementCelebration } from './achievement-celebration'
import { IAchievementCoin } from './achievement-coin'

/**
 * Model definition for achievement-lifescore-tier
 */
export interface IAchievementLifescoreTier {
  id: number
  value?: number
  coin?: IAchievementCoin
  badge?: IAchievementBadge
  celebration?: IAchievementCelebration
  created_at?: string | null
}
