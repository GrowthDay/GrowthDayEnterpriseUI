const parseError = (error?: any) => {
  return (
    error?.response?.errorMessage ||
    error?.response?.data?.errorMessage ||
    error?.response?.['Error Message'] ||
    error?.response?.data?.['Error Message'] ||
    error?.response?.debugMessage ||
    error?.response?.data?.debugMessage ||
    error?.response?.data?.message ||
    error?.response?.message ||
    error?.message ||
    error?.data?.debugMessage ||
    error?.data?.errorMessage
  )
}

export default parseError
