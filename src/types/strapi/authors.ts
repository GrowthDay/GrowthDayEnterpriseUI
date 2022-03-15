import { IFile } from './file'

/**
 * Model definition for Authors
 */
export interface IAuthors {
  id: number
  name?: string
  bio?: string
  profileImage?: IFile
  created_at?: string | null
}
