import { FormControl, FormHelperText, FormLabel, RadioGroup } from '@mui/material'
import { nanoid } from 'nanoid'
import * as React from 'react'
import { FC, ReactNode, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export type FormRadioGroupProps = {
  id?: string
  label?: ReactNode
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
  value?: string
  helperText?: string
}

const FormRadioGroup: FC<FormRadioGroupProps> = ({ name, helperText, children, label, ...props }) => {
  const { control } = useFormContext()
  const id = useRef(props.id || nanoid()).current
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <>
          <FormControl error={invalid} sx={{ width: '100%' }}>
            <FormLabel id={id}>{label}</FormLabel>
            <RadioGroup
              aria-labelledby={id}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              sx={{ width: '100%' }}
            >
              {children}
            </RadioGroup>
            <FormHelperText>{helperText || error?.message}</FormHelperText>
          </FormControl>
        </>
      )}
    />
  )
}

export default FormRadioGroup
