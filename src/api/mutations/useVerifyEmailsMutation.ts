import { forEach, toLower } from 'lodash-es'
import { useRef } from 'react'
import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'

export const VERIFY_EMAILS_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'VERIFY_EMAILS']

export enum EmailStatusType {
  VALID = 'VALID',
  INVALID_EMAIL = 'INVALID_EMAIL',
  USER_EXISTS_IN_SYSTEM = 'USER_EXISTS_IN_SYSTEM',
  USER_EXISTS_IN_ORGANIZATION = 'USER_EXISTS_IN_ORGANIZATION'
}

export type VerifyEmailsResponse = Record<string, EmailStatusType>

const useVerifyEmailsMutation = (
  options: Omit<
    UseMutationOptions<VerifyEmailsResponse, unknown, string[], typeof VERIFY_EMAILS_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const cache = useRef(new Map<string, EmailStatusType>()).current
  return useMutation(
    VERIFY_EMAILS_MUTATION_KEY,
    async (input: string[]) => {
      const emails = input.map((email) => toLower(email).trim()).filter((email) => email && !cache.has(email))
      if (emails.length) {
        const res = await axiosGrowthDay.post<VerifyEmailsResponse>('/organizationUsers/verifyEmails', emails)
        forEach(res, (status, email) => cache.set(email, status))
      }
      return Array.from(cache).reduce<VerifyEmailsResponse>((obj, [key, value]) => {
        obj[key] = value
        return obj
      }, {})
    },
    options
  )
}

export default useVerifyEmailsMutation
