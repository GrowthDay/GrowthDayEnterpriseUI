import { useReducer } from 'react'
import { useQueryClient } from 'react-query'
import useOrganizationUsersQuery, {
  getOrganizationUsersQueryKey,
  OrganizationUsersFilters
} from '../../../api/queries/useOrganizationUsersQuery'
import { PagedResultOrganizationUser } from '../../../types/api'
import { PaginationParams } from '../../../types/ui/pagination'

const defaultPageParams: PaginationParams = { page: 0, size: 10 }
const defaultFilters: OrganizationUsersFilters = {}

const usePeopleQuery = (initialPageParams?: PaginationParams, initialFilters?: OrganizationUsersFilters) => {
  const queryClient = useQueryClient()
  const [pageParams, setPageParams] = useReducer(
    (prevState: PaginationParams, input: Partial<PaginationParams>) => ({ ...prevState, ...input }),
    { ...defaultPageParams, ...initialPageParams }
  )

  const [filters, setFilters] = useReducer(
    (prevState: OrganizationUsersFilters, input: Partial<OrganizationUsersFilters>) => ({ ...prevState, ...input }),
    { ...defaultFilters, ...initialFilters }
  )

  const queryResult = useOrganizationUsersQuery(pageParams, filters)

  const defaultData = queryClient.getQueryData<PagedResultOrganizationUser>(
    getOrganizationUsersQueryKey(
      { ...defaultPageParams, ...initialPageParams },
      { ...defaultFilters, ...initialFilters }
    )
  )

  return { ...queryResult, defaultData, pageParams, setPageParams, filters, setFilters }
}

export default usePeopleQuery
