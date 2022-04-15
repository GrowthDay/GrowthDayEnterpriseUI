import { CheckOutlined, SendOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, Popover, Typography } from '@mui/material'
import { GridSelectionModel } from '@mui/x-data-grid-pro'
import { bindTrigger } from 'material-ui-popup-state'
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks'
import { FC, useState } from 'react'
import useReInviteUsersMutation from '../../api/mutations/useReInviteUsersMutation'
import Flex from '../../components/Flex'
import useIsMounted from '../../hooks/useIsMounted'
import PeopleEmptyState from './PeopleEmptyState'
import PeopleTable, { PeopleTableProps } from './PeopleTable'

const PendingInvitationsTab: FC<PeopleTableProps> = (props) => {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const isMounted = useIsMounted()
  const [hasSent, setHasSent] = useState(false)
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'pending-invitation-resend'
  })
  const { mutateAsync, isLoading } = useReInviteUsersMutation()

  const action = (
    <LoadingButton
      loading={isLoading}
      disabled={!selectionModel.length}
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
      sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
      data-cy="people-pending-reinvite-button"
    >
      {hasSent ? 'Sent' : 'Re-Invite'}
    </LoadingButton>
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
    return <PeopleEmptyState />
  }

  return (
    <>
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
        title="Members who have not accepted the invite yet"
        searchable
      />
    </>
  )
}

export default PendingInvitationsTab
