import { isNil } from 'lodash-es'

const parseNumber = (input?: string | null | number) => {
  if (isNil(input)) {
    return 0
  }
  const numeralValue = parseFloat(input as string)
  if (isNaN(numeralValue)) {
    return 0
  }
  return numeralValue
}
export default parseNumber
