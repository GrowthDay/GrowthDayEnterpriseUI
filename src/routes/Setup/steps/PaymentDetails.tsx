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
import { FC, PropsWithChildren, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import useSetupSubscriptionMutation, {
  SetupSubscriptionDefaultValues,
  SetupSubscriptionRequest,
  SetupSubscriptionValidationSchema
} from '../hooks/useSetupSubscriptionMutation'
import useSubscriptionPlansQuery from '../../../api/queries/useSubscriptionPlansQuery'
import Flex from '../../../components/Flex'
import Form from '../../../components/forms/Form'
import FormInput from '../../../components/forms/FormInput'
import FormRadioGroup from '../../../components/forms/FormRadioGroup'
import StripeCardForm from '../../../components/StripeCardForm'
import withElements from '../../../hoc/withElements'
import useAuthUser from '../../../hooks/useAuthUser'
import useStripePayment from '../../../hooks/useStripePayment'
import checkoutLoadingState from '../../../recoil/atoms/checkoutLoadingState'
import { formatCurrency } from '../../../utils/formatters'
import isPopularPlan from '../../../utils/isPopularPlan'
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

const PaymentDetails: FC<StepComponentProps> = ({ next, active }) => {
  const user = useAuthUser()
  const [_loading, setLoading] = useRecoilState(checkoutLoadingState)
  const { isLoading, mutateAsync } = useSetupSubscriptionMutation()
  const methods = useForm<SetupSubscriptionRequest>({
    defaultValues: SetupSubscriptionDefaultValues,
    resolver: yupResolver(SetupSubscriptionValidationSchema)
  })
  const { data: subscriptionPlans } = useSubscriptionPlansQuery()
  const { addPaymentMethod } = useStripePayment()

  const loading = _loading || isLoading

  const handleSubmit = async (values: SetupSubscriptionRequest) => {
    if (active && !loading) {
      setLoading(true)
      try {
        const paymentMethodId = await addPaymentMethod(values)
        await mutateAsync({ ...values, paymentMethodId })
        next()
      } catch (e) {}
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      methods.setValue('fullName', user.name ?? '')
    }
  }, [user, methods])

  return (
    <Form<SetupSubscriptionRequest> id="signup-checkout-form" methods={methods} onSuccess={handleSubmit}>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <FormRadioGroup name="stripePriceId" label="Select a plan">
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
                key={subscriptionPlan.stripeYearlyPriceId}
                value={subscriptionPlan.stripeYearlyPriceId}
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
            name="totalSeats"
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

export default withElements(PaymentDetails)
