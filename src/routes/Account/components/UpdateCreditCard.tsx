import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { DialogActions, DialogContent, DialogProps, Grid } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { parsePhoneNumber } from 'react-phone-number-input'
import useOrganizationQuery from '../../../api/queries/useOrganizationQuery'
import useOrganizationUserQuery from '../../../api/queries/useOrganizationUserQuery'
import Form from '../../../components/forms/Form'
import StripeCardForm from '../../../components/StripeCardForm'
import withDialog from '../../../hoc/withDialog'
import withElements from '../../../hoc/withElements'
import { useDefaultCountryState } from '../../../hooks/useCountryState'
import useStripePayment from '../../../hooks/useStripePayment'
import compose from '../../../utils/compose'
import useUpdateCreditCardMutation, {
  UpdateCreditCardRequest,
  UpdateCreditCardDefaultValues,
  UpdateCreditCardValidationSchema
} from '../hooks/useUpdateCreditCardMutation'

export type UpdateCreditCardProps = Omit<DialogProps, 'children'>

const UpdateCreditCard: FC<UpdateCreditCardProps> = ({ onClose }) => {
  const [_loading, setLoading] = useState(false)
  const { mutateAsync, isLoading } = useUpdateCreditCardMutation()
  const { addPaymentMethod } = useStripePayment()
  const { data } = useDefaultCountryState()
  const { data: organization } = useOrganizationQuery()
  const { data: user } = useOrganizationUserQuery()

  const loading = _loading || isLoading

  const methods = useForm<UpdateCreditCardRequest>({
    defaultValues: UpdateCreditCardDefaultValues,
    resolver: yupResolver(UpdateCreditCardValidationSchema)
  })
  const handleSubmit = async (values: UpdateCreditCardRequest) => {
    setLoading(true)
    try {
      const paymentMethodId = await addPaymentMethod(values)
      await mutateAsync({ ...values, paymentMethodId })
      onClose?.({}, 'backdropClick')
    } catch (e) {}
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      methods.setValue('fullName', user.name ?? '')
    }
  }, [user, methods])

  useEffect(() => {
    if (organization && organization.phoneNumber) {
      const parsedPhoneNumber = parsePhoneNumber(organization.phoneNumber)
      if (parsedPhoneNumber) {
        methods.setValue('phoneNumber', parsedPhoneNumber.number ?? '')
        methods.setValue('country', parsedPhoneNumber.country ?? '')
      }
    }
  }, [organization, methods])

  useEffect(() => {
    if (data?.country && organization && !organization.phoneNumber) {
      methods.setValue('country', data.country)
    }
  }, [data, methods, organization])

  useEffect(() => {
    if (
      data &&
      (!organization?.phoneNumber ||
        (organization?.phoneNumber && data.country === parsePhoneNumber(organization.phoneNumber)?.country))
    ) {
      methods.setValue('region', data.state)
    } else {
      methods.setValue('region', '')
    }
  }, [data, methods, organization])

  return (
    <>
      <DialogContent>
        <Form<UpdateCreditCardRequest>
          id="update-card-form"
          onSuccess={handleSubmit}
          methods={methods}
          data-cy="update-card-modal-form"
        >
          <Grid spacing={2} container>
            <StripeCardForm methods={methods} />
          </Grid>
        </Form>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          form="update-card-form"
          variant="contained"
          type="submit"
          data-cy="update-card-modal-submit-button"
        >
          Update
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default compose(withElements, withDialog('Update Credit Card'))(UpdateCreditCard)
