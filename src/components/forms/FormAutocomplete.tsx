import { Autocomplete, AutocompleteProps, TextField, TextFieldProps } from '@mui/material'
import { ReactNode } from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import { FieldPath, FieldValues } from 'react-hook-form/dist/types'

export type FormAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<AutocompleteProps<any, false | true, false | true, false | true>, 'renderInput'> &
  UseControllerProps<TFieldValues, TName> & {
    label?: ReactNode
    InputProps?: TextFieldProps['InputProps']
  }

function FormAutocomplete<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control: _control,
  InputProps,
  ...props
}: FormAutocompleteProps<TFieldValues, TName>) {
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
          <Autocomplete
            fullWidth
            size="small"
            autoHighlight
            autoComplete
            disableClearable
            getOptionLabel={(option: any) => option?.name ?? ''}
            {...props}
            value={value || ''}
            onChange={(...options) => {
              onChange(options[1])
              props.onChange?.(...options)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
              }
            }}
            onBlur={onBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={props.placeholder}
                label={props.label}
                error={invalid}
                helperText={error?.message}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password'
                }}
                InputLabelProps={{ ...params.InputLabelProps, shrink: true }}
                InputProps={{ ...params.InputProps, ...InputProps }}
              />
            )}
          />
        </>
      )}
    />
  )
}

export default FormAutocomplete
