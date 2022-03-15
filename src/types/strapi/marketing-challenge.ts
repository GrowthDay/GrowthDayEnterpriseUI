import { IChallenges } from './challenges'

/**
 * Model definition for marketing-challenge
 */
export interface IMarketingChallenge {
  id: number
  challenge?: IChallenges
  created_at?: string | null
}
