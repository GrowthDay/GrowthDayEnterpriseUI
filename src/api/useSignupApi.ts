import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../axios/axiosGrowthDay'
import useModifiedRecoilState from '../hooks/useModifiedRecoilState'
import accessTokenState from '../recoil/atoms/accessTokenState'
import { ISignupRequest, ISignupResponse } from '../types/signup'

export const SIGNUP_QUERY_KEY = 'GROWTHDAY:SIGNUP'

const useSignupApi = (
  options: Omit<
    UseMutationOptions<ISignupResponse, unknown, ISignupRequest, typeof SIGNUP_QUERY_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const [, setAccessToken] = useModifiedRecoilState(accessTokenState)
  return useMutation(
    SIGNUP_QUERY_KEY,
    (input: ISignupRequest) => axiosGrowthDay.post<ISignupResponse>('/register', input),
    {
      onSuccess: (data) => {
        if (data?.authenticationToken) {
          setAccessToken(data.authenticationToken)
        }
      },
      ...options
    }
  )
}
export default useSignupApi
