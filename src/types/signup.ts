import { ILoginResponse } from './login'

export type ISignupRequest = {
  fullName?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  ianaTimezone?: string
}

export type ISignupResponse = ILoginResponse
