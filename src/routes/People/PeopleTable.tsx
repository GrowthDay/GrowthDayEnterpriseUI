import { SearchOutlined } from '@mui/icons-material'
import { Box, InputAdornment, InputBase, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid-pro'
import { DataGridProProps } from '@mui/x-data-grid-pro/models'
import { Dispatch, FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { OrganizationUsersFilters, OrganizationUsersRequest } from '../../api/queries/useOrganizationUsersQuery'
import Flex from '../../components/Flex'
import TableGrid from '../../components/TableGrid'
import { OrganizationUser } from '../../types/api'
import { PaginationParams } from '../../types/ui/pagination'
import roles from '../../utils/roles'

export type PeopleTableProps = Partial<DataGridProProps> & {
  totalRecords?: number
  data?: OrganizationUser[]
  loading: boolean
  pageParams: PaginationParams
  setPageParams: Dispatch<Partial<PaginationParams>>
  filters: OrganizationUsersFilters
  setFilters: Dispatch<Partial<OrganizationUsersFilters>>
  showName?: boolean
  searchable?: boolean
  title?: ReactNode
  action?: ReactNode
}

const renderRole = (params: GridRenderCellParams) => (
  <Select value={params.value} input={<InputBase />} MenuProps={{ PaperProps: { elevation: 4 } }}>
    {roles.map((role) => (
      <MenuItem value={role.value} key={role.value}>
        {role.label}
      </MenuItem>
    ))}
  </Select>
)

const PeopleTable: FC<PeopleTableProps> = ({
  totalRecords,
  pageParams,
  setPageParams,
  filters,
  setFilters,
  loading,
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

  const columns: GridColDef[] = useMemo(
    () => [
      ...(showName ? [{ field: 'name', headerName: 'Name', width: 240 }] : []),
      { field: 'email', headerName: 'Email', width: 400 },
      {
        field: 'roleName',
        headerName: 'Role',
        width: 160,
        renderCell: renderRole,
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
      <Box position="relative">
        {loading && (
          <LinearProgress
            sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, borderRadius: '4px 4px 0 0' }}
          />
        )}
        <TableGrid
          sx={{ '.MuiDataGrid-cell, .MuiDataGrid-columnHeader': { outline: 'none!important' } }}
          sortModel={sortModel}
          onSortModelChange={handleSort}
          localeText={{
            noRowsLabel: filters.query ? `No users found matching the search term "${filters.query}"` : 'No users'
          }}
          pagination
          rowCount={totalRecords}
          paginationMode="server"
          page={pageParams.page}
          onPageChange={(page) => setPageParams({ page })}
          pageSize={pageParams.size}
          onPageSizeChange={(size) => setPageParams({ size })}
          rows={data}
          columns={columns}
          {...props}
        />
      </Box>
    </>
  )
}

export default PeopleTable
