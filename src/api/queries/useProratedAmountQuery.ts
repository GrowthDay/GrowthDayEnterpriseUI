import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { OrganizationUpdateSubscription, StripeTaxResponse } from '../../types/api'

export const PRORATED_AMOUNT_BASE_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'PRORATED_AMOUNT']
export const getProratedAmountQueryKey = (variables: OrganizationUpdateSubscription) => [
  ...PRORATED_AMOUNT_BASE_QUERY_KEY,
  variables
]

const useProratedAmountQuery = (
  variables: OrganizationUpdateSubscription,
  options: Omit<
    UseQueryOptions<StripeTaxResponse, unknown, StripeTaxResponse, ReturnType<typeof getProratedAmountQueryKey>>,
    'queryKey' | 'queryFn'
  > = {}
) =>
  useQuery(
    getProratedAmountQueryKey(variables),
    () => axiosGrowthDay.post<StripeTaxResponse>('/organizations/prorated-amount', variables),
    options
  )

export default useProratedAmountQuery
