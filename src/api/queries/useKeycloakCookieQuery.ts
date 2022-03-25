import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'

export const KEYCLOAK_COOKIE_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'KEYCLOAK_COOKIE']

const useKeycloakCookieQuery = (
  options: Omit<
    UseQueryOptions<void, unknown, void, typeof KEYCLOAK_COOKIE_QUERY_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => useQuery(KEYCLOAK_COOKIE_QUERY_KEY, () => axiosGrowthDay.get<void>('/me/keycloak'), options)

export default useKeycloakCookieQuery
