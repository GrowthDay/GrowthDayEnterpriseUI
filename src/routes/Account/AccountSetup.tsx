import { AddOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Card,
  CardContent,
  Link,
  Step,
  StepContent,
  StepIcon,
  StepLabel,
  Stepper,
  styled,
  TextField,
  Typography
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import useUpdateOrganizationMutation from '../../api/mutations/useUpdateOrganizationMutation'
import Flex from '../../components/Flex'
import VideoPlayer from '../../components/VideoPlayer'
import useAuthOrganization from '../../hooks/useAuthOrganization'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import useInvitationLink from '../../hooks/useInvitationLink'

// Todo: Update logo link

const StyledStepContent = styled(StepContent)(({ theme: { palette, spacing } }) => ({
  borderLeft: `1px dashed ${palette.divider}`,
  marginLeft: spacing(2.5),
  paddingLeft: spacing(4.5),
  paddingBottom: spacing(2)
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

export type AccountSetupProps = {
  setInviteOpen: Dispatch<SetStateAction<boolean>>
}

const AccountSetup: FC<AccountSetupProps> = ({ setInviteOpen }) => {
  const organization = useAuthOrganization()
  const invitationLink = useInvitationLink()
  const [, copy] = useCopyToClipboard()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync, isLoading } = useUpdateOrganizationMutation()
  const [organizationName, setOrganizationName] = useState(organization?.name ?? '')

  const resetOrganizationNameState = useCallback(
    () => setOrganizationName(organization?.name ?? ''),
    [organization?.name]
  )
  useEffect(() => {
    resetOrganizationNameState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization?.name])

  const handleCopy = () => {
    copy(invitationLink)
    enqueueSnackbar('Copied!')
  }

  const handleSave = () => {
    mutateAsync({
      name: organizationName,
      dataCompliancePolicyAccepted: organization?.dataCompliancePolicyAccepted,
      teamAssessmentEnabled: organization?.teamAssessmentEnabled
    })
  }

  return (
    <>
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
                <Typography>{organization?.name} is now an enterprise partner of GrowthDay.</Typography>
                <Typography mb={2}>
                  You now have access to GrowthDay enterprise portal, through which you can invite your team and manage
                  your seats. We are excited to have you onboard this journey with us. Get started by adding your team’s
                  details
                </Typography>
                <Flex alignItems="flex-end">
                  <TextField
                    label="Name"
                    placeholder="Organization Name"
                    value={organizationName}
                    onChange={(event) => setOrganizationName(event.target.value)}
                  />
                  {organizationName !== organization?.name && (
                    <>
                      <LoadingButton
                        variant="contained"
                        loading={isLoading}
                        onClick={handleSave}
                        disabled={!organizationName}
                        size="small"
                        sx={{ mb: 0.5, ml: 4 }}
                      >
                        Save
                      </LoadingButton>
                      <Button
                        disabled={isLoading}
                        onClick={resetOrganizationNameState}
                        size="small"
                        variant="outlined"
                        sx={{ mb: 0.5, ml: 1 }}
                      >
                        Reset
                      </Button>
                    </>
                  )}
                </Flex>
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
                  <Link>{invitationLink}</Link> and the email address that you have given us (for example, whether it is
                  their work or personal email address)
                </Typography>
                <Button onClick={handleCopy} variant="outlined">
                  Copy invite link
                </Button>
              </StyledStepContent>
            </Step>
          </Stepper>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountSetup
