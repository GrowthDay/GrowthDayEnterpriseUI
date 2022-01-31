import { map, sample, sortBy } from 'lodash-es'
import moment from 'moment'
import { FC, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import useMixpanelApi from '../../../api/useMixpanelApi'
import abbrNumber from '../../../utils/abbrNumber'
import ChartContainer from '../components/ChartContainer'
import colors, { useDefaultChartColor } from '../utils/colors'

const DailyHabitComplete: FC = () => {
  const { data: apiData, isLoading } = useMixpanelApi(14882039)
  const color = useDefaultChartColor()

  const data = useMemo(() => {
    return map(apiData?.data, (value, date) => ({
      Date: moment(date).format('DD MMM'),
      '% Complete': Math.floor(value * 100) / 100
    }))
  }, [apiData])

  return (
    <ChartContainer title={apiData?.title} isLoading={isLoading}>
      <LineChart data={data}>
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Line stroke={color} strokeWidth={2} dot={() => <></>} dataKey="% Complete" />
      </LineChart>
    </ChartContainer>
  )
}

export default DailyHabitComplete
