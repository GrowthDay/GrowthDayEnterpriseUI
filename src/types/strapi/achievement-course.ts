import { IAchievementBadge } from './achievement-badge'
import { IAchievementCelebration } from './achievement-celebration'
import { IAchievementCertificate } from './achievement-certificate'
import { IAchievementCoin } from './achievement-coin'
import { ICourses } from './courses'

/**
 * Model definition for achievement-course
 */
export interface IAchievementCourse {
  id: number
  course?: ICourses
  type?: EnumAchievementCourseType
  celebration?: IAchievementCelebration
  certificate?: IAchievementCertificate
  coin?: IAchievementCoin
  badge?: IAchievementBadge
  created_at?: string | null
}

export enum EnumAchievementCourseType {
  COMPLETION = 'COMPLETION'
}
