export const formatNumber = (value: number, locales = 'en-US', options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(locales, options).format(value)
}

export const formatCurrency = (value?: number | null, currency = 'USD', locales = 'en-US') => {
  return formatNumber(value || 0, locales, {
    style: 'currency',
    currency
  })
}
