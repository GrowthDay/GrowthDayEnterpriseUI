import { CheckOutlined, SendOutlined } from '@mui/icons-material'
import { Button, Popover, Typography } from '@mui/material'
import { bindTrigger } from 'material-ui-popup-state'
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks'
import { FC, useState } from 'react'
import Flex from '../../components/Flex'
import useIsMounted from '../../hooks/useIsMounted'
import { IUser } from '../../types/user'
import PeopleTable from './PeopleTable'

export type PendingInvitationsTabProps = {
  data: IUser[]
}

const PendingInvitationsTab: FC<PendingInvitationsTabProps> = ({ data }) => {
  const isMounted = useIsMounted()
  const [hasSent, setHasSent] = useState(false)
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'pending-invitation-resend'
  })

  const action = (
    <Button
      {...bindTrigger(popupState)}
      {...(hasSent ? { onClick: undefined, disableRipple: true } : {})}
      startIcon={
        hasSent ? (
          <CheckOutlined color="success" />
        ) : (
          <SendOutlined sx={{ transform: 'rotate(-45deg)', mt: -0.5, fontSize: '1rem!important' }} />
        )
      }
      variant="outlined"
      sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
    >
      {hasSent ? 'Sent' : 'Re-Invite'}
    </Button>
  )

  const handleSend = () => {
    popupState.close()
    setHasSent(true)
    setTimeout(() => {
      if (isMounted.current) {
        setHasSent(false)
      }
    }, 5000)
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
        <Typography fontWeight={300} mb={2}>
          Invite email will resend to all pending members
        </Typography>
        <Flex>
          <Button size="small" sx={{ borderRadius: 1 }} onClick={handleSend}>
            SEND
          </Button>
          <Button size="small" sx={{ borderRadius: 1, ml: 1 }} variant="outlined" onClick={() => popupState.close()}>
            CANCEL
          </Button>
        </Flex>
      </Popover>
      <PeopleTable action={action} title="Members who have not accepted the invite yet" searchable data={data} />
    </>
  )
}

export default PendingInvitationsTab
