import { ArrowDropUpRounded, FileDownloadOutlined, PersonOutlined } from '@mui/icons-material'
import { Box, Button, Grid, MenuItem, Paper, styled, TextField, Theme, Typography, useTheme } from '@mui/material'
import { lighten } from '@mui/system'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'
import * as React from 'react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import useOrganizationUserQuery from '../../api/queries/useOrganizationUserQuery'
import Flex from '../../components/Flex'
import Layout from '../../components/Layout'
import { AssessmentTypeEnum } from '../../types/api'
import getPeriod from '../../utils/getPeriod'
import Chart from './components/Chart'
import MonthPicker from './components/MonthPicker'
import Stats, { StatsProps } from './components/Stats'
import StatsGrid, { StatsGridProps } from './components/StatsGrid'

type ReportFormValues = {
  month: string
  assessmentType: AssessmentTypeEnum
}

const defaultValues: ReportFormValues = {
  month: moment().startOf('M').toISOString(),
  assessmentType: AssessmentTypeEnum.Daily
}

const Square = styled('span')({
  width: 20,
  height: 20,
  display: 'inline-flex',
  borderRadius: 4,
  marginRight: 4,
  verticalAlign: 'text-bottom'
})

const Reports: FC = () => {
  const theme = useTheme<Theme>()
  const { data: organizationUser } = useOrganizationUserQuery()
  const methods = useForm<ReportFormValues>({
    defaultValues
  })
  const values = methods.watch()

  const border = `1px solid ${theme.palette.divider}`

  const stats1: StatsProps = {
    count: 24,
    title: 'Total employees',
    icon: <PersonOutlined />,
    delta: 4,
    subtitle: 'new this month'
  }
  const stats2: StatsProps = {
    count: 36,
    title: 'Earned Achievements',
    icon: <PersonOutlined />,
    delta: -8,
    subtitle: 'vs last month'
  }

  const columnChartColors = [theme.palette.secondary.main, lighten(theme.palette.primary.main, 0.85)]
  const columnChartSeries: ApexOptions['series'] = [
    {
      name: 'December 2021',
      data: [2, 3, 5, 4, 1, 4, 2, 3, 4],
      color: columnChartColors[0]
    },
    {
      name: 'January 2022',
      data: [4, 3, 2, 5, 2, 4, 2, 1, 2],
      color: columnChartColors[1]
    }
  ]
  const columnChartCategories = [
    'Clarity',
    'Energy',
    'Necessity',
    'Productivity',
    'Influence',
    'Courage',
    'Movement',
    'Mood',
    'Sleep',
    'Nutrition'
  ]

  const radialChartColors = [theme.palette.success.dark, theme.palette.warning.light]

  const listChartSeries1 = [
    "Brendon Burchard's Your Next Bold Move",
    "Brendon Burchard's High Performance GPS",
    'High Performance Habits Builder',
    "Brian Tracy's Goals Quickstart Masterclass",
    'Deep Relaxation with Tracee Stanley'
  ]
  const listChartSeries2 = [
    'Jonathan Fields on the Anatomy of Conflict',
    'Brendon Burchard’s 10 Ideas for Mastering Any Conflict',
    'Jonathan Fields on Myths About Purpose',
    'Mel Abraham on Creating Your Money Purpose',
    'Mel Robbins on Creating Meaningful Transformation'
  ]

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

  const statsGridItems1: StatsGridProps['items'] = [
    {
      count: 438,
      title: 'Daily Life Scores',
      delta: 2
    },
    {
      count: 98,
      title: 'Weekly Life Scores',
      delta: 4
    },
    {
      count: 12,
      title: 'Monthly Life Scores',
      delta: -1
    }
  ]
  const statsGridItems2: StatsGridProps['items'] = [
    {
      count: 285,
      title: 'Journal entries',
      delta: 2
    },
    {
      count: 31,
      title: 'Plans created',
      delta: 1
    },
    {
      count: 12,
      title: 'Certificates of Completion',
      delta: -1
    },
    {
      count: 36,
      title: 'Challenges completed',
      delta: 3
    },
    {
      count: 44,
      title: 'Goals created',
      delta: 10
    },
    {
      count: 18,
      title: 'Goals completed',
      delta: 7
    }
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
          <MonthPicker
            value={values.month}
            onChange={(value) => value && methods.setValue('month', value.toISOString())}
          />
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
          <Stats {...stats1} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stats {...stats2} />
        </Grid>
      </Grid>
      <Flex mb={2} alignItems="center" justifyContent="space-between">
        <div>
          <Typography fontWeight={700} variant="h5">
            Life Scores
          </Typography>
          <Typography color="text.disabled" variant="body2">
            See how team members scored themselves over the month
          </Typography>
        </div>
        <TextField
          margin="none"
          size="small"
          value={values.assessmentType}
          onChange={(event) => methods.setValue('assessmentType', event.target.value as AssessmentTypeEnum)}
          select
        >
          <MenuItem value={AssessmentTypeEnum.Daily}>Daily Life Scores</MenuItem>
          <MenuItem value={AssessmentTypeEnum.Weekly}>Weekly Life Scores</MenuItem>
          <MenuItem value={AssessmentTypeEnum.Monthly}>Monthly Life Scores</MenuItem>
        </TextField>
      </Flex>
      <Paper sx={{ mb: 6 }} elevation={1}>
        <Grid container>
          <Grid p={4} item xs={12} md={8} lg={9}>
            <Chart series={columnChartSeries} categories={columnChartCategories} type="bar" height={350} />
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={4}
            lg={3}
            sx={(theme) => ({
              borderLeft: { md: border },
              borderTop: { xs: border, md: 'none' }
            })}
          >
            <Grid p={4} item xs={12} sm={6} md={12}>
              <Typography>
                <Square sx={{ bgcolor: columnChartColors[0] }} /> Jan 2022
              </Typography>
              <Flex alignItems="center" justifyContent="space-between">
                <Box width={100} height={125} flexShrink={0}>
                  <Chart series={[76.5]} type="radialBar" height={160} color={radialChartColors[0]} />
                </Box>
                <Box whiteSpace="nowrap" flex={1} pl={2}>
                  <Typography variant="body2" color="text.secondary">
                    Avg score
                  </Typography>
                  <Typography fontWeight={600} color={radialChartColors[0]}>
                    Good
                    <Typography
                      fontWeight={600}
                      variant="body2"
                      component="span"
                      color="success.dark"
                      borderRadius={1}
                      bgcolor={lighten(radialChartColors[0], 0.8)}
                      ml={1}
                      px={0.5}
                      py={0.25}
                    >
                      <ArrowDropUpRounded
                        sx={{ verticalAlign: 'bottom', my: -0.75, mx: -1.25, mr: -1 }}
                        fontSize="large"
                      />
                      12%
                    </Typography>
                  </Typography>
                </Box>
              </Flex>
            </Grid>
            <Grid
              p={4}
              item
              xs={12}
              sm={6}
              md={12}
              sx={(theme) => ({
                borderLeft: { sm: border, md: 'none' },
                borderTop: {
                  xs: border,
                  sm: 'none',
                  md: border
                }
              })}
            >
              <Typography>
                <Square sx={{ bgcolor: columnChartColors[1] }} /> Dec 2021
              </Typography>
              <Flex alignItems="center" justifyContent="space-between">
                <Box width={100} height={125} flexShrink={0}>
                  <Chart series={[56]} type="radialBar" height={160} color={radialChartColors[1]} />
                </Box>
                <Box whiteSpace="nowrap" flex={1} pl={2}>
                  <Typography variant="body2" color="text.secondary">
                    Avg score
                  </Typography>
                  <Typography fontWeight={600} color={radialChartColors[1]}>
                    Okay
                  </Typography>
                </Box>
              </Flex>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid mb={6} container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box mb={2}>
            <Typography fontWeight={700} variant="h5">
              Top 5 Courses
            </Typography>
            <Typography color="text.disabled" variant="body2">
              By number of hours watched
            </Typography>
          </Box>
          <Paper sx={{ py: 2, pr: 4, pl: 1, minHeight: 240 }} elevation={1}>
            <ol>
              {listChartSeries1.map((text, index) => (
                <Typography gutterBottom component="li" key={index}>
                  {text}
                </Typography>
              ))}
            </ol>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mb={2}>
            <Typography fontWeight={700} variant="h5">
              Live Events
            </Typography>
            <Typography color="text.disabled" variant="body2">
              Most popular events
            </Typography>
          </Box>
          <Paper sx={{ py: 2, pr: 4, pl: 1, minHeight: 240 }} elevation={1}>
            <ol>
              {listChartSeries2.map((text, index) => (
                <Typography gutterBottom component="li" key={index}>
                  {text}
                </Typography>
              ))}
            </ol>
          </Paper>
        </Grid>
      </Grid>
      <Box mb={2}>
        <Typography fontWeight={700} variant="h5">
          Life Scores Completed
        </Typography>
        <Typography color="text.disabled" variant="body2">
          This month (January 2022)
        </Typography>
      </Box>
      <Box sx={{ mb: 6 }}>
        <StatsGrid items={statsGridItems1} />
      </Box>
      <Box mb={2}>
        <Typography fontWeight={700} variant="h5">
          General Metric
        </Typography>
        <Typography color="text.disabled" variant="body2">
          Last month (Dec 2021)
        </Typography>
      </Box>
      <Box sx={{ mb: 6 }}>
        <StatsGrid items={statsGridItems2} />
      </Box>
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
          <Paper sx={{ p: 2 }} elevation={1}>
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
          <Paper sx={{ p: 2 }} elevation={1}>
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
