/**
 * Model definition for Licenses
 */
export interface ILicenses {
  id: number
  JOURNAL_ALL_ACCESS?: boolean
  LIFESCORE_ALL_ACCESS?: boolean
  CHALLENGE_ALL_ACCESS?: boolean
  VIDEO_COURSE_ALL_ACCESS?: boolean
  EVENT_ALL_ACCESS?: boolean
  PLAN_ALL_ACCESS?: boolean
  AUDIO_COURSE_ALL_ACCESS?: boolean
  AUDIO_COURSE_LIMITED_ACCESS?: boolean
  PLAN_LIMITED_ACCESS?: boolean
  EVENT_LIMITED_ACCESS?: boolean
  VIDEO_COURSE_LIMITED_ACCESS?: boolean
  CHALLENGE_LIMITED_ACCESS?: boolean
  LIFESCORE_LIMITED_ACCESS?: boolean
  JOURNAL_LIMITED_ACCESS?: boolean
  GOAL_ALL_ACCESS?: boolean
  GOAL_LIMITED_ACCESS?: boolean
  created_at?: string | null
}
