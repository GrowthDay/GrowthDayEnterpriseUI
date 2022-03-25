import { DownloadOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { FC } from 'react'
import useExportOrganizationUsersMutation from '../../api/mutations/useExportOrganizationUsersMutation'
import useMobileView from '../../hooks/useMobileView'
import PeopleEmptyState from './PeopleEmptyState'
import PeopleTable, { PeopleTableProps } from './PeopleTable'

// Todo: Download csv file from backend

const MembersTab: FC<PeopleTableProps> = (props) => {
  const mobileView = useMobileView()
  const { mutateAsync, isLoading } = useExportOrganizationUsersMutation()

  const action = (
    <LoadingButton
      loading={isLoading}
      onClick={() => mutateAsync()}
      startIcon={<DownloadOutlined fontSize="small" />}
      variant="outlined"
      sx={{ ml: 2, backgroundColor: (theme) => theme.palette.background.paper }}
    >
      {mobileView ? 'Export' : 'Export as XLSX'}
    </LoadingButton>
  )

  if (!props.data?.length && !props.filters.query) {
    return <PeopleEmptyState />
  }

  return <PeopleTable {...props} action={action} showName searchable title="Members using GrowthDay" />
}

export default MembersTab
