import { yupResolver } from '@hookform/resolvers/yup'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Grid, IconButton, InputAdornment } from '@mui/material'
import { FC, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import useOrganizationQuery from '../../../api/queries/useOrganizationQuery'
import useOrganizationUserQuery from '../../../api/queries/useOrganizationUserQuery'
import Form from '../../../components/forms/Form'
import FormInput from '../../../components/forms/FormInput'
import useCreateOrganizationMutation, {
  CreateOrganizationDefaultValues,
  CreateOrganizationValidationSchema
} from '../../../api/mutations/useCreateOrganizationMutation'
import { OrganizationCreateRequest } from '../../../types/api'
import { StepComponentProps } from './index'

type IOrganizationCreateRequestType = typeof CreateOrganizationDefaultValues

const AccountDetails: FC<StepComponentProps> = ({ active }) => {
  const { data: user } = useOrganizationUserQuery()
  const { data: organization } = useOrganizationQuery()
  const methods = useForm<IOrganizationCreateRequestType>({
    defaultValues: {
      ...CreateOrganizationDefaultValues,
      ...(organization
        ? {
            name: organization.name
          }
        : {}),
      ...(user
        ? {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: '***********'
          }
        : {})
    },
    resolver: yupResolver(CreateOrganizationValidationSchema)
  })
  const [inputType, setInputType] = useReducer(
    (prevState) => (prevState === 'password' ? 'text' : 'password'),
    'password'
  )
  const { mutateAsync, isLoading } = useCreateOrganizationMutation()
  const handleSubmit = async (values: IOrganizationCreateRequestType) => {
    if (active && !isLoading) {
      const signupRequest: OrganizationCreateRequest = {
        ...values,
        fullName: `${values.firstName ?? ''} ${values.lastName ?? ''}`.trim()
      }
      await mutateAsync(signupRequest)
    }
  }

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton size="small" onClick={setInputType} disabled={!active}>
        {inputType === 'password' ? (
          <VisibilityOffOutlined fontSize="small" />
        ) : (
          <VisibilityOutlined fontSize="small" />
        )}
      </IconButton>
    </InputAdornment>
  )

  return (
    <Form<IOrganizationCreateRequestType> methods={methods} onSuccess={handleSubmit} data-cy="account-details-form">
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <FormInput
            disabled={!active}
            placeholder="GrowthDay Inc."
            name="name"
            label="Company Name"
            data-cy="account-details-company-name-input"
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            disabled={!active}
            placeholder="example@email.com"
            name="email"
            label="Email Address"
            type="email"
            data-cy="account-details-email-input"
          />
        </Grid>
        <Grid item xs={6}>
          <FormInput
            disabled={!active}
            placeholder="John"
            name="firstName"
            label="First Name"
            data-cy="account-details-first-name-input"
          />
        </Grid>
        <Grid item xs={6}>
          <FormInput
            disabled={!active}
            placeholder="Doe"
            name="lastName"
            label="Last Name"
            data-cy="account-details-last-name-input"
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            disabled={!active}
            placeholder="Choose unique password"
            name="password"
            label="Password"
            type={inputType}
            InputProps={{ endAdornment }}
            data-cy="password"
          />
        </Grid>
        <Grid mt={4} item xs={12}>
          <LoadingButton
            disabled={!active}
            sx={{ minWidth: 156 }}
            loading={isLoading}
            variant="outlined"
            type="submit"
            data-cy="account-details-next-button"
          >
            Next
          </LoadingButton>
        </Grid>
      </Grid>
    </Form>
  )
}

export default AccountDetails
