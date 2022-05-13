import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { UserTour, UserTourRequest } from '../../types/api'
import { USER_TOUR_QUERY_KEY } from '../queries/useUserTourQuery'

export const CREATE_USER_TOUR_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'CREATE_USER_TOUR']

const useCreateUserTourMutation = (
  options: Omit<
    UseMutationOptions<UserTour, unknown, UserTourRequest, typeof CREATE_USER_TOUR_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    CREATE_USER_TOUR_MUTATION_KEY,
    (input: UserTourRequest) => axiosGrowthDay.post<UserTour>('/userTour', input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(USER_TOUR_QUERY_KEY)
      },
      ...options
    }
  )
}
export default useCreateUserTourMutation
