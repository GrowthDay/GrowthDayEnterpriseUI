import { IFile } from './file'

/**
 * Model definition for GrowthCoins
 */
export interface IGrowthCoins {
  id: number
  title?: string
  description?: string
  image?: IFile
  icon?: IFile
  created_at?: string | null
}
