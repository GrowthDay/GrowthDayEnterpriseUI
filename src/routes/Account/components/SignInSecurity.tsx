import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { EditOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, Card, CardContent, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { pick } from 'lodash-es'
import { useSnackbar } from 'notistack'
import * as React from 'react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { parsePhoneNumber } from 'react-phone-number-input'
import useUpdateUserMutation, { UpdateUserValidationSchema } from '../../../api/mutations/useUpdateUserMutation'
import useOrganizationUserQuery, { IUser } from '../../../api/queries/useOrganizationUserQuery'
import Flex from '../../../components/Flex'
import Form from '../../../components/forms/Form'
import FormAutocomplete from '../../../components/forms/FormAutocomplete'
import FormInput from '../../../components/forms/FormInput'
import FormPhoneInput from '../../../components/forms/FormPhoneInput'
import timezones from '../../../utils/timezones'
import ChangePassword from './ChangePassword'

const SignInSecurity: FC = () => {
  const [passwordOpen, setPasswordOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { data: organizationUser } = useOrganizationUserQuery()
  const defaultValues = useMemo(
    () => pick(organizationUser, 'fullName', 'ianaTimezone', 'phoneNumber'),
    [organizationUser]
  )
  const { mutateAsync, isLoading } = useUpdateUserMutation()
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(UpdateUserValidationSchema)
  })

  const handleReset = useCallback(() => {
    methods.reset(defaultValues)
  }, [methods, defaultValues])

  useEffect(() => {
    handleReset()
  }, [handleReset])

  const handleSubmit = async (values: typeof defaultValues) => {
    const parsedPhoneNumber = values.phoneNumber && parsePhoneNumber(values.phoneNumber)
    const request: Partial<IUser> = {
      ...values,
      ...(parsedPhoneNumber
        ? {
            countryCode: parsedPhoneNumber.countryCallingCode,
            iso2: parsedPhoneNumber.country,
            phoneNumber: parsedPhoneNumber.number
          }
        : {})
    }
    await mutateAsync(request)
    enqueueSnackbar('Updated!', { variant: 'success' })
  }

  return (
    <>
      <ChangePassword open={passwordOpen} onClose={() => setPasswordOpen(false)} />
      <Flex mb={2}>
        <Typography fontWeight={700} variant="h5" data-cy="account-sign-in-security-title-text">
          Sign in & security
        </Typography>
      </Flex>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Form<typeof defaultValues> onSuccess={handleSubmit} methods={methods}>
            <FormInput sx={{ mb: 1 }} placeholder="John Doe" name="fullName" label="Full Name" />
            <FormAutocomplete
              options={timezones()}
              sx={{ mb: 1 }}
              placeholder="America/New_York"
              name="ianaTimezone"
              label="Timezone"
            />
            <FormPhoneInput sx={{ mb: 2 }} canChangeCountry name="phoneNumber" label="Phone Number" />
            <Stack>
              <LoadingButton
                disabled={!methods.formState.isDirty}
                type="submit"
                variant="contained"
                size="small"
                loading={isLoading}
              >
                Save
              </LoadingButton>
              <Button
                onClick={handleReset}
                disabled={isLoading || !methods.formState.isDirty}
                size="small"
                variant="outlined"
              >
                Reset
              </Button>
            </Stack>
          </Form>
        </CardContent>
      </Card>
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <TextField
            sx={{ mb: 1 }}
            InputProps={{
              readOnly: true
              // endAdornment: (
              //   <InputAdornment position="end">
              //     <IconButton size="small">
              //       <EditOutlined fontSize="small" />
              //     </IconButton>
              //   </InputAdornment>
              // )
            }}
            type="email"
            fullWidth
            value={organizationUser?.email}
            label="Email Address"
          />
          <TextField
            sx={{ mb: 2 }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setPasswordOpen(true)} size="small">
                    <EditOutlined fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
            type="password"
            fullWidth
            value="*************"
            label="Password"
          />
        </CardContent>
      </Card>
    </>
  )
}

export default SignInSecurity
