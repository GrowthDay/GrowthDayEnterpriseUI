import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import { useRecoilValue } from 'recoil'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import organizationIdState from '../../recoil/atoms/organizationIdState'
import { Organization } from '../../types/api'

export const ORGANIZATION_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'ORGANIZATION_QUERY_KEY']

const useOrganizationQuery = (
  options: Omit<
    UseQueryOptions<Organization, unknown, Organization, typeof ORGANIZATION_QUERY_KEY>,
    'queryKey' | 'queryFn'
  > = {}
) => {
  const organizationId = useRecoilValue(organizationIdState)
  return useQuery(ORGANIZATION_QUERY_KEY, () => axiosGrowthDay.get<Organization>('/organizations'), {
    enabled: Boolean(organizationId),
    ...options
  })
}

export default useOrganizationQuery
