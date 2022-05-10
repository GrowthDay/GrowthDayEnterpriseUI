import { IFile } from './file'

/**
 * Model definition for growthgroups-banner
 */
export interface IGrowthgroupsBanner {
  id: number
  title?: string
  description?: string
  buttonText?: string
  mobileThumbnail?: IFile
  desktopThumbnail?: IFile
  created_at?: string | null
}
