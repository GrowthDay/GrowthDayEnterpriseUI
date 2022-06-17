import { PersonOutlined } from '@mui/icons-material'
import { FC } from 'react'
import Stats, { StatsProps } from '../components/Stats'

const EarnedAchievementsReport: FC<{ month: string }> = () => {
  const stats: StatsProps = {
    count: 0,
    title: 'Earned Achievements',
    icon: <PersonOutlined />,
    delta: 0,
    subtitle: 'vs last month',
    disabled: true
  }
  return <Stats {...stats} />
}

export default EarnedAchievementsReport
