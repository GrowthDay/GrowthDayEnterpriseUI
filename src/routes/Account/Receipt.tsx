import { FC, useRef } from 'react'
// @ts-ignore
import PE from 'print-html-element'
// @ts-ignore
import html2pdf from 'html2pdf.js'
import './Receipt.css'

export type ReceiptProps = {}

const Receipt: FC<ReceiptProps> = (props) => {
  const invoiceRef = useRef<HTMLDivElement>(null)
  const handlePrint = () => {
    if (invoiceRef.current) {
      const el = document.createElement('div')
      el.classList.add('print-no-visible', 'print-no-shadow')
      el.append(invoiceRef.current.cloneNode(true))
      PE.printElement(el, {
        pageTitle: `Receipt: 12345678`,
        printMode: 'popup'
      })
    }
  }
  const handleDownload = () => {
    if (invoiceRef.current) {
      const el = document.createElement('div')
      el.classList.add('print-no-visible', 'print-no-shadow')
      el.append(invoiceRef.current.cloneNode(true))
      const opt = {
        margin: [12, 8, 12, 8],
        filename: `12345678.pdf`
      }
      html2pdf().set(opt).from(el).save()
    }
  }
  return <div></div>
}

export default Receipt
