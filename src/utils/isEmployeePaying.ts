import { Organization, OrganizationPaymentFlowEnum } from '../types/api'

const isEmployeePaying = (organization?: Organization | null) =>
  organization && organization.paymentFlow === OrganizationPaymentFlowEnum.Employee

export default isEmployeePaying
