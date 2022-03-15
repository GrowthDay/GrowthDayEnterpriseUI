import { yupResolver } from '@hookform/resolvers/yup'
import { InfoOutlined } from '@mui/icons-material'
import {
  Chip,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material'
import * as React from 'react'
import { FC, PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import useSubscriptionPlansApi from '../../../api/useSubscriptionPlansApi'
import Flex from '../../../components/Flex'
import Form from '../../../components/forms/Form'
import FormInput from '../../../components/forms/FormInput'
import FormRadioGroup from '../../../components/forms/FormRadioGroup'
import StripeCardForm, { stripeCardValidationSchema } from '../../../components/StripeCardForm'
import withElements from '../../../hoc/withElements'
import useModifiedRecoilState from '../../../hooks/useModifiedRecoilState'
import useStripePayment from '../../../hooks/useStripePayment'
import checkoutLoadingState from '../../../recoil/atoms/checkoutLoadingState'
import { IBuySubscriptions } from '../../../types/payment'
import { formatCurrency } from '../../../utils/formatters'
import isPopularPlan from '../../../utils/isPopularPlan'
import mergeSchemas from '../../../utils/mergeSchemas'
import PlanInfo from '../PlanInfo'
import { StepComponentProps } from './index'

const HtmlTooltip = styled(({ className, ...props }: PropsWithChildren<TooltipProps>) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    padding: 0,
    maxWidth: 400
  }
})
const StyledRadio = styled(Radio)(({ theme: { spacing } }) => ({
  transform: 'scale(1.25)',
  marginRight: spacing(0.5)
}))

const planValidationSchema = yup
  .object()
  .shape({
    plan: yup.number().nullable().required(),
    seats: yup.number().nullable().required()
  })
  .required()

const validationSchema = mergeSchemas(planValidationSchema, stripeCardValidationSchema)

const defaultValues: IBuySubscriptions = {
  plan: null,
  seats: null,
  phoneNumber: '',
  fullName: '',
  country: '',
  region: '',
  zipCode: ''
}

const Step3: FC<StepComponentProps> = ({ next, active }) => {
  const [loading, setLoading] = useModifiedRecoilState(checkoutLoadingState)
  const methods = useForm<IBuySubscriptions>({
    defaultValues,
    resolver: yupResolver(validationSchema)
  })
  const { data: subscriptionPlans } = useSubscriptionPlansApi()
  const { addPaymentMethod } = useStripePayment()
  const handleSubmit = async (values: IBuySubscriptions) => {
    if (active && !loading) {
      setLoading(true)
      const paymentMethodId = await addPaymentMethod(values)
      console.log({ paymentMethodId })
      setLoading(false)
      // next()
    }
  }

  return (
    <Form<IBuySubscriptions> id="signup-checkout-form" methods={methods} onSuccess={handleSubmit}>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <FormRadioGroup name="plan" label="Select a plan">
            {subscriptionPlans?.map((subscriptionPlan) => (
              <FormControlLabel
                sx={{
                  my: 1,
                  px: 1,
                  py: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  width: '100%',
                  mx: 0,
                  borderRadius: 1
                }}
                disabled={!active}
                key={subscriptionPlan.id}
                value={subscriptionPlan.id}
                control={<StyledRadio disableRipple />}
                componentsProps={{
                  typography: { display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between' }
                }}
                label={
                  <>
                    <div>
                      <Typography variant="body1" fontWeight={500}>
                        {subscriptionPlan.name}
                      </Typography>
                      <Typography variant="body2">
                        {formatCurrency(subscriptionPlan.yearlyAmount ?? 0, subscriptionPlan.currency)}/year
                      </Typography>
                    </div>
                    <Flex>
                      {isPopularPlan(subscriptionPlan) && <Chip label="Most Popular" size="small" sx={{ mr: 2 }} />}
                      <HtmlTooltip title={<PlanInfo plan={subscriptionPlan} />}>
                        <InfoOutlined color="action" />
                      </HtmlTooltip>
                    </Flex>
                  </>
                }
              />
            ))}
          </FormRadioGroup>
        </Grid>
        <Grid item xs={12}>
          <FormInput
            disabled={!active}
            placeholder="Between 5 to 100"
            name="seats"
            label="Number of seats"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" mb={2}>
            If you are buying more than 100 seats, <Link>schedule a demo</Link>
          </Typography>
          <Typography variant="body2">You will be billed annually. Cancel at any time.</Typography>
        </Grid>
        <StripeCardForm methods={methods} disabled={!active} />
      </Grid>
    </Form>
  )
}

export default withElements(Step3)
