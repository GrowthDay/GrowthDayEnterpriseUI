import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { BASE_ORGANIZATION_USERS_QUERY_KEY } from '../queries/useOrganizationUsersQuery'

export const REVOKE_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'REVOKE']

const useRevokeMutation = (
  options: Omit<
    UseMutationOptions<void, unknown, string[], typeof REVOKE_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    REVOKE_MUTATION_KEY,
    async (input: string[]) => axiosGrowthDay.post<void>('/organizationUsers/revokeInvitation', input),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(BASE_ORGANIZATION_USERS_QUERY_KEY)
      },
      ...options
    }
  )
}
export default useRevokeMutation
