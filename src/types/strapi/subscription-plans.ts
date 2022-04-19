import { IFile } from './file'
import { ILicenses } from './licenses'
import { IOffers } from './offers'
import { IOnboarding } from './onboarding'
import { ISocialEvents } from './social-events'
import { ITooltips } from './tooltips'
import { IWebhooks } from './webhooks'

/**
 * Model definition for SubscriptionPlans
 */
export interface ISubscriptionPlans {
  id: number
  name?: string
  currency?: string
  stripeMonthlyPriceId?: string
  stripeYearlyPriceId?: string
  bulletPoints?: string
  monthlyAmount?: number
  yearlyAmount?: number
  level?: EnumSubscriptionPlansLevel
  paypalMonthlyPriceId?: string
  paypalYearlyPriceId?: string
  levelWeight?: number
  description?: string
  appleMonthlyProductId?: string
  appleYearlyProductId?: string
  licenses?: ILicenses
  withoutTrialStripeMonthlyPriceId?: string
  withoutTrialStripeYearlyPriceId?: string
  withoutTrialPaypalMonthlyPriceId?: string
  withoutTrialPaypalYearlyPriceId?: string
  withoutTrialAppleMonthlyProductId?: string
  withoutTrialAppleYearlyProductId?: string
  signupHeading?: string
  signupVideoUrl?: string
  signupDescription?: string
  signupImage?: IFile
  slug?: string
  events: ISocialEvents[]
  socialEvents: ISocialEvents[]
  webhooks: IWebhooks[]
  tooltips: ITooltips[]
  onboarding?: IOnboarding
  enterprise?: boolean
  minimumQuantity?: number
  freeOffers: IOffers[]
  created_at?: string | null
}

export enum EnumSubscriptionPlansLevel {
  basic = 'basic',
  mastery = 'mastery',
  enterprise = 'enterprise'
}
