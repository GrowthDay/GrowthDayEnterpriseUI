import { IChallenges } from './challenges'
import { ICourses } from './courses'

/**
 * Model definition for Bullet-List-Item
 */
export interface IBulletListItem {
  id: number
  title?: string
  linkText?: string
  iconUrl?: string
  type?: EnumBulletListItemType
  course?: ICourses
  challenge?: IChallenges
  created_at?: string | null
}

export enum EnumBulletListItemType {
  DASHBOARD = 'DASHBOARD',
  COMMUNITY = 'COMMUNITY',
  JOURNAL = 'JOURNAL',
  LIFESCORE = 'LIFESCORE',
  CHALLENGE = 'CHALLENGE',
  PLAN = 'PLAN',
  NOTES = 'NOTES',
  COURSE = 'COURSE',
  MEMBERSHIP_AND_BILLING = 'MEMBERSHIP_AND_BILLING',
  CHANGE_SUBSCRIPTION = 'CHANGE_SUBSCRIPTION'
}
