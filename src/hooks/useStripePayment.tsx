import { CardElement as StripeCardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useCallback, useMemo } from 'react'
import { IBuySubscriptions } from '../types/payment'
import useAuthUser from './useAuthUser'

const useStripePayment = () => {
  const user = useAuthUser()
  const stripe = useStripe()
  const elements = useElements()
  const addPaymentMethod = useCallback(
    async (value: IBuySubscriptions): Promise<string> => {
      if (!stripe || !elements) {
        throw new Error('Stripe is not initialized')
      }

      const stripeResult = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(StripeCardElement)!,
        billing_details: {
          name: value.fullName,
          email: user?.email || '',
          phone: value.phoneNumber,
          address: {
            country: value.country,
            state: value.region,
            postal_code: value.zipCode
          }
        }
      })

      if (stripeResult.error) {
        if (stripeResult.error.message && /Stripe/.test(stripeResult.error.message)) {
          const [formattedError] = stripeResult.error.message.split(';')
          throw new Error(formattedError)
        }
        throw new Error(stripeResult.error.message)
      }

      return stripeResult.paymentMethod!.id
    },
    [stripe, elements, user]
  )
  return useMemo(() => ({ addPaymentMethod }), [addPaymentMethod])
}

export default useStripePayment
