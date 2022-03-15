import { IFile } from './file'

/**
 * Model definition for onboarding
 */
export interface IOnboarding {
  id: number
  heading?: string
  description?: string
  image?: IFile
  videoUrl?: string
  buttonText?: string
  created_at?: string | null
}
