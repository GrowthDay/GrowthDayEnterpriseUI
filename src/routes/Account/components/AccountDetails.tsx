import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Card, CardContent, FormHelperText, Stack, Typography } from '@mui/material'
import { pick } from 'lodash-es'
import { useSnackbar } from 'notistack'
import * as React from 'react'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import useUpdateOrganizationMutation, {
  UpdateOrganizationValidationSchema
} from '../../../api/mutations/useUpdateOrganizationMutation'
import useOrganizationQuery from '../../../api/queries/useOrganizationQuery'
import Flex from '../../../components/Flex'
import Form from '../../../components/forms/Form'
import FormAutocomplete from '../../../components/forms/FormAutocomplete'
import FormInput from '../../../components/forms/FormInput'
import FormPhoneInput from '../../../components/forms/FormPhoneInput'
import renderDomainTags from '../utils/renderDomainTags'
import validateDomains from '../utils/validateDomains'

const AccountDetails: FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { data: organization } = useOrganizationQuery()
  const defaultValues = useMemo(() => pick(organization, 'name', 'domains', 'phoneNumber'), [organization])
  const { mutateAsync, isLoading } = useUpdateOrganizationMutation()
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(UpdateOrganizationValidationSchema)
  })

  const handleReset = useCallback(() => {
    methods.reset(defaultValues)
  }, [methods, defaultValues])

  useEffect(() => {
    handleReset()
  }, [handleReset])

  const handleSubmit = async (values: typeof defaultValues) => {
    await mutateAsync(values)
    enqueueSnackbar('Updated!', { variant: 'success' })
  }

  return (
    <>
      <Flex mb={2}>
        <Typography fontWeight={700} variant="h5" data-cy="account-account-details-title-text">
          Account Details
        </Typography>
      </Flex>
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Form<typeof defaultValues> onSuccess={handleSubmit} methods={methods}>
            <FormInput sx={{ mb: 1 }} placeholder="GrowthDay Inc." name="name" label="Company Name" />
            <FormAutocomplete
              sx={{ mb: 1 }}
              placeholder="@email.com, @mail.com,..."
              name="domains"
              label="Domain Name(s)"
              options={[]}
              onBeforeChange={validateDomains}
              clearOnBlur
              multiple
              freeSolo
              renderTags={renderDomainTags}
            />
            <FormHelperText sx={{ mb: 2 }}>
              Domain name will be used to verify and send invites to the employees. Set the domain name to match your
              work email. Only add domains that your company owns. Use comma to separate multiple domain. For example,
              if your work email is john@domain.com then type in ‘@domain.com’.
            </FormHelperText>
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
    </>
  )
}

export default AccountDetails
