import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
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
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import Flex from '../../components/Flex'
import withDialog from '../../hoc/withDialog'
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
  const { mutateAsync, isLoading } = useUpdateSubscriptionMutation()
  const [count, setCount] = useState('0')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [calculatedCount, setCalculatedCount] = useState(0)

  const intCount = parseInt(count)
  const perSeat = (organization?.subscriptionAmount ?? 0) / (organization?.seats ?? 1)
  const totalSeats = calculatedCount + (organization?.seats ?? 0)
  const totalCost = formatCurrency(perSeat * totalSeats)
  const proratedCost = formatCurrency(perSeat * totalSeats - (organization?.subscriptionAmount ?? 0))
  const maxSeats = 100 - (organization?.seats ?? 0)
  const isInvalid = +count > maxSeats

  const handleCalculate = () => {
    if (intCount > 0) {
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
    await mutateAsync({ totalSeats, stripePriceId: organization?.stripePriceId })
    onClose?.({}, 'backdropClick')
  }

  if (showConfirmation) {
    return (
      <>
        <DialogTitle id={titleLabelledBy}>
          Adding {calculatedCount} seat{calculatedCount === 1 ? '' : 's'} to the plan
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            You will be billed{' '}
            <Typography component="span" color="text.primary">
              {proratedCost}
            </Typography>{' '}
            and from next billing cycle the total amount will be {totalCost}. Do you want to continue?
          </Typography>
          <Flex alignItems="center">
            <LoadingButton onClick={handleSubmit} loading={isLoading} variant="text">
              Continue
            </LoadingButton>
            <Button
              onClick={() => setShowConfirmation(false)}
              variant="text"
              color="inherit"
              sx={{ ml: 1, opacity: 0.54 }}
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
      <DialogTitle id={titleLabelledBy}>Add more seats</DialogTitle>
      <DialogContent>
        <Flex alignItems="flex-end">
          <TextField
            error={isInvalid}
            label="Number of extra seats"
            type="number"
            value={count}
            onChange={handleChange}
          />
          <Button
            disabled={isInvalid || isNaN(intCount) || intCount === 0 || calculatedCount === intCount}
            onClick={handleCalculate}
            sx={{ ml: 2, mb: 0.5 }}
            variant="outlined"
          >
            Calculate
          </Button>
        </Flex>
        {isInvalid && (
          <FormHelperText error sx={{ mt: 1 }}>
            If you are buying more than 100 seats,{' '}
            <Link href="https://www.growthday.com/enterprise" target="_blank">
              schedule a demo
            </Link>
          </FormHelperText>
        )}
        <Box mb={3} />
        <Table size="small">
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
            <StyledTableCell>{formatCurrency(perSeat)}</StyledTableCell>
            <StyledTableCell>{calculatedCount ? formatCurrency(perSeat) : '-'}</StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledPrimaryTableCell>Annual bill</StyledPrimaryTableCell>
            <StyledTableCell>{formatCurrency(organization?.subscriptionAmount)}</StyledTableCell>
            <StyledTableCell>{calculatedCount ? totalCost : '-'}</StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledPrimaryTableCell colSpan={2}>
              Prorated bill (for the remainder of the current year)
            </StyledPrimaryTableCell>
            <StyledTableCell>{calculatedCount ? proratedCost : '-'}</StyledTableCell>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Flex alignItems="center">
          <Button disabled={calculatedCount === 0} onClick={() => setShowConfirmation(true)} variant="contained">
            Update billing
          </Button>
          <Button onClick={() => onClose?.({}, 'backdropClick')} variant="text" color="inherit" sx={{ ml: 1 }}>
            Cancel
          </Button>
        </Flex>
        <Typography variant="body2" color="text.secondary">
          Need help?{' '}
          <Link target="_blank" href="mailto:support@growthday.com">
            Contact support
          </Link>
        </Typography>
      </DialogActions>
    </>
  )
}

export default withDialog(undefined, { 'aria-labelledby': titleLabelledBy })(AddMoreSeats)
