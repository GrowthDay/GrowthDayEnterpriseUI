import { map, sortBy } from 'lodash-es'
import { FC, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts'
import useMixpanelApi from '../../../api/useMixpanelApi'
import ChartContainer from '../components/ChartContainer'
import colors from '../utils/colors'

const UserFinishingCourses: FC = () => {
  const { data: apiData, isLoading } = useMixpanelApi(14883624)

  const data = useMemo(() => {
    return sortBy(
      map(apiData?.data, ({ all }, Course) => ({
        Course,
        '% Completion': all
      })).filter((dt) => dt.Course !== '$overall'),
      'Range'
    )
  }, [apiData])

  return (
    <ChartContainer title={apiData?.title} isLoading={isLoading}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Course" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="% Completion">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

export default UserFinishingCourses
