import { IFile } from './file'

/**
 * Model definition for media
 */
export interface IMedia {
  id: number
  vimeoId?: string
  wistiaId?: string
  url?: string
  file?: IFile
  cover?: IFile
  created_at?: string | null
}
