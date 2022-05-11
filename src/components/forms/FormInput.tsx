import { TextField, TextFieldProps } from '@mui/material'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import { FieldPath, FieldValues } from 'react-hook-form/dist/types'

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<TextFieldProps, 'name'> & UseControllerProps<TFieldValues, TName>

function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, rules, shouldUnregister, defaultValue, control: _control, ...props }: FormInputProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <Controller<TFieldValues, TName>
      name={name}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      control={_control || control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <>
          <TextField
            fullWidth
            {...props}
            name={name}
            value={value || ''}
            onChange={(...rest) => {
              onChange(...rest)
              props.onChange?.(...rest)
            }}
            onBlur={(...rest) => {
              onBlur()
              props.onBlur?.(...rest)
            }}
            error={invalid}
            helperText={error ? error.message : props.helperText}
          />
        </>
      )}
    />
  )
}

export default FormInput
