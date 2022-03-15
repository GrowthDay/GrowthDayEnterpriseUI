import { IFile } from './file'

/**
 * Model definition for tier
 */
export interface ITier {
  id: number
  threshold: number
  rewardAmount: number
  name: EnumTierName
  completedBadge?: IFile
  created_at?: string | null
}

export enum EnumTierName {
  Gold = 'Gold',
  Silver = 'Silver',
  Bronze = 'Bronze'
}
