import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import useModifiedRecoilState from '../hooks/useModifiedRecoilState'
import accessTokenState from '../recoil/atoms/accessTokenState'
import { ILoginResponse } from '../types/login'

export const LOGOUT_QUERY_KEY = 'LOGOUT'

const useLogoutApi = () => {
  const [, , resetAccessToken] = useModifiedRecoilState(accessTokenState)
  const queryClient = useQueryClient()

  return useMutation([LOGOUT_QUERY_KEY], () => axios.post<ILoginResponse>('/logout'), {
    onSuccess: resetAccessToken
  })
}

export default useLogoutApi
