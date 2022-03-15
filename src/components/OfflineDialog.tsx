import { SentimentDissatisfiedOutlined } from '@mui/icons-material'
import { DialogContent, DialogProps, Typography } from '@mui/material'
import { FC } from 'react'
import withDialog from '../hoc/withDialog'
import Center from './Center'

const OfflineDialog: FC<Omit<DialogProps, 'children'>> = () => (
  <DialogContent sx={{ py: 4 }}>
    <Center>
      <SentimentDissatisfiedOutlined sx={{ mb: 2 }} fontSize="large" />
      <Typography variant="h6">Connection Error</Typography>
      <Typography paragraph>Your internet connection appears to be offline.</Typography>
    </Center>
  </DialogContent>
)

export default withDialog()(OfflineDialog)
