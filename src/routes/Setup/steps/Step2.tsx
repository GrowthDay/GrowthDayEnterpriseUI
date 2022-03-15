import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Grid, MenuItem, Theme, Typography, useTheme } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import useCompanyApi from '../../../api/useCompanyApi'
import Form from '../../../components/forms/Form'
import FormInput from '../../../components/forms/FormInput'
import { ICompanyRequest } from '../../../types/company'
import roles from '../../../utils/roles'
import { StepComponentProps } from './index'

const validationSchema = yup
  .object()
  .shape({
    companyName: yup.string().required(),
    role: yup.string().required()
  })
  .required()

const defaultValues: ICompanyRequest = {
  companyName: '',
  role: ''
}

const Step2: FC<StepComponentProps> = ({ next, active }) => {
  const theme = useTheme<Theme>()
  const methods = useForm<ICompanyRequest>({
    defaultValues,
    resolver: yupResolver(validationSchema)
  })
  const { isLoading } = useCompanyApi()
  const handleSubmit = async (values: ICompanyRequest) => {
    if (active && !isLoading) {
      // await mutateAsync(values)
      next()
    }
  }

  return (
    <Form<ICompanyRequest> methods={methods} onSuccess={handleSubmit}>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <FormInput disabled={!active} placeholder="GrowthDay Inc." name="companyName" label="Company Name" />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            disabled={!active}
            name="role"
            label="Role"
            select
            SelectProps={{
              displayEmpty: true,
              renderValue: (value) =>
                roles.find((role) => role.value === (value as string))?.label || (
                  <Typography
                    sx={[!active && { textFillColor: theme.palette.grey['300'] }]}
                    color="text.disabled"
                    component="span"
                  >
                    Select your role
                  </Typography>
                )
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </FormInput>
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

export default Step2
