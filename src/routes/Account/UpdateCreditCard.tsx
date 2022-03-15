import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { DialogActions, DialogContent, DialogProps, Grid } from '@mui/material'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import Form from '../../components/forms/Form'
import StripeCardForm, { stripeCardValidationSchema } from '../../components/StripeCardForm'
import withDialog from '../../hoc/withDialog'
import withElements from '../../hoc/withElements'
import { IStripeCardFields } from '../../types/payment'
import compose from '../../utils/compose'

export type UpdateCreditCardProps = Omit<DialogProps, 'children'>

const defaultValues: IStripeCardFields = {
  fullName: '',
  region: '',
  zipCode: '',
  country: '',
  phoneNumber: ''
}

const UpdateCreditCard: FC<UpdateCreditCardProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false)
  const methods = useForm<IStripeCardFields>({
    defaultValues,
    resolver: yupResolver(stripeCardValidationSchema)
  })
  const handleSubmit = async (values: IStripeCardFields) => {
    setLoading(true)
    console.log({ values })
    onClose?.({}, 'backdropClick')
    setLoading(false)
  }
  return (
    <>
      <DialogContent>
        <Form<IStripeCardFields> id="update-card-form" onSuccess={handleSubmit} methods={methods}>
          <Grid spacing={2} container>
            <StripeCardForm methods={methods} />
          </Grid>
        </Form>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={loading} form="update-card-form" variant="contained" type="submit">
          Update
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default compose(withElements, withDialog('Update Credit Card'))(UpdateCreditCard)
