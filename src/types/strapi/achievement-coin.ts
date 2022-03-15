import { IFile } from './file'

/**
 * Model definition for achievement-coin
 */
export interface IAchievementCoin {
  id: number
  title?: string
  description?: string
  value?: number
  image?: IFile
  created_at?: string | null
}
