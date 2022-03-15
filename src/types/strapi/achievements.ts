import { IAchievementChallenge } from './achievement-challenge'
import { IAchievementCourse } from './achievement-course'
import { IAchievementEvent } from './achievement-event'
import { IAchievementJournal } from './achievement-journal'
import { IAchievementLifescore } from './achievement-lifescore'
import { IAchievementMember } from './achievement-member'
import { IAchievementReferral } from './achievement-referral'

/**
 * Model definition for Achievements
 */
export interface IAchievements {
  id: number
  title?: string
  typeCategory?: EnumAchievementsTypeCategory
  type: (
    | ({ __component: 'achievements.achievement-challenge' } & IAchievementChallenge)
    | ({ __component: 'achievements.achievement-lifescore' } & IAchievementLifescore)
    | ({ __component: 'achievements.achievement-journal' } & IAchievementJournal)
    | ({ __component: 'achievements.achievement-course' } & IAchievementCourse)
    | ({ __component: 'achievements.achievement-event' } & IAchievementEvent)
    | ({ __component: 'achievements.achievement-referral' } & IAchievementReferral)
    | ({ __component: 'achievements.achievement-member' } & IAchievementMember)
  )[]
  created_at?: string | null
}

export enum EnumAchievementsTypeCategory {
  CHALLENGE = 'CHALLENGE',
  LIFESCORE = 'LIFESCORE',
  JOURNAL = 'JOURNAL',
  COURSE = 'COURSE',
  EVENT = 'EVENT',
  REFERRAL = 'REFERRAL',
  MEMBER = 'MEMBER'
}
