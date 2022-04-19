import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormHelperText,
  Link,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography
} from '@mui/material'
import * as React from 'react'
import { ChangeEvent, FC, useState } from 'react'
import useUpdateSubscriptionMutation from '../../api/mutations/useUpdateSubscriptionMutation'
import useProratedAmountQuery from '../../api/queries/useProratedAmountQuery'
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import useSubscriptionPlansQuery from '../../api/queries/useSubscriptionPlansQuery'
import Flex from '../../components/Flex'
import withDialog from '../../hoc/withDialog'
import useMobileView from '../../hooks/useMobileView'
import { OrganizationUpdateSubscription } from '../../types/api'
import { formatCurrency } from '../../utils/formatters'

// TODO: Prorated amount

export type AddMoreSeatsProps = Omit<DialogProps, 'children'>

const StyledTableCell = styled(TableCell)({
  borderBottom: 'none'
})

const StyledPrimaryTableCell = styled(StyledTableCell)({
  pl: 0
})

const StyledTableCellHeader = styled(StyledTableCell)(({ theme: { palette } }) => ({
  color: palette.text.disabled,
  fontWeight: 400
}))

const StyledPrimaryTableCellHeader = styled(StyledTableCellHeader)(({ theme: { palette } }) => ({
  pl: 0
}))

const titleLabelledBy = 'add-seats-dialog-title'

