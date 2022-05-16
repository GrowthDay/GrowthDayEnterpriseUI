import { yupResolver } from '@hookform/resolvers/yup'
import { InfoOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Grid, IconButton, InputAdornment, Tooltip } from '@mui/material'
import * as React from 'react'
import { FC, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import useOrganizationQuery from '../../../api/queries/useOrganizationQuery'
import useOrganizationUserQuery from '../../../api/queries/useOrganizationUserQuery'
import Form from '../../../components/forms/Form'
import FormAutocomplete from '../../../components/forms/FormAutocomplete'
import FormInput from '../../../components/forms/FormInput'
import useCreateOrganizationMutation, {
  CreateOrganizationDefaultValues,
  CreateOrganizationValidationSchema
} from '../../../api/mutations/useCreateOrganizationMutation'
import FormPhoneInput from '../../../components/forms/FormPhoneInput'
import { useDefaultCountryState } from '../../../hooks/useCountryState'
import { OrganizationCreateRequest } from '../../../types/api'
import renderDomainTags from '../../Account/utils/renderDomainTags'
import validateDomains from '../../Account/utils/validateDomains'
import { StepComponentProps } from './index'

type IOrganizationCreateRequestType = typeof CreateOrganizationDefaultValues

const AccountDetails: FC<StepComponentProps> = ({ active }) => {
  const { data: defaultCountryState } = useDefaultCountryState()
  const { data: user } = useOrganizationUserQuery()
  const { data: organization } = useOrganizationQuery()
  const methods = useForm<IOrganizationCreateRequestType>({
    defaultValues: {
      ...CreateOrganizationDefaultValues,
      ...(organization
        ? {
            name: organization.name,
            domains: organization.domains,
            phoneNumber: organization.phoneNumber
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
  const handleSubmit = async ({ firstName, lastName, ...values }: IOrganizationCreateRequestType) => {
    if (active && !isLoading) {
      const signupRequest: OrganizationCreateRequest = {
        ...values,
        fullName: `${firstName ?? ''} ${lastName ?? ''}`.trim()
      }
      await mutateAsync(signupRequest)
    }
  }

  const passwordEndAdornment = (
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

  const domainsEndAdornment = (
    <InputAdornment sx={{ position: 'absolute', right: 16 }} position="end">
      <Tooltip
        title={
          <>
            Set the domain name to match your work email. Only add domains that your company owns. Use comma to separate
            multiple domain.
            <br />
            <br />
            For example, if your work email is john@google.com then type in '@google.com'.
          </>
        }
      >
        <InfoOutlined color="action" fontSize="small" />
      </Tooltip>
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
          <FormAutocomplete
            sx={{
              '& .MuiAutocomplete-inputRoot': {
                paddingRight: '40px!important'
              }
            }}
            disabled={!active}
            placeholder="@email.com, @mail.com,..."
            name="domains"
            label="Domain Name(s)"
            data-cy="account-details-domains-input"
            options={[]}
            onBeforeChange={validateDomains}
            InputProps={{
              endAdornment: domainsEndAdornment,
              sx: {
                paddingRight: 5
              }
            }}
            clearOnBlur
            multiple
            freeSolo
            renderTags={renderDomainTags}
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
          <FormPhoneInput
            canChangeCountry
            disabled={!active}
            defaultCountry={defaultCountryState?.country}
            name="phoneNumber"
            label="Phone Number"
            data-cy="account-details-phone-input"
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            disabled={!active}
            placeholder="Choose unique password"
            name="password"
            label="Password"
            type={inputType}
            InputProps={{ endAdornment: passwordEndAdornment }}
            data-cy="account-details-password-input"
          />
        </Grid>
        <Grid mt={2} item xs={12}>
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
