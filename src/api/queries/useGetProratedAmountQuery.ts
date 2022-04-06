import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { OrganizationUpdateSubscription, StripeTaxResponse } from '../../types/api'

export const GET_PRORATED_AMOUNT_BASE_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'GET_PRORATED_AMOUNT']
export const getProratedAmountBaseQueryKey = (variables: OrganizationUpdateSubscription) => [
  ...GET_PRORATED_AMOUNT_BASE_QUERY_KEY,
  variables
]

const useGetProratedAmountQuery = (
  variables: OrganizationUpdateSubscription,
  options: Omit<
    UseQueryOptions<StripeTaxResponse, unknown, StripeTaxResponse, ReturnType<typeof getProratedAmountBaseQueryKey>>,
    'queryKey' | 'queryFn'
  > = {}
) =>
  useQuery(
    getProratedAmountBaseQueryKey(variables),
    () => axiosGrowthDay.post<StripeTaxResponse>('/organizations/prorated-amount', variables),
    options
  )

export default useGetProratedAmountQuery
