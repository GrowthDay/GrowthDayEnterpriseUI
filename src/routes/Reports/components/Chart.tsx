import { Theme, useTheme } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import { FC, useMemo } from 'react'
import ReactApexChart, { Props } from 'react-apexcharts'

export type ChartProps = Props & {
  categories?: string[]
}

const Chart: FC<ChartProps> = ({ categories, ...props }) => {
  const theme = useTheme<Theme>()
  const options: ApexOptions = useMemo(
    () => ({
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '24px',
          borderRadius: 4
        }
      },
      stroke: {
        show: true,
        width: 4,
        colors: ['transparent']
      },
      xaxis: {
        categories
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      tooltip: {
        enabled: false
      },
      chart: {
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      grid: {
        borderColor: theme.palette.grey['300'],
        strokeDashArray: 7,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      }
    }),
    [theme, categories]
  )
  return <ReactApexChart options={options} {...props} />
}

export default Chart
