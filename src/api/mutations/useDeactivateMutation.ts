import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { BASE_ORGANIZATION_USERS_QUERY_KEY } from '../queries/useOrganizationUsersQuery'

export const DEACTIVATE_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'DEACTIVATE']

const useDeactivateMutation = (
  options: Omit<
    UseMutationOptions<void, unknown, string[], typeof DEACTIVATE_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    DEACTIVATE_MUTATION_KEY,
    async (input: string[]) => axiosGrowthDay.post<void>('/organizationUsers/deactivate', input),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(BASE_ORGANIZATION_USERS_QUERY_KEY)
      },
      ...options
    }
  )
}
export default useDeactivateMutation
