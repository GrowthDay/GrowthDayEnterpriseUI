import { IAuthors } from './authors'
import { IFile } from './file'
import { ISignup } from './signup'

/**
 * Model definition for Events
 */
export interface IEvents {
  id: number
  name: string
  description: string
  background: IFile
  vimeoUrl?: string
  guestName?: string
  topic?: string
  author?: string
  instructor?: string
  isPublished: boolean
  eventStartDate: string
  eventEndDate: string
  wistiaId?: string
  mp3Link?: string
  mp3Content?: IFile
  worksheetLink?: string
  worksheetContents?: IFile
  nameUid: string
  verticalThumbnail: IFile
  dashboardThumbnail?: IFile
  authorProfile?: IAuthors
  thumbnail?: IFile
  isFree?: boolean
  signup?: ISignup
  created_at?: string | null
}
