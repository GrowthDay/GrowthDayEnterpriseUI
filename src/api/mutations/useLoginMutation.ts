import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import { useSetRecoilState } from 'recoil'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import accessTokenState from '../../recoil/atoms/accessTokenState'
import { CodeForTokenRequest, LoginResponse } from '../../types/api'

export const LOGIN_QUERY_KEY = ['GROWTHDAY', 'MUTATION', 'LOGIN']

const useLoginMutation = (
  options: Omit<
    UseMutationOptions<LoginResponse, unknown, CodeForTokenRequest, typeof LOGIN_QUERY_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const setAccessToken = useSetRecoilState(accessTokenState)
  return useMutation(
    LOGIN_QUERY_KEY,
    (input: CodeForTokenRequest) => axiosGrowthDay.post<LoginResponse>('/login', input),
    {
      ...options,
      onSuccess: (data, ...rest) => {
        if (data?.authenticationToken) {
          setAccessToken(data.authenticationToken)
        }
        return options.onSuccess?.(data, ...rest)
      }
    }
  )
}

export default useLoginMutation
