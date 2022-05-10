import { IContentTags } from './content-tags'
import { ICourseChapters } from './course-chapters'
import { ICourses } from './courses'
import { IFile } from './file'
import { IImprovementRecommendations } from './improvement-recommendations'
import { IMedia } from './media'
import { IRecommendedResources } from './recommended-resources'
import { IWorksheets } from './worksheets'

/**
 * Model definition for CourseLessons
 */
export interface ICourseLessons {
  id: number
  title?: string
  subtitle?: string
  order?: number
  videoID?: string
  media?: IMedia
  worksheetLink?: string
  mp3Link?: string
  course?: ICourses
  category?: string
  background?: IFile
  description?: string
  reminders?: string
  recommendations?: string
  audioContents: IFile[]
  improvement_recommendations: IImprovementRecommendations[]
  worksheetContents?: IFile
  mp3Content?: IFile
  course_chapter?: ICourseChapters
  duration?: string
  titleUid?: string
  content_tags: IContentTags[]
  recommended_resources: IRecommendedResources[]
  worksheets: IWorksheets[]
  created_at?: string | null
}
