import { ICustomChallengeItems } from './custom-challenge-items'

/**
 * Model definition for custom_challenge
 */
export interface ICustomChallenge {
  id: number
  name?: string
  customChallengeTasks: ICustomChallengeItems[]
  date?: string
  nameUid?: string
  created_at?: string | null
}
