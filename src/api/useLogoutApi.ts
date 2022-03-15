import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../axios/axiosGrowthDay'
import useModifiedRecoilState from '../hooks/useModifiedRecoilState'
import accessTokenState from '../recoil/atoms/accessTokenState'

export const LOGOUT_QUERY_KEY = 'GROWTHDAY:LOGOUT'

const useLogoutApi = (
  options: Omit<UseMutationOptions<void, unknown, void, typeof LOGOUT_QUERY_KEY>, 'mutationKey' | 'mutationFn'> = {}
) => {
  const [, , resetAccessToken] = useModifiedRecoilState(accessTokenState)
  return useMutation(LOGOUT_QUERY_KEY, () => axiosGrowthDay.post<void>('/logout'), {
    onSuccess: resetAccessToken,
    ...options
  })
}

export default useLogoutApi
