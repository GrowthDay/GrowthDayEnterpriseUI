import { AddOutlined, NavigateNextOutlined } from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Paper,
  Step,
  StepContent,
  StepIcon,
  StepLabel,
  Stepper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { FC, useState, MouseEvent } from 'react'
import CreditCardLogo from '../../components/CreditCardLogo'
import Flex from '../../components/Flex'
import Layout from '../../components/Layout'
import VideoPlayer from '../../components/VideoPlayer'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import useMobileView from '../../hooks/useMobileView'
import InviteMembers from '../People/InviteMembers'
import AddMoreSeats from './AddMoreSeats'
import UpdateCreditCard from './UpdateCreditCard'

const StyledTableCellNoBorder = styled(TableCell)(({ theme: { spacing } }) => ({
  borderBottom: 'none'
}))
const StyledTableCell = styled(StyledTableCellNoBorder)(({ theme: { spacing } }) => ({
  paddingBottom: spacing(0)
}))

const StyledStepIcon = styled(StepIcon)(({ theme: { palette, spacing } }) => ({
  width: spacing(5),
  height: spacing(5),
  marginRight: spacing(1),
  '&, &.Mui-active, &.Mui-completed': {
    color: palette.grey['50']
  },
  '.MuiStepIcon-text': {
    fontSize: '0.75rem',
    fontWeight: 600,
    '&, &.Mui-active': {
      fill: palette.primary.main
    }
  }
}))

const StyledStepContent = styled(StepContent)(({ theme: { palette, spacing } }) => ({
  borderLeft: `1px dashed ${palette.divider}`,
  marginLeft: spacing(2.5),
  paddingLeft: spacing(4.5),
  paddingBottom: spacing(2)
}))

