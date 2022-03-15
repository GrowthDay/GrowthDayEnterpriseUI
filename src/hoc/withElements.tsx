import { Elements as StripeElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import config from '../config'

const stripe = loadStripe(config.stripePublishKey)

const options = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Inter'
    }
  ]
}

const withElements =
  <P extends {}>(Component: React.ComponentType<P>) =>
  (props: P) =>
    (
      <StripeElements stripe={stripe} options={options}>
        <Component {...(props as P)} />
      </StripeElements>
    )

export default withElements
