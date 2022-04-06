import { FileDownloadOutlined, PrintOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  DialogContent,
  DialogProps,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { startCase } from 'lodash-es'
import { FC, useRef } from 'react'
// @ts-ignore
import PE from 'print-html-element'
// @ts-ignore
import html2pdf from 'html2pdf.js'
import './Receipt.css'
import Moment from 'react-moment'
import GrowthDayIcon from '../../assets/icons/GrowthDayIcon'
import Center from '../../components/Center'
import Flex from '../../components/Flex'
import withDialog from '../../hoc/withDialog'
import { PaymentTransaction } from '../../types/api'
import bg from '../../assets/images/GrowthDayFadedBackground.png'
import { formatCurrency } from '../../utils/formatters'

export type ReceiptProps = DialogProps & {
  transaction?: PaymentTransaction
}

const Receipt: FC<ReceiptProps> = ({ transaction: _transaction }) => {
  const transaction = useRef(_transaction).current
  const invoiceRef = useRef<HTMLDivElement>(null)

  const prepareInvoice = () => {
    if (invoiceRef.current) {
      const el = document.createElement('div')
      el.classList.add('print-ready')
      el.append(invoiceRef.current.cloneNode(true))
      return el
    }
  }

  const handlePrint = () => {
    const el = prepareInvoice()
    if (el) {
      const styles = [
        ...Array.from(document.querySelectorAll('style:not([data-emotion])')).map((style) => style.innerHTML),
        ...Array.from(document.querySelectorAll('[data-emotion]')).flatMap(({ sheet }: any) =>
          [...sheet.cssRules].map((rules) => rules.cssText)
        )
      ]
      PE.printElement(el, {
        pageTitle: `Receipt: ${transaction?.receiptId}`,
        printMode: 'popup',
        styles
      })
    }
  }
  const handleDownload = () => {
    const el = prepareInvoice()
    if (el) {
      const opt = {
        margin: [12, 8, 12, 8],
        filename: `${transaction?.receiptId}.pdf`
      }
      html2pdf().set(opt).from(el).save()
    }
  }

  const paidItem = transaction?.items?.find((item) => (item.amountInCents ?? 0) >= 0)
  const refundItem = transaction?.items?.find((item) => (item.amountInCents ?? 0) < 0)
  const amountPaid = formatCurrency(((paidItem?.amountInCents ?? 0) + (refundItem?.amountInCents ?? 0)) / 100)

  return (
    <DialogContent
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center top',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        px: {
          xs: 0,
          sm: 4,
          md: 8
        },
        py: 15
      }}
    >
      <div ref={invoiceRef}>
        <Center>
          <GrowthDayIcon color="secondary" />
        </Center>
        <Paper className="print-no-shadow" sx={{ p: 2.5, my: 2.5, pb: 10 }}>
          <Typography gutterBottom variant="body2">
            Receipt from{' '}
            <Typography variant="inherit" fontWeight={500} component="span" color="primary">
              GrowthDay.com
            </Typography>
          </Typography>
          <Typography gutterBottom fontWeight={600} variant="h5">
            GrowthDay Pro
          </Typography>
          <Box mb={4}>
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontWeight: 700,
                borderRadius: '1rem',
                px: 1.25,
                py: 0.5,
                bgcolor: 'success.main',
                color: 'success.contrastText'
              }}
            >
              PAID
            </Typography>
            <Typography variant="body2" ml={0.5} component="span">
              on <Moment format="MMM Do, YYYY" date={transaction?.createTimestamp} />
            </Typography>
          </Box>
          <Flex className="print-no-visible" mb={4}>
            <Button
              onClick={handleDownload}
              size="small"
              variant="text"
              sx={{ borderRadius: 1, px: 1 }}
              startIcon={<FileDownloadOutlined />}
            >
              Download Receipt
            </Button>
            <Button
              onClick={handlePrint}
              size="small"
              variant="text"
              sx={{ ml: 1, borderRadius: 1, px: 1 }}
              startIcon={<PrintOutlined />}
            >
              Print Receipt
            </Button>
          </Flex>
          <Box mb={4}>
            <Typography gutterBottom variant="body2">
              <strong>Receipt #:</strong> {transaction?.receiptId}
            </Typography>
            <Typography variant="body2">
              <strong>Payment Method:</strong> Payment from {startCase(transaction?.cardType)} ···{' '}
              {transaction?.lastFourDigit}
            </Typography>
          </Box>
          <Table size="small" sx={{ '.MuiTableCell-root': { borderBottom: 'none' } }}>
            <TableHead
              sx={{
                '.MuiTableCell-root': {
                  fontWeight: 700,
                  bgcolor: '#f7f8fa',
                  py: 1.5,
                  '&:first-child': {
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8
                  },
                  '&:last-child': {
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8
                  }
                }
              }}
            >
              <TableRow>
                <TableCell>Invoices</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paidItem && (
                <TableRow>
                  <TableCell>{paidItem.title}</TableCell>
                  <TableCell>
                    <strong>GrowthDay {paidItem.description}</strong>
                  </TableCell>
                  <TableCell>{amountPaid}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={3} sx={{ py: 4 }} />
              </TableRow>
              {Boolean(transaction?.taxAmountInCents) && (
                <TableRow>
                  <TableCell colSpan={2}>Applicable Tax</TableCell>
                  <TableCell>{formatCurrency((transaction?.taxAmountInCents ?? 0) / 100)}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={2}>
                  <strong>Total</strong>
                </TableCell>
                <TableCell>
                  <strong>{amountPaid}</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Amount Paid</TableCell>
                <TableCell>({amountPaid})</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Center>
          <Typography variant="body2">
            Questions? Contact us at{' '}
            <Link href="mailto:support@growthday.com" target="_blank">
              support@growthday.com
            </Link>
          </Typography>
        </Center>
      </div>
      <Box position="absolute" bottom={0} left={0} right={0} zIndex={1} bgcolor="secondary.main" height={14} />
    </DialogContent>
  )
}

export default withDialog(undefined, { maxWidth: 'md', PaperProps: { sx: { backgroundColor: 'background.default' } } })(
  Receipt
)
