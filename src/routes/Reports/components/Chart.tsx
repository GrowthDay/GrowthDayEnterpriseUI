import { Theme, useTheme } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import { merge } from 'lodash-es'
import { FC, useMemo } from 'react'
import ReactApexChart, { Props } from 'react-apexcharts'

export type ChartProps = Props & {
  categories?: string[]
  color?: string
  loading?: boolean
}

const colors = [
  '#FFA966',
  '#785ACC',
  '#6EB1FA',
  '#8DEBDE',
  '#73B825',
  '#F0DB56',
  '#0A8585',
  '#F08BBE',
  '#40577A',
  '#E56E6E'
]

const Chart: FC<ChartProps> = ({ categories, color, ...props }) => {
  const theme = useTheme<Theme>()
  const options: ApexOptions = useMemo(
    () =>
      merge<ApexOptions, ApexOptions, ApexOptions | undefined>(
        {},
        {
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '24px',
              borderRadius: 4
            },
            radialBar: {
              hollow: {
                size: '65%'
              },
              startAngle: -135,
              endAngle: 135,
              track: {
                background: theme.palette.grey['300'],
                startAngle: -135,
                endAngle: 135
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  fontSize: '28px',
                  fontWeight: 600,
                  fontFamily: theme.typography.fontFamily,
                  show: true,
                  offsetY: 10,
                  color,
                  formatter: (val) => (val ?? '').toString()
                }
              }
            },
            pie: {
              offsetY: 10,
              donut: {
                labels: {
                  show: true,
                  name: {
                    offsetY: -2,
                    fontWeight: 600,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '15px'
                  },
                  value: {
                    offsetY: 2,
                    fontWeight: 600,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '15px'
                  },
                  total: {
                    showAlways: true,
                    show: true,
                    fontWeight: 600,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '15px'
                  }
                }
              }
            }
          },
          ...(color
            ? {
                fill: {
                  colors: [color]
                }
              }
            : {}),
          ...((['donut', 'pie'] as ApexChart['type'][]).includes(props.type)
            ? {
                stroke: {
                  show: true
                }
              }
            : {
                stroke: {
                  show: true,
                  width: 4,
                  lineCap: 'round',
                  colors: ['transparent']
                }
              }),
          ...(categories
            ? {
                xaxis: {
                  categories
                }
              }
            : {}),
          yaxis: {
            decimalsInFloat: 0
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false,
            fontFamily: theme.typography.fontFamily,
            fontWeight: 500,
            markers: {
              radius: 4,
              offsetX: -4,
              offsetY: 1
            }
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
          },
          colors
        },
        props.options
      ),
    [color, theme, categories, props.options, props.type]
  )
  return <ReactApexChart {...props} options={options} />
}

export default Chart
