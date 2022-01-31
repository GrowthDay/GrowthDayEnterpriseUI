import { Container, Grid, Typography } from '@mui/material'
import { upperFirst } from 'lodash-es'
import { FC } from 'react'
import useMyProfileApi from '../../api/useMyProfileApi'
import getPeriod from '../../utils/getPeriod'
import DailyHabitComplete from './charts/DailyHabitComplete'
import DailyHabitScores from './charts/DailyHabitScores'
import UserFinishingCourses from './charts/UsersFinishingCourses'
import WeeklyActiveUsers from './charts/WeeklyActiveUsers'

const Reports: FC = () => {
  const { data: profile } = useMyProfileApi()

  return (
    <Container sx={{ p: { xs: 2, sm: 4, md: 5 } }}>
      <Grid spacing={[4, 4]} container>
        <Grid item xs={12}>
          <Typography fontWeight="bold" variant="h5">
            Good {upperFirst(getPeriod())}, {profile?.firstName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Here are some growth insights for your team
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <WeeklyActiveUsers />
        </Grid>
        <Grid item xs={6}>
          <UserFinishingCourses />
        </Grid>
        <Grid item xs={6}>
          <DailyHabitScores />
        </Grid>
        <Grid item xs={6}>
          <DailyHabitComplete />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Reports
