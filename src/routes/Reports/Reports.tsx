import { FileDownloadOutlined } from '@mui/icons-material'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import { FC, useState } from 'react'
import useOrganizationUserQuery from '../../api/queries/useOrganizationUserQuery'
import Flex from '../../components/Flex'
import Layout from '../../components/Layout'
import getPeriod from '../../utils/getPeriod'
import Chart from './components/Chart'
import MonthPicker from './components/MonthPicker'
import EarnedAchievementsReport from './reports/EarnedAchievementsReport'
import EmployeeReport from './reports/EmployeeReport'
import GeneralMetricsGridReport from './reports/GeneralMetricsGridReport'
import LifeScoreGridReport from './reports/LifeScoreGridReport'
import LifeScoreReport from './reports/LifeScoreReport'
import Top5Courses from './reports/Top5Courses'
import Top5Events from './reports/Top5Events'

const Reports: FC = () => {
  const { data: organizationUser } = useOrganizationUserQuery()
  const [month, setMonth] = useState(moment().startOf('M').toISOString())

  const donutChartSeries1: ApexOptions['series'] = [20, 40, 20, 20, 40, 40, 40]
  const donutChartLabels1 = [
    'Journal',
    'Life Score',
    'Challenges',
    'Live events',
    'Growth Groups',
    'Courses',
    'Community'
  ]

  const donutChartSeries2: ApexOptions['series'] = [20, 40, 20, 20, 20, 20, 20, 20, 20, 20]
  const donutChartLabels2 = [
    'Clarity',
    'Energy',
    'Courage',
    'Nutrition',
    'Sleep',
    'Mood',
    'Necessity',
    'Movement',
    'Influence',
    'Productivity'
  ]

  return (
    <Layout breadcrumbs="Reporting">
      <Flex mb={2} alignItems="center" justifyContent="space-between">
        <div>
          <Typography fontWeight={700} variant="h5">
            Good {getPeriod()}, {organizationUser?.firstName}
          </Typography>
          <Typography color="text.disabled" variant="body2">
            Here are some growth insights for your team
          </Typography>
        </div>
        <Flex>
          <MonthPicker value={month} onChange={(value) => value && setMonth(value.startOf('M').toISOString())} />
          <Button
            startIcon={<FileDownloadOutlined />}
            variant="outlined"
            sx={{ backgroundColor: (theme) => theme.palette.background.paper, ml: 1 }}
          >
            Download Report
          </Button>
        </Flex>
      </Flex>
      <Grid sx={{ mb: 6 }} container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <EmployeeReport month={month} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <EarnedAchievementsReport month={month} />
        </Grid>
      </Grid>
      <LifeScoreReport month={month} />
      <Grid mb={6} container spacing={4}>
        <Grid item xs={12} md={6}>
          <Top5Courses month={month} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Top5Events month={month} />
        </Grid>
      </Grid>
      <LifeScoreGridReport month={month} />
      <GeneralMetricsGridReport month={month} />
      <Grid mb={6} container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box mb={2}>
            <Typography fontWeight={700} variant="h5">
              Top Activities
            </Typography>
            <Typography color="text.disabled" variant="body2">
              Average sessions per activity per month
            </Typography>
          </Box>
          <Paper sx={{ p: 2, opacity: 0.3 }} elevation={1}>
            <Chart
              height={260}
              type="donut"
              series={donutChartSeries1}
              options={{
                labels: donutChartLabels1,
                legend: { show: true },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        total: {
                          label: 'Life Score',
                          formatter: () => '20%'
                        }
                      }
                    }
                  }
                }
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mb={2}>
            <Typography fontWeight={700} variant="h5">
              Focus Areas
            </Typography>
            <Typography color="text.disabled" variant="body2">
              Average sessions per activity per month
            </Typography>
          </Box>
          <Paper sx={{ p: 2, opacity: 0.3 }} elevation={1}>
            <Chart
              height={260}
              type="donut"
              series={donutChartSeries2}
              options={{
                labels: donutChartLabels2,
                legend: { show: true },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        total: {
                          label: 'Energy',
                          formatter: () => '20%'
                        }
                      }
                    }
                  }
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Reports
