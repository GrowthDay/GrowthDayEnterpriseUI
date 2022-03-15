import { ICourseLessons } from './course-lessons'
import { ICourses } from './courses'

/**
 * Model definition for CourseBuckets
 */
export interface ICourseBuckets {
  id: number
  name?: string
  description?: string
  courses: ICourses[]
  order?: number
  course_lessons: ICourseLessons[]
  created_at?: string | null
}
