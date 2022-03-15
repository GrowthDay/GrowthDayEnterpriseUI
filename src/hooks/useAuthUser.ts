import { useQueryClient } from 'react-query'
import { PROFILE_QUERY_KEY } from '../api/useMyProfileApi'
import { IUser } from '../types/user'

const useAuthUser = () => {
  const queryClient = useQueryClient()
  return queryClient.getQueryData<IUser>(PROFILE_QUERY_KEY)
}

export default useAuthUser
