import { ICourseLessons } from './course-lessons'
import { IFile } from './file'

/**
 * Model definition for DailyFires
 */
export interface IDailyFires {
  id: number
  order?: number
  course_lesson?: ICourseLessons
  audioContent?: IFile
  audioLink?: string
  title?: string
  subTitle?: string
  publish_at?: string
  created_at?: string | null
}
