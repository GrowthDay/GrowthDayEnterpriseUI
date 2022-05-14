import { DeleteOutlined, FileDownloadOutlined, KeyboardArrowDownOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, Menu, MenuItem } from '@mui/material'
import { GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid-pro'
import { keyBy } from 'lodash-es'
import { bindTrigger } from 'material-ui-popup-state'
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks'
import { FC, useMemo, useState } from 'react'
import useExportOrganizationUsersMutation from '../../../api/mutations/useExportOrganizationUsersMutation'
import useOrganizationUserQuery from '../../../api/queries/useOrganizationUserQuery'
import { ExportType } from '../../../api/queries/useOrganizationUsersQuery'
import { OrganizationUser } from '../../../types/api'
import DeactivateAccountDialog from './DeactivateAccountDialog'
import PeopleEmptyState from './PeopleEmptyState'
import PeopleTable, { PeopleTableProps } from './PeopleTable'

const MembersTab: FC<PeopleTableProps> = (props) => {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const { data: user } = useOrganizationUserQuery()
  const { mutateAsync: downloadMembersTable, isLoading } = useExportOrganizationUsersMutation()
  const [deactivateMembers, setDeactivateMembers] = useState<OrganizationUser | OrganizationUser[]>()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'download-members-table-menu'
  })

  const handleMenuItemClick = (exportType: ExportType) => {
    downloadMembersTable(exportType)
    popupState.close()
  }

  const handleSetSelectionDeactivate = () => {
    const dataMap = keyBy(props.data, 'id')
    setDeactivateMembers(selectionModel.map((id) => dataMap[id]).filter(Boolean))
  }

  const action = (
    <>
      <LoadingButton
        {...bindTrigger(popupState)}
        loading={isLoading}
        startIcon={<FileDownloadOutlined />}
        endIcon={<KeyboardArrowDownOutlined />}
        variant="outlined"
        sx={{ ml: 2, backgroundColor: (theme) => theme.palette.background.paper }}
        data-cy="people-members-export-button"
      >
        Download
      </LoadingButton>
      <Button
        disabled={!selectionModel.length}
        onClick={handleSetSelectionDeactivate}
        startIcon={<DeleteOutlined />}
        variant="outlined"
        sx={{ ml: 2, backgroundColor: (theme) => theme.palette.background.paper }}
        data-cy="people-pending-revoke-button"
      >
        Deactivate
      </Button>
    </>
  )

  const rowAction = useMemo(
    () => ({
      onClick: (params: GridRenderCellParams) => setDeactivateMembers(params.row),
      when: (params: GridRenderCellParams) => params.row.id !== user?.id,
      label: 'Deactivate account'
    }),
    [user]
  )

  if (!props.data?.length && !props.filters.query) {
    return <PeopleEmptyState />
  }

  return (
    <>
      <DeactivateAccountDialog
        users={deactivateMembers}
        open={Boolean(deactivateMembers)}
        onClose={() => setDeactivateMembers(undefined)}
      />
      <Menu {...bindPopover(popupState)} PaperProps={{ sx: { width: 140 } }}>
        <MenuItem disabled={isLoading} onClick={() => handleMenuItemClick(ExportType.XLSX)}>
          XLSX
        </MenuItem>
        <MenuItem disabled={isLoading} onClick={() => handleMenuItemClick(ExportType.CSV)}>
          CSV
        </MenuItem>
      </Menu>
      <PeopleTable
        {...props}
        isRowSelectable={(params) => params.row.id !== user?.id}
        checkboxSelection
        onSelectionModelChange={setSelectionModel}
        selectionModel={selectionModel}
        action={action}
        showNameColumn
        searchable
        rowAction={rowAction}
      />
    </>
  )
}

export default MembersTab
