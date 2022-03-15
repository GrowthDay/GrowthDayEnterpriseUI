import { IFile } from './file'

/**
 * Model definition for custom_challenge_items
 */
export interface ICustomChallengeItems {
  id: number
  url?: string
  title?: string
  text?: string
  media: IFile[]
  type?: EnumCustomChallengeItemsType
  sharable?: boolean
  created_at?: string | null
}

export enum EnumCustomChallengeItemsType {
  Video = 'Video',
  Audio = 'Audio',
  Image = 'Image',
  Journal = 'Journal',
  Plan = 'Plan',
  Goal = 'Goal'
}
