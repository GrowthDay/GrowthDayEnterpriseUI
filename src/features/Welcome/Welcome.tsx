import { Button, DialogContent, DialogProps, DialogTitle, Typography } from '@mui/material'
import { FC } from 'react'
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import Confetti from '../../components/Confetti'
import Loading from '../../components/Loading'
import VideoPlayer from '../../components/VideoPlayer'
import withDialog from '../../hoc/withDialog'

const labelId = 'welcome-title-labelledby'

const Welcome: FC<DialogProps> = ({ onClose }) => {
  const { data: organization, isLoading } = useOrganizationQuery()
  if (!organization || isLoading) {
    return (
      <DialogContent sx={{ minHeight: 320 }}>
        <Loading />
      </DialogContent>
    )
  }
  return (
    <>
      <Confetti />
      <VideoPlayer url="https://home.wistia.com/medias/deobokbsak" />
      <DialogTitle id={labelId}>{organization.name} now has GrowthDay!</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography mb={3} variant="body2">
          {organization.name} is now an enterprise partner of GrowthDay. You now have access to GrowthDay enterprise
          portal, through which you can invite your team and manage your seats.
        </Typography>
        <Button fullWidth sx={{ borderRadius: 1 }} onClick={() => onClose?.({}, 'backdropClick')}>
          Let's go!
        </Button>
      </DialogContent>
    </>
  )
}

export default withDialog(undefined, { 'aria-labelledby': labelId })(Welcome)
