import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { UserTour, UserTourRequest } from '../../types/api'
import { USER_TOUR_QUERY_KEY } from '../queries/useUserTourQuery'

export const END_USER_TOUR_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'END_TOUR']

const useEndUserTourMutation = (
  options: Omit<
    UseMutationOptions<UserTour, unknown, UserTourRequest, typeof END_USER_TOUR_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    END_USER_TOUR_MUTATION_KEY,
    (input: UserTourRequest) => axiosGrowthDay.put<UserTour>('/userTour/endTour', input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USER_TOUR_QUERY_KEY)
      },
      ...options
    }
  )
}
export default useEndUserTourMutation
