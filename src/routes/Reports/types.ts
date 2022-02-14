import { Layout } from 'react-grid-layout'

export type ReportComponentProps = {
  id: number | string
  title?: string
  description?: string
}

export type Report = ReportComponentProps & {
  type: 'metrics' | 'bar' | 'pie' | 'line'
  layout: Layout
}

export type ReportData = Array<{ key: string; value: number; color?: string }>
