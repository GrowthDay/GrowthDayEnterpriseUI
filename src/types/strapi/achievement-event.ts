import { IAchievementBadge } from './achievement-badge'
import { IAchievementCelebration } from './achievement-celebration'
import { IAchievementCertificate } from './achievement-certificate'
import { IAchievementCoin } from './achievement-coin'

/**
 * Model definition for achievement-event
 */
export interface IAchievementEvent {
  id: number
  type?: EnumAchievementEventType
  celebration?: IAchievementCelebration
  certificate?: IAchievementCertificate
  coin?: IAchievementCoin
  badge?: IAchievementBadge
  created_at?: string | null
}

export enum EnumAchievementEventType {
  FIRST_EVENT = 'FIRST_EVENT',
  ALL_MONTH_EVENT = 'ALL_MONTH_EVENT'
}
