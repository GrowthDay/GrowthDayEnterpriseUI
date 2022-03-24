import { omitBy, isUndefined, isString, isNull } from 'lodash-es'
import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { PagedResultOrganizationUser } from '../../types/api'
import { PaginationParams } from '../../types/ui/pagination'

export type OrganizationUsersRequest = {
  departmentId?: string
  invitationPending?: boolean
  order?: 'asc' | 'desc'
  query?: string
  roleId?: number
  sortBy?: 'createdOn' | 'name' | 'email' | 'roleName'
  limit: number
  offset: number
}

export type OrganizationUsersFilters = Omit<OrganizationUsersRequest, 'limit' | 'offset'>

const BASE_ORGANIZATION_USERS_QUERY = ['GROWTHDAY', 'QUERY', 'ORGANIZATION_USERS']

export const getOrganizationUsersQueryKey = (
  paginationParams: PaginationParams,
  filters: OrganizationUsersFilters = {}
) => [
  ...BASE_ORGANIZATION_USERS_QUERY,
  paginationParams,
  omitBy(filters, (value) => {
    if (isUndefined(value) || isNull(value)) {
      return true
    }
    if (isString(value)) {
      return value === ''
    }
    return false
  })
]

const useOrganizationUsersQuery = (
  params: PaginationParams,
  filters: OrganizationUsersFilters = {},
  options: Omit<
    UseQueryOptions<
      PagedResultOrganizationUser,
      unknown,
      PagedResultOrganizationUser,
      ReturnType<typeof getOrganizationUsersQueryKey>
    >,
    'queryKey' | 'queryFn'
  > = {}
) => {
  const queryKey = getOrganizationUsersQueryKey(params, filters)
  return useQuery(
    queryKey,
    () =>
      axiosGrowthDay.get<PagedResultOrganizationUser>('/organizationUsers', {
        params: {
          ...filters,
          offset: params.page * params.size + 1,
          limit: params.size
        }
      }),
    {
      keepPreviousData: true,
      ...options
    }
  )
}

export default useOrganizationUsersQuery
