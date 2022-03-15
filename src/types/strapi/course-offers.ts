import { ICourses } from './courses'
import { IFile } from './file'

/**
 * Model definition for courseOffers
 */
export interface ICourseOffers {
  id: number
  title?: string
  description?: string
  link?: string
  videoLink?: string
  background: IFile[]
  linkDescription?: string
  courses: ICourses[]
  created_at?: string | null
}
