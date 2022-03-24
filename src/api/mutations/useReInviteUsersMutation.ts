import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { ReinviteUserResponse } from '../../types/api'

export const RE_INVITE_USERS_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'RE_INVITE_USERS_IN_ORGANIZATION']

const useReInviteUsersMutation = (
  options: Omit<
    UseMutationOptions<ReinviteUserResponse, unknown, string[], typeof RE_INVITE_USERS_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) =>
  useMutation(
    RE_INVITE_USERS_MUTATION_KEY,
    (organizationUserIds: string[]) =>
      axiosGrowthDay.post<ReinviteUserResponse>('/organizationUsers/reinvite', organizationUserIds),
    options
  )
export default useReInviteUsersMutation
