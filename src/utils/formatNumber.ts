import parseNumber from './parseNumber'

const format = (input: number) => {
  const negative = input < 0
  const str = String(negative ? -input : input)
  const arr = []
  let i = str.indexOf('.')
  let j = 0

  if (i === -1) {
    i = str.length
  } else {
    for (j = str.length - 1; j > i; j--) {
      arr.push(str[j])
    }
    arr.push('.')
  }
  i--

  for (j = 0; i >= 0; i--, j++) {
    if (j > 2 && j % 2 === 1) {
      arr.push(',')
    }
    arr.push(str[i])
  }

  if (negative) {
    arr.push('-')
  }

  return arr.reverse().join('')
}

const formatNumber = (value?: string | null | number, type: 'currency' | 'number' = 'number') => {
  const numeralValue = parseNumber(value as string)
  const formattedString = format(numeralValue)
  if (type === 'currency') {
    return `₹${formattedString}`
  }
  return formattedString
}

export default formatNumber
