import { AddOutlined, NavigateNextOutlined } from '@mui/icons-material'
import { Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import { startCase, toLower } from 'lodash-es'
import { Dispatch, FC, MouseEvent, SetStateAction } from 'react'
import Moment from 'react-moment'
import CreditCardLogo from '../../components/CreditCardLogo'
import Flex from '../../components/Flex'
import useAuthOrganization from '../../hooks/useAuthOrganization'
import useMobileView from '../../hooks/useMobileView'
import { OrganizationPaymentMethodTypeEnum, OrganizationPlanFrequencyEnum } from '../../types/api'
import { formatCurrency } from '../../utils/formatters'

// TODO: Credit card type

const frequencyMap = {
  [OrganizationPlanFrequencyEnum.Year]: 'Yearly',
  [OrganizationPlanFrequencyEnum.Month]: 'Monthly'
}

const paymentFrequencyMap = {
  [OrganizationPlanFrequencyEnum.Year]: 'Annual',
  [OrganizationPlanFrequencyEnum.Month]: 'Monthly'
}

const paymentModeMap = {
  [OrganizationPaymentMethodTypeEnum.Card]: 'Credit Card',
  [OrganizationPaymentMethodTypeEnum.Paypal]: 'Paypal',
  [OrganizationPaymentMethodTypeEnum.Apple]: 'Apple Pay'
}

export type AccountBillingProps = {
  setAddSeatsOpen: Dispatch<SetStateAction<boolean>>
  setUpdateCardOpen: Dispatch<SetStateAction<boolean>>
}

const AccountBilling: FC<AccountBillingProps> = ({ setAddSeatsOpen, setUpdateCardOpen }) => {
  const organization = useAuthOrganization()
  const mobileView = useMobileView()
  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setUpdateCardOpen(true)
  }
  return (
    <>
      <Flex mb={2} alignItems="center" justifyContent="space-between">
        <Typography fontWeight={700} variant="h5">
          Plans & Billing
        </Typography>
        <Button onClick={() => setAddSeatsOpen(true)} startIcon={<AddOutlined />}>
          {mobileView ? 'Add seats' : 'Add more seats'}
        </Button>
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
            <Grid item xs>
              <Typography gutterBottom variant="body2" color="text.disabled">
                Plan
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {organization?.planName} {organization?.planFrequency && frequencyMap[organization.planFrequency]}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography gutterBottom variant="body2" color="text.disabled">
                Seats
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {organization?.seats}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography gutterBottom variant="body2" color="text.disabled">
                {organization?.planFrequency && paymentFrequencyMap[organization.planFrequency]} payment
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {formatCurrency(organization?.subscriptionAmount)}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography gutterBottom variant="body2" color="text.disabled">
                Payment method
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {organization?.paymentMethodType && paymentModeMap[organization.paymentMethodType]}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography gutterBottom variant="body2" color="text.disabled">
                {organization?.subscriptionCancelled ? 'Expires on' : 'Next payment due'}
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                <Moment format="MMM DD, YYYY" date={organization?.subscriptionEndDate} />
              </Typography>
            </Grid>
          </Grid>
          <Divider light sx={{ my: 2 }} />
          <Grid spacing={4} container wrap="wrap" justifyContent="space-between" alignItems="flex-end">
            <Grid item>
              <Typography gutterBottom variant="body2" color="text.disabled">
                Credit Card Info
              </Typography>
              <Typography display="flex" alignItems="center">
                <CreditCardLogo type={toLower(organization?.paymentMethodVendor)} /> &nbsp;{' '}
                {startCase(organization?.paymentMethodVendor)} ending in&nbsp;
                <strong>{organization?.paymentMethodLastFour}</strong> &nbsp; &nbsp; Expires&nbsp;
                <strong>{organization?.paymentMethodExpiry}</strong>
              </Typography>
            </Grid>
            <Grid item>
              <Link onClick={handleLinkClick}>
                Update credit card <NavigateNextOutlined sx={{ verticalAlign: 'middle' }} fontSize="small" />
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountBilling
