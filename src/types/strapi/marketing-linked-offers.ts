import { IOffers } from './offers'

/**
 * Model definition for marketing-linked-offers
 */
export interface IMarketingLinkedOffers {
  id: number
  offer?: IOffers
  created_at?: string | null
}
