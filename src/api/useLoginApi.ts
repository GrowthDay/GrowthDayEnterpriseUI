import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import useModifiedRecoilState from '../hooks/useModifiedRecoilState'
import accessTokenState from '../recoil/atoms/accessTokenState'
import { ILoginRequest, ILoginResponse } from '../types/login'

export const LOGIN_QUERY_KEY = 'LOGIN'

const useLoginApi = () => {
  const [, setAccessToken] = useModifiedRecoilState(accessTokenState)
  const queryClient = useQueryClient()

  return useMutation([LOGIN_QUERY_KEY], (input: ILoginRequest) => axios.post<ILoginResponse>('/login', input), {
    onSuccess: (data) => {
      if (data?.authenticationToken) {
        setAccessToken(data.authenticationToken)
      }
    }
  })
}

export default useLoginApi
