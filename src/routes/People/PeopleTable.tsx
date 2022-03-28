import { SearchOutlined } from '@mui/icons-material'
import { InputAdornment, InputBase, MenuItem, Select, TextField, Typography } from '@mui/material'
import { SelectInputProps } from '@mui/material/Select/SelectInput'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid-pro'
import { DataGridProProps } from '@mui/x-data-grid-pro/models'
import { GridColumns } from '@mui/x-data-grid/models/colDef/gridColDef'
import { Dispatch, FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import useUpdateUserRoleMutation from '../../api/mutations/useUpdateUserRoleMutation'
import useOrganizationUserQuery from '../../api/queries/useOrganizationUserQuery'
import { OrganizationUsersFilters, OrganizationUsersRequest } from '../../api/queries/useOrganizationUsersQuery'
import Flex from '../../components/Flex'
import TableGrid from '../../components/TableGrid'
import { OrganizationUser } from '../../types/api'
import { PaginationParams } from '../../types/ui/pagination'
import roles, { renderRoleName } from '../../utils/roles'

export type PeopleTableProps = Partial<DataGridProProps> & {
  data?: OrganizationUser[]
  pageParams: PaginationParams
  setPageParams: Dispatch<Partial<PaginationParams>>
  filters: OrganizationUsersFilters
  setFilters: Dispatch<Partial<OrganizationUsersFilters>>
  showName?: boolean
  searchable?: boolean
  title?: ReactNode
  action?: ReactNode
}

const RenderRole = (params: GridRenderCellParams<number, OrganizationUser>) => {
  const { data: user } = useOrganizationUserQuery()
  const { mutateAsync } = useUpdateUserRoleMutation()
  const onChange: SelectInputProps<number>['onChange'] = (event) => {
    mutateAsync({
      roleId: event.target.value as number,
      organizationUserIds: [params.row.id ?? '']
    })
  }
  return (
    <Select
      disabled={user?.id === params.id}
      onChange={onChange}
      value={params.value}
      input={<InputBase />}
      MenuProps={{ PaperProps: { elevation: 4 } }}
    >
      {roles.map((role) => (
        <MenuItem value={role.id} key={role.id}>
          {renderRoleName(role)}
        </MenuItem>
      ))}
    </Select>
  )
}

const PeopleTable: FC<PeopleTableProps> = ({
  pageParams,
  setPageParams,
  filters,
  setFilters,
  showName,
  searchable,
  title,
  action,
  data = [],
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearch = useDebouncedCallback((query: string) => {
    setFilters({ query })
  }, 1000)

  useEffect(() => {
    setSearchTerm(filters.query ?? '')
  }, [filters.query])

  useEffect(() => {
    debouncedSearch(searchTerm)
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch, searchTerm])

  const columns: GridColumns = useMemo(
    () => [
      ...(showName ? [{ field: 'name', headerName: 'Name', width: 240 }] : []),
      { field: 'email', headerName: 'Email', width: 400 },
      {
        field: 'roleName',
        headerName: 'Role',
        width: 160,
        renderCell: (props) => <RenderRole {...props} />,
        valueGetter: (params) => params.row.roleId
      }
    ],
    [showName]
  )

  const handleSort = (model: GridSortModel) => {
    const sortBy = model[0]?.field as OrganizationUsersRequest['sortBy']
    const order = model[0]?.sort as OrganizationUsersRequest['order']
    setFilters({ sortBy, order })
  }

  const sortModel: GridSortModel = [{ field: filters.sortBy ?? '', sort: filters.order }]

  return (
    <>
      <Flex
        flexDirection={{
          xs: 'column',
          md: 'row'
        }}
        mb={2}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
      >
        <Typography sx={{ mb: { xs: 1, md: 0 } }} variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Flex justifyContent="flex-end" alignItems="center">
          {action}
          {searchable && (
            <TextField
              size="medium"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              sx={{
                ml: 2,
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: 4,
                px: 1
              }}
              type="search"
              placeholder="Search"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined fontSize="small" />
                  </InputAdornment>
                )
              }}
              variant="standard"
            />
          )}
        </Flex>
      </Flex>
      <TableGrid
        sortModel={sortModel}
        onSortModelChange={handleSort}
        localeText={{
          noRowsLabel: filters.query ? `No users found matching the search term "${filters.query}"` : 'No users'
        }}
        sortingMode="server"
        paginationMode="server"
        page={pageParams.page}
        onPageChange={(page) => setPageParams({ page })}
        pageSize={pageParams.size}
        onPageSizeChange={(size) => setPageParams({ size })}
        rows={data}
        columns={columns}
        {...props}
      />
    </>
  )
}

export default PeopleTable
