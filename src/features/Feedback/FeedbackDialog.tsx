import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { FC } from 'react'
import { useRecoilState } from 'recoil'
import feedbackModalState from '../../recoil/atoms/feedbackModalState'

const FeedbackDialog: FC = () => {
  const [open, setOpen] = useRecoilState(feedbackModalState)
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>Coming Soon!</DialogContent>
    </Dialog>
  )
}

export default FeedbackDialog
