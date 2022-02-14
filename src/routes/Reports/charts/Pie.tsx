import { FC } from 'react'
import { Cell, Pie as RePie, PieChart } from 'recharts'
import useMixpanelApi from '../../../api/useMixpanelApi'
import BlockContainer from '../components/BlockContainer'
import { ReportComponentProps } from '../types'
import colors from '../utils/colors'

const Pie: FC<ReportComponentProps> = ({ title, description, id }) => {
  const { data, isLoading } = useMixpanelApi(id)

  return (
    <BlockContainer isLoading={isLoading || !data} title={title} description={description}>
      <PieChart>
        <RePie innerRadius={60} outerRadius={90} dataKey="value" data={data} fontSize={10} label={(props) => props.key}>
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </RePie>
      </PieChart>
    </BlockContainer>
  )
}

export default Pie
