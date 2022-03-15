import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../axios/axiosGrowthDay'
import useAuthUser from '../hooks/useAuthUser'

export const PROFILE_IMAGE_QUERY_KEY = 'GROWTHDAY:PROFILE_IMAGE'

const useProfileImageApi = (
  options: Omit<UseQueryOptions<string, unknown, string, typeof PROFILE_IMAGE_QUERY_KEY>, 'queryKey' | 'queryFn'> = {}
) => {
  const user = useAuthUser()
  return useQuery(
    PROFILE_IMAGE_QUERY_KEY,
    () => axiosGrowthDay.get<{ profilePicUrl: string }>('/users/profilePic').then((res) => res.profilePicUrl),
    {
      enabled: Boolean(user?.profileImageKey),
      ...options
    }
  )
}

export default useProfileImageApi
