import { styled } from '@mui/material'
import { ComponentProps } from 'react'
import { FormProvider } from 'react-hook-form'
import { UseFormReturn } from 'react-hook-form/dist/types'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form/dist/types/form'

const StyledForm = styled('form')({})

export type FormProps<T> = ComponentProps<typeof StyledForm> & {
  onSuccess: SubmitHandler<T>
  onError?: SubmitErrorHandler<T>
  methods: UseFormReturn<T, any>
}

function Form<T>({ methods, onSuccess, onError, ...props }: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <StyledForm noValidate {...props} onSubmit={methods.handleSubmit(onSuccess, onError)} />
    </FormProvider>
  )
}

export default Form
