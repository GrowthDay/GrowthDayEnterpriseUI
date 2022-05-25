import { CheckOutlined, CloseOutlined, SearchOutlined, SvgIconComponent } from '@mui/icons-material'
import { IconButton, InputAdornment, InputBase, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import { SelectInputProps } from '@mui/material/Select/SelectInput'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid-pro'
import { DataGridProProps } from '@mui/x-data-grid-pro/models'
import { GridColumns } from '@mui/x-data-grid/models/colDef/gridColDef'
import { Dispatch, FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import useUpdateUserRoleMutation from '../../../api/mutations/useUpdateUserRoleMutation'
import useOrganizationUserQuery from '../../../api/queries/useOrganizationUserQuery'
import { OrganizationUsersFilters, OrganizationUsersRequest } from '../../../api/queries/useOrganizationUsersQuery'
import Flex from '../../../components/Flex'
import TableGrid from '../../../components/TableGrid'
import { OrganizationUser } from '../../../types/api'
import { PaginationParams } from '../../../types/ui/pagination'
import roles, { renderRoleName, renderRoleNameById } from '../../../utils/roles'

export type PeopleTableProps = Partial<DataGridProProps> & {
  data?: OrganizationUser[]
  pageParams: PaginationParams
  setPageParams: Dispatch<Partial<PaginationParams>>
  filters: OrganizationUsersFilters
  setFilters: Dispatch<Partial<OrganizationUsersFilters>>
  showNameColumn?: boolean
  searchable?: boolean
  disableRoleChange?: boolean
  title?: ReactNode
  action?: ReactNode
  rowAction?: {
    onClick: (params: GridRenderCellParams) => void
    label: ReactNode
    when?: (params: GridRenderCellParams) => void
    icon?: SvgIconComponent
  }
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
      renderValue={(value) => renderRoleNameById(value)}
    >
      {roles.map((role) => (
        <MenuItem
          sx={{
            minWidth: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '&:not(.Mui-selected) .MuiSvgIcon-root': { display: 'none' }
          }}
          value={role.id}
          key={role.id}
        >
          {renderRoleName(role)} <CheckOutlined sx={{ ml: 2 }} color="primary" fontSize="small" />
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
  showNameColumn,
  searchable,
  action,
  data = [],
  rowAction,
  disableRoleChange,
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

  const columns = useMemo(
    () =>
      [
        ...(showNameColumn ? [{ field: 'name', headerName: 'Name', width: 240 }] : []),
        { field: 'email', headerName: 'Email', width: 400 },
        {
          field: 'roleName',
          headerName: 'Role',
          width: 160,
          renderCell: (props) => (disableRoleChange ? renderRoleNameById(props.row.roleId) : <RenderRole {...props} />),
          valueGetter: (params) => params.row.roleId
        },
        ...(rowAction
          ? [
              {
                field: 'action',
                headerName: '',
                sortable: false,
                minWidth: 50,
                flex: 1,
                align: 'right',
                resizable: false,
                renderCell: (params: GridRenderCellParams) => {
                  const canView = rowAction.when ? rowAction.when(params) : true
                  if (canView) {
                    const Icon = rowAction.icon || CloseOutlined
                    return (
                      <Tooltip disableInteractive title={rowAction.label ?? ''}>
                        <IconButton className="table-row-action" size="small" onClick={() => rowAction.onClick(params)}>
                          <Icon />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                  return null
                }
              }
            ]
          : [])
      ] as GridColumns,
    [disableRoleChange, showNameColumn, rowAction]
  )

  const handleSort = (model: GridSortModel) => {
    const sortBy = model[0]?.field as OrganizationUsersRequest['sortBy']
    const order = model[0]?.sort as OrganizationUsersRequest['order']
    setFilters({ sortBy, order })
  }

  const sortModel: GridSortModel = [{ field: filters.sortBy ?? '', sort: filters.order }]

  return (
    <>
      <Flex right={0} top={8} position="absolute" justifyContent="flex-end" alignItems="center">
        {action}
        {searchable && (
          <TextField
            size="medium"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value.replace(/[^A-Za-z0-9 +.@-]/g, ''))}
            sx={{
              ml: 2,
              backgroundColor: (theme) => theme.palette.background.paper,
              borderRadius: 4,
              px: 1,
              py: 0.25
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
            data-cy="people-table-search-input"
          />
        )}
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
