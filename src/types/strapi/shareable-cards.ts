import { IFile } from './file'

/**
 * Model definition for ShareableCards
 */
export interface IShareableCards {
  id: number
  title?: string
  descroption?: string
  background?: IFile
  created_at?: string | null
}
