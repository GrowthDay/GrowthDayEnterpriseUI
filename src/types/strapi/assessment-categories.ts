import { IImprovementRecommendations } from './improvement-recommendations'

/**
 * Model definition for AssessmentCategories
 */
export interface IAssessmentCategories {
  id: number
  name?: string
  type?: EnumAssessmentCategoriesType
  dashboardDaily?: string
  dashboardWeekly?: string
  dashboardMonthly?: string
  body?: string
  name_id?: string
  firstTimeViewTitle?: string
  firstTimeViewDescription?: string
  improvement_recommendations: IImprovementRecommendations[]
  q1?: string
  q2?: string
  q3?: string
  q4?: string
  q5?: string
  order?: number
  isTrial?: boolean
  subType?: EnumAssessmentCategoriesSubType
  created_at?: string | null
}

export enum EnumAssessmentCategoriesType {
  Monthly = 'Monthly',
  Weekly = 'Weekly',
  Daily = 'Daily',
  Main = 'Main',
  TeamAssessment = 'TeamAssessment'
}

export enum EnumAssessmentCategoriesSubType {
  HP18 = 'HP18',
  Engagement = 'Engagement',
  JobPerformance = 'JobPerformance',
  WellbeingMood = 'WellbeingMood',
  ManagerRelationship = 'ManagerRelationship',
  JobSatisfaction = 'JobSatisfaction'
}
