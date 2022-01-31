import formatNumber from './formatNumber'
import parseNumber from './parseNumber'

const round = (num: number, precision: number = 2): number => {
  const pow = 10 ** (precision >= 0 ? precision : 0)
  return Math.floor(num * pow) / pow
}

const units = [
  {
    unit: 'K',
    value: 1000
  },
  {
    unit: 'M',
    value: 1000000
  },
  {
    unit: 'B',
    value: 1000000000
  }
]

const format = (input: number, precision: number = 2) => {
  const negative = input < 0
  const raw = Math.abs(input)

  for (let i = units.length - 1; i >= 0; i -= 1) {
    const unit = units[i].unit
    const size = units[i].value
    if (raw >= size) {
      const result = round(raw / size, precision)
      return (negative ? '-' : '') + formatNumber(result, 'number') + unit
    }
  }

  return input.toString()
}

const abbrNumber = (value?: string | null | number, precision: number = 2) => {
  const numeralValue = parseNumber(value as string)
  return format(numeralValue, precision)
}

export default abbrNumber
