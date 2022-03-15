/**
 * Model definition for social-events
 */
export interface ISocialEvents {
  id: number
  type?: EnumSocialEventsType
  name?: string
  trigger?: EnumSocialEventsTrigger
  created_at?: string | null
}

export enum EnumSocialEventsType {
  FACEBOOK = 'FACEBOOK',
  BING = 'BING',
  GOOGLE = 'GOOGLE',
  MIXPANEL = 'MIXPANEL'
}

export enum EnumSocialEventsTrigger {
  SIGNUP_LOAD = 'SIGNUP_LOAD',
  SIGNUP = 'SIGNUP',
  PAYMENT_LOAD = 'PAYMENT_LOAD',
  PAYMENT = 'PAYMENT'
}
