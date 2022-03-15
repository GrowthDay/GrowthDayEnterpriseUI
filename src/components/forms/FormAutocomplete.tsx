import { Autocomplete, AutocompleteProps, TextField } from '@mui/material'
import { FC, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export type FormAutocompleteProps = Omit<AutocompleteProps<any, false, true, false>, 'renderInput'> & {
  label?: ReactNode
  name: string
}

const FormAutocomplete: FC<FormAutocompleteProps> = ({ name, ...props }) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
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
              />
            )}
          />
        </>
      )}
    />
  )
}

export default FormAutocomplete
