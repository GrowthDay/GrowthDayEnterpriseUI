/**
 * Model definition for growth-group-events
 */
export interface IGrowthGroupEvents {
  id: number
  name?: string
  type?: EnumGrowthGroupEventsType
  trigger?: EnumGrowthGroupEventsTrigger
  created_at?: string | null
}

export enum EnumGrowthGroupEventsType {
  FACEBOOK = 'FACEBOOK',
  BING = 'BING',
  GOOGLE = 'GOOGLE',
  MIXPANEL = 'MIXPANEL'
}

export enum EnumGrowthGroupEventsTrigger {
  SIGNUP = 'SIGNUP',
  CREATED = 'CREATED',
  JOINED = 'JOINED',
  STARTED = 'STARTED'
}
