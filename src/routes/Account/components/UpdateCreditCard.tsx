import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { DialogActions, DialogContent, DialogProps, Grid } from '@mui/material'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import useUpdatePaymentMethodMutation, {
  UpdatePaymentMethodRequest,
  UpdatePaymentMethodDefaultValues,
  UpdatePaymentMethodValidationSchema
} from '../../../api/mutations/useUpdatePaymentMethodMutation'
import Form from '../../../components/forms/Form'
import StripeCardForm from '../../../components/StripeCardForm'
import withDialog from '../../../hoc/withDialog'
import withElements from '../../../hoc/withElements'
import useStripePayment from '../../../hooks/useStripePayment'
import compose from '../../../utils/compose'

export type UpdateCreditCardProps = Omit<DialogProps, 'children'>

const UpdateCreditCard: FC<UpdateCreditCardProps> = ({ onClose }) => {
  const [_loading, setLoading] = useState(false)
  const { mutateAsync, isLoading } = useUpdatePaymentMethodMutation()
  const { addPaymentMethod } = useStripePayment()

  const loading = _loading || isLoading

  const methods = useForm<UpdatePaymentMethodRequest>({
    defaultValues: UpdatePaymentMethodDefaultValues,
    resolver: yupResolver(UpdatePaymentMethodValidationSchema)
  })
  const handleSubmit = async (values: UpdatePaymentMethodRequest) => {
    setLoading(true)
    try {
      const paymentMethodId = await addPaymentMethod(values)
      await mutateAsync(paymentMethodId)
      onClose?.({}, 'backdropClick')
    } catch (e) {}
    setLoading(false)
  }
  return (
    <>
      <DialogContent>
        <Form<UpdatePaymentMethodRequest>
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
