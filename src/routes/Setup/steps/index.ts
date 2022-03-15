import { ComponentType } from 'react'
import { IUser } from '../../../types/user'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

type Step = {
  label: string
  description?: string
  component: ComponentType<StepComponentProps>
}

export type StepComponentProps = {
  user?: IUser
  active: boolean
  next: () => void
}

const steps: Step[] = [
  {
    label: 'Create admin account',
    description: 'This account will be used to help you login to the GrowthDay enterprise portal',
    component: Step1
  },
  {
    label: 'Enter company details',
    description: 'These details will be used for branding across the accounts you invite',
    component: Step2
  },
  {
    label: 'Payment',
    component: Step3
  }
]

export default steps
