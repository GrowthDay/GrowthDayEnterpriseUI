import { IFile } from './file'

/**
 * Model definition for achievement-certificate
 */
export interface IAchievementCertificate {
  id: number
  title?: string
  description?: string
  template?: IFile
  created_at?: string | null
}
