/**
 * Model definition for Mobile App Version
 */
export interface IMobileAppVersion {
  id: number
  androidVersion?: string
  force?: boolean
  user?: { [key: string]: any }
  iosVersion?: string
  title?: string
  subTitle?: string
  created_at?: string | null
}
