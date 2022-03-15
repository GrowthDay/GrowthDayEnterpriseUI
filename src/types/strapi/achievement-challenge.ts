import { IAchievementCelebration } from './achievement-celebration'
import { IChallenges } from './challenges'

/**
 * Model definition for achievement-challenge
 */
export interface IAchievementChallenge {
  id: number
  challenge?: IChallenges
  type?: EnumAchievementChallengeType
  celebration?: IAchievementCelebration
  created_at?: string | null
}

export enum EnumAchievementChallengeType {
  COMPLETION = 'COMPLETION'
}
