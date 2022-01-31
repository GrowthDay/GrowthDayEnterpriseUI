import { map, sample, sortBy } from 'lodash-es'
import { FC, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts'
import useMixpanelApi from '../../../api/useMixpanelApi'
import ChartContainer from '../components/ChartContainer'
import colors from '../utils/colors'

const DailyHabitScores: FC = () => {
  const { data: apiData, isLoading } = useMixpanelApi(14852161)

  const data = useMemo(() => {
    return sortBy(
      map(apiData?.data, ({ all }, Range) => ({
        Range,
        'Life Scores': all,
        color: sample(colors)
      })).filter((dt) => dt.Range !== '$overall'),
      'Range'
    )
  }, [apiData])

  return (
    <ChartContainer title={apiData?.title} isLoading={isLoading}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Life Scores">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

export default DailyHabitScores
