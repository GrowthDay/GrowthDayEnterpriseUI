import { orderBy } from 'lodash-es'
import { FC, useMemo } from 'react'
import { Bar as ReBar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts'
import useMixpanelApi from '../../../api/useMixpanelApi'
import BlockContainer from '../components/BlockContainer'
import { ReportComponentProps } from '../types'
import colors from '../utils/colors'

const Bar: FC<ReportComponentProps> = ({ title, description, id }) => {
  const { data: apiData, isLoading } = useMixpanelApi(id)

  const data = useMemo(() => {
    return orderBy(apiData, 'x', 'desc').slice(0, 12)
  }, [apiData])

  return (
    <BlockContainer isLoading={isLoading || !apiData} title={title} description={description}>
      <BarChart layout="vertical" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis fontSize={10} type="number" />
        <YAxis fontSize={10} interval={0} dataKey="key" type="category" scale="band" width={320} />
        <Tooltip />
        <ReBar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </ReBar>
      </BarChart>
    </BlockContainer>
  )
}

export default Bar
