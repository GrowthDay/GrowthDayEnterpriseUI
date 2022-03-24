import { ComponentType } from 'react'
import AccountDetails from './AccountDetails'
import PaymentDetails from './PaymentDetails'

type Step = {
  label: string
  description?: string
  component: ComponentType<StepComponentProps>
}

export type StepComponentProps = {
  active: boolean
  next: () => void
}

const steps: Step[] = [
  {
    label: 'Account details',
    description: 'These details will be used for branding and helping you login to the GrowthDay enterprise portal',
    component: AccountDetails
  },
  {
    label: 'Payment',
    component: PaymentDetails
  }
]

export default steps
