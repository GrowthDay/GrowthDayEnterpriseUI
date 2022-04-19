import * as XLSX from 'xlsx'

export const CsvFileType = 'text/csv'
export const XlsFileType = 'application/vnd.ms-excel'
export const XlsxFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

export const SheetFileTypes = [CsvFileType, XlsxFileType, XlsFileType].join(', ')

export const fileToJson = async <T = any>(file: File) =>
  new Promise<T[]>((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as ArrayBuffer
      const wb = XLSX.read(result)
      const data = XLSX.utils.sheet_to_json<T>(wb.Sheets[wb.SheetNames[0]])
      resolve(data)
    }
    reader.onerror = () => resolve([])
    reader.readAsArrayBuffer(file)
  })

export const jsonToXlsxFile = <T = any>(data: T[]): Blob => {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws)
  const ab = XLSX.writeXLSX(wb, { bookType: 'xlsx', type: 'buffer' })
  return new Blob([ab], { type: XlsxFileType })
}
