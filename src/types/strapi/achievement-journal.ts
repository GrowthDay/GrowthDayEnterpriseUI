import { IAchievementJournalTier } from './achievement-journal-tier'

/**
 * Model definition for achievement-journal
 */
export interface IAchievementJournal {
  id: number
  type?: EnumAchievementJournalType
  interval?: EnumAchievementJournalInterval
  recurring?: boolean
  tiers: IAchievementJournalTier[]
  created_at?: string | null
}

export enum EnumAchievementJournalType {
  STREAK = 'STREAK'
}

export enum EnumAchievementJournalInterval {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}
