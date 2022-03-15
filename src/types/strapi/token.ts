import { IUser } from './user'

/**
 * Model definition for token
 */
export interface IToken {
  id: number
  user?: IUser
  token?: string
  created_at?: string | null
}
