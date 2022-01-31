import { SentimentDissatisfiedOutlined } from '@mui/icons-material'
import { Dialog, DialogContent, DialogProps, Typography } from '@mui/material'
import { FC } from 'react'
import useOnlineStatus from '../hooks/useOnlineStatus'
import Center from './Center'

const OfflineDialog: FC<Partial<DialogProps>> = (props) => {
  const isOnline = useOnlineStatus()
  return (
    <Dialog {...props} open={!isOnline}>
      <DialogContent sx={{ py: 4 }}>
        <Center>
          <SentimentDissatisfiedOutlined sx={{ mb: 2 }} fontSize="large" />
          <Typography variant="h6">Connection Error</Typography>
          <Typography paragraph>Your internet connection appears to be offline.</Typography>
        </Center>
      </DialogContent>
    </Dialog>
  )
}

export default OfflineDialog
