import { ArrowDropDownRounded, ArrowDropUpRounded } from '@mui/icons-material'
import { Box, Grid, MenuItem, Paper, styled, TextField, Theme, Typography, useTheme } from '@mui/material'
import { lighten } from '@mui/system'
import { ApexOptions } from 'apexcharts'
import { keyBy, keys, toLower } from 'lodash-es'
import moment from 'moment'
import { FC, useState } from 'react'
import Moment from 'react-moment'
import useAssessmentCategoriesQuery from '../../../api/queries/useAssessmentCategoriesQuery'
import { useReportQueries } from '../../../api/queries/useOrganizationReportsQuery'
import Flex from '../../../components/Flex'
import Loading from '../../../components/Loading'
import { AssessmentTypeEnum, DailyLifeScoreData, WeeklyLifeScoreData, MonthlyLifeScoreData } from '../../../types/api'
import Chart from '../components/Chart'
import { aggregateData, createDateRange } from '../utils'

const Square = styled('span')({
  width: 20,
  height: 20,
  display: 'inline-flex',
  borderRadius: 4,
  marginRight: 4,
  verticalAlign: 'text-bottom'
})

const parseScore = (score: number, theme: Theme) => {
  if (score <= 25) {
    return {
      label: 'Low',
      color: theme.palette.error.main
    }
  }
  if (score <= 50) {
    return {
      label: 'Okay',
      color: theme.palette.warning.main
    }
  }
  if (score <= 75) {
    return {
      label: 'Good',
      color: theme.palette.success.main
    }
  }
  return {
    label: 'Great',
    color: theme.palette.success.dark
  }
}

const aggregateLifeScoreData = (
  data: Array<DailyLifeScoreData | WeeklyLifeScoreData | MonthlyLifeScoreData> = [],
  categoriesArray: string[] = []
) =>
  (data ?? []).reduce<Record<string, number>>((all, curr) => {
    Object.keys(curr).forEach((_key) => {
      const key = toLower(_key)
      if (categoriesArray.includes(key)) {
        all[key] = (+(curr as any)[key] ?? 0) + (all[key] ?? 0)
      }
    })
    return all
  }, {}) ?? {}

const LifeScoreReport: FC<{ month: string }> = ({ month }) => {
  const theme = useTheme<Theme>()
  const border = `1px solid ${theme.palette.divider}`
  const [assessmentType, setAssessmentType] = useState<AssessmentTypeEnum>(AssessmentTypeEnum.Daily)
  const { data: assessmentCategories } = useAssessmentCategoriesQuery(assessmentType)

  const dateRanges = createDateRange(month)
  const [previousLifeScoreQuery, currentLifeScoreQuery, isLoading] = useReportQueries<
    DailyLifeScoreData | WeeklyLifeScoreData | MonthlyLifeScoreData
  >(`${assessmentType.toLowerCase()}LifeScore`, dateRanges)

  const previousAvg =
    Math.floor((aggregateData(previousLifeScoreQuery, 'avgScore') / (previousLifeScoreQuery.data?.length || 1)) * 10) /
    10

  const currentAvg =
    Math.floor((aggregateData(currentLifeScoreQuery, 'avgScore') / (currentLifeScoreQuery.data?.length || 1)) * 10) / 10

  const delta = currentAvg - previousAvg

  const columnChartColors = [theme.palette.secondary.main, lighten(theme.palette.primary.main, 0.85)]

  const categoriesArray = keys(keyBy(assessmentCategories, 'name_id')).map(toLower)

  const prevSeriesData = aggregateLifeScoreData(previousLifeScoreQuery.data, categoriesArray)
  const currSeriesData = aggregateLifeScoreData(currentLifeScoreQuery.data, categoriesArray)

  const columnChartSeries: ApexOptions['series'] = [
    {
      name: moment(dateRanges.previous.month).format('MMMM YYYY'),
      data:
        assessmentCategories?.map(
          (category, index, array) => (prevSeriesData[toLower(category.name_id)] ?? 0) / array.length
        ) ?? [],
      color: columnChartColors[1]
    },
    {
      name: moment(dateRanges.current.month).format('MMMM YYYY'),
      data:
        assessmentCategories?.map(
          (category, index, array) => (currSeriesData[toLower(category.name_id)] ?? 0) / array.length
        ) ?? [],
      color: columnChartColors[0]
    }
  ]
  const columnChartCategories = assessmentCategories?.map((category) => category.name!) ?? []

  const parsedPreviousScore = parseScore(previousAvg, theme)
  const parsedCurrentScore = parseScore(currentAvg, theme)

  return (
    <>
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
          value={assessmentType}
          onChange={(event) => setAssessmentType(event.target.value as AssessmentTypeEnum)}
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
                <Square sx={{ bgcolor: columnChartColors[0] }} />{' '}
                <Moment date={dateRanges.current.startDate} format="MMM YYYY" />
              </Typography>
              <Flex minHeight={125} position="relative" alignItems="center" justifyContent="space-between">
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <Box width={100} height={125} flexShrink={0}>
                      <Chart series={[currentAvg]} type="radialBar" height={160} color={parsedCurrentScore.color} />
                    </Box>
                    <Box whiteSpace="nowrap" flex={1} pl={2}>
                      <Typography variant="body2" color="text.secondary">
                        Avg score
                      </Typography>
                      <Typography fontWeight={600} color={parsedCurrentScore.color}>
                        {parsedCurrentScore.label}
                        <Typography
                          fontWeight={600}
                          variant="body2"
                          component="span"
                          color={delta < 0 ? 'error.dark' : 'success.dark'}
                          borderRadius={1}
                          bgcolor={lighten(delta < 0 ? theme.palette.error.main : theme.palette.success.main, 0.8)}
                          ml={1}
                          px={0.5}
                          py={0.25}
                        >
                          {delta < 0 ? (
                            <ArrowDropDownRounded
                              sx={{ verticalAlign: 'bottom', my: -0.75, mx: -1.25, mr: -1 }}
                              fontSize="large"
                            />
                          ) : (
                            <ArrowDropUpRounded
                              sx={{ verticalAlign: 'bottom', my: -0.75, mx: -1.25, mr: -1 }}
                              fontSize="large"
                            />
                          )}
                          {Math.abs(delta)}%
                        </Typography>
                      </Typography>
                    </Box>
                  </>
                )}
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
                <Square sx={{ bgcolor: columnChartColors[1] }} />{' '}
                <Moment date={dateRanges.previous.startDate} format="MMM YYYY" />
              </Typography>
              <Flex minHeight={125} position="relative" alignItems="center" justifyContent="space-between">
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <Box width={100} height={125} flexShrink={0}>
                      <Chart series={[previousAvg]} type="radialBar" height={160} color={parsedPreviousScore.color} />
                    </Box>
                    <Box whiteSpace="nowrap" flex={1} pl={2}>
                      <Typography variant="body2" color="text.secondary">
                        Avg score
                      </Typography>
                      <Typography fontWeight={600} color={parsedPreviousScore.color}>
                        {parsedPreviousScore.label}
                      </Typography>
                    </Box>
                  </>
                )}
              </Flex>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default LifeScoreReport
