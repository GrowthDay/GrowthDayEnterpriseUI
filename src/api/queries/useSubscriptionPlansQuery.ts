import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosStrapi from '../../axios/axiosStrapi'
import { ISubscriptionPlans } from '../../types/strapi'

export const SUBSCRIPTION_PLANS_QUERY_KEY = ['STRAPI', 'QUERY', 'SUBSCRIPTION_PLANS']

const useSubscriptionPlansQuery = (
  options: Omit<
    UseQueryOptions<ISubscriptionPlans[], unknown, ISubscriptionPlans[], typeof SUBSCRIPTION_PLANS_QUERY_KEY>,
    'queryKey' | 'queryFn'
  > = {}
) =>
  useQuery(
    SUBSCRIPTION_PLANS_QUERY_KEY,
    () => axiosStrapi.get<ISubscriptionPlans[]>('/subscription-plans', { params: { enterprise: true } }),
    {
      enabled: true,
      ...options
    }
  )

export default useSubscriptionPlansQuery
