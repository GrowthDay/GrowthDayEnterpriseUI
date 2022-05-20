import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { PagedResultOrganizationUser, RoleUpdateRequest } from '../../types/api'
import roles from '../../utils/roles'
import { BASE_ORGANIZATION_USERS_QUERY_KEY } from '../queries/useOrganizationUsersQuery'

export const UPDATE_USER_ROLE_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'UPDATE_USER_ROLE']

const useUpdateUserRoleMutation = (
  options: Omit<
    UseMutationOptions<void, unknown, RoleUpdateRequest, typeof UPDATE_USER_ROLE_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    UPDATE_USER_ROLE_MUTATION_KEY,
    (input: RoleUpdateRequest) => axiosGrowthDay.put<void>('/organizationUsers/role', input),
    {
      onSuccess: (data, variables) => {
        const queriesData = queryClient.getQueriesData<PagedResultOrganizationUser>(BASE_ORGANIZATION_USERS_QUERY_KEY)
        queriesData.forEach(([queryKey, data]) => {
          if (data.results) {
            const index = data.results.findIndex((user) => user.id === variables.organizationUserIds?.[0])
            if (index > -1) {
              const user = { ...data.results[index] }
              user.roleId = variables.roleId
              user.roleName = roles.find((role) => role.id === variables.roleId)?.name
              const results = [...data.results]
              results[index] = user
              queryClient.setQueryData<PagedResultOrganizationUser>(queryKey, { ...data, results })
            }
          }
        })
      },
      ...options
    }
  )
}
export default useUpdateUserRoleMutation
