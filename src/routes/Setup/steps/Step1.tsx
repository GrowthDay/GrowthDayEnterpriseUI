import { yupResolver } from '@hookform/resolvers/yup'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Grid, IconButton, InputAdornment } from '@mui/material'
import moment from 'moment-timezone'
import { FC, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import useSignupApi from '../../../api/useSignupApi'
import Form from '../../../components/forms/Form'
import FormInput from '../../../components/forms/FormInput'
import { ISignupRequest } from '../../../types/signup'
import { StepComponentProps } from './index'

const validationSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required()
  })
  .required()

const Step1: FC<StepComponentProps> = ({ next, user, active }) => {
  const methods = useForm<ISignupRequest>({
    defaultValues: {
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      password: user ? '***********' : ''
    },
    resolver: yupResolver(validationSchema)
  })
  const [inputType, setInputType] = useReducer(
    (prevState) => (prevState === 'password' ? 'text' : 'password'),
    'password'
  )
  const { mutateAsync, isLoading } = useSignupApi()
  const handleSubmit = async (values: ISignupRequest) => {
    if (active && !isLoading) {
      const signupRequest: ISignupRequest = {
        ...values,
        fullName: `${values.firstName ?? ''} ${values.lastName ?? ''}`.trim(),
        ianaTimezone: moment.tz.guess()
      }
      await mutateAsync(signupRequest)
      next()
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
    <Form<ISignupRequest> methods={methods} onSuccess={handleSubmit}>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <FormInput
            disabled={!active}
            placeholder="example@email.com"
            name="email"
            label="Email Address"
            type="email"
          />
        </Grid>
        <Grid item xs={6}>
          <FormInput disabled={!active} placeholder="John" name="firstName" label="First Name" />
        </Grid>
        <Grid item xs={6}>
          <FormInput disabled={!active} placeholder="Doe" name="lastName" label="Last Name" />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            disabled={!active}
            placeholder="Choose unique password"
            name="password"
            label="Password"
            type={inputType}
            InputProps={{ endAdornment }}
          />
        </Grid>
        <Grid mt={4} item xs={12}>
          <LoadingButton disabled={!active} sx={{ minWidth: 156 }} loading={isLoading} variant="outlined" type="submit">
            Next
          </LoadingButton>
        </Grid>
      </Grid>
    </Form>
  )
}

export default Step1
