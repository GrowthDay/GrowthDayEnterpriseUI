import { useQueryClient } from 'react-query'
import { ORGANIZATION_USER_QUERY_KEY, IUser } from '../api/queries/useOrganizationUserQuery'

const useAuthUser = () => {
  const queryClient = useQueryClient()
  return queryClient.getQueryData<IUser>(ORGANIZATION_USER_QUERY_KEY)
}

export default useAuthUser
