import coerceArray from '../../../utils/coerceArray'

const validateDomains = (values: string | string[]): string[] =>
  (coerceArray(values) as string[])
    .flatMap((value) => value.split(',').map((domain) => (domain ?? '').trim()))
    .filter(Boolean)
// .filter((domain) => emailDomainRegex.test(domain))

export default validateDomains