const AddMoreSeats: FC<AddMoreSeatsProps> = ({ onClose }) => {
  const { data: organization } = useOrganizationQuery()
  const { data: subscriptionPlans, isFetching: isSubscriptionLoading } = useSubscriptionPlansQuery()
  const { mutateAsync, isLoading } = useUpdateSubscriptionMutation()
  const [count, setCount] = useState('0')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [calculatedCount, setCalculatedCount] = useState(0)
  const mobileView = useMobileView()

  const plan = subscriptionPlans?.find((plan) => plan.stripeYearlyPriceId === organization?.stripePriceId)

  const intCount = parseInt(count)
  const perSeat = plan?.yearlyAmount ?? 0
  const totalSeats = calculatedCount + (organization?.seats ?? 0)
  const totalCost = formatCurrency(perSeat * totalSeats)
  const maxSeats = 100 - (organization?.seats ?? 0)
  const isInvalid = +count > maxSeats || +count < 0

  const organizationUpdateSubscription: OrganizationUpdateSubscription = {
    totalSeats,
    stripePriceId: organization?.stripePriceId
  }
  const { data: proratedAmount, isFetching: isProratedAmountFetching } = useProratedAmountQuery(
    organizationUpdateSubscription,
    { enabled: (organizationUpdateSubscription.totalSeats ?? 0) > (organization?.seats ?? 0) }
  )

  const proratedCost = formatCurrency((proratedAmount?.subTotalInCents ?? 0) / 100)

  const handleCalculate = () => {
    if (intCount > 0 && !isInvalid) {
      setCalculatedCount(intCount)
    }
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setCount(ev.target.value)
    if (calculatedCount) {
      setCalculatedCount(0)
    }
  }

  const handleSubmit = async () => {
    await mutateAsync(organizationUpdateSubscription)
    onClose?.({}, 'backdropClick')
  }

  if (showConfirmation) {
    return (
      <>
        <DialogTitle id={titleLabelledBy} data-cy="add-more-seats-confirmation-title-text">
          Adding {calculatedCount} seat{calculatedCount === 1 ? '' : 's'} to the plan
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" mb={2} data-cy="add-more-seats-confirmation-subtitle-text">
            You will be billed{' '}
            <Typography component="span" color="text.primary">
              {proratedCost}
            </Typography>{' '}
            and from next billing cycle the total amount will be {totalCost}. Do you want to continue?
          </Typography>
          <Typography mb={2} color="text.disabled" variant="body2" data-cy="add-more-seats-confirmation-taxes-text">
            State and local sales tax will be calculated on your final invoice.
          </Typography>
          <Flex alignItems="center">
            <LoadingButton
              onClick={handleSubmit}
              loading={isLoading}
              variant="text"
              data-cy="add-more-seats-confirmation-continue-button"
            >
              Continue
            </LoadingButton>
            <Button
              onClick={() => setShowConfirmation(false)}
              variant="text"
              color="inherit"
              sx={{ ml: 1, opacity: 0.54 }}
              data-cy="add-more-seats-confirmation-goback-button"
            >
              Go back
            </Button>
          </Flex>
        </DialogContent>
      </>
    )
  }

  return (
    <>
      <DialogTitle id={titleLabelledBy} data-cy="add-more-seats-title-text">
        Add more seats
      </DialogTitle>
      <DialogContent>
        <Flex alignItems="flex-end">
          <TextField
            error={isInvalid}
            label="Number of extra seats"
            type="number"
            value={count}
            onChange={handleChange}
            inputProps={{
              min: 0,
              max: maxSeats
            }}
            data-cy="add-more-seats-number-input"
          />
          <Button
            disabled={isInvalid || isNaN(intCount) || intCount === 0 || calculatedCount === intCount}
            onClick={handleCalculate}
            sx={{ ml: 2, mb: 0.5 }}
            variant="outlined"
            data-cy="add-more-seats-calculate-button"
          >
            Calculate
          </Button>
        </Flex>
        {isInvalid && (
          <FormHelperText error sx={{ mt: 1 }}>
            {+count < 0 ? (
              <>Should be greater than 0</>
            ) : (
              <>
                If you are buying more than 100 seats,{' '}
                <Link href="https://www.growthday.com/Demo" target="_blank">
                  schedule a demo
                </Link>
              </>
            )}
          </FormHelperText>
        )}
        <Box mb={3} />
        <Table size="small" data-cy="add-more-seats-calculations-table">
          <TableHead>
            <StyledPrimaryTableCellHeader>Price breakdown</StyledPrimaryTableCellHeader>
            <StyledTableCellHeader>Before</StyledTableCellHeader>
            <StyledTableCellHeader>Now</StyledTableCellHeader>
          </TableHead>
          <TableBody>
            <StyledPrimaryTableCell>Number of seats</StyledPrimaryTableCell>
            <StyledTableCell>{organization?.seats}</StyledTableCell>
            <StyledTableCell>{calculatedCount ? totalSeats : '-'}</StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledPrimaryTableCell>Price per seat</StyledPrimaryTableCell>
            <StyledTableCell>
              {isSubscriptionLoading ? <CircularProgress size={14} /> : formatCurrency(perSeat)}
            </StyledTableCell>
            <StyledTableCell>
              {calculatedCount ? isSubscriptionLoading ? <CircularProgress size={14} /> : formatCurrency(perSeat) : '-'}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledPrimaryTableCell>Annual bill</StyledPrimaryTableCell>
            <StyledTableCell>{formatCurrency((perSeat ?? 0) * (organization?.seats ?? 1))}</StyledTableCell>
            <StyledTableCell>{calculatedCount ? totalCost : '-'}</StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledPrimaryTableCell>
              <Box mt={2} />
            </StyledPrimaryTableCell>
            <StyledTableCell>
              <Box mt={2} />
            </StyledTableCell>
            <StyledTableCell>
              <Box mt={2} />
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledPrimaryTableCell colSpan={2}>
              Prorated bill (for the remainder of the current year)
            </StyledPrimaryTableCell>
            <StyledTableCell>
              {calculatedCount ? isProratedAmountFetching ? <CircularProgress size={14} /> : proratedCost : '-'}
            </StyledTableCell>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Flex alignItems="center">
          <Button
            disabled={calculatedCount === 0 || isProratedAmountFetching}
            onClick={() => setShowConfirmation(true)}
            variant="contained"
            data-cy="add-more-seats-update-billing-button"
          >
            Update billing
          </Button>
          <Button
            onClick={() => onClose?.({}, 'backdropClick')}
            variant="text"
            color="inherit"
            sx={{ ml: 1 }}
            data-cy="add-more-seats-cancel-button"
          >
            Cancel
          </Button>
        </Flex>
        <Typography variant="body2" color="text.secondary">
          {!mobileView && <>Need help? </>}
          <Link target="_blank" href="mailto:support@growthday.com" data-cy="add-more-seats-contact-link">
            Contact support
          </Link>
        </Typography>
      </DialogActions>
    </>
  )
}

export default withDialog(undefined, { 'aria-labelledby': titleLabelledBy })(AddMoreSeats)
