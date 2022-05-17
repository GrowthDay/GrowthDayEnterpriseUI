import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, DialogProps } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import useUpdatePasswordMutation, {
  UpdatePasswordInput,
  UpdatePasswordValidationSchema
} from '../../../api/mutations/useUpdatePasswordMutation'
import Form from '../../../components/forms/Form'
import FormInput from '../../../components/forms/FormInput'
import withDialog from '../../../hoc/withDialog'

const formId = 'password-update-form'

const ChangePassword: FC<DialogProps> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync, isLoading } = useUpdatePasswordMutation()
  const methods = useForm<UpdatePasswordInput>({
    resolver: yupResolver(UpdatePasswordValidationSchema)
  })

  const handleClose = () => onClose?.({}, 'backdropClick')

  const handleSubmit = async (values: UpdatePasswordInput) => {
    await mutateAsync(values)
    enqueueSnackbar('Password Updated!', { variant: 'success' })
    handleClose()
  }

  return (
    <>
      <DialogContent>
        <Form id={formId} onSuccess={handleSubmit} methods={methods}>
          <FormInput type="password" name="currentPassword" label="Current Password" sx={{ mb: 2 }} />
          <FormInput type="password" name="newPassword" label="New Password" sx={{ mb: 2 }} />
          <FormInput type="password" name="confirmNewPassword" label="Confirm New Password" />
        </Form>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={isLoading} form={formId} variant="contained" type="submit">
          Update
        </LoadingButton>
        <Button onClick={handleClose} size="small" disabled={isLoading} variant="text" color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </>
  )
}

export default withDialog('Change Password')(ChangePassword)
