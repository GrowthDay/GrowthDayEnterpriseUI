const formatNumber = (input?: number) => new Intl.NumberFormat('en-US').format(Math.floor(input ?? 0))

export default formatNumber
