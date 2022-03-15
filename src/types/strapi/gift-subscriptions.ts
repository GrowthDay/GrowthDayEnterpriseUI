import { ICardPopup } from './card-popup'
import { IOffers } from './offers'
import { IPurchase } from './purchase'
import { IRedeem } from './redeem'
import { ISignup } from './signup'
import { ISocialEvents } from './social-events'

/**
 * Model definition for Gift Subscriptions
 */
export interface IGiftSubscriptions {
  id: number
  purchase?: IPurchase
  cardPopup?: ICardPopup
  signup?: ISignup
  redeem?: IRedeem
  offer?: IOffers
  socialEvents: ISocialEvents[]
  created_at?: string | null
}
