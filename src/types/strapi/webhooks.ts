/**
 * Model definition for webhooks
 */
export interface IWebhooks {
  id: number
  type?: EnumWebhooksType
  url?: string
  trigger?: EnumWebhooksTrigger
  created_at?: string | null
}

export enum EnumWebhooksType {
  KAJABI = 'KAJABI',
  PROOF = 'PROOF'
}

export enum EnumWebhooksTrigger {
  SIGNUP = 'SIGNUP',
  PAYMENT = 'PAYMENT'
}
