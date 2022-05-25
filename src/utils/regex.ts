export const passwordRegex = {
  regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  message:
    'Choose a password with at least 8 characters. Choose a mixture of upper and lower case letters, numbers, and symbols.'
}

export const nameRegex = {
  regex: /^[a-z ,.'-´]+$/i,
  message: 'Please enter a valid first name'
}

export const emailDomainsRegex = {
  regex: /^@(www.)?[a-z\d]+(\.[a-z]{2,}){1,3}(#?\/?[a-z\d#]+)*\/?(\?[a-z\d-_]+=[a-z\d-%]+&?)?$/,
  message: 'Please enter valid domains'
}
