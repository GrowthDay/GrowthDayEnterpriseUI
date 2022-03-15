import { IFile } from './file'

/**
 * Model definition for achievement-celebration
 */
export interface IAchievementCelebration {
  id: number
  title?: string
  subtitle?: string
  description?: string
  image?: IFile
  videoUrl?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  created_at?: string | null
}
