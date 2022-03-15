import { ICourses } from './courses'
import { IFile } from './file'

/**
 * Model definition for Recommended Resources
 */
export interface IRecommendedResources {
  id: number
  title?: string
  recommended_courses?: ICourses
  description?: string
  thumb?: IFile
  link?: string
  newTab?: boolean
  created_at?: string | null
}
