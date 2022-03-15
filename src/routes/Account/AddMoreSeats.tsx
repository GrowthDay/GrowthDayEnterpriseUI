import { CloseOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Link,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography
} from '@mui/material'
import { FC, useState } from 'react'
import Flex from '../../components/Flex'
import withDialog from '../../hoc/withDialog'

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
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState('0')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    setLoading(false)
  }

  if (showConfirmation) {
    return (
      <>
        <DialogTitle id={titleLabelledBy}>Adding 60 seats to the plan</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            You will be billed{' '}
            <Typography component="span" color="text.primary">
              $4,399.99
            </Typography>{' '}
            and from next billing cycle the total amount will be $10,399. Do you want to continue?
          </Typography>
          <Flex alignItems="center">
            <LoadingButton onClick={handleSubmit} loading={loading} variant="text">
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
        <Flex mb={3} alignItems="flex-end">
          <TextField
            label="Number of extra seats"
            type="number"
            value={count}
            onChange={(ev) => setCount(ev.target.value)}
          />
          <Button sx={{ ml: 2, mb: 0.5 }} variant="outlined">
            Calculate
          </Button>
        </Flex>
        <Table size="small">
          <TableHead>
            <StyledPrimaryTableCellHeader>Price breakdown</StyledPrimaryTableCellHeader>
            <StyledTableCellHeader>Before</StyledTableCellHeader>
            <StyledTableCellHeader>Now</StyledTableCellHeader>
          </TableHead>
          <TableBody>
            <StyledPrimaryTableCell>Number of seats</StyledPrimaryTableCell>
            <StyledTableCell>24</StyledTableCell>
            <StyledTableCell>-</StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledPrimaryTableCell>Price per seat</StyledPrimaryTableCell>
            <StyledTableCell>$27.99</StyledTableCell>
            <StyledTableCell>-</StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledPrimaryTableCell>Annual bill</StyledPrimaryTableCell>
            <StyledTableCell>$671.76</StyledTableCell>
            <StyledTableCell>-</StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledPrimaryTableCell colSpan={2}>
              Prorated bill (for the remainder of the current year)
            </StyledPrimaryTableCell>
            <StyledTableCell>-</StyledTableCell>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Flex alignItems="center">
          <Button onClick={() => setShowConfirmation(true)} variant="contained">
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