const Account: FC = () => {
  const [, copy] = useCopyToClipboard()
  const { enqueueSnackbar } = useSnackbar()
  const mobileView = useMobileView()
  const [inviteOpen, setInviteOpen] = useState(false)
  const [addSeatsOpen, setAddSeatsOpen] = useState(false)
  const [updateCardOpen, setUpdateCardOpen] = useState(false)

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setUpdateCardOpen(true)
  }

  const handleCopy = () => {
    copy('https://app.growthday.com/b2b/Meta-svgymgus/join')
    enqueueSnackbar('Copied!')
  }

  return (
    <>
      <InviteMembers open={inviteOpen} onClose={() => setInviteOpen(false)} />
      <AddMoreSeats open={addSeatsOpen} onClose={() => setAddSeatsOpen(false)} />
      <UpdateCreditCard maxWidth="xs" open={updateCardOpen} onClose={() => setUpdateCardOpen(false)} />
      <Layout breadcrumbs="Account">
        <Flex mb={2} alignItems="center" justifyContent="space-between">
          <Typography fontWeight={700} variant="h5">
            Plans & Billing
          </Typography>
          <Button onClick={() => setAddSeatsOpen(true)} startIcon={<AddOutlined />}>
            {mobileView ? 'Add seats' : 'Add more seats'}
          </Button>
        </Flex>
        <Card elevation={0} sx={{ mb: 6 }}>
          <CardContent
            sx={{
              '&:last-child': {
                padding: {
                  xs: 2,
                  md: 3
                }
              }
            }}
          >
            <Grid spacing={4} container wrap="wrap">
              <Grid item xs>
                <Typography gutterBottom variant="body2" color="text.disabled">
                  Plan
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  Starter
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="body2" color="text.disabled">
                  Seats
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  24
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="body2" color="text.disabled">
                  Annual payment
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  $671.76
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="body2" color="text.disabled">
                  Payment method
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  Credit card
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="body2" color="text.disabled">
                  Next payment due
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  Sept 14, 2022
                </Typography>
              </Grid>
            </Grid>
            <Divider light sx={{ my: 2 }} />
            <Grid spacing={4} container wrap="wrap" justifyContent="space-between" alignItems="flex-end">
              <Grid item>
                <Typography gutterBottom variant="body2" color="text.disabled">
                  Credit Card Info
                </Typography>
                <Typography display="flex" alignItems="center">
                  <CreditCardLogo type="visa" /> &nbsp; Visa ending in&nbsp;<strong>4242</strong> &nbsp; &nbsp;
                  Expires&nbsp;<strong>04/2024</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Link onClick={handleLinkClick}>
                  Update credit card <NavigateNextOutlined sx={{ verticalAlign: 'middle' }} fontSize="small" />
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Flex mb={2}>
          <Typography fontWeight={700} variant="h5">
            Payment history
          </Typography>
        </Flex>
        <Paper elevation={0} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Invoice</TableCell>
                <TableCell>Payment method</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableCell>Additional Seats</StyledTableCell>
                <StyledTableCell>
                  <Link>Oct 24, 2021</Link>
                </StyledTableCell>
                <StyledTableCell>•••• •••• •••• 4242</StyledTableCell>
                <StyledTableCell>$27.99</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCellNoBorder>Annual Bill</StyledTableCellNoBorder>
                <StyledTableCellNoBorder>
                  <Link>Oct 14, 2021</Link>
                </StyledTableCellNoBorder>
                <StyledTableCellNoBorder>•••• •••• •••• 4242</StyledTableCellNoBorder>
                <StyledTableCellNoBorder>$671.76</StyledTableCellNoBorder>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Typography mb={6} variant="body2" color="text.secondary">
          Want to cancel the plan?{' '}
          <Link href="mailto:support@growthday.com" target="_blank">
            Contact us
          </Link>
        </Typography>
        <Flex mb={2} alignItems="center" justifyContent="space-between">
          <Typography fontWeight={700} variant="h5">
            Setup
          </Typography>
        </Flex>
        <Card elevation={0}>
          <CardContent
            sx={{
              '&:last-child': {
                padding: {
                  xs: 2,
                  md: 3
                }
              }
            }}
          >
            <Stepper connector={null} orientation="vertical">
              <Step active>
                <StepLabel StepIconComponent={StyledStepIcon} />
                <StyledStepContent>
                  <VideoPlayer url="https://www.youtube.com/watch?v=Scfw5x35AAw" />
                  <Typography mb={2} fontWeight={600}>
                    Welcome to GrowthDay Enterprise!
                  </Typography>
                  <Typography>Facebook is now an enterprise partner of GrowthDay.</Typography>
                  <Typography mb={2}>
                    You now have access to GrowthDay enterprise portal, through which you can invite your team and
                    manage your seats. We are excited to have you onboard this journey with us. Get started by adding
                    your team’s details
                  </Typography>
                  <TextField label="Name" defaultValue="Meta Inc." />
                </StyledStepContent>
              </Step>
              <Step active>
                <StepLabel StepIconComponent={StyledStepIcon}>
                  <Typography fontWeight={600}>Invite members to GrowthDay app</Typography>
                </StepLabel>
                <StyledStepContent>
                  <Typography mb={2}>
                    You can invite members by either creating and uploading an Excel or .csv file listing the email
                    addresses of the team members you’d like to make GrowthDay available to, or just manually writing
                    their email address one after the other. Once done, each person that you listed will be able to sign
                    up for GrowthDay.
                  </Typography>
                  <Button onClick={() => setInviteOpen(true)} variant="outlined" startIcon={<AddOutlined />}>
                    Invite members
                  </Button>
                </StyledStepContent>
              </Step>
              <Step active>
                <StepLabel StepIconComponent={StyledStepIcon}>
                  <Typography fontWeight={600}>Explain to the team how they can claim their account</Typography>
                </StepLabel>
                <StyledStepContent>
                  <Typography mb={2}>
                    To sign up, the team members needs to know the link they will use to sign up:{' '}
                    <Link>https://app.growthday.com/b2b/Meta-svgymgus/join</Link> and the email address that you have
                    given us (for example, whether it is their work or personal email address)
                  </Typography>
                  <Button onClick={handleCopy} variant="outlined">
                    Copy invite link
                  </Button>
                </StyledStepContent>
              </Step>
            </Stepper>
          </CardContent>
        </Card>
      </Layout>
    </>
  )
}

export default Account
