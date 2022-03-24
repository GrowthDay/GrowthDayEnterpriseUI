import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { OrganizationUser } from '../../types/api'

export const INVITE_USERS_IN_ORGANIZATION_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'INVITE_USERS_IN_ORGANIZATION']

const useInviteUsersInOrganizationMutation = (
  options: Omit<
    UseMutationOptions<void, unknown, Blob, typeof INVITE_USERS_IN_ORGANIZATION_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    INVITE_USERS_IN_ORGANIZATION_MUTATION_KEY,
    (file: Blob) => {
      console.log(file)
      const formData = new FormData()
      formData.append('file', file)
      return axiosGrowthDay.post<void>('/organizationUsers', formData)
    },
    {
      ...options,
      onSuccess: (data, ...rest) => {
        console.log(data)
        return options.onSuccess?.(data, ...rest)
      }
    }
  )
}
export default useInviteUsersInOrganizationMutation
