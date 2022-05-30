import { AddOutlined, NavigateNextOutlined } from '@mui/icons-material'
import { Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import { startCase, toLower } from 'lodash-es'
import { Dispatch, FC, MouseEvent, SetStateAction } from 'react'
import Moment from 'react-moment'
import useOrganizationQuery from '../../../api/queries/useOrganizationQuery'
import CreditCardLogo from '../../../components/CreditCardLogo'
import Flex from '../../../components/Flex'
import useActiveSubscription from '../../../hooks/useActiveSubscription'
import useMobileView from '../../../hooks/useMobileView'
import { OrganizationPlanFrequencyEnum } from '../../../types/api'
import { formatCurrency } from '../../../utils/formatters'
import isEmployeePaying from '../../../utils/isEmployeePaying'

export const frequencyMap = {
  [OrganizationPlanFrequencyEnum.Year]: 'Yearly',
  [OrganizationPlanFrequencyEnum.Month]: 'Monthly'
}

export const paymentFrequencyMap = {
  [OrganizationPlanFrequencyEnum.Year]: 'Annual',
  [OrganizationPlanFrequencyEnum.Month]: 'Monthly'
}

export type AccountBillingProps = {
  setAddSeatsOpen: Dispatch<SetStateAction<boolean>>
  setUpdateCardOpen: Dispatch<SetStateAction<boolean>>
}

const AccountBilling: FC<AccountBillingProps> = ({ setAddSeatsOpen, setUpdateCardOpen }) => {
  const { data: organization } = useOrganizationQuery()
  const { subscription } = useActiveSubscription()
  const mobileView = useMobileView()
  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setUpdateCardOpen(true)
  }
  const employeePaying = isEmployeePaying(organization)
  return (
    <>
      <Flex mb={2} alignItems="center" justifyContent="space-between">
        <Typography fontWeight={700} variant="h5" data-cy="account-billing-title-text">
          Plans & Billing
        </Typography>
        {!employeePaying && (
          <Button
            onClick={() => setAddSeatsOpen(true)}
            startIcon={<AddOutlined />}
            data-cy="account-billing-add-more-button"
          >
            {mobileView ? 'Add seats' : 'Add more seats'}
          </Button>
        )}
      </Flex>
      <Card elevation={0} sx={{ mb: 6 }}>
        <CardContent
          sx={{
            '&:last-child': {
              padding: {
                xs: 2,
                md: 3
              }
            }
          }}
        >
          <Grid spacing={4} container wrap="wrap">
            <Grid whiteSpace="nowrap" item xs>
              <Typography gutterBottom variant="body2" color="text.disabled">
                Plan
              </Typography>
              <Typography variant="h6" fontWeight={600} data-cy="account-billing-plan-text">
                {subscription?.name} Plan
              </Typography>
            </Grid>
            {employeePaying ? (
              <Grid whiteSpace="nowrap" item xs>
                <Typography gutterBottom variant="body2" color="text.disabled">
                  Annual payment
                </Typography>
                <Typography variant="h6" fontWeight={600} data-cy="account-billing-amount-text">
                  {formatCurrency(subscription?.yearlyAmount ?? 0)}/employee
                </Typography>
              </Grid>
            ) : (
              <>
                <Grid whiteSpace="nowrap" item xs>
                  <Typography gutterBottom variant="body2" color="text.disabled">
                    Seats
                  </Typography>
                  <Typography variant="h6" fontWeight={600} data-cy="account-billing-seats-text">
                    {organization?.seats}
                  </Typography>
                </Grid>
                <Grid whiteSpace="nowrap" item xs>
                  <Typography gutterBottom variant="body2" color="text.disabled">
                    {organization?.planFrequency && paymentFrequencyMap[organization.planFrequency]} payment
                  </Typography>
                  <Typography variant="h6" fontWeight={600} data-cy="account-billing-amount-text">
                    {formatCurrency((organization?.subscriptionAmount ?? 0) / 100)}
                  </Typography>
                </Grid>
                <Grid whiteSpace="nowrap" item xs>
                  <Typography gutterBottom variant="body2" color="text.disabled">
                    {organization?.subscriptionCancelled ? 'Expires on' : 'Next payment due'}
                  </Typography>
                  <Typography variant="h6" fontWeight={600} data-cy="account-billing-next-payment-text">
                    <Moment format="MMM DD, YYYY" date={organization?.subscriptionEndDate} />
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
          {!employeePaying && (
            <>
              <Divider light sx={{ my: 2 }} />
              <Grid spacing={4} container wrap="wrap" justifyContent="space-between" alignItems="flex-end">
                <Grid item>
                  <Typography gutterBottom variant="body2" color="text.disabled">
                    Credit Card Info
                  </Typography>
                  <Typography display="flex" alignItems="center" data-cy="account-billing-credit-card-info">
                    <CreditCardLogo type={toLower(organization?.paymentMethodVendor)} /> &nbsp;{' '}
                    {startCase(organization?.paymentMethodVendor)} ending in&nbsp;
                    <strong>{organization?.paymentMethodLastFour}</strong> &nbsp; &nbsp; Expires&nbsp;
                    <strong>{organization?.paymentMethodExpiry}</strong>
                  </Typography>
                </Grid>
                <Grid item>
                  <Link onClick={handleLinkClick} data-cy="account-billing-update-card-link">
                    Update credit card <NavigateNextOutlined sx={{ verticalAlign: 'middle' }} fontSize="small" />
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default AccountBilling
