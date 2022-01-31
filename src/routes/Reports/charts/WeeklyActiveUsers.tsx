import { map } from 'lodash-es'
import moment from 'moment'
import { FC, useMemo } from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import useMixpanelApi from '../../../api/useMixpanelApi'
import abbrNumber from '../../../utils/abbrNumber'
import ChartContainer from '../components/ChartContainer'
import { useDefaultChartColor } from '../utils/colors'

const WeeklyActiveUsers: FC = () => {
  const { data: apiData, isLoading } = useMixpanelApi(13517861)
  const color = useDefaultChartColor()

  const data = useMemo(() => {
    return map(apiData?.data, (value, date) => ({
      Date: moment(date).format('DD MMM'),
      'Active Users': value
    }))
  }, [apiData])

  return (
    <ChartContainer title={apiData?.title} isLoading={isLoading}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis tickFormatter={abbrNumber} />
        <Tooltip />
        <Line stroke={color} strokeWidth={2} dot={() => <></>} dataKey="Active Users" />
      </LineChart>
    </ChartContainer>
  )
}

export default WeeklyActiveUsers
