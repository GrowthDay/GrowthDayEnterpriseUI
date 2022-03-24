import { Link, Paper, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { FC } from 'react'
import Flex from '../../components/Flex'

// TODO: Transactions history

const StyledTableCellNoBorder = styled(TableCell)(({ theme: { spacing } }) => ({
  borderBottom: 'none'
}))

const StyledTableCell = styled(StyledTableCellNoBorder)(({ theme: { spacing } }) => ({
  paddingBottom: spacing(0)
}))

const AccountTransactions: FC = () => {
  return (
    <>
      <Flex mb={2}>
        <Typography fontWeight={700} variant="h5">
          Payment history
        </Typography>
      </Flex>
      <Paper elevation={0} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Invoice</TableCell>
              <TableCell>Payment method</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>Additional Seats</StyledTableCell>
              <StyledTableCell>
                <Link>Oct 24, 2021</Link>
              </StyledTableCell>
              <StyledTableCell>•••• •••• •••• 4242</StyledTableCell>
              <StyledTableCell>$27.99</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCellNoBorder>Annual Bill</StyledTableCellNoBorder>
              <StyledTableCellNoBorder>
                <Link>Oct 14, 2021</Link>
              </StyledTableCellNoBorder>
              <StyledTableCellNoBorder>•••• •••• •••• 4242</StyledTableCellNoBorder>
              <StyledTableCellNoBorder>$671.76</StyledTableCellNoBorder>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Typography mb={6} variant="body2" color="text.secondary">
        Want to cancel the plan?{' '}
        <Link href="mailto:support@growthday.com" target="_blank">
          Contact us
        </Link>
      </Typography>
    </>
  )
}

export default AccountTransactions
