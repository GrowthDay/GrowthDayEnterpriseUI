import { PersonOutlineOutlined } from '@mui/icons-material'
import { Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { FC } from 'react'
import useMixpanelApi from '../../../api/useMixpanelApi'
import Center from '../../../components/Center'
import Loading from '../../../components/Loading'
import { ReportComponentProps } from '../types'
import formatNumber from '../utils/formatNumber'

const Metrics: FC<ReportComponentProps> = ({ title, id }) => {
  const { data, isLoading } = useMixpanelApi(id)
  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight={500} sx={{ position: 'relative' }}>
          {isLoading || !data ? <Loading position="static" size={32} /> : formatNumber(data?.[0]?.value ?? 0)}
        </Typography>
        <Center width={40} height={40} borderRadius="50%" bgcolor="action.hover">
          <PersonOutlineOutlined color="action" />
        </Center>
      </Box>
      <Typography color="textSecondary" variant="subtitle1">
        {title}
      </Typography>
    </Paper>
  )
}

export default Metrics
