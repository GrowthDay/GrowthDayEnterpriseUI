import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import useActiveSubscription from '../../hooks/useActiveSubscription'
import { UserTour, UserTourRequest } from '../../types/api'
import { EnumTooltipsTrigger } from '../../types/strapi'

export type UserTourQuery = Pick<UserTourRequest, 'trigger' | 'triggerId'>

export const USER_TOUR_BASE_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'USER_TOUR']

export const getUserTourQueryKey = (variables: UserTourQuery) => [...USER_TOUR_BASE_QUERY_KEY, variables]

const useUserTourQuery = (
  options: Omit<
    UseQueryOptions<UserTour, unknown, UserTour, ReturnType<typeof getUserTourQueryKey>>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const { subscription: activeSubscription, isLoading: subscriptionLoading } = useActiveSubscription()
  const variables = {
    trigger: EnumTooltipsTrigger.ON_ENTERPRISE_DASHBOARD_LOAD,
    triggerId: activeSubscription?.id?.toString() ?? ''
  } as UserTourRequest
  const result = useQuery(
    getUserTourQueryKey(variables),
    () => axiosGrowthDay.get<UserTour[]>('/userTour', { params: variables }).then((data) => data[0]),
    { enabled: !subscriptionLoading, ...options }
  )
  return useMemo(
    () => ({ ...result, isLoading: result.isLoading || subscriptionLoading }),
    [result, subscriptionLoading]
  )
}

export default useUserTourQuery
