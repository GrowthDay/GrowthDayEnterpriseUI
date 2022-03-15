const coerceArray = <T>(input: T | T[] | null | undefined): T[] => (Array.isArray(input) ? input : input ? [input] : [])

export default coerceArray
