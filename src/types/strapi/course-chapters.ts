import { ICourseLessons } from './course-lessons'
import { ICourses } from './courses'

/**
 * Model definition for courseChapters
 */
export interface ICourseChapters {
  id: number
  name?: string
  description?: string
  course?: ICourses
  course_lessons: ICourseLessons[]
  order?: number
  created_at?: string | null
}
