import { CheckOutlined, DeleteOutlined, SendOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, Popover, Typography } from '@mui/material'
import { GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid-pro'
import { keyBy } from 'lodash-es'
import { bindTrigger } from 'material-ui-popup-state'
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks'
import { FC, useMemo, useState } from 'react'
import useReInviteUsersMutation from '../../../api/mutations/useReInviteUsersMutation'
import Flex from '../../../components/Flex'
import useIsMounted from '../../../hooks/useIsMounted'
import { OrganizationUser } from '../../../types/api'
import PeopleEmptyState, { PeopleEmptyStateType } from './PeopleEmptyState'
import PeopleTable, { PeopleTableProps } from './PeopleTable'
import RevokeInviteDialog from './RevokeInviteDialog'

const PendingInvitationsTab: FC<PeopleTableProps> = (props) => {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const isMounted = useIsMounted()
  const [hasSent, setHasSent] = useState(false)
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'pending-invitation-resend'
  })
  const [revokeMembers, setRevokeMembers] = useState<OrganizationUser | OrganizationUser[]>()
  const { mutateAsync, isLoading } = useReInviteUsersMutation()

  const handleSetSelectionRevoke = () => {
    const dataMap = keyBy(props.data, 'id')
    setRevokeMembers(selectionModel.map((id) => dataMap[id]).filter(Boolean))
  }

  const action = (
    <>
      <LoadingButton
        disabled={!selectionModel.length}
        loading={isLoading}
        {...bindTrigger(popupState)}
        {...(hasSent || isLoading ? { onClick: undefined, disableRipple: true } : {})}
        startIcon={
          hasSent ? (
            <CheckOutlined color="success" />
          ) : (
            <SendOutlined sx={{ transform: 'rotate(-45deg)', mt: -0.5, fontSize: '1rem!important' }} />
          )
        }
        variant="outlined"
        sx={{ ml: 2, backgroundColor: (theme) => theme.palette.background.paper }}
        data-cy="people-pending-reinvite-button"
      >
        {hasSent ? 'Sent' : 'Re-Invite'}
      </LoadingButton>
      <Button
        disabled={!selectionModel.length}
        onClick={handleSetSelectionRevoke}
        startIcon={<DeleteOutlined />}
        variant="outlined"
        sx={{ ml: 2, backgroundColor: (theme) => theme.palette.background.paper }}
        data-cy="people-pending-revoke-button"
      >
        Revoke
      </Button>
    </>
  )

  const rowAction = useMemo(
    () => ({
      onClick: (params: GridRenderCellParams) => setRevokeMembers(params.row),
      label: 'Revoke invite'
    }),
    []
  )

  const handleSend = async () => {
    if (!isLoading) {
      popupState.close()
      await mutateAsync(selectionModel as string[])
      setSelectionModel([])
      setHasSent(true)
      setTimeout(() => {
        if (isMounted.current) {
          setHasSent(false)
        }
      }, 5000)
    }
  }

  if (!props.data?.length && !props.filters.query) {
    return <PeopleEmptyState type={PeopleEmptyStateType.PENDING} />
  }

  return (
    <>
      <RevokeInviteDialog
        users={revokeMembers}
        open={Boolean(revokeMembers)}
        onClose={() => setRevokeMembers(undefined)}
      />
      <Popover
        {...bindPopover(popupState)}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        PaperProps={{ sx: { p: 1.5, maxWidth: 240, m: 1.5 } }}
      >
        <Typography fontWeight={300} mb={2} data-cy="people-pending-reinvite-confirmation-text">
          Invite email will resend to selected pending members
        </Typography>
        <Flex>
          <Button
            size="small"
            sx={{ borderRadius: 1 }}
            onClick={handleSend}
            data-cy="people-pending-reinvite-confirmation-send-button"
          >
            SEND
          </Button>
          <Button
            size="small"
            sx={{ borderRadius: 1, ml: 1 }}
            variant="outlined"
            onClick={() => popupState.close()}
            data-cy="people-pending-reinvite-confirmation-cancel-button"
          >
            CANCEL
          </Button>
        </Flex>
      </Popover>
      <PeopleTable
        {...props}
        checkboxSelection
        onSelectionModelChange={setSelectionModel}
        selectionModel={selectionModel}
        action={action}
        searchable
        rowAction={rowAction}
      />
    </>
  )
}

export default PendingInvitationsTab
