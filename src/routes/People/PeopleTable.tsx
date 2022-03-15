import { DownloadOutlined, SearchOutlined } from '@mui/icons-material'
import { Button, InputAdornment, InputBase, MenuItem, Select, TextField, Typography } from '@mui/material'
import { GridColDef, GridRenderCellParams, GridValueGetterParams, useGridApiRef } from '@mui/x-data-grid-pro'
import { sample } from 'lodash-es'
import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import Flex from '../../components/Flex'
import TableGrid from '../../components/TableGrid'
import useMobileView from '../../hooks/useMobileView'
import { IUser } from '../../types/user'
import roles from '../../utils/roles'
import searchArray from '../../utils/searchArray'

export type PeopleTableProps = {
  showFullName?: boolean
  searchable?: boolean
  exportable?: boolean
  title?: ReactNode
  action?: ReactNode
  data: IUser[]
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

const PeopleTable: FC<PeopleTableProps> = ({ showFullName, searchable, exportable, title, action, data }) => {
  const apiRef = useGridApiRef()
  const mobileView = useMobileView()
  const [rows, setRows] = useState(data)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setRows(searchArray(data, searchTerm))
  }, [data, searchTerm])

  const columns: GridColDef[] = useMemo(
    () => [
      ...(showFullName
        ? [
            {
              field: 'fullName',
              headerName: 'Name',
              width: 240
            }
          ]
        : []),
      {
        field: 'email',
        headerName: 'Email',
        width: 400
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 160,
        editable: true,
        renderCell: renderRole,
        valueGetter: (params: GridValueGetterParams) => sample(roles)?.value
      }
    ],
    [showFullName]
  )

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
          {exportable && (
            <Button
              onClick={() => apiRef.current.exportDataAsCsv({ allColumns: true, includeHeaders: true })}
              startIcon={<DownloadOutlined fontSize="small" />}
              variant="outlined"
              sx={{ ml: 2, backgroundColor: (theme) => theme.palette.background.paper }}
            >
              {mobileView ? 'Export' : 'Export as CSV'}
            </Button>
          )}
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
      <TableGrid apiRef={apiRef} rows={rows} columns={columns} />
    </>
  )
}

export default PeopleTable
