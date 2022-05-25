import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { PagedResultPaymentTransaction } from '../../types/api'
import { PaginationParams } from '../../types/ui/pagination'

export const ORGANIZATION_PAYMENT_TRANSACTIONS_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'ORGANIZATION_PAYMENT_TRANSACTIONS']

export const getPaymentTransactionsQueryKey = (pageParams: PaginationParams) => [
  ...ORGANIZATION_PAYMENT_TRANSACTIONS_QUERY_KEY,
  pageParams
]

const useOrganizationPaymentTransactionsQuery = (
  pageParams: PaginationParams,
  options: Omit<
    UseQueryOptions<
      PagedResultPaymentTransaction,
      unknown,
      PagedResultPaymentTransaction,
      ReturnType<typeof getPaymentTransactionsQueryKey>
    >,
    'queryKey' | 'queryFn'
  > = {}
) =>
  useQuery(
    getPaymentTransactionsQueryKey(pageParams),
    () =>
      axiosGrowthDay.get<PagedResultPaymentTransaction>('/transactions/organization/pagination', {
        params: {
          offset: pageParams.page + 1,
          limit: pageParams.size
        }
      }),
    {
      keepPreviousData: true,
      ...options
    }
  )

export default useOrganizationPaymentTransactionsQuery
