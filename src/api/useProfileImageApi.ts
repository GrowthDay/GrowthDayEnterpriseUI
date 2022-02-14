import axios from 'axios'
import { useQuery } from 'react-query'

export const PROFILE_IMAGE_QUERY_KEY = 'PROFILE_IMAGE'

const useProfileImageApi = () =>
  useQuery(
    [PROFILE_IMAGE_QUERY_KEY],
    () => axios.get<{ profilePicUrl: string }>('/users/profilePic').then((res) => res.profilePicUrl),
    {
      cacheTime: 1000 * 60 * 5
    }
  )

export default useProfileImageApi
