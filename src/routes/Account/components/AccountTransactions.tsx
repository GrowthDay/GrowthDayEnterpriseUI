import { Link, styled, Typography } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid/models/colDef/gridColDef'
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams'
import moment from 'moment'
import { FC, useMemo, useState } from 'react'
import useOrganizationPaymentTransactionsQuery from '../../../api/queries/useOrganizationPaymentTransactionsQuery'
import Flex from '../../../components/Flex'
import TableGrid from '../../../components/TableGrid'
import usePageParams from '../../../hooks/usePageParams'
import { PaymentTransaction } from '../../../types/api'
import { formatCurrency } from '../../../utils/formatters'
import Receipt from './Receipt'

const Monospace = styled('span')({ fontFamily: 'monospace', marginRight: 6 })

const AccountTransactions: FC = () => {
  const { pageParams, setPageParams } = usePageParams()
  const { data: transactions, isLoading } = useOrganizationPaymentTransactionsQuery(pageParams)
  const [transaction, setTransaction] = useState<PaymentTransaction>()

  const columns = useMemo(
    (): GridColumns => [
      {
        field: 'description',
        headerName: 'Description',
        width: 200,
        renderCell: (record: GridRenderCellParams<string, PaymentTransaction>) =>
          (record.row.items?.length ?? 0) > 1 ? 'Additional Seats' : 'Annual Bill',
        sortable: false
      },
      {
        field: 'paidOn',
        headerName: 'Invoice',
        width: 200,
        renderCell: (record: GridRenderCellParams<string, PaymentTransaction>) => {
          const text = moment(record.value).format('MMM DD, YYYY')
          return <Link onClick={() => setTransaction(record.row)}>{text}</Link>
        },
        sortable: false
      },
      {
        field: 'lastFourDigit',
        headerName: 'Payment method',
        width: 240,
        renderCell: (record: GridRenderCellParams<string, PaymentTransaction>) =>
          record.value ? (
            <>
              <Monospace>•••• •••• ••••</Monospace> {record.value}
            </>
          ) : (
            'Credit Card'
          ),
        sortable: false
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
            : '',
        sortable: false
      }
    ],
    [setTransaction]
  )

  return (
    <>
      <Receipt transaction={transaction} open={Boolean(transaction)} onClose={() => setTransaction(undefined)} />
      <Flex mb={2}>
        <Typography fontWeight={700} variant="h5" data-cy="account-payment-history-title-text">
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
        paginationMode="server"
        page={pageParams.page}
        onPageChange={(page) => setPageParams({ page })}
        pageSize={pageParams.size}
        onPageSizeChange={(size) => setPageParams({ size })}
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
