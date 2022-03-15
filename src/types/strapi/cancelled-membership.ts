/**
 * Model definition for CancelledMembership
 */
export interface ICancelledMembership {
  id: number
  title?: string
  description?: string
  type?: EnumCancelledMembershipType
  videoUrl?: string
  cancelButtonText?: string
  upgradeButtonText?: string
  created_at?: string | null
}

export enum EnumCancelledMembershipType {
  POPUP_DASHBOARD = 'POPUP_DASHBOARD',
  BANNER_DASHBOARD = 'BANNER_DASHBOARD',
  POPUP_COMMUNITY = 'POPUP_COMMUNITY',
  BANNER_COMMUNITY = 'BANNER_COMMUNITY',
  POPUP_JOURNAL = 'POPUP_JOURNAL',
  BANNER_JOURNAL = 'BANNER_JOURNAL',
  POPUP_LIFESCORE = 'POPUP_LIFESCORE',
  BANNER_LIFESCORE = 'BANNER_LIFESCORE',
  POPUP_CHALLENGE = 'POPUP_CHALLENGE',
  BANNER_CHALLENGE = 'BANNER_CHALLENGE',
  POPUP_EVENT = 'POPUP_EVENT',
  BANNER_EVENT = 'BANNER_EVENT',
  POPUP_PLAN = 'POPUP_PLAN',
  BANNER_PLAN = 'BANNER_PLAN'
}
