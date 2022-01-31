import { IUser } from './user'

export interface ILoginRequest {
  code: string
  redirectUri: string
}

export interface ILoginResponse {
  authenticationToken?: string
  errorMessage?: string
  isSuccess?: boolean
  user?: IUser
}
