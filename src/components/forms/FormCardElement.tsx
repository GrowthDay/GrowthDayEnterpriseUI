import { InputBaseComponentProps, styled, Theme, useTheme } from '@mui/material'
import { CardElement as StripeCardElement } from '@stripe/react-stripe-js'
import * as stripeJs from '@stripe/stripe-js'
import React, { FC, forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import FormInput, { FormInputProps } from './FormInput'

const StyledStripeCardElement = styled(StripeCardElement)({
  width: '100%',
  padding: '8.5px 0px 8.5px 14px'
})

const CardElement: ForwardRefExoticComponent<
  PropsWithoutRef<InputBaseComponentProps> & RefAttributes<HTMLInputElement>
> = forwardRef(({ onFocus, onBlur, name, disabled }, ref) => {
  const theme = useTheme<Theme>()

  const handleFocus = () => onFocus?.(document.createEvent('FocusEvent'))
  const handleBlur = () => onBlur?.(document.createEvent('FocusEvent'))

  const { setError, clearErrors } = useFormContext()
  const handleChange = (event: stripeJs.StripeCardElementChangeEvent) => {
    if (event.error) {
      setError(name, {
        type: event.error.type,
        message: event.error.message
      })
    } else {
      clearErrors(name)
    }
  }

  return (
    <StyledStripeCardElement
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      options={{
        disabled,
        hidePostalCode: true,
        style: {
          base: {
            color: '#444',
            fontWeight: theme.typography.body1.fontWeight,
            fontFamily: theme.typography.body1.fontFamily,
            fontSize: `${theme.typography.htmlFontSize}px`,
            lineHeight: '23px',
            fontSmoothing: 'antialiased',
            '::placeholder': {
              color: theme.palette.text.disabled
            },
            ':-webkit-autofill': {
              color: theme.palette.text.disabled
            }
          },
          invalid: {
            color: theme.palette.error.main,
            '::placeholder': {
              color: theme.palette.error.main
            }
          }
        }
      }}
    />
  )
})

const FormCardElement: FC<FormInputProps> = (props) => (
  <FormInput
    {...props}
    {...(props.disabled
      ? {}
      : {
          InputProps: {
            inputComponent: CardElement
          }
        })}
  />
)

export default FormCardElement
