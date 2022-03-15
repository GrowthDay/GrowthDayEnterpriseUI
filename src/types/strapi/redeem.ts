import { IFile } from './file'

/**
 * Model definition for redeem
 */
export interface IRedeem {
  id: number
  heading?: string
  title?: string
  image?: IFile
  footer?: string
  purchaseButtonText?: string
  created_at?: string | null
}
