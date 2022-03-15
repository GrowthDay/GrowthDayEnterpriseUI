import { IMarketingLinkedOffers } from './marketing-linked-offers'
import { IOffers } from './offers'
import { ISubscriptionPlans } from './subscription-plans'

/**
 * Model definition for marketing-plan
 */
export interface IMarketingPlan {
  id: number
  trial?: boolean
  frequency?: EnumMarketingPlanFrequency
  plan?: ISubscriptionPlans
  orderBump?: IOffers
  onboardingUpsells: IMarketingLinkedOffers[]
  created_at?: string | null
}

export enum EnumMarketingPlanFrequency {
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}
