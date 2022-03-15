import { IUser } from './user'

export type ILoginRequest = {
  code: string
  redirectUri: string
}

export type ILoginResponse = {
  authenticationToken?: string
  errorMessage?: string
  isSuccess?: boolean
  user?: IUser
}
