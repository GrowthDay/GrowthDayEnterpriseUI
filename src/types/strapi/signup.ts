import { IFile } from './file'

/**
 * Model definition for signup
 */
export interface ISignup {
  id: number
  title?: string
  description?: string
  image?: IFile
  videoUrl?: string
  heading?: string
  submitButtonText?: string
  created_at?: string | null
}
