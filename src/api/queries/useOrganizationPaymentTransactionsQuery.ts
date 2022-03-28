import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { PaymentTransaction } from '../../types/api'

export const ORGANIZATION_PAYMENT_TRANSACTIONS_QUERY_KEY = [
  'GROWTHDAY',
  'QUERY',
  'ORGANIZATION_PAYMENT_TRANSACTIONS_QUERY_KEY'
]

const useOrganizationPaymentTransactionsQuery = (
  options: Omit<
    UseQueryOptions<
      PaymentTransaction[],
      unknown,
      PaymentTransaction[],
      typeof ORGANIZATION_PAYMENT_TRANSACTIONS_QUERY_KEY
    >,
    'queryKey' | 'queryFn'
  > = {}
) =>
  useQuery(
    ORGANIZATION_PAYMENT_TRANSACTIONS_QUERY_KEY,
    () => axiosGrowthDay.get<PaymentTransaction[]>('/transactions/organization'),
    options
  )

export default useOrganizationPaymentTransactionsQuery
