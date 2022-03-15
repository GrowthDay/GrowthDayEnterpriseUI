import { IFile } from './file'

/**
 * Model definition for worksheets
 */
export interface IWorksheets {
  id: number
  link?: string
  file?: IFile
  name?: string
  created_at?: string | null
}
