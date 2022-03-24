import { yupResolver } from '@hookform/resolvers/yup'
import { SendOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { DialogContent, DialogProps, Link, Typography } from '@mui/material'
import { mapKeys, startCase } from 'lodash-es'
import { useSnackbar } from 'notistack'
import { FC, useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Form from '../../components/forms/Form'
import FormInput from '../../components/forms/FormInput'
import withDialog from '../../hoc/withDialog'
import useAuthUser from '../../hooks/useAuthUser'
import useFormPersist from '../../hooks/useFormPersist'
import useUserbackUtils from '../../hooks/useUserbackUtils'
import getPrefixedKey from '../../utils/getPrefixedKey'

const validationSchema = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().required()
  })
  .required()

const defaultValues = {
  title: '',
  description: ''
}

type IFeedbackRequest = typeof defaultValues

export type FeedbackProps = Omit<DialogProps, 'children'>

const Feedback: FC<FeedbackProps> = ({ onClose }) => {
  const user = useAuthUser()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)

  const methods = useForm<IFeedbackRequest>({
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const { clear } = useFormPersist(getPrefixedKey('FEEDBACK'), methods)

  const handleClose = useCallback(() => {
    clear()
    onClose?.({}, 'backdropClick')
  }, [onClose, clear])

  const afterSend = useCallback(() => {
    enqueueSnackbar('Feedback sent successfully!')
  }, [enqueueSnackbar])

  const { submit } = useUserbackUtils({
    onClose: handleClose,
    afterSend
  })

  const handleSubmit = async (values: IFeedbackRequest) => {
    setLoading(true)
    await submit({
      name: user?.name ?? '',
      email: user?.email ?? '',
      title: values.title,
      description: values.description,
      categories: ['Enterprise', 'Feedback'].join(', '),
      data: mapKeys(values, (value, key) => startCase(key))
    })
  }

  return (
    <>
      <Helmet>
        <script>
          {`
            (function(d) {
              var s = d.createElement('script');s.async = true;
              s.src = 'https://static.userback.io/widget/v1.js';
              (d.head || d.body).appendChild(s);
            })(document);
          `}
        </script>
      </Helmet>
      <>
        <DialogContent sx={{ pt: 0 }}>
          <Typography variant="body2">Have a question about your account or want to share something?</Typography>
          <Form<IFeedbackRequest> methods={methods} onSuccess={handleSubmit} sx={{ position: 'relative' }}>
            <FormInput margin="dense" name="title" label="Subject" />
            <FormInput
              helperText={<>&nbsp;</>}
              multiline
              minRows="10"
              maxRows="10"
              margin="dense"
              name="description"
              label="How can we help you?"
            />
            <LoadingButton
              loading={loading}
              sx={{
                position: 'absolute',
                zIndex: 1,
                right: 16,
                bottom: 44
              }}
              variant="contained"
              type="submit"
              endIcon={<SendOutlined sx={{ transform: 'rotate(-45deg)', mt: -0.5, fontSize: '1rem!important' }} />}
            >
              Send
            </LoadingButton>
          </Form>
          <Typography variant="body2">
            Or email us at:{' '}
            <Link target="_blank" href="mailto:support@growthday.com">
              support@growthday.com
            </Link>
          </Typography>
        </DialogContent>
      </>
    </>
  )
}

export default withDialog('Need help?')(Feedback)
