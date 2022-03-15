import { useRef } from 'react'
import { QueryClient, QueryObserverOptions } from 'react-query'
import accessTokenState from '../recoil/atoms/accessTokenState'
import useModifiedRecoilState from './useModifiedRecoilState'
import useOnlineStatus from './useOnlineStatus'
import useUpdateEffect from './useUpdateEffect'

const getDefaultOptions = (enabled: boolean): QueryObserverOptions => ({
  cacheTime: 1000 * 60 * 60,
  refetchOnWindowFocus: false,
  retry: false,
  staleTime: Infinity,
  enabled
})

const useAuthorizedQueryClient = () => {
  const [accessToken] = useModifiedRecoilState(accessTokenState)
  const isOnline = useOnlineStatus()
  const isEnabled = Boolean(accessToken && isOnline)

  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: getDefaultOptions(isEnabled)
      }
    })
  ).current

  useUpdateEffect(() => {
    if (queryClient.getDefaultOptions().queries?.enabled !== isEnabled) {
      queryClient.setDefaultOptions({ queries: getDefaultOptions(isEnabled) })
    }
  }, [isEnabled])

  useUpdateEffect(() => {
    queryClient.invalidateQueries()
  }, [accessToken])

  return queryClient
}

export default useAuthorizedQueryClient
