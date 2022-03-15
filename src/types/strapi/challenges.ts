import { ICustomChallenge } from './custom-challenge'
import { IFile } from './file'
import { ILicenses } from './licenses'
import { ITier } from './tier'
import { ITooltips } from './tooltips'

/**
 * Model definition for Challenges
 */
export interface IChallenges {
  id: number
  title?: string
  description?: string
  startDate: string
  endDate: string
  type?: EnumChallengesType
  customChallenge: ICustomChallenge[]
  tiers: ITier[]
  shortDescription?: string
  customIcon?: IFile
  titleUid?: string
  evergreenChallenge?: boolean
  isFree?: boolean
  signupImage?: IFile
  licenses?: ILicenses
  tooltips: ITooltips[]
  challengeDuration?: number
  dashboardThumbnail?: IFile
  dashboardThumbnailVertical?: IFile
  signupDescription?: string
  signupVideoUrl?: string
  welcomeVideoUrl?: string
  welcomeImage?: IFile
  welcomeDescription?: string
  welcomeTitle?: string
  welcomePrimaryButtonText?: string
  signupHeading?: string
  completedBadge?: IFile
  created_at?: string | null
}

export enum EnumChallengesType {
  Journal = 'Journal',
  DailyHabit = 'DailyHabit',
  Custom = 'Custom',
  MonthlyHabit = 'MonthlyHabit',
  WeeklyHabit = 'WeeklyHabit'
}
