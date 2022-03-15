import { IAssessmentCategories } from './assessment-categories'
import { ICourseLessons } from './course-lessons'
import { IFile } from './file'

/**
 * Model definition for Improvement Recommendations
 */
export interface IImprovementRecommendations {
  id: number
  improvementTypeOrder?: number
  improvementType?: EnumImprovementRecommendationsImprovementType
  improvementTypeLink?: string
  assessment_category?: IAssessmentCategories
  course_lesson?: ICourseLessons
  improvementDescription?: string
  improvementTitle?: string
  wistiaLink?: string
  wistiaThumbnail?: IFile
  created_at?: string | null
}

export enum EnumImprovementRecommendationsImprovementType {
  Video = 'Video',
  Audio = 'Audio',
  Text = 'Text'
}
