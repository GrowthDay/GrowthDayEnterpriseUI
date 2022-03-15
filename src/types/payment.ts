export type IStripeCardFields = {
  fullName: string
  phoneNumber: string
  country: string
  region: string
  zipCode: string
}

export type IBuySubscriptions = IStripeCardFields & {
  plan: null | number
  seats: null | number
}
