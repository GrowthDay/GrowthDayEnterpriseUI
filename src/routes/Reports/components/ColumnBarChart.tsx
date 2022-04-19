import { ApexOptions } from 'apexcharts'
import { FC } from 'react'
import Chart, { ChartProps } from './Chart'

const series: ApexOptions['series'] = [
  {
    name: 'December 2021',
    data: [2, 3, 5, 4, 1, 4, 2, 3, 4],
    color: '#FF770E'
  },
  {
    name: 'January 2022',
    data: [4, 3, 2, 4, 2, 4, 2, 1, 2],
    color: '#E0EFFF'
  }
]

const ColumnBarChart: FC<ChartProps> = (props) => {
  const categories = [
    'Clarity',
    'Energy',
    'Necessity',
    'Productivity',
    'Influence',
    'Courage',
    'Movement',
    'Mood',
    'Sleep',
    'Nutrition'
  ]
  return <Chart categories={categories} series={series} type="bar" height={350} {...props} />
}

export default ColumnBarChart
