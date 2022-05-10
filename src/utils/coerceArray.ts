const coerceArray = (input: any): any[] => (Array.isArray(input) ? input : input ? [input] : [])

export default coerceArray
