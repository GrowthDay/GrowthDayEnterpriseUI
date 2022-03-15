import { IEvents } from './events'

/**
 * Model definition for marketing-live-event
 */
export interface IMarketingLiveEvent {
  id: number
  event?: IEvents
  created_at?: string | null
}
