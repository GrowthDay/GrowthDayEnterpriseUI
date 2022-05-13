import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import { useResetRecoilState } from 'recoil'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import accessTokenState from '../../recoil/atoms/accessTokenState'
import organizationIdState from '../../recoil/atoms/organizationIdState'

export const LOGOUT_QUERY_KEY = ['GROWTHDAY', 'MUTATION', 'LOGOUT']

const useLogoutMutation = (
  options: Omit<UseMutationOptions<void, unknown, void, typeof LOGOUT_QUERY_KEY>, 'mutationKey' | 'mutationFn'> = {}
) => {
  const resetAccessToken = useResetRecoilState(accessTokenState)
  const resetOrganizationId = useResetRecoilState(organizationIdState)
  return useMutation(LOGOUT_QUERY_KEY, () => axiosGrowthDay.post<void>('/logout'), {
    onSuccess: () => {
      resetOrganizationId()
      resetAccessToken()
    },
    ...options
  })
}

export default useLogoutMutation
