import { Popover, Typography } from '@mui/material'
import { bindPopover } from 'material-ui-popup-state'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import notificationsPopoverState from '../../recoil/atoms/notificationsPopoverState'

const NotificationsPopover: FC = (props) => {
  const notificationsPopover = useRecoilValue(notificationsPopoverState)
  return (
    <Popover
      {...(notificationsPopover ? bindPopover(notificationsPopover) : { open: false })}
      PaperProps={{ sx: { p: 2 } }}
    >
      <Typography>Coming Soon!</Typography>
    </Popover>
  )
}

export default NotificationsPopover
