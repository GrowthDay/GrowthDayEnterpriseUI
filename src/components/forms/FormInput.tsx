import { TextField, TextFieldProps } from '@mui/material'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export type FormInputProps = Omit<TextFieldProps, 'name'> & {
  name: string
}

const FormInput: FC<FormInputProps> = ({ name, ...props }) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <>
          <TextField
            fullWidth
            {...props}
            name={name}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={invalid}
            helperText={error ? error.message : props.helperText}
          />
        </>
      )}
    />
  )
}

export default FormInput
