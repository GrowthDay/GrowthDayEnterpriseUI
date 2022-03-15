import { IMarketingLinkedOffers } from './marketing-linked-offers'
import { IOffers } from './offers'

/**
 * Model definition for marketing-offer
 */
export interface IMarketingOffer {
  id: number
  offer?: IOffers
  orderBump?: IOffers
  onboardingUpsells: IMarketingLinkedOffers[]
  created_at?: string | null
}
