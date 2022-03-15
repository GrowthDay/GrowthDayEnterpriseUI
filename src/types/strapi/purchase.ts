import { IDiscountTier } from './discount-tier'
import { IFile } from './file'

/**
 * Model definition for purchase
 */
export interface IPurchase {
  id: number
  title?: string
  description?: string
  step1Title?: string
  step2Title?: string
  step3Title?: string
  offerMessage?: string
  messagePlaceholder?: string
  step1Icon?: IFile
  step2Icon?: IFile
  step3Icon?: IFile
  discountTier: IDiscountTier[]
  maxUserLimit?: number
  messageLimit?: number
  messageLimitType?: EnumPurchaseMessageLimitType
  purchaseButtonText?: string
  image?: IFile
  created_at?: string | null
}

export enum EnumPurchaseMessageLimitType {
  WORD = 'WORD',
  CHARACTER = 'CHARACTER'
}
