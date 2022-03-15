import { InputBaseComponentProps, styled } from '@mui/material'
import React, { FC, forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import FormInput, { FormInputProps } from './FormInput'

export type FormPhoneInputProps = FormInputProps & {
  country?: string
  defaultCountry?: string
}

const StyledPhoneInput = styled(PhoneInput)({
  width: '100%'
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
> = forwardRef(({ value, onChange, onFocus, onBlur, defaultCountry, country, ...props }, ref) => (
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
    countrySelectComponent={(countrySelectProps) => (
      <CountrySelectComponent {...countrySelectProps} country={country} />
    )}
  />
))

const FormPhoneInput: FC<FormPhoneInputProps> = ({ defaultCountry, country, ...props }) => (
  <FormInput
    {...props}
    InputProps={{
      inputComponent: PhoneNumberInput,
      inputProps: { defaultCountry, country }
    }}
  />
)

export default FormPhoneInput
