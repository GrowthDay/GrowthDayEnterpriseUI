import { IFile } from './file'

/**
 * Model definition for Signup Page
 */
export interface ISignupPage {
  id: number
  videoUrl?: string
  image?: IFile
  description?: string
  signupHeading?: string
  created_at?: string | null
}
