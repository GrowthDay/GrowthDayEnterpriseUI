import { FileDownloadOutlined, KeyboardArrowDownOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Menu, MenuItem } from '@mui/material'
import { bindTrigger } from 'material-ui-popup-state'
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks'
import { FC } from 'react'
import useExportOrganizationUsersMutation from '../../../api/mutations/useExportOrganizationUsersMutation'
import { ExportType } from '../../../api/queries/useOrganizationUsersQuery'
import PeopleEmptyState from './PeopleEmptyState'
import PeopleTable, { PeopleTableProps } from './PeopleTable'

const MembersTab: FC<PeopleTableProps> = (props) => {
  const { mutateAsync: downloadMembersTable, isLoading } = useExportOrganizationUsersMutation()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'download-members-table-menu'
  })

  const handleMenuItemClick = (exportType: ExportType) => {
    downloadMembersTable(exportType)
    popupState.close()
  }

  const action = (
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
  )

  if (!props.data?.length && !props.filters.query) {
    return <PeopleEmptyState />
  }

  return (
    <>
      <Menu {...bindPopover(popupState)} PaperProps={{ sx: { width: 140 } }}>
        <MenuItem disabled={isLoading} onClick={() => handleMenuItemClick(ExportType.XLSX)}>
          XLSX
        </MenuItem>
        <MenuItem disabled={isLoading} onClick={() => handleMenuItemClick(ExportType.CSV)}>
          CSV
        </MenuItem>
      </Menu>
      <PeopleTable {...props} action={action} showName searchable title="Members using GrowthDay" />
    </>
  )
}

export default MembersTab
