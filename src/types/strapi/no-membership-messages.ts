import { IBulletListItem } from './bullet-list-item'
import { IFile } from './file'

/**
 * Model definition for No Membership Messages
 */
export interface INoMembershipMessages {
  id: number
  title?: string
  description?: string
  type?: EnumNoMembershipMessagesType
  videoUrl?: string
  secondaryButtonText?: string
  primaryButtonText?: string
  primaryLinkTo?: EnumNoMembershipMessagesPrimaryLinkTo
  secondaryLinkTo?: EnumNoMembershipMessagesSecondaryLinkTo
  image?: IFile
  bulletItems: IBulletListItem[]
  created_at?: string | null
}

export enum EnumNoMembershipMessagesType {
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

export enum EnumNoMembershipMessagesPrimaryLinkTo {
  DASHBOARD = 'DASHBOARD',
  COMMUNITY = 'COMMUNITY',
  JOURNAL = 'JOURNAL',
  LIFESCORE = 'LIFESCORE',
  CHALLENGE = 'CHALLENGE',
  EVENT = 'EVENT',
  PLAN = 'PLAN',
  NOTES = 'NOTES',
  COURSE = 'COURSE',
  MEMBERSHIP_AND_BILLING = 'MEMBERSHIP_AND_BILLING',
  CHANGE_SUBSCRIPTION = 'CHANGE_SUBSCRIPTION'
}

export enum EnumNoMembershipMessagesSecondaryLinkTo {
  DASHBOARD = 'DASHBOARD',
  COMMUNITY = 'COMMUNITY',
  JOURNAL = 'JOURNAL',
  LIFESCORE = 'LIFESCORE',
  CHALLENGE = 'CHALLENGE',
  EVENT = 'EVENT',
  PLAN = 'PLAN',
  NOTES = 'NOTES',
  COURSE = 'COURSE',
  MEMBERSHIP_AND_BILLING = 'MEMBERSHIP_AND_BILLING',
  CHANGE_SUBSCRIPTION = 'CHANGE_SUBSCRIPTION'
}
