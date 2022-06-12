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
    helperText?: ReactNode
    InputProps?: TextFieldProps['InputProps']
    onBeforeChange?: (value: any) => any
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
  onBeforeChange,
  helperText,
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
            {...props}
            value={value || ''}
            onChange={(event, value, ...rest) => {
              let newValue = value
              if (onBeforeChange) {
                newValue = onBeforeChange(newValue)
              }
              onChange(newValue)
              props.onChange?.(event, value, ...rest)
            }}
            onBlur={(...rest) => {
              if (props.multiple && props.freeSolo && props.clearOnBlur) {
                const inputValue = (rest[0].target as HTMLInputElement).value
                let newValue = [...value, inputValue] as unknown as TFieldValues
                if (onBeforeChange) {
                  newValue = onBeforeChange(newValue)
                }
                onChange(newValue)
              }
              onBlur()
              props.onBlur?.(...rest)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={props.placeholder}
                label={props.label}
                error={invalid}
                helperText={error?.message || helperText}
                autoComplete="off"
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
