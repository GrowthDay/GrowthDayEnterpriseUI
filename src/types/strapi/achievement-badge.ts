import { IFile } from './file'

/**
 * Model definition for achievement-badge
 */
export interface IAchievementBadge {
  id: number
  title?: string
  description?: string
  image?: IFile
  created_at?: string | null
}
