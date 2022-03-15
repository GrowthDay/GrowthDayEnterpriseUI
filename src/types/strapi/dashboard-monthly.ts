import { IFile } from './file'

/**
 * Model definition for DashboardMonthly
 */
export interface IDashboardMonthly {
  id: number
  seq?: number
  creationDate?: string
  monthlyVideoURL?: string
  monthlyVideoDescription?: string
  videoCoverImage?: IFile
  surveryURL?: string
  created_at?: string | null
}
