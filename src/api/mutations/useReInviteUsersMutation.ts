import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { ReinviteUserResponse } from '../../types/api'

export const RE_INVITE_USERS_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'RE_INVITE_USERS_IN_ORGANIZATION']

const useReInviteUsersMutation = (
  options: Omit<
    UseMutationOptions<ReinviteUserResponse, unknown, string[], typeof RE_INVITE_USERS_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    RE_INVITE_USERS_MUTATION_KEY,
    (organizationUserIds: string[]) =>
      axiosGrowthDay.post<ReinviteUserResponse>('/organizationUsers/reinvite', organizationUserIds),
    {
      ...options,
      onSuccess: (data, ...rest) => {
        console.log(data)
        return options.onSuccess?.(data, ...rest)
      }
    }
  )
}
export default useReInviteUsersMutation
