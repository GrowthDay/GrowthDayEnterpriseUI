import { IBulletListItem } from './bullet-list-item'
import { IChallenges } from './challenges'
import { ICourses } from './courses'
import { IFile } from './file'
import { ILicenses } from './licenses'
import { IOnboarding } from './onboarding'
import { IPlan } from './plan'
import { ISocialEvents } from './social-events'
import { ITooltips } from './tooltips'
import { IWebhooks } from './webhooks'

/**
 * Model definition for Offers
 */
export interface IOffers {
  id: number
  readableTitle?: string
  title: string
  description?: string
  thumbnail?: IFile
  price: number
  currency: string
  helpText?: string
  type?: EnumOffersType
  interval?: EnumOffersInterval
  videoUrl?: string
  stripePlanId?: string
  paypalPlanId?: string
  applePlanId?: string
  courses: ICourses[]
  image?: IFile
  subtitle?: string
  licenses?: ILicenses
  order?: number
  plan?: IPlan
  changeToPlan?: EnumOffersChangeToPlan
  slug?: string
  emailTemplateId?: string
  purchaseButtonText?: string
  signupDescription?: string
  kajabiOfferId?: string
  challenge?: IChallenges
  badge?: IFile
  dashboardThumbnail?: IFile
  dashboardThumbnailVertical?: IFile
  signupHeading?: string
  titleNoCoins?: string
  events: ISocialEvents[]
  socialEvents: ISocialEvents[]
  webhooks: IWebhooks[]
  tooltips: ITooltips[]
  onboarding?: IOnboarding
  bulletItems: IBulletListItem[]
  showInMembershipArea?: boolean
  created_at?: string | null
}

export enum EnumOffersType {
  ORDER_BUMP_SIGNUP = 'ORDER_BUMP_SIGNUP',
  ORDER_BUMP_SIGNUP_OFFER = 'ORDER_BUMP_SIGNUP_OFFER',
  ORDER_BUMP_SIGNUP_SUBSCRIPTION = 'ORDER_BUMP_SIGNUP_SUBSCRIPTION',
  UPSELL_ONBOARDING = 'UPSELL_ONBOARDING',
  UPSELL_ONBOARDING_OFFER = 'UPSELL_ONBOARDING_OFFER',
  UPSELL_ONBOARDING_SUBSCRIPTION = 'UPSELL_ONBOARDING_SUBSCRIPTION',
  OFFER_SUBSCRIPTION_UPGRADE = 'OFFER_SUBSCRIPTION_UPGRADE',
  CHALLENGE_SUBSCRIPTION_UPGRADE = 'CHALLENGE_SUBSCRIPTION_UPGRADE',
  ONE_TIME_OFFERS = 'ONE_TIME_OFFERS',
  GROWTH_GROUP_SUBSCRIPTION_UPGRADE = 'GROWTH_GROUP_SUBSCRIPTION_UPGRADE'
}

export enum EnumOffersInterval {
  ONE_TIME = 'ONE_TIME',
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}

export enum EnumOffersChangeToPlan {
  BASIC_YEAR = 'BASIC_YEAR',
  MASTERY_MONTH = 'MASTERY_MONTH',
  MASTERY_YEAR = 'MASTERY_YEAR'
}
