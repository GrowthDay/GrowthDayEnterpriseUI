/**
 * Model definition for growtth-group-webhooks
 */
export interface IGrowtthGroupWebhooks {
  id: number
  url?: string
  type?: EnumGrowtthGroupWebhooksType
  trigger?: EnumGrowtthGroupWebhooksTrigger
  created_at?: string | null
}

export enum EnumGrowtthGroupWebhooksType {
  KAJABI = 'KAJABI',
  PROOF = 'PROOF'
}

export enum EnumGrowtthGroupWebhooksTrigger {
  SIGNUP = 'SIGNUP',
  JOINED = 'JOINED',
  CREATED = 'CREATED',
  STARTED = 'STARTED'
}
