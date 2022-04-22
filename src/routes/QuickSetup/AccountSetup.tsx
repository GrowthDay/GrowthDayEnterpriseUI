import { AddOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Card,
  CardContent,
  Step,
  StepContent,
  StepIcon,
  StepLabel,
  Stepper,
  styled,
  TextField,
  Typography
} from '@mui/material'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import useUpdateOrganizationMutation from '../../api/mutations/useUpdateOrganizationMutation'
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import Flex from '../../components/Flex'
import VideoPlayer from '../../components/VideoPlayer'

// Todo: Update video link

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
  const { data: organization } = useOrganizationQuery()
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

  const handleSave = () => {
    mutateAsync({
      name: organizationName,
      dataCompliancePolicyAccepted: organization?.dataCompliancePolicyAccepted,
      teamAssessmentEnabled: organization?.teamAssessmentEnabled
    })
  }

  return (
    <>
      <Typography mb={2} fontWeight={700} variant="h5">
        Quick Setup
      </Typography>
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
                <VideoPlayer
                  url="https://home.wistia.com/medias/deobokbsak"
                  data-cy="account-setup-video"
                  ContainerProps={{ mb: 4, borderRadius: 1, boxShadow: 1 }}
                />
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
                    data-cy="account-setup-organization-name-input"
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
                        data-cy="account-setup-organization-name-save-button"
                      >
                        Save
                      </LoadingButton>
                      <Button
                        disabled={isLoading}
                        onClick={resetOrganizationNameState}
                        size="small"
                        variant="outlined"
                        sx={{ mb: 0.5, ml: 1 }}
                        data-cy="account-setup-organization-name-reset-button"
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
                <Button
                  onClick={() => setInviteOpen(true)}
                  variant="outlined"
                  startIcon={<AddOutlined />}
                  data-cy="account-setup-invite-button"
                >
                  Invite members
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
