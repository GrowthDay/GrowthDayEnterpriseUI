import { Link, Typography } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid/models/colDef/gridColDef'
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams'
import moment from 'moment'
import { FC, useMemo, useState } from 'react'
import useOrganizationPaymentTransactionsQuery from '../../api/queries/useOrganizationPaymentTransactionsQuery'
import Flex from '../../components/Flex'
import TableGrid from '../../components/TableGrid'
import { PaymentTransaction } from '../../types/api'
import { formatCurrency } from '../../utils/formatters'
import Receipt from './Receipt'

const AccountTransactions: FC = () => {
  const { data: transactions, isLoading } = useOrganizationPaymentTransactionsQuery()
  const [transaction, setTransaction] = useState<PaymentTransaction>()

  const columns = useMemo(
    (): GridColumns => [
      {
        field: 'description',
        headerName: 'Description',
        width: 200,
        renderCell: (record: GridRenderCellParams<string, PaymentTransaction>) =>
          (record.row.items?.length ?? 0) > 1 ? 'Additional Seats' : 'Annual Bill'
      },
      {
        field: 'paidOn',
        headerName: 'Invoice',
        width: 200,
        renderCell: (record: GridRenderCellParams<string, PaymentTransaction>) => {
          const text = moment(record.value).format('MMM DD, YYYY')
          return <Link onClick={() => setTransaction(record.row)}>{text}</Link>
        }
      },
      {
        field: 'lastFourDigit',
        headerName: 'Payment method',
        width: 240,
        renderCell: (record: GridRenderCellParams<string, PaymentTransaction>) =>
          record.value ? `•••• •••• •••• ${record.value}` : 'Credit Card'
      },
      {
        field: 'amount',
        headerName: 'Amount',
        width: 240,
        renderCell: (record: GridRenderCellParams<string, PaymentTransaction>) =>
          record.row.totalAmountInCents
            ? formatCurrency(
                (record.row.items?.reduce(
                  (total, curr) => total + ((curr.amountInCents ?? 0) + (curr.discountInCents ?? 0)),
                  0
                ) ?? 0) / 100,
                record.row.currency
              )
            : ''
      }
    ],
    [setTransaction]
  )

  return (
    <>
      <Receipt transaction={transaction} open={Boolean(transaction)} onClose={() => setTransaction(undefined)} />
      <Flex mb={2}>
        <Typography fontWeight={700} variant="h5">
          Payment history
        </Typography>
      </Flex>
      <TableGrid
        localeText={{ noRowsLabel: 'No transactions' }}
        sx={{ mb: 2 }}
        loading={isLoading}
        columns={columns}
        rowHeight={40}
        rows={transactions ?? []}
      />
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
