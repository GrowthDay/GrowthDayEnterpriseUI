import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import passwordRegex, { passwordInvalidMessage } from '../../utils/passwordRegex'

export const UPDATE_PASSWORD_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'UPDATE_PASSWORD']

export type UpdatePasswordInput = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export const UpdatePasswordValidationSchema = yup
  .object()
  .shape({
    currentPassword: yup.string().matches(passwordRegex, passwordInvalidMessage).required('Required'),
    newPassword: yup.string().matches(passwordRegex, passwordInvalidMessage).required('Required'),
    confirmNewPassword: yup
      .string()
      .matches(passwordRegex, passwordInvalidMessage)
      .required('Required')
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
  })
  .required()

const useUpdatePasswordMutation = (
  options: Omit<
    UseMutationOptions<void, unknown, UpdatePasswordInput, typeof UPDATE_PASSWORD_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) =>
  useMutation(
    UPDATE_PASSWORD_MUTATION_KEY,
    (input: UpdatePasswordInput) => axiosGrowthDay.post<void>('/users/passwordChange', input),
    options
  )
export default useUpdatePasswordMutation
