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
import { maxBy } from 'lodash-es'
import * as React from 'react'
import { FC, PropsWithChildren, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import useOrganizationUserQuery from '../../../api/queries/useOrganizationUserQuery'
import { useDefaultCountryState } from '../../../hooks/useCountryState'
import welcomeState from '../../../recoil/atoms/welcomeState'
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
import useStripePayment from '../../../hooks/useStripePayment'
import checkoutLoadingState from '../../../recoil/atoms/checkoutLoadingState'
import { formatCurrency } from '../../../utils/formatters'
import PlanInfo from '../PlanInfo'
import { StepComponentProps } from './index'

const HtmlTooltip = styled(({ className, ...props }: PropsWithChildren<TooltipProps>) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    padding: 0,
    maxWidth: 420
  }
})
const StyledRadio = styled(Radio)(({ theme: { spacing } }) => ({
  transform: 'scale(1.25)',
  marginRight: spacing(0.5)
}))

const PaymentDetails: FC<StepComponentProps> = ({ next, active }) => {
  const setWelcomeState = useSetRecoilState(welcomeState)
  const { data } = useDefaultCountryState()
  const { data: user } = useOrganizationUserQuery()
  const [_loading, setLoading] = useRecoilState(checkoutLoadingState)
  const { isLoading, mutateAsync } = useSetupSubscriptionMutation()
  const { data: subscriptionPlans = [] } = useSubscriptionPlansQuery()
  const { addPaymentMethod } = useStripePayment()
  const methods = useForm<SetupSubscriptionRequest>({
    defaultValues: SetupSubscriptionDefaultValues,
    resolver: yupResolver(SetupSubscriptionValidationSchema)
  })

  const loading = _loading || isLoading

  const selectedPlanId = methods.watch('stripePriceId')
  const selectedPlan = useMemo(
    () => subscriptionPlans.find((plan) => plan.stripeYearlyPriceId === selectedPlanId),
    [selectedPlanId, subscriptionPlans]
  )

  const handleSubmit = async (values: SetupSubscriptionRequest) => {
    if (active && !loading) {
      setLoading(true)
      try {
        const paymentMethodId = await addPaymentMethod(values)
        await mutateAsync({ ...values, paymentMethodId })
        setWelcomeState(true)
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

  useEffect(() => {
    if (subscriptionPlans.length && !selectedPlan) {
      methods.setValue(
        'stripePriceId',
        (maxBy(subscriptionPlans, 'yearlyAmount') ?? subscriptionPlans[0]).stripeYearlyPriceId
      )
    }
  }, [subscriptionPlans, selectedPlan, methods])

  useEffect(() => {
    if (data?.country) {
      methods.setValue('country', data.country)
      methods.setValue('region', data.state ?? '')
    }
  }, [data, methods])

  const hasMultiplePlans = subscriptionPlans.length > 1

  useEffect(() => {
    if (selectedPlan?.minimumQuantity) {
      methods.setValue('minSeats', selectedPlan.minimumQuantity)
    }
  }, [methods, selectedPlan?.minimumQuantity])

  return (
    <Form<SetupSubscriptionRequest>
      id="signup-checkout-form"
      methods={methods}
      onSuccess={handleSubmit}
      data-cy="payment-form"
    >
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <FormRadioGroup name="stripePriceId" label={subscriptionPlans.length > 1 && 'Select a plan'}>
            {subscriptionPlans.map((subscriptionPlan) => (
              <FormControlLabel
                sx={[
                  {
                    my: 1,
                    py: 1,
                    px: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    width: '100%',
                    mx: 0,
                    borderRadius: 1
                  },
                  hasMultiplePlans
                    ? {}
                    : {
                        pl: 1.5,
                        '.MuiRadio-root': {
                          display: 'none'
                        }
                      }
                ]}
                data-cy="payment-subscription-plan-radio"
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
                        <strong>{formatCurrency(subscriptionPlan.yearlyAmount ?? 0, subscriptionPlan.currency)}</strong>
                        /year <Chip sx={{ ml: 0.5 }} size="small" label={subscriptionPlan.name} />
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        plus applicable taxes
                      </Typography>
                    </div>
                    <Flex>
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
            placeholder={`Between ${selectedPlan?.minimumQuantity ?? 1} to 100`}
            name="totalSeats"
            label="Number of seats"
            type="number"
            data-cy="payment-seats-number-input"
            inputProps={{
              min: selectedPlan?.minimumQuantity ?? 1
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" mb={2}>
            If you are buying more than 100 seats,{' '}
            <Link href="https://www.growthday.com/Demo" target="_blank">
              schedule a demo
            </Link>
          </Typography>
          <Typography variant="body2">You will be billed annually. Cancel at any time.</Typography>
        </Grid>
        <StripeCardForm methods={methods} disabled={!active} />
        <Grid item xs={12}>
          <Typography color="text.disabled" align="center" variant="body2">
            State and local sales tax will be calculated on your final invoice.
          </Typography>
        </Grid>
      </Grid>
    </Form>
  )
}

export default withElements(PaymentDetails)
