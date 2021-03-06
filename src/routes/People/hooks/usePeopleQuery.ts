import { useReducer } from 'react'
import { useQueryClient } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import useOrganizationUsersQuery, {
  getOrganizationUsersQueryKey,
  OrganizationUsersFilters
} from '../../../api/queries/useOrganizationUsersQuery'
import usePageParams from '../../../hooks/usePageParams'
import { PagedResultOrganizationUser } from '../../../types/api'
import { PaginationParams } from '../../../types/ui/pagination'

const defaultFilters: OrganizationUsersFilters = {}

const usePeopleQuery = (
  initialPageParams?: PaginationParams,
  initialFilters?: OrganizationUsersFilters,
  options?: Omit<
    UseQueryOptions<
      PagedResultOrganizationUser,
      unknown,
      PagedResultOrganizationUser,
      ReturnType<typeof getOrganizationUsersQueryKey>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const queryClient = useQueryClient()

  const { defaultPageParams, pageParams, setPageParams } = usePageParams(initialPageParams)

  const [filters, setFilters] = useReducer(
    (prevState: OrganizationUsersFilters, input: Partial<OrganizationUsersFilters>) => ({ ...prevState, ...input }),
    { ...defaultFilters, ...initialFilters }
  )

  const queryResult = useOrganizationUsersQuery(pageParams, filters, options)

  const defaultData = queryClient.getQueryData<PagedResultOrganizationUser>(
    getOrganizationUsersQueryKey(
      { ...defaultPageParams, ...initialPageParams },
      { ...defaultFilters, ...initialFilters }
    )
  )

  return { ...queryResult, defaultData, pageParams, setPageParams, filters, setFilters }
}

export default usePeopleQuery
