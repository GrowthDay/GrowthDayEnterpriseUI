import { FileDownloadOutlined, PersonOutlined } from '@mui/icons-material'
import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material'
import moment from 'moment'
import * as React from 'react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import useOrganizationUserQuery from '../../api/queries/useOrganizationUserQuery'
import Flex from '../../components/Flex'
import Layout from '../../components/Layout'
import { AssessmentTypeEnum } from '../../types/api'
import getPeriod from '../../utils/getPeriod'
import ColumnBarChart from './components/ColumnBarChart'
import MonthPicker from './components/MonthPicker'
import Stats from './components/Stats'

type ReportFormValues = {
  month: string
  assessmentType: AssessmentTypeEnum
}

const defaultValues: ReportFormValues = {
  month: moment().startOf('M').toISOString(),
  assessmentType: AssessmentTypeEnum.Daily
}

const Reports: FC = () => {
  const { data: organizationUser } = useOrganizationUserQuery()
  const methods = useForm<ReportFormValues>({
    defaultValues
  })

  const values = methods.watch()

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
          <Stats count={24} title="Total employees" icon={<PersonOutlined />} delta={4} subtitle="new this month" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stats count={36} title="Earned Achievements" icon={<PersonOutlined />} delta={5} subtitle="vs last month" />
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
          <MenuItem value={AssessmentTypeEnum.Daily}>Daily Lifescore</MenuItem>
          <MenuItem value={AssessmentTypeEnum.Weekly}>Weekly Lifescore</MenuItem>
          <MenuItem value={AssessmentTypeEnum.Monthly}>Monthly Lifescore</MenuItem>
        </TextField>
      </Flex>
      <Paper sx={{ mb: 4 }} elevation={1}>
        <Grid container>
          <Grid item xs={12}>
            <ColumnBarChart />
          </Grid>
          {/*<Grid item xs={12} md={8} lg={9}>*/}
          {/*  <ColumnBarChart />*/}
          {/*</Grid>*/}
          {/*<Grid*/}
          {/*  container*/}
          {/*  item*/}
          {/*  xs={12}*/}
          {/*  md={4}*/}
          {/*  lg={3}*/}
          {/*  sx={(theme) => ({*/}
          {/*    borderLeft: { md: `1px solid ${theme.palette.divider}` },*/}
          {/*    borderTop: { xs: `1px solid ${theme.palette.divider}`, md: 'none' }*/}
          {/*  })}*/}
          {/*>*/}
          {/*  <Grid item xs={6} md={12}>*/}
          {/*    <ColumnBarChart />*/}
          {/*  </Grid>*/}
          {/*  <Grid*/}
          {/*    item*/}
          {/*    xs={6}*/}
          {/*    md={12}*/}
          {/*    sx={(theme) => ({*/}
          {/*      borderLeft: { xs: `1px solid ${theme.palette.divider}`, md: 'none' },*/}
          {/*      borderTop: { md: `1px solid ${theme.palette.divider}` }*/}
          {/*    })}*/}
          {/*  >*/}
          {/*    <ColumnBarChart />*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </Grid>
      </Paper>
    </Layout>
  )
}

export default Reports
