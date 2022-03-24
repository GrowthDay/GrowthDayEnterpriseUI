import { FormControl, FormHelperText, FormLabel, RadioGroup } from '@mui/material'
import { nanoid } from 'nanoid'
import { ChangeEvent, PropsWithChildren, ReactNode, useRef } from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import { FieldPath, FieldValues } from 'react-hook-form/dist/types'

export type FormRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
  id?: string
  label?: ReactNode
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void
  value?: string
  helperText?: string
}

function FormRadioGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control: _control,
  helperText,
  children,
  label,
  ...props
}: PropsWithChildren<FormRadioGroupProps<TFieldValues, TName>>) {
  const { control } = useFormContext<TFieldValues>()
  const id = useRef(props.id || nanoid()).current
  return (
    <Controller<TFieldValues, TName>
      name={name}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      control={_control || control}
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
