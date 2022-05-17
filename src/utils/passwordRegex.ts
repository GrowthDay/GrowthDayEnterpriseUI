const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
export const passwordInvalidMessage =
  'Choose a password with at least 8 characters. Choose a mixture of upper and lower case letters, numbers, and symbols.'

export default passwordRegex
