import { IContentTags } from './content-tags'
import { ICourseChapters } from './course-chapters'
import { ICourseLessons } from './course-lessons'
import { ICourseOffers } from './course-offers'
import { IFile } from './file'
import { IRecommendedResources } from './recommended-resources'

/**
 * Model definition for Courses
 */
export interface ICourses {
  id: number
  title?: string
  rewardCoinsCount?: number
  isFeatured?: boolean
  order?: number
  background?: IFile
  course_lessons: ICourseLessons[]
  recommended_resources: IRecommendedResources[]
  isPublished?: boolean
  content_tags: IContentTags[]
  description?: string
  course_chapters: ICourseChapters[]
  isRecommendedPremium?: boolean
  isRecommendedPro?: boolean
  isRecommendedStarter?: boolean
  titleUid?: string
  isFree?: boolean
  courseOffers: ICourseOffers[]
  created_at?: string | null
}
