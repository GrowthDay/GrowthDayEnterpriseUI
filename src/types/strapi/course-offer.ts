import { IFile } from './file'

/**
 * Model definition for Course-Offer
 */
export interface ICourseOffer {
  id: number
  title?: string
  description?: string
  link?: string
  videoLink?: string
  background: IFile[]
  linkDescription?: string
  created_at?: string | null
}
