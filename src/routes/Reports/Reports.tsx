import { Box } from '@mui/material'
import { upperFirst } from 'lodash-es'
import { ComponentType, FC } from 'react'
import { Layout } from 'react-grid-layout'
import useMyProfileApi from '../../api/useMyProfileApi'
import GridLayout from '../../components/GridLayout'
import getPeriod from '../../utils/getPeriod'
import Bar from './charts/Bar'
import Metrics from './charts/Metrics'
import Pie from './charts/Pie'
import Line from './charts/Line'
import BlockContainer from './components/BlockContainer'
import { Report, ReportComponentProps } from './types'

import reportsData from './data.json'
const reports = reportsData as Report[]

const components: Record<string, ComponentType<ReportComponentProps>> = {
  metrics: Metrics,
  bar: Bar,
  line: Line,
  pie: Pie
}

const Reports: FC = () => {
  const { data: profile } = useMyProfileApi()
  const layouts: Layout[] = [
    {
      i: 'welcome',
      x: 0,
      y: 0,
      w: 12,
      static: true,
      isDraggable: false,
      h: 2
    },
    ...reports.map(({ layout }) => layout)
  ]

  return (
    <Box sx={{ p: { xs: 2, sm: 4, md: 5 } }}>
      <GridLayout layout={layouts}>
        <div key="welcome">
          <BlockContainer
            title={
              <>
                Good {upperFirst(getPeriod())}, {profile?.firstName}
              </>
            }
            description="Here are some growth insights for your team"
          />
        </div>
        {reports.map((report) => {
          const Chart = components[report.type]
          return (
            <div key={report.layout.i}>
              <Chart {...report} />
            </div>
          )
        })}
      </GridLayout>
    </Box>
  )
}

export default Reports
