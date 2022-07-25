import { IMarketingChallenge } from './marketing-challenge'
import { IMarketingLiveEvent } from './marketing-live-event'
import { IMarketingOffer } from './marketing-offer'
import { IMarketingPlan } from './marketing-plan'
import { IOnboarding } from './onboarding'
import { ISignup } from './signup'
import { ISocialEvents } from './social-events'
import { IWebhooks } from './webhooks'

/**
 * Model definition for MarketingCampaigns
 */
export interface IMarketingCampaigns {
  id: number
  title?: string
  slug?: string
  active?: boolean
  startDate?: string
  endDate?: string
  type?: EnumMarketingCampaignsType
  membersContent?: ISignup
  nonMembersContent?: ISignup
  events: ISocialEvents[]
  webhooks: IWebhooks[]
  onboarding?: IOnboarding
  component: (
    | ({ __component: 'marketing.marketing-plan' } & IMarketingPlan)
    | ({ __component: 'marketing.marketing-offer' } & IMarketingOffer)
    | ({ __component: 'marketing.marketing-live-event' } & IMarketingLiveEvent)
    | ({ __component: 'marketing.marketing-challenge' } & IMarketingChallenge)
  )[]
  created_at?: string | null
}

export enum EnumMarketingCampaignsType {
  CHALLENGE = 'CHALLENGE',
  PLAN = 'PLAN',
  OFFER = 'OFFER',
  LIVE_EVENT = 'LIVE_EVENT'
}
