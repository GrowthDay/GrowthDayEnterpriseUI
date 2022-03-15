import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../axios/axiosGrowthDay'
import useModifiedRecoilState from '../hooks/useModifiedRecoilState'
import accessTokenState from '../recoil/atoms/accessTokenState'
import { ILoginRequest, ILoginResponse } from '../types/login'

export const LOGIN_QUERY_KEY = 'GROWTHDAY:LOGIN'

const useLoginApi = (
  options: Omit<
    UseMutationOptions<ILoginResponse, unknown, ILoginRequest, typeof LOGIN_QUERY_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const [, setAccessToken] = useModifiedRecoilState(accessTokenState)
  return useMutation(LOGIN_QUERY_KEY, (input: ILoginRequest) => axiosGrowthDay.post<ILoginResponse>('/login', input), {
    onSuccess: (data) => {
      if (data?.authenticationToken) {
        setAccessToken(data.authenticationToken)
      }
    },
    ...options
  })
}

export default useLoginApi
