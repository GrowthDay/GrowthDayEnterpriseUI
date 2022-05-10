import { InputBaseComponentProps, styled } from '@mui/material'
import React, { FC, forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, useEffect } from 'react'
import { UseControllerProps } from 'react-hook-form'
import { FieldPath, FieldValues } from 'react-hook-form/dist/types'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import FormInput, { FormInputProps } from './FormInput'

export type FormPhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormInputProps &
  UseControllerProps<TFieldValues, TName> & {
    country?: string
    defaultCountry?: string
    canChangeCountry?: boolean
  }

const StyledPhoneInput = styled(PhoneInput)({
  width: '100%',
  '.PhoneInputCountry': {
    marginLeft: 12,
    marginRight: -4
  }
})

const CountrySelectComponent: FC<any> = ({ onChange, value, country, children }) => {
  useEffect(() => {
    if (country && value !== country) {
      onChange?.(country)
    }
  }, [value, country, onChange])
  return null
}

const PhoneNumberInput: ForwardRefExoticComponent<
  PropsWithoutRef<InputBaseComponentProps> & RefAttributes<HTMLInputElement>
> = forwardRef(({ value, onChange, onFocus, onBlur, defaultCountry, country, canChangeCountry, ...props }, ref) => (
  <StyledPhoneInput
    value={value}
    onChange={onChange}
    autoComplete="new-password"
    limitMaxLength
    countryCallingCodeEditable={false}
    defaultCountry={defaultCountry || 'US'}
    country={country}
    withCountryCallingCode
    international
    numberInputProps={props}
    onFocus={onFocus}
    onBlur={onBlur}
    disabled={props.disabled}
    {...(canChangeCountry
      ? {}
      : {
          countrySelectComponent: (countrySelectProps) => (
            <CountrySelectComponent {...countrySelectProps} country={country} />
          )
        })}
  />
))

function FormPhoneInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ defaultCountry, country, canChangeCountry, ...props }: FormPhoneInputProps<TFieldValues, TName>) {
  return (
    <FormInput
      {...props}
      InputProps={{
        inputComponent: PhoneNumberInput,
        inputProps: { defaultCountry, country, canChangeCountry }
      }}
    />
  )
}

export default FormPhoneInput
