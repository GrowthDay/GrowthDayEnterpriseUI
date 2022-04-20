import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { UserTour, UserTourRequest } from '../../types/api'
import { EnumTooltipsTrigger } from '../../types/strapi'

export const USER_TOUR_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'USER_TOUR']

const useUserTourQuery = (
  options: Omit<
    UseQueryOptions<UserTour, unknown, UserTour, typeof USER_TOUR_QUERY_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const variables = {
    trigger: EnumTooltipsTrigger.ON_ENTERPRISE_DASHBOARD_LOAD
  } as UserTourRequest
  return useQuery(
    USER_TOUR_QUERY_KEY,
    () => axiosGrowthDay.get<UserTour[]>('/userTour', { params: variables }).then((data) => data[0]),
    options
  )
}

export default useUserTourQuery
